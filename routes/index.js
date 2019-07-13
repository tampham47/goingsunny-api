/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var restify = require('express-restify-mongoose');
var expressJwt = require('express-jwt');
var stream = require('getstream');
var Pusher = require('pusher');
var getEssentialUserInfo = require('./utils/getEssentialUserInfo');

var importRoutes = keystone.importer(__dirname);
var router = keystone.express.Router();

var KEssayModel = keystone.list('KEssay').model;
var UserCommentModel = keystone.list('UserComment').model;
var UserReactionModel = keystone.list('UserReaction').model;
var OrgPostModel = keystone.list('OrgPost').model;

// Import Route Controllers
var views = importRoutes('./views');
var apis = importRoutes('./apis');

const client = stream.connect(
  'df5c5f4u33fn',
  'dej3nmnkctchbre2sbdfsm2bs739md8rfu7g68nvbtrnncvsrh7bbqvwwbpkjqf3',
  '53752',
);

const APP_ID = '785498';
const APP_KEY = '8f85cf855404679e71fd';
const APP_SECRET = 'e9b94f0a0fe46ecbfda2';
const APP_CLUSTER = 'ap1';
const pusher = new Pusher({
  appId: APP_ID,
  key: APP_KEY,
  secret: APP_SECRET,
  cluster: APP_CLUSTER,
});


// Setup Route Bindings
exports = module.exports = function(app) {
  // middleware
  app.all('/api/*', keystone.middleware.cors);
  app.options('/api*', function(req, res) {
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
 });
  app.use(
    expressJwt({
      secret: 'this is a secret key',
      credentialsRequired: false,
      getToken: function fromHeaderOrQuerystring(req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
          return req.query.token;
        }
        return null;
      }
    }),
  );

  // index
  app.get('/', views.index);

  // restify mongoose
  restify.serve(router, keystone.mongoose.model('User'));
  restify.serve(router, keystone.mongoose.model('KUnit'));
  restify.serve(router, keystone.mongoose.model('KVocab'));
  restify.serve(router, keystone.mongoose.model('KEssay'));
  restify.serve(router, keystone.mongoose.model('KQuiz'));
  restify.serve(router, keystone.mongoose.model('KUserQuiz'));
  restify.serve(router, keystone.mongoose.model('Lesson'));

  restify.serve(router, keystone.mongoose.model('Org'));
  restify.serve(router, keystone.mongoose.model('OrgMember'));
  restify.serve(router, keystone.mongoose.model('OrgPost'));

  restify.serve(router, keystone.mongoose.model('Group'));
  restify.serve(router, keystone.mongoose.model('GroupMember'), {
    preCreate: (req, res, next) => {
      const userId = req.user._id;
      const groupId = req.body.group;
      const notificationFeed = client.feed('notification', userId);
      // follow groupId to trigger nofication then
      notificationFeed.follow('group', groupId);
      next();
    },
  });
  restify.serve(router, keystone.mongoose.model('GroupMessage'), {
    postCreate: (req, res, next) => {
      const body = req.body;
      const payload = {
        ...req.body,
        ...req.erm.result.toJSON(),
      }
      pusher.trigger(`group-${body.group}`, 'new-message', payload);
      next();
    }
  });

  restify.serve(router, keystone.mongoose.model('UserLog'));
  restify.serve(router, keystone.mongoose.model('UserRating'));
  restify.serve(router, keystone.mongoose.model('UserReaction'), {
    preCreate: (req, res, next) => {
      const userId = req.user._id;
      const essayId = req.body.essay;
      const postId = req.body.post;
      const target = req.body.target;
      const body = req.body;
      const orgObjectAuthorId = body.orgObject.author._id;
      const object = target === 'essay' ? essayId : postId;

      const activity = {
        actor: userId,
        verb: `like:${target}-${object}`,
        object,
        author: getEssentialUserInfo(req.user),
        body: body,
        target,
      };

      const notificationFeed = client.feed('notification', userId);
      const essayFeed = client.feed(target, object);

      // the user who leave a comment on an essay will follow the essay
      // the owner of the essay dont need to follow
      if (userId !== orgObjectAuthorId) {
        activity.to = [`notification:${orgObjectAuthorId}`];
        notificationFeed.follow(target, object);
      }
      // add an activity to trigger notification to all followers
      essayFeed
        .addActivity(activity)
        .then(body => {
          console.log('An activity has been added', body);
        })
        .catch(reason => {
          console.log('It is failed adding an activity', reason);
        });

      next();
    },
    postCreate: (req, res, next) => {
      const body = req.body;

      // trigger notification to all clients
      const payload = {
        ...req.body,
        ...req.erm.result.toJSON(),
      }
      const channelName = `${body.target}-${payload.__object._id}`;
      pusher.trigger(channelName, 'new-reaction', payload);

      if (body.target === 'essay') {
        const essay = body.essay;
        UserReactionModel.find({ essay }, (err, reactionList) => {
          if (err) { return; }
          KEssayModel.findOneAndUpdate(
            { _id: essay },
            { numberOfReaction: reactionList.length }
          ).exec();
        });
      }

      if (body.target === 'post') {
        const post = body.post;
        UserReactionModel.find({ post }, (err, reactionList) => {
          if (err) { return; }
          OrgPostModel.findOneAndUpdate(
            { _id: post },
            { numberOfReaction: reactionList.length }
          ).exec();
        });
      }

      // just continue anyway
      next();
    },
  });

  restify.serve(router, keystone.mongoose.model('UserComment'), {
    preCreate: (req, res, next) => {
      const userId = req.user._id;
      const essayId = req.body.essay;
      const postId = req.body.post;
      const target = req.body.target;
      const body = req.body;
      const orgObjectAuthorId = body.orgObject.author._id;
      const object = target === 'essay' ? essayId : postId;

      const activity = {
        actor: userId,
        verb: `comment:${target}-${object}`,
        object,
        author: getEssentialUserInfo(req.user),
        body: body,
        target,
      };

      const notificationFeed = client.feed('notification', userId);
      const essayFeed = client.feed(target, object);

      // the user who leave a comment on an essay will follow the essay
      // the owner of the essay dont need to follow
      if (userId !== orgObjectAuthorId) {
        activity.to = [`notification:${orgObjectAuthorId}`];
        notificationFeed.follow(target, object);
      }
      // add an activity to trigger notification to all followers
      essayFeed
        .addActivity(activity)
        .then(body => {
          console.log('An activity has been added', body);
        })
        .catch(reason => {
          console.log('It is failed adding an activity', reason);
        });

      next();
    },
    postCreate: (req, res, next) => {
      const body = req.body;

      // trigger notification to all clients
      const payload = {
        ...req.body,
        ...req.erm.result.toJSON(),
      }
      const channelName = `${body.target}-${payload.__object._id}`;
      pusher.trigger(channelName, 'new-comment', payload);

      // update numberOfComment prop on the target entity
      if (body.target === 'essay') {
        const essay = body.essay;

        UserCommentModel.find({ essay }, (err, commentList) => {
          if (err) { return; }
          KEssayModel.findOneAndUpdate(
            { _id: essay },
            { numberOfComment: commentList.length }
          ).exec();
        });
      }

      // update numberOfComment prop on the target entity
      if (body.target === 'post') {
        const post = body.post;
        UserCommentModel.find({ post }, (err, commentList) => {
          if (err) { return; }
          OrgPostModel.findOneAndUpdate(
            { _id: post },
            { numberOfComment: commentList.length }
          ).exec();
        });
      }

      // just continue anyway
      next();
    },
  });

  app.use(router);

  // custom apis
  app.get('/api/v1/updateVocab', apis.updateVocab);
  app.get('/api/v1/updateRanking', apis.updateRanking);

  // protected
  app.get('/api/v1/getQuizByUnit', middleware.requireUser, apis.getQuizByUnit);
};

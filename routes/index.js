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
var getEssentialUserInfo = require('./utils/getEssentialUserInfo');

var importRoutes = keystone.importer(__dirname);
var router = keystone.express.Router();

// Import Route Controllers
var views = importRoutes('./views');
var apis = importRoutes('./apis');

const client = stream.connect(
  'df5c5f4u33fn',
  'dej3nmnkctchbre2sbdfsm2bs739md8rfu7g68nvbtrnncvsrh7bbqvwwbpkjqf3',
  '53752',
);

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
  restify.serve(router, keystone.mongoose.model('UserReaction'));
  restify.serve(router, keystone.mongoose.model('UserComment'), {
    preCreate: (req, res, next) => {
      const userId = req.user._id;
      const essayId = req.body.essay;
      const activity = {
        verb: `comment:${essayId}`,
        actor: userId,
        object: essayId,
        author: getEssentialUserInfo(req.user),
        // body: req.body,
      };

      const notificationFeed = client.feed('notification', userId);
      const essayFeed = client.feed('essay', essayId);

      // the user who leave a comment on an essay will follow the essay
      notificationFeed.follow('essay', essayId);
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
    }
  });
  app.use(router);

  // custom apis
  app.get('/api/v1/updateVocab', apis.updateVocab);
  app.get('/api/v1/updateRanking', apis.updateRanking);

  // protected
  app.get('/api/v1/getQuizByUnit', middleware.requireUser, apis.getQuizByUnit);
};

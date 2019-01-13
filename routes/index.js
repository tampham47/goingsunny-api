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
var importRoutes = keystone.importer(__dirname);
var router = keystone.express.Router();

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
  views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function(app) {

  // Views
  app.get('/', routes.views.index);
  app.all('/api/*', keystone.middleware.cors);

  restify.serve(router, keystone.mongoose.model('User'));
  restify.serve(router, keystone.mongoose.model('Post'));
  restify.serve(router, keystone.mongoose.model('PostCategory'), {name: 'category'});
  restify.serve(router, keystone.mongoose.model('Channel'));
  restify.serve(router, keystone.mongoose.model('Message'));
  restify.serve(router, keystone.mongoose.model('UserInChannel'));
  restify.serve(router, keystone.mongoose.model('Notification'));
  restify.serve(router, keystone.mongoose.model('UserNotification'));
  restify.serve(router, keystone.mongoose.model('Lesson'));
  restify.serve(router, keystone.mongoose.model('Enquiry'));
  restify.serve(router, keystone.mongoose.model('Session'));
  restify.serve(router, keystone.mongoose.model('LessonCrawData'));
  restify.serve(router, keystone.mongoose.model('PinedPost'));
  restify.serve(router, keystone.mongoose.model('Oxford'));
  restify.serve(router, keystone.mongoose.model('HowdyLesson'));
  restify.serve(router, keystone.mongoose.model('Blog'));
  restify.serve(router, keystone.mongoose.model('Event'));
  restify.serve(router, keystone.mongoose.model('Video'));
  restify.serve(router, keystone.mongoose.model('Topic'));
  restify.serve(router, keystone.mongoose.model('Entry'));

  restify.serve(router, keystone.mongoose.model('KUnit'));
  restify.serve(router, keystone.mongoose.model('KEssay'));
  restify.serve(router, keystone.mongoose.model('KVocab'));

  app.use(router);
};

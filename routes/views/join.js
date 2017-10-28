var keystone = require('keystone');
var Session = keystone.list('Session');

exports = module.exports = function(req, res) {
  const query = req.query;
  const data = {
    messengerId: query['messenger user id'],
    firstName: query['first name'],
    lastName: query['last name'],
    gender: query['gender'],
    message: query['message'],
    profileUrl: query['profile pic url'],
    locale: query['locale'],
    ref: query['ref'],
    timezone: query['timezone'],
    chatfuelId: query['chatfuel user id'],
    subscriptions: query['rss and search subscriptions'],
    lastVisitedBlockId: query['last visited block id'],
    lastVisitedBlockName: query['last visited block name'],
    lastVisitedButtonName: query['last clicked button name'],
    lastUserFreeformInput: query['last user freeform input'],
  };
  console.log('data', query, data);
  res.send({ message: 'ok', });
};

var keystone = require('keystone');
var Session = keystone.list('Session').model;
var moment = require('moment');
var fetch = require('node-fetch');

const botId = '59f28d26e4b0640c0cdc9930';
const apiToken = 'mELtlMAHYqR0BvgEiMq8zVek3uYUK3OJMbtyrdNPTrQB9ndV0fM7lWTFZbM4MZvD';
const blockFailId = '59f4498be4b0640c16ce4135';
const blockSuccessId = '59f4414be4b0640c16a2b060';

const sendSuccess = (messengerId) => {
  return fetch(`https://api.chatfuel.com/bots/${botId}/users/${messengerId}/send?chatfuel_token=${apiToken}&chatfuel_block_id=${blockSuccessId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  });
};
const sendFail = (messengerId) => {
  return fetch(`https://api.chatfuel.com/bots/${botId}/users/${messengerId}/send?chatfuel_token=${apiToken}&chatfuel_block_id=${blockFailId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

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

  const n = {
    _messenger: data.messengerId,
    sessionName: moment().format('YYYYMMDD'),
  };

  Session.create(n, function (err, newSession) {

    if (err) {
      sendFail(n._messenger);
      res.send({
        err: 'You are in queue already.',
      });
      return;
    }

    sendSuccess(n._messenger);
    res.send({data: newSession});
  });
};

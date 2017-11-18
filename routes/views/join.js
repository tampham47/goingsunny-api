var keystone = require('keystone');
var Session = keystone.list('Session').model;
var moment = require('moment');
var fetch = require('node-fetch');

const botId = '59fc4cb4e4b02606ed00dbb5';
const apiToken = '97pemuDTh2tINlcezl86IAF2O6ZXdnmddM0CenJGUr90D5XdSAuFT0IP8c1g9Rdf';
const blockFailId = '59fc4cb5e4b02606ed00de38';
const blockSuccessId = '59fc4cb5e4b02606ed00de34';
const apiPath = 'https://api.chatfuel.com/bots/';

const sendSuccess = (messengerId) => {
  return fetch(`${apiPath}${botId}/users/${messengerId}/send?chatfuel_token=${apiToken}&chatfuel_block_id=${blockSuccessId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  });
};
const sendFail = (messengerId) => {
  return fetch(`${apiPath}${botId}/users/${messengerId}/send?chatfuel_token=${apiToken}&chatfuel_block_id=${blockFailId}`, {
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

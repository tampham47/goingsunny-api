var keystone = require('keystone');
var moment = require('moment');
var fetch = require('node-fetch');

const botId = '59fc4cb4e4b02606ed00dbb5';
const apiToken = '97pemuDTh2tINlcezl86IAF2O6ZXdnmddM0CenJGUr90D5XdSAuFT0IP8c1g9Rdf';
const blockFailId = '5a0fa59ae4b000de3dcc6e78';
const blockSuccessId = '59fc4cb5e4b02606ed00de0f';
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

exports = module.exports = function (req, res) {
  const messengerId = req.query['messenger user id'];
  const currentHour = Number(moment().format('HH'));

  if (20 <= moment) { // in time
    sendSuccess(messengerId);
  } else {
    sendFail(messengerId);
  }

  res.send({ data: 'ok' });
};

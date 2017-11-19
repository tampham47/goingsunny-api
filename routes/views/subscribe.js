exports = module.exports = function (req, res) {
  const messengerId = req.body['messenger user id'];
  console.log('messenger', messengerId);
  res.send({ data: 'ok' });
};

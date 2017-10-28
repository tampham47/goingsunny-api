var keystone = require('keystone');
var Session = keystone.list('Session');

exports = module.exports = function(req, res) {
  console.log('query', req.query);
  res.send({ message: 'ok', });
};

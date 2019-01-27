var keystone = require('keystone');
var User = keystone.list('User').model;
var KEssay = keystone.list('KEssay').model;

exports = module.exports = function (req, res) {
  User.find({}, (err, data) => {
    console.log(`Executing on batch ${data.length} of users.`);
    data.forEach(user => {
      KEssay.find({ author: user._id, state: 'published' }).count((err, n) => {
        if (err) {
          console.log(`Fetching ERR, user ${user._id}`, err);
        }
        console.log(`Fetching DONE: ${user._id} got ${n} publised essays.`);

        user.hacknaoPoint = n;
        user.save((err, doc) => {
          console.log(`User ${user._id} has been updated.`);
        });
      })
    });
  })
  res.send({ status: 'queue' });
};

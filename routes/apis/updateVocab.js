var keystone = require('keystone');
var KVocab = keystone.list('KVocab');
var data = require('./updateVocabData.json');

exports = module.exports = function (req, res) {
  data.forEach(element => {
    const i = {
      hint: element.hint,
      pronounce: element.pronounce,
      word: element.word.toLowerCase(),
      meaning: element.meaning,
    };

    KVocab.model.findOneAndUpdate({
      word: i.word,
    }, {
      ...i
    }, function(err, doc) {
      console.log('update', i.word, !err ? 'OK' : 'failed');
    });
  });

  res.send({ status: 'queue' })
};

const keystone = require('keystone');
const VocabModel = keystone.list('KVocab').model;
const QuizModel = keystone.list('KQuiz').model;

/**
 * getQuizByUnit
 */
exports = module.exports = function(req, res) {
  const unitName = req.query.unitName;
  const userId = req.user._id;

  const fetchVocab = () => new Promise((resolve, reject) => {
    VocabModel.find({ unitName }).lean().exec((err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });

  const fetchQuiz = () => new Promise((resolve, reject) => {
    QuizModel.find({ unitName, author: userId }).lean().exec((err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });

  Promise.all([
    fetchVocab(),
    fetchQuiz(),
  ]).then(result => {
    const [ vocabList, quizList ] = result;
    const userQuiz = vocabList.map(i => {
      const quiz = quizList.find(q => q.vocab.toString() == i._id);
      return {
        ...quiz,
        ...i,
      };
    })
    res.send(userQuiz);
  });
};

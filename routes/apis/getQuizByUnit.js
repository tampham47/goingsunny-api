const keystone = require('keystone');
const VocabModel = keystone.list('KVocab').model;
const QuizModel = keystone.list('KQuiz').model;


function shuffle(arra1) {
  let ctr = arra1.length;
  let temp;
  let index;

  // While there are elements in the array
  while (ctr > 0) {
  // Pick a random index
    index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
    ctr--;
    // And swap the last element with it
    temp = arra1[ctr];
    arra1[ctr] = arra1[index];
    arra1[index] = temp;
  }
  return arra1;
}

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
      const filteredList = vocabList.filter(v => v._id !== i._id).map(m => ({
        word: m.word,
        type: m.type,
        meaning: m.meaning,
        pronounce: m.pronounce,
        hint: m.hint,
        _id: m._id,
      }));
      const shuffleList = shuffle(filteredList);
      const optionList = shuffleList.slice(0, 3).concat({
        word: i.word,
        type: i.type,
        meaning: i.meaning,
        pronounce: i.pronounce,
        hint: i.hint,
        _id: i._id,
      });

      return {
        ...quiz,
        ...i,
        optionList,
      };
    })
    res.send(userQuiz);
  });
};

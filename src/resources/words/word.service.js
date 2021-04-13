const wordRepo = require('./word.db.repository');

const getAll = async conditions => wordRepo.getAll(conditions);

const get = async wordId => {
  const word = await wordRepo.get(wordId);

  return word;
};

const getAllWords = async () => {
  const words = await wordRepo.getAllWords();

  return words;
};

const replaceAllWords = async words => {
  const newWords = await wordRepo.replaceAllWords(words);

  return newWords;
};

const replaceWord = async (wordId, word) => {
  const newWord = await wordRepo.replaceWord(wordId, word);

  return newWord;
};

module.exports = { getAll, get, getAllWords, replaceAllWords, replaceWord };

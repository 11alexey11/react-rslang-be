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

module.exports = { getAll, get, getAllWords };

const Word = require('./word.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');
const ENTITY_NAME = 'word';

const getAll = async conditions => {
  const { group, page } = conditions;

  return Word.find({ group, page });
};

const get = async id => {
  const word = await Word.findOne({ _id: id });
  if (!word) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return word;
};

const getAllWords = async () => {
  const words = await Word.find();
  return words;
};

const replaceAllWords = async words => {
  await Word.deleteMany();
  await Word.insertMany(words);

  const newWords = await Word.find();

  return newWords;
};

module.exports = { getAll, get, getAllWords, replaceAllWords };

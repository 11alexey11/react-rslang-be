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
  words = JSON.parse(words);
  const changedWords = words.map(item => {
    return {
      _id: item._id.$oid,
      group: item.group,
      page: item.page,
      word: item.word,
      image: item.image,
      audio: item.audio,
      audioMeaning: item.audioMeaning,
      audioExample: item.audioExample,
      textMeaning: item.textMeaning,
      textExample: item.textExample,
      transcription: item.transcription,
      __v: item.__v,
      textExampleTranslate: item.textExampleTranslate,
      textMeaningTranslate: item.textMeaningTranslate,
      wordTranslate: item.wordTranslate,
      deletedWord: item.deletedWord,
      hardWord: item.hardWord,
      corrects: item.corrects,
      errorsCount: item.errorsCount,
      learningWord: item.learningWord
    };
  });
  await Word.deleteMany();
  await Word.insertMany(changedWords);

  const newWords = await Word.find();

  return newWords;
};

module.exports = { getAll, get, getAllWords, replaceAllWords };

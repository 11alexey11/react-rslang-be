const UserWord = require('./userWord.model');
const { NOT_FOUND_ERROR, ENTITY_EXISTS } = require('../../errors/appErrors');
const { words } = require('../../common/words');
const ENTITY_NAME = 'user word';
const MONGO_ENTITY_EXISTS_ERROR_CODE = 11000;

const getAll = async userId => UserWord.find({ userId });

const get = async (wordId, userId) => {
  const userWord = await UserWord.findOne({ wordId, userId });
  if (!userWord) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { wordId, userId });
  }

  return userWord;
};

const saveWords = async userId => {
  const newWordsArray = words.map(item => {
    const _id = item._id.$oid;
    return {
      ...item,
      _id
    };
  });
  const words = await UserWord.updateOne(
    { userId },
    {
      userId,
      words: newWordsArray
    },
    {
      upsert: true
    }
  );
  return words;
};

const save = async (wordId, userId, userWord) => {
  try {
    return await UserWord.create(userWord);
  } catch (err) {
    if (err.code === MONGO_ENTITY_EXISTS_ERROR_CODE) {
      throw new ENTITY_EXISTS(`such ${ENTITY_NAME} already exists`);
    } else {
      throw err;
    }
  }
};

const update = async (wordId, userId, userWord) => {
  const wordsDB = await UserWord.find({ userId });
  let newWordsArray = [];
  if (wordsDB.length === 0) {
    newWordsArray = words.map(item => {
      if (item.id === wordId) {
        return userWord;
      }
      return item;
    });
  } else {
    newWordsArray = wordsDB[0].words.map(item => {
      if (item.id === wordId) {
        return userWord;
      }
      return item;
    });
  }

  await UserWord.updateOne(
    { userId },
    {
      userId,
      words: newWordsArray
    },
    {
      upsert: true
    }
  );

  return await UserWord.find({ userId });
};

const remove = async (wordId, userId) => UserWord.deleteOne({ wordId, userId });

module.exports = { getAll, get, save, saveWords, update, remove };

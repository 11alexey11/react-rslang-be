const Statistics = require('./statistic.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');

const get = async userId => {
  const statistic = await Statistics.findOne({ userId });
  if (!statistic) {
    throw new NOT_FOUND_ERROR('statistic', `userId: ${userId}`);
  }

  return statistic;
};

const upsert = async (userId, statistic) =>
  await Statistics.findOneAndUpdate(
    { userId },
    { 
      statistics: {
        savannah: statistic.savannah,
        audioCall: statistic.audioCall,
        sprint: statistic.sprint,
        constructorWords: statistic.constructorWords
      }
    }
    { upsert: true }
  );

const remove = async userId => Statistics.deleteOne({ userId });

module.exports = { get, upsert, remove };

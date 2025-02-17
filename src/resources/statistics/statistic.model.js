const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { addMethods } = require('../../utils/toResponse');

const StatisticSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    learnedWords: {
      type: Number
    },
    optional: {
      type: Object,
      required: false
    },
    statistics: {
      savannah: {
        type: Array,
        required: false
      },
      audioCall: {
        type: Array,
        required: false
      },
      sprint: {
        type: Array,
        required: false
      },
      constructorWords: {
        type: Array,
        required: false
      }
    }
  },
  { collection: 'statistic' }
);

addMethods(StatisticSchema);

module.exports = mongoose.model('Statistic', StatisticSchema);

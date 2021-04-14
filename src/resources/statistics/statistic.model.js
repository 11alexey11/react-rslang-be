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
    shortStatistics: {
      savannah: {
        data: {
          type: String,
          required: false
        },
        countLearningWords: {
          type: Number,
          required: false
        },
        winStreak: {
          type: Number,
          required: false
        },
        generalCountLearningWords: {
          type: Number,
          required: false
        },
        countRightAnswers: {
          type: Number,
          required: false
        }
      },
      audioCall: {
        data: {
          type: String,
          required: false
        },
        countLearningWords: {
          type: Number,
          required: false
        },
        winStreak: {
          type: Number,
          required: false
        },
        generalCountLearningWords: {
          type: Number,
          required: false
        }
      },
      sprint: {
        data: {
          type: String,
          required: false
        },
        countLearningWords: {
          type: Number,
          required: false
        },
        winStreak: {
          type: Number,
          required: false
        },
        generalCountLearningWords: {
          type: Number,
          required: false
        }
      },
      constructorWords: {
        data: {
          type: String,
          required: false
        },
        countLearningWords: {
          type: Number,
          required: false
        },
        winStreak: {
          type: Number,
          required: false
        },
        generalCountLearningWords: {
          type: Number,
          required: false
        }
      }
    },
    longStatistics: {
      data: {
        type: String,
        required: false
      },
      countLearningWords: {
        type: Number,
        required: false
      }
    }
  },
  { collection: 'statistic' }
);

addMethods(StatisticSchema);

module.exports = mongoose.model('Statistic', StatisticSchema);

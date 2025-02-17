const User = require('./user.model');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');
const ENTITY_NAME = 'user';
const MONGO_ENTITY_EXISTS_ERROR_CODE = 11000;

const getUserByEmail = async email => {
  const user = await User.findOne({ email });
  if (!user) {
    return {
      error: {
        status: 'Not found',
        errors: [
          {
            path: ['e-mail'],
            message: 'This account does not exist'
          }
        ]
      }
    };
  }

  return user;
};

const get = async id => {
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }

  return user;
};

const save = async user => {
  try {
    return await User.create(user);
  } catch (err) {
    if (err.code === MONGO_ENTITY_EXISTS_ERROR_CODE) {
      return {
        error: {
          status: 'Expectation Failed',
          errors: [
            {
              path: ['e-mail'],
              message: `${ENTITY_NAME} with this email already exists`
            }
          ]
        }
      };
    }
  }
};

const update = async (id, user) =>
  User.findOneAndUpdate({ _id: id }, { $set: user }, { new: true });

const remove = async id => User.deleteOne({ _id: id });

module.exports = { get, getUserByEmail, save, update, remove };

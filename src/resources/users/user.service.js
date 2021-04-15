const bcrypt = require('bcrypt');

const usersRepo = require('./user.db.repository');
const tokenService = require('../token/token.service');
const settingsService = require('../settings/setting.service');
const statisticService = require('../statistics/statistic.service');

const authenticate = async user => {
  const dbData = await usersRepo.getUserByEmail(user.email);

  if (dbData.error) {
    return dbData;
  }

  const isValidated = await bcrypt.compare(user.password, dbData.password);
  if (!isValidated) {
    return {
      error: {
        status: 'Forbidden',
        errors: [
          {
            path: ['password'],
            message: 'Your password is not validate.'
          }
        ]
      }
    };
  }

  const tokens = await tokenService.getTokens(dbData._id);

  return {
    ...tokens,
    userId: dbData._id,
    name: dbData.name,
    photo: dbData.photo
  };
};

const get = id => usersRepo.get(id);

const save = async user => {
  usersRepo.save(user);
  const dbData = await usersRepo.getUserByEmail(user.email);
  const tokens = await tokenService.getTokens(dbData._id);
  return {
    ...tokens,
    ...dbData
  };
};

const update = (id, user) => usersRepo.update(id, user);

const remove = async id => {
  await statisticService.remove(id);
  await settingsService.remove(id);
  await usersRepo.remove(id);
};

module.exports = { authenticate, get, save, update, remove };

const bcrypt = require('bcrypt');

const usersRepo = require('./user.db.repository');
const tokenService = require('../token/token.service');
const settingsService = require('../settings/setting.service');
const statisticService = require('../statistics/statistic.service');

const authenticate = async user => {
  const userEntity = await usersRepo.getUserByEmail(user.email);

  const isValidated = await bcrypt.compare(user.password, userEntity.password);
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

  const tokens = await tokenService.getTokens(userEntity._id);

  return {
    ...tokens,
    userId: userEntity._id,
    name: userEntity.name,
    photo: userEntity.photo
  };
};

const get = id => usersRepo.get(id);

const save = user => usersRepo.save(user);

const update = (id, user) => usersRepo.update(id, user);

const remove = async id => {
  await statisticService.remove(id);
  await settingsService.remove(id);
  await usersRepo.remove(id);
};

module.exports = { authenticate, get, save, update, remove };

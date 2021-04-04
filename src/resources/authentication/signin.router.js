const router = require('express').Router();
const { OK } = require('http-status-codes');

const userService = require('../users/user.service');

router.route('/').post(async (req, res) => {
  const auth = await userService.authenticate(req.body);

  if (auth.error) {
    res.status(OK).json({
      ...auth
    });
  } else {
    res.status(OK).json({
      message: 'Authenticated',
      ...auth
    });
  }
});

module.exports = router;

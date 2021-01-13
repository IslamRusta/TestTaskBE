const { User } = require('../models');

function emailValidation(email) {
  const regularExpression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regularExpression.test(email);
}

async function userIsExsist(email) {
  const user = await User.findAll({
    where: {
      email,
    },
  });
  return user.length > 0;
}

module.exports = {
  async userCreateValidation(req, res, next) {
    const { email } = req.body;
    if (req.body.referralCode) {
      const isUserExists = await userIsExsist(email);
      if (isUserExists) {
        return res.status(400).json({ message: `User ${email} already exists, you can't use referral code` });
      }
      if (emailValidation(email)) {
        return next();
      }
      return res.status(400).json({ message: 'Invalid query' });
    }
    return next();
  },

};

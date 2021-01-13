const bcrypt = require('bcryptjs');

const { User: UserController } = require('../models');

async function createUser(req, res) {
  try {
    const referralCode = await bcrypt.hash(req.body.email, 10);
    let invitedBy = {};
    if (req.body.referralCode) {
      invitedBy = await UserController.findOne(
        {
          where: { referralCode: req.body.referralCode },
          raw: true,
        },
      );
    }
    const user = await UserController
      .create({
        email: req.body.email,
        referralCode,
        invitedBy: invitedBy.id || null,
      });
    user.dataValues.invited = 0;
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e);
  }
}

async function getCountOfInvitedUsers(id) {
  return UserController.count({
    where: {
      invitedBy: id,
    },
  });
}

module.exports = {
  async authUser(req, res) {
    const { email } = req.body;
    const user = await UserController.findOne({
      where: {
        email,
      },
    });
    if (user !== null) {
      user.dataValues.invited = await getCountOfInvitedUsers(user.id);
      res.status(200).json(user);
    } else {
      await createUser(req, res);
    }
  },
};

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    referralCode: DataTypes.STRING,
    invitedBy: DataTypes.INTEGER,
  });

  return User;
};

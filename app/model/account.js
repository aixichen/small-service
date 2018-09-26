'use strict';

module.exports = app => {
  const { STRING, INTEGER, DECIMAL, DATEONLY } = app.Sequelize;

  const Account = app.model.define('account', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING(50),
      validate: {
        len: [ 1, 50 ],
      },
    },
    phone: {
      type: DECIMAL(11, 2),
      validate: {
        isDecimal: true,
        min: 0.01,
      },
    },
    remark: {
      type: STRING,
    },
  }, {
    freezeTableName: true,
  });
  return Account;
};

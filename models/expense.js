module.exports = (sequelize, DataTypes) => {
    const Expense = sequelize.define('Expense', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
        }
      },
      details: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            min: 5,
        }
      },
      amount: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
          isNumeric: true,
        }
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
      },
      time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('NOW()'),
        validate: {
          isAlpha: true,
        }
      },
    });
  
  
    return Expense;
};
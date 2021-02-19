const Sequelize = require('sequelize');
const db = require('../config/config');


module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
        }
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
        }
      },
      mobile_number: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
            notEmpty: true,
            isNumeric: true
        }
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
        }
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: true,
      }},
    });
  
  
    return Employee;
};
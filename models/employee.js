const Sequelize = require('sequelize');
const db = require('../config/config');


module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
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
      department: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: true,
      }},
    });
  
  Employee.associate = function(models) {
    models.Employee.hasMany(models.Expense);
  };


    return Employee;
};
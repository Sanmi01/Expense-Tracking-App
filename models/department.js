const Sequelize = require('sequelize');
const db = require('../config/config');

module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define('Department', {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              notEmpty: true,
              isAlpha: true,
          }
        },
    });

    Department.associate = function(models) {
        models.Department.hasMany(models.Employee);
        models.Department.hasMany(models.Expense);
      }
    

    
    return Department
}
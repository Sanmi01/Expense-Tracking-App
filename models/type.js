const Sequelize = require('sequelize');
const db = require('../config/config');

module.exports = (sequelize, DataTypes) => {
    const Type = sequelize.define('Type', {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              notEmpty: true,
              isAlpha: true,
          }
        },
    })
    
  
    Type.associate = function(models) {
      models.Type.hasMany(models.Expense);
    }
    
    
    return Type
  }
  
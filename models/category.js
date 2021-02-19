const Sequelize = require('sequelize');
const db = require('../config/config');

module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              notEmpty: true,
              isAlpha: true,
          }
        },
    })
    
  
  
    
    
    return Category
  }
  
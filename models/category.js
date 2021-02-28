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
    });
    
  Category.associate = function(models) {
    models.Category.belongsToMany(models.Expense, {
      as: "expenses",
      through: "ExpenseCategories",
      foreignKey: "category_id"
    })
  }
  
    
    
    return Category
  }
  
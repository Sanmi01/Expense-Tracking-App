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
      time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('NOW()'),
        validate: {
          isAlpha: true,
        }
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true,
        }
      },
      EmployeeId: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
      TypeId: DataTypes.INTEGER,
      DepartmentId: {type: DataTypes.INTEGER},
    });
  
    Expense.associate = function (models) {
      models.Expense.belongsTo(models.Employee, {
        onDelete: "CASCADE",
        foreignKey: {
        allowNull: false
        }
      });

      models.Expense.belongsTo(models.Department, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      });

      models.Expense.belongsToMany(models.Category, {
        as: "categories",
        through: "ExpenseCategories",
        foreignKey: "expense_id"
      });

      models.Expense.belongsTo(models.Type, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      });
    }

    return Expense;
};
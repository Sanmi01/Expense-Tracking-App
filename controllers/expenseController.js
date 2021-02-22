var models = require('../models');

exports.expense_create_get = async function(req, res, next) {
    const employees = await models.Employee.findAll();
    const types = await models.Type.findAll();
    const categories = await models.Category.findAll();

    res.render('forms/expense_form',{ title: 'Create Expense', employees: employees, types: types, categories: categories })
}
exports.expense_create_post = async function (req, res) {

    let Amount = req.body.amount;
    let status = '';

    if(Amount < 1000) {
        status = 'Approved'
    } else {
        status = 'Pending'
    }

    const expense = await models.Expense.create({
        name: req.body.name,
        details: req.body.details,
        amount: req.body.amount,
        status: status,
        // type: req.body.type,
        TypeId: req.type_id,
        EmployeeId: req.body.employee_id,
        CategoryId: req.body.category_id,
        TypeId: req.body.type_id,
    }).then(function() {
        console.log("Expense created successfully");
        res.redirect('/expense');
       // check if there was an error during post creation
  }); 
}

exports.expense_delete_get = function(req, res, next) {
    models.Expense.destroy({
        where: {
            id: req.params.expense_id
        }
    }).then(function() {
        res.redirect('/expense')
    })
}

exports.expense_delete_post = function(req, res, next) {
    models.Expense.destroy({
        where: {
            id: req.params.expense_id
        }
    }).then(function() {
        res.redirect('/expense')
    })
}


exports.expense_update_get = function(req, res, next) {
    models.Expense.findByPk(
            req.params.expense_id
    ).then(function(expense) {
           res.render('forms/expense_form', { title: 'Update Expense', expense: expense });
           console.log("Expense update get successful");
      });
};


exports.expense_update_post = function(req, res, next) {
    
    let Amount = req.body.amount;
    let status = '';

    if(Amount < 1000) {
        status = 'Approved'
    } else {
        status = 'Pending'
    }
    
    models.Expense.update(
        {
            name: req.body.name,
        details: req.body.details,
        amount: req.body.amount,
        status: status,
        // type: req.body.type
        },
      {
            where:
            {
                id: req.params.expense_id
            }
        }

     ).then(function() { 
            res.redirect("/expense");  
      });
};

exports.expense_review_post = function(req, res, next) {
    
    let Amount = req.body.amount;
    let status = req.body.status;
    
    models.Expense.update(
        {
        status: status,
        // type: req.body.type
        },
      {
            where:
            {
                id: req.params.expense_id
            }
        }

     ).then(function() { 
            res.redirect("/expense");  
      });
};


exports.expense_detail = async function(req, res, next) {
    const employees = await models.Employee.findAll();
    models.Expense.findByPk(
            req.params.expense_id,{
                include: [
                    {
                        model: models.Employee,
                        attributes: ['id', 'first_name', 'last_name', 'role', 'department']
                      },
                      {
                        model: models.Type,
                        attributes: ['id', 'name']
                      },
                ]
            },
            ).then(function(expense) {
    res.render('pages/expense_detail', { title: 'Expense Details', expense: expense, employees: employees} );
    console.log("Expense details renders successfully");
    });
};

exports.expense_list = async function(req, res, next) {
    const employees = await models.Employee.findAll();
    models.Expense.findAll({
        include: [
            {
                model: models.Employee,
                attributes: ['id', 'first_name', 'last_name', 'role', 'department']
              },
        ]
    })
    .then(function(expenses) {
        console.log("rendering expense list");
        res.render('pages/expense_list', { title: 'Expense List', expenses: expenses, employees} );
        console.log("Expenses list renders successfully");
    })
}
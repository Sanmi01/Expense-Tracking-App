var models = require('../models');
const {check, validationResult} = require('express-validator/check');

exports.expense_create_get = async function(req, res, next) {
    const types = await models.Type.findAll();
    const categories = await models.Category.findAll();
    const departments = await models.Department.findAll();
    const employees = await models.Employee.findAll();


    models.Employee.findByPk(
        req.body.employee_id, {
        include: [
          {
            model: models.Expense
          }
        ]
        }
).then(function(employee) {
    // console.log("LOOK HERE")
    // console.log(employee)
    res.render('forms/expense_form',{ title: 'Create Expense', employee:employee, employees: employees, types: types, categories: categories, departments:departments })
});
}
exports.expense_create_post = async function (req, res) {

    const departments = await models.Department.findAll();
    const types = await models.Type.findAll();
    const categories = await models.Category.findAll();

  let employee = await  models.Employee.findByPk(
      req.body.employee_id, {
      include: [
        {
          model: models.Expense
        }
      ]
      }
)
// console.log("LOOK")
let employDepId = employee.DepartmentId;

    

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const employees = await models.Employee.findAll();
    const types = await models.Type.findAll();
    const categories = await models.Category.findAll();
        const errorMessage = errors.array();
        res.render('forms/expense_form',{ title: 'Create Expense', errorMessage, employees: employees, types: types, categories: categories})
      } else {
        const employees = await models.Employee.findAll();
        let employee_id = req.body.employee_id;

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
        EmployeeId: req.body.employee_id,
        CategoryId: req.body.category_id,
        TypeId: req.body.type_id,
        DepartmentId: employDepId,
    }).then(function() {
        console.log("Expense created successfully");
        res.redirect('/expense');
       // check if there was an error during post creation
  }); 
}
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


exports.expense_update_post = async function(req, res, next) {
    
    let Amount = req.body.amount;
    let status = '';

    if(Amount < 1000) {
        status = 'Approved'
    } else {
        status = 'Pending'
    }
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const employees = await models.Employee.findAll();
    const types = await models.Type.findAll();
    const categories = await models.Category.findAll();
        const errorMessage = errors.array();
        res.render('forms/expense_form',{ title: 'Create Expense', errorMessage, employees: employees, types: types, categories: categories})
      } else {
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
    }
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
                        attributes: ['id', 'first_name', 'last_name', 'role']
                      },
                      {
                        model: models.Type,
                        attributes: ['id', 'name']
                      },
                      {
                        model: models.Department,
                        attributes: ['id', 'name']
                      },
                      {
                        model: models.Category,
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
                attributes: ['id', 'first_name', 'last_name', 'role']
              },
              {
                model: models.Department,
                attributes: ['id', 'name']
              },
        ]
    })
    .then(function(expenses) {
        console.log("rendering expense list");
        res.render('pages/expense_list', { title: 'Expense List', expenses: expenses, employees} );
        console.log("Expenses list renders successfully");
    })
}
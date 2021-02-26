var models = require('../models');
const path = require('path');
const {check, validationResult} = require('express-validator/check');



exports.employee_create_get = async function(req, res, next) {
    const departments = await models.Department.findAll();
    res.render('forms/employee_form',{ title: 'Create Employee', departments: departments})
}


exports.employee_create_post = async function(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessage = errors.array();
        const departments = await models.Department.findAll();
        res.render('forms/employee_form',{ title: 'Create Employee', departments: departments, errorMessage})
      } else {
    
    models.Employee.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mobile_number: req.body.mobile_number,
        role: req.body.role,
        email: req.body.email,
        DepartmentId: req.body.department_id
    }).then(function() {
        console.log("Employee created successfully");
        res.redirect('/employee');
  });
}
  
}

exports.employee_delete_get = function(req, res, next) {
    models.Employee.destroy({
        where: {
            id: req.params.employee_id
        }
    }).then(function() {
        res.redirect('/employee')
    })
}

exports.employee_delete_post = function(req, res, next) {
    console.log("1234")
    models.Employee.destroy({
        where: {
            id: req.params.employee_id
        }
    }).then(function() {
        res.redirect('/employee')
    })
}


exports.employee_update_get = function(req, res, next) {
    models.Employee.findByPk(
            req.params.employee_id
    ).then(function(employee) {
           res.render('forms/employee_form', { title: 'Update Employee', employee: employee });
           console.log("Employee update get successful");
      });
};


exports.employee_update_post = async function(req, res, next) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMessage = errors.array();
        res.render('forms/employee_form',{ title: 'Create Employee', errorMessage})
      } else {
    models.Employee.update(
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            mobile_number: req.body.mobile_number,
            role: req.body.role,
            email: req.body.email,
        },
      {
            where:
            {
                id: req.params.employee_id
            }
        }

     ).then(function() { 
            res.redirect("/employee");  
      });
    }
};


exports.employee_list = async function(req, res, next) {
    const expenses = await models.Expense.findAll();
    models.Employee.findAll({
        include: [
            {
                model: models.Expense,
                attributes: ['name', 'amount']
              },
              {
                model: models.Department,
                attributes: ['id', 'name']
              },
        ]
    })
    .then(function(employees) {
        console.log("rendering employee list");
        res.render('pages/employee_list', { title: 'Employee List', employees: employees, expenses: expenses} );
        console.log("Employees list renders successfully");
    })
}

exports.employee_detail = async function(req, res, next) {
    const types = await models.Type.findAll();
    const categories = await models.Category.findAll();
    const employees = await models.Employee.findAll();
    models.Employee.findByPk(
            req.params.employee_id, {
                include: [
                  {
                    model: models.Expense
                  },
                  {
                    model: models.Department,
                    attributes: ['id', 'name']
                  }
                        ]
                }
            ).then(function(employee) {
    res.render('pages/employee_detail', { title: 'Employee Details', employee: employee, types: types, categories: categories, employees: employees} );
    console.log("Employee details renders successfully");
    });
};

exports.index = function(req, res) { // find the count of posts in database
    res.render('pages/index');
  
  
};
var models = require('../models');
const path = require('path');



exports.employee_create_get = function(req, res, next) {
    res.render('forms/employee_form',{ title: 'Create Employee'})
}
exports.employee_create_post = function (req, res) {
    models.Employee.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        mobile_number: req.body.mobile_number,
        role: req.body.role,
        email: req.body.email
    }).then(function() {
        console.log("Employee created successfully");
        res.redirect('/employee');
  });
  
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


exports.employee_update_post = function(req, res, next) {
    models.Employee.update(
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            mobile_number: req.body.mobile_number,
            role: req.body.role,
            email: req.body.email
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
};


exports.employee_list = function(req, res, next) {
    models.Employee.findAll()
    .then(function(employees) {
        console.log("rendering employee list");
        res.render('pages/employee_list', { title: 'Employee List', employees: employees} );
        console.log("Employees list renders successfully");
    })
}

exports.employee_detail = async function(req, res, next) {

    models.Employee.findByPk(
            req.params.employee_id
            ).then(function(employee) {
    res.render('pages/employee_detail', { title: 'Employee Details', employee: employee} );
    console.log("Employee details renders successfully");
    });
};

exports.index = function(req, res) { // find the count of posts in database
    res.render('pages/index');
  
  
};
var models = require('../models');

exports.department_create_get = function(req, res, next) {
    res.render('forms/department_form',{ title: 'Create Department'})
}
exports.department_create_post = function (req, res) {
    models.Department.create({
        name: req.body.name,
    }).then(function() {
        console.log("Department created successfully");
        res.redirect('/department');
       // check if there was an error during  creation
  }); 
}

exports.department_delete_get = function(req, res, next) {
    models.Department.destroy({
        where: {
            id: req.params.department_id
        }
    }).then(function() {
        res.redirect('/department')
    })
}

exports.department_delete_post = function(req, res, next) {
    models.Department.destroy({
        where: {
            id: req.params.department_id
        }
    }).then(function() {
        res.redirect('/department')
    })
}


exports.department_update_get = function(req, res, next) {
    models.Department.findByPk(
            req.params.department_id
    ).then(function(department) {
           res.render('forms/department_form', { title: 'Update Department', department: department });
           console.log("Department update get successful");
      });
};


exports.department_update_post = function(req, res, next) {
    models.Department.update(
        {
            name: req.body.name,
        },
      {
            where:
            {
                id: req.params.department_id
            }
        }

     ).then(function() { 
            res.redirect("/department");  
      });
};

exports.department_detail = async function(req, res, next) {
    const employees = await models.Employee.findAll();
    const types = await models.Type.findAll();
    const departments = await models.Department.findAll();
    models.Department.findByPk(
            req.params.department_id, {
                include: [
                    {
                        model: models.Employee,
                        attributes: ['first_name', 'last_name']
                      },
                      {
                        model: models.Expense
                    }
                ]
                }
            ).then(function(department) {
    res.render('pages/department_detail', { title: 'Department Details', department: department, employees: employees } );
    console.log("Department details renders successfully");
    });
};

exports.department_list = async function(req, res, next) {
    const employees = await models.Employee.findAll();
    models.Department.findAll({
        include: [
            {
                model: models.Employee,
                attributes: ['first_name', 'last_name']
              },
              {
                model: models.Expense,
            }
        ]
    })
    .then(function(departments) {
        console.log("rendering department list");
        res.render('pages/department_list', { title: 'Department List', departments: departments} );
        console.log("Departments list renders successfully");
    })
}
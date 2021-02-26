var models = require('../models');

exports.type_create_get = function(req, res, next) {
    res.render('forms/type_form',{ title: 'Create Type'})
}
exports.type_create_post = function (req, res) {
    models.Type.create({
        name: req.body.name,
    }).then(function() {
        console.log("Type created successfully");
        res.redirect('/type');
       // check if there was an error during post creation
  }); 
}

exports.type_delete_get = function(req, res, next) {
    models.Type.destroy({
        where: {
            id: req.params.type_id
        }
    }).then(function() {
        res.redirect('/type')
    })
}

exports.type_delete_post = function(req, res, next) {
    console.log("1234")
    models.Type.destroy({
        where: {
            id: req.params.type_id
        }
    }).then(function() {
        res.redirect('/type')
    })
}


exports.type_update_get = function(req, res, next) {
    models.Type.findByPk(
            req.params.type_id
    ).then(function(type) {
           res.render('forms/type_form', { title: 'Update Type', type: type });
           console.log("Type update get successful");
      });
};


exports.type_update_post = function(req, res, next) {
    models.Type.update(
        {
            name: req.body.name,
        },
      {
            where:
            {
                id: req.params.type_id
            }
        }

     ).then(function() { 
            res.redirect("/type");  
      });
};

exports.type_detail = async function(req, res, next) {
    const employees = await models.Employee.findAll();
    models.Type.findByPk(
            req.params.type_id, {
                include: [
                  {
                    model: models.Expense
                  }
                        ]
                }
            ).then(function(type) {
    res.render('pages/type_detail', { title: 'Type Details', type: type, employees: employees} );
    console.log("Type details renders successfully");
    });
};

exports.type_list = async function(req, res, next) {
    const expenses = await models.Expense.findAll();
    models.Type.findAll({
        include: [
            {
                model: models.Expense,
                attributes: ['name', 'amount']
              },
        ]
    })
    .then(function(types) {
        console.log("rendering type list");
        res.render('pages/type_list', { title: 'Type List', types: types} );
        console.log("Types list renders successfully");
    })
}
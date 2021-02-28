var models = require('../models');

exports.category_create_get = function(req, res, next) {
    res.render('forms/category_form',{ title: 'Create Category'})
}
exports.category_create_post = function (req, res) {
    models.Category.create({
        name: req.body.name,
    }).then(function() {
        console.log("Category created successfully");
        res.redirect('/category');
       // check if there was an error during post creation
  }); 
}

exports.category_delete_get = function(req, res, next) {
    models.Category.destroy({
        where: {
            id: req.params.category_id
        }
    }).then(function() {
        res.redirect('/category')
    })
}

exports.category_delete_post = function(req, res, next) {
    models.Category.destroy({
        where: {
            id: req.params.category_id
        }
    }).then(function() {
        res.redirect('/category')
    })
}


exports.category_update_get = function(req, res, next) {
    models.Category.findByPk(
            req.params.category_id
    ).then(function(category) {
           res.render('forms/category_form', { title: 'Update Category', category: category });
           console.log("Category update get successful");
      });
};


exports.category_update_post = function(req, res, next) {
    models.Category.update(
        {
            name: req.body.name,
        },
      {
            where:
            {
                id: req.params.category_id
            }
        }

     ).then(function() { 
            res.redirect("/category");  
      });
};

exports.category_detail = async function(req, res, next) {
    const employees = await models.Employee.findAll();
    const types = await models.Type.findAll();
    const categories = await models.Category.findAll();
    models.Category.findByPk(
            req.params.category_id, {
                include: [
                  {
                    model: models.Expense,
                    as: 'expenses',
                    required: false,
                    attributes: ['id', 'name', 'details', 'amount', 'status', 'DepartmentId'],
                    through: {
                        // This block of code allows you to retrieve the properties of the join table PostCategories
                        model: models.ExpenseCategories,
                        as: 'expenseCategories',
                        attributes: ['expense_id', 'category_id'],
                    }
                  }
                        ]
                }
            ).then(function(category) {
    res.render('pages/category_detail', { title: 'Category Details', category: category, employees: employees } );
    console.log("Category details renders successfully");
    });
};

exports.category_list = async function(req, res, next) {
    const expenses = await models.Expense.findAll();
    models.Category.findAll({
        include: [
            {
              model: models.Expense,
              as: 'expenses',
              required: false,
              attributes: ['id', 'name', 'details', 'amount', 'status', 'DepartmentId'],
              through: {
                  // This block of code allows you to retrieve the properties of the join table PostCategories
                  model: models.ExpenseCategories,
                  as: 'expenseCategories',
                  attributes: ['expense_id', 'category_id'],
              }
            }
                  ]
    })
    .then(function(categories) {
        console.log("rendering category list");
        res.render('pages/category_list', { title: 'Category List', categories: categories} );
        console.log("Categories list renders successfully");
    })
}
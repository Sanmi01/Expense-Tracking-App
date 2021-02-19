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
    console.log("1234")
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

    models.Category.findByPk(
            req.params.category_id
            ).then(function(category) {
    res.render('pages/category_detail', { title: 'Category Details', category: category} );
    console.log("Category details renders successfully");
    });
};

exports.category_list = function(req, res, next) {
    models.Category.findAll()
    .then(function(categories) {
        console.log("rendering category list");
        res.render('pages/category_list', { title: 'Category List', categories: categories} );
        console.log("Categories list renders successfully");
    })
}
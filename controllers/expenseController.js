var models = require('../models');

exports.expense_create_get = function(req, res, next) {
    res.render('forms/expense_form',{ title: 'Create Expense'})
}
exports.expense_create_post = function (req, res) {
    models.Expense.create({
        name: req.body.name,
        details: req.body.details,
        amount: req.body.amount,
        type: req.body.type
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
    console.log("1234")
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
    models.Expense.update(
        {
            name: req.body.name,
        details: req.body.details,
        amount: req.body.amount,
        type: req.body.type
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

    models.Expense.findByPk(
            req.params.expense_id
            ).then(function(expense) {
    res.render('pages/expense_detail', { title: 'Expense Details', expense: expense} );
    console.log("Expense details renders successfully");
    });
};

exports.expense_list = function(req, res, next) {
    models.Expense.findAll()
    .then(function(expenses) {
        console.log("rendering expense list");
        res.render('pages/expense_list', { title: 'Expense List', expenses: expenses} );
        console.log("Expenses list renders successfully");
    })
}
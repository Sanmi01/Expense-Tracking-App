const express = require('express');
const path = require('path');
// const cookieParser = require('cookieParser');
const bodyParser = require('body-parser');
const ejsLayouts = require('express-ejs-layouts');
const debug = require('debug');

var models = require('./models');



const app = express();

app.use(express.static(path.join(__dirname, 'public')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.set('layout', 'layouts/main');
// app.use(ejsLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', async function(req, res, next) {

  // total sum of expenses
  let totalSum = await models.Expense.sum('amount');

  // five most recent expense
  let recents = await models.Expense.findAll({
    order: [
      ['time', 'DESC']
    ],
    include:[
      {
        model:models.Employee,
        attributes: ['id', 'first_name', 'last_name'],
        
      }
    ],
    limit:5
  });

  // top 5 most expensive expenses
  let expensiveExpenses = await models.Expense.findAll({
    order: [
      ['amount', 'DESC']
    ],
    include:[
      {
        model:models.Employee,
        attributes: ['id', 'first_name', 'last_name'],
        
      }
    ],
    limit:5
  });



  models.Employee.findAndCountAll()
  .then(function(employeesCount)
  {
    models.Expense.findAndCountAll()
    .then(function(expenseCount){
      models.Category.findAndCountAll()
      .then(function(categoryCount) {
        models.Type.findAndCountAll()
        .then(function(typeCount) {
          res.render('pages/index', {
            title: 'Homepage',
            employeesCount: employeesCount,
            expenseCount: expenseCount,
            categoryCount: categoryCount,
            typeCount: typeCount,
            totalSum: totalSum,
            recents: recents,
            expensiveExpenses: expensiveExpenses,
          });
        });
      });
    });
  });
});

// Employee routes
app.use('/employee', require('./routes/employee'))
app.use('/expense', require('./routes/expense'))
app.use('/category', require('./routes/category'))
app.use('/type', require('./routes/type'))



const PORT = process.env.PORT || 3000;

models.sequelize
.sync({ })
.then(result => {
  app.listen(PORT)
})
.catch(err => {
    /**
     * Listen on provided port, on all network interfaces.
     */
    // app.listen(PORT, function() {
    //   debug('Express server listening on port ' + app.address().PORT);console.log(err);
    //app.on('error', onError);
    //app.on('listening', onListening);
  });

// // app.listen(PORT, console.log(`Server started on port ${PORT}`))
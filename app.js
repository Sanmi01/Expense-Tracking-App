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


app.get('/', function(req, res, next) {
  models.Employee.findAndCountAll()
  .then(function(employeesCount){
    res.render('pages/index',{ title: 'Homepage', employeesCount:employeesCount})
  })
  })

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
    //   debug('Express server listening on port ' + app.address().PORT);
   console.log(err);
    //app.on('error', onError);
    //app.on('listening', onListening);
  });

// app.listen(PORT, console.log(`Server started on port ${PORT}`));
// const path = require('path');
const express = require('express');
const router = express.Router();
const  { check } = require('express-validator/check')
// const db = require('../config/config');
// const Employee = require('../models/employee')
// var models = require('../models');
const employeeController = require('../controllers/employeeController')
// router.get('/', (req, res) => 
//     models.Employee.findAll()
//     .then(employees => {
//         console.log(employees)
//         res.sendStatus(200)
//     })
//     .catch(err => console.log(err))
// )



router.get('/create', employeeController.employee_create_get)

router.post('/create', 
[
    check('first_name', 'First name must be valid and not less than 4 characters').exists().isLength({min: 4}),
    check('last_name', 'Last name must be valid and not less than 4 characters').exists().isLength({min: 4}),
    check('email', 'email is not valid').isEmail().normalizeEmail(),
    check('mobile_number', 'please input a valid mobile number').exists().isNumeric(),
  ]
, employeeController.employee_create_post)

router.get('/:employee_id/delete', employeeController.employee_delete_get)

router.post('/:employee_id/delete', employeeController.employee_delete_post)

router.get('/:employee_id/update', employeeController.employee_update_get)

router.post('/:employee_id/update', [
  check('first_name', 'First name must be valid and not less than 4 characters').exists().isLength({min: 4}),
  check('last_name', 'Last name must be valid and not less than 4 characters').exists().isLength({min: 4}),
  check('email', 'email is not valid').isEmail().normalizeEmail(),
  check('mobile_number', 'please input a valid mobile number').exists().isNumeric(),
]
, employeeController.employee_update_post)

router.get('/:employee_id', employeeController.employee_detail)

router.get('/', employeeController.employee_list)

router.get('/a', employeeController.index); 

module.exports = router;
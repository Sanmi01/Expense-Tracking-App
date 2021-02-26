const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expenseController');
const  { check } = require('express-validator/check')



router.get('/create', expenseController.expense_create_get)

router.post('/create', [
    check('name', 'Name must be valid and not less than 4 characters').exists().isLength({min: 4}),
    check('details', 'Details must be valid and not less than 10 characters').exists().isLength({min: 4}),
    check('amount', 'please enter an amount').exists().isNumeric(),
  ]
,expenseController.expense_create_post)

router.get('/:expense_id/delete', expenseController.expense_delete_get)

router.post('/:expense_id/delete', expenseController.expense_delete_post)

router.get('/:expense_id/update', expenseController.expense_update_get)

router.post('/:expense_id/update',[
    check('name', 'Name must be valid and not less than 4 characters').exists().isLength({min: 4}),
    check('details', 'Details must be valid and not less than 10 characters').exists().isLength({min: 4}),
    check('amount', 'please enter an amount').exists().isNumeric(),
  ]
, expenseController.expense_update_post)

router.post('/:expense_id/review', expenseController.expense_review_post)

router.get('/:expense_id', expenseController.expense_detail)

router.get('/', expenseController.expense_list)

module.exports = router;
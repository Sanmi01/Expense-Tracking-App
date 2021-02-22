const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expenseController');



router.get('/create', expenseController.expense_create_get)

router.post('/create', expenseController.expense_create_post)

router.get('/:expense_id/delete', expenseController.expense_delete_get)

router.post('/:expense_id/delete', expenseController.expense_delete_post)

router.get('/:expense_id/update', expenseController.expense_update_get)

router.post('/:expense_id/update', expenseController.expense_update_post)

router.post('/:expense_id/review', expenseController.expense_review_post)

router.get('/:expense_id', expenseController.expense_detail)

router.get('/', expenseController.expense_list)

module.exports = router;
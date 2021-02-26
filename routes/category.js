const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');



router.get('/create', categoryController.category_create_get)

router.post('/create', categoryController.category_create_post)

router.get('/:category_id/delete', categoryController.category_delete_get)

router.post('/:category_id/delete', categoryController.category_delete_post)

router.get('/:category_id/update', categoryController.category_update_get)

router.post('/:category_id/update', categoryController.category_update_post)

router.get('/:category_id', categoryController.category_detail)

router.get('/', categoryController.category_list)

module.exports = router;
const express = require('express');
const router = express.Router();

const departmentController = require('../controllers/departmentController');



router.get('/create', departmentController.department_create_get)

router.post('/create', departmentController.department_create_post)

router.get('/:department_id/delete', departmentController.department_delete_get)

router.post('/:department_id/delete', departmentController.department_delete_post)

router.get('/:department_id/update', departmentController.department_update_get)

router.post('/:department_id/update', departmentController.department_update_post)

router.get('/:department_id', departmentController.department_detail)

router.get('/', departmentController.department_list)

module.exports = router;
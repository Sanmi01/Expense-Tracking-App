const express = require('express');
const router = express.Router();

const typeController = require('../controllers/typeController');



router.get('/create', typeController.type_create_get)

router.post('/create', typeController.type_create_post)

router.get('/:type_id/delete', typeController.type_delete_get)

router.post('/:type_id/delete', typeController.type_delete_post)

router.get('/:type_id/update', typeController.type_update_get)

router.post('/:type_id/update', typeController.type_update_post)

router.get('/:type_id', typeController.type_detail)

router.get('/', typeController.type_list)

module.exports = router;
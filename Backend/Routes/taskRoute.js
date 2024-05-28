const { createTask, deletedTask, updateTask, getAllTask, completTask } = require('../Controller/taskController');
const { getAndProtectUser } = require('../Controller/userController');

const router = require('express').Router();

router.post('/createTask',getAndProtectUser, createTask);

router.delete('/deleteTask', getAndProtectUser, deletedTask);

router.put('/updateTask', getAndProtectUser, updateTask);

router.get('/getallTask', getAndProtectUser, getAllTask);

router.post('/completed', getAndProtectUser, completTask);

module.exports = router;
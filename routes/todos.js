var express = require('express');
var router = express.Router();
var db = require('../models');
 
var helpers = require('../helpers/todos');

//get/post routes
router.route('/')
.get(helpers.getTodos)
.post(helpers.createTodo);

//retreive a todo
router.get('/:todoId', helpers.getTodo);

//update a todo
router.put('/:todoId', helpers.updateTodo);

//delete a todo
router.delete('/:todoId', helpers.deleteTodo);

module.exports = router;
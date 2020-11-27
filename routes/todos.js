var express = require('express');
var router = express.Router();
var db = require('../models');
 
// console.log(db);

//get route
router.get('/', function(req, res){
    db.Todo.find()
        .then(function(todos){
            res.send(todos);
            // res.json(todos);
        })
        .catch(function(err){
            res.send(err);
        });
    // res.send("hello");
});

//post route
router.post('/', function(req, res){
    //db needs to create a new todo based on req
    console.log(req.body);
    db.Todo.create(req.body)
    .then(function(newTodo){
        console.log(newTodo);
        res.send(newTodo);
    });
});

//retreive a todo
router.get('/:todoId', function(req, res){
    console.log(req.params.todoId);
    db.Todo.findById(req.params.todoId)
    .then(function(foundTodo){
        res.json(foundTodo);
    })
    .catch(function(err){
        res.send(err);
    });
});

//update a todo
router.put('/:todoId', function(req, res){
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(function(todo){
        console.log(`todo: `, todo);
        res.json(todo);
    })
    .catch(function(err){
        res.send(err);
    });
});

//delete a todo
router.delete('/:todoId', function(req, res){
    db.Todo.deleteOne({_id: req.params.todoId})
    .then(function(deletedTodo){
        console.log("deleted: ", deletedTodo);
        res.json({message: 'You\'ve deleted your todo!});
    })
    .catch(function(err){
        res.send(err);
    });
});

module.exports = router;
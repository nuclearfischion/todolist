var db = require('../models');

exports.getTodos = function (req, res){
    db.Todo.find()
        .then(function(todos){
            res.send(todos);
            // res.json(todos);
        })
        .catch(function(err){
            res.send(err);
        });
}

exports.createTodo = function(req, res){
    console.log(req.body);
    db.Todo.create(req.body)
    .then(function(newTodo){
        console.log(newTodo);
        res.send(newTodo);
    });
}

exports.getTodo = function(req, res){
    console.log(req.params.todoId);
    db.Todo.findById(req.params.todoId)
    .then(function(foundTodo){
        res.json(foundTodo);
    })
    .catch(function(err){
        res.send(err);
    });
}

exports.updateTodo = function(req, res){
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(function(todo){
        console.log(`todo: `, todo);
        res.json(todo);
    })
    .catch(function(err){
        res.send(err);
    });
}

exports.deleteTodo = function(req, res){
    db.Todo.deleteOne({_id: req.params.todoId})
    .then(function(deletedTodo){
        console.log("deleted: ", deletedTodo);
        res.json({message: 'You\'ve deleted your todo!'});
    })
    .catch(function(err){
        res.send(err);
    });
}

module.exports = exports;
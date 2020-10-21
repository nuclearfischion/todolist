//*******connect to mongodb********/
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("database connected!");
});
//***************/

mongoose.Promise = Promise;

//requiring todo.js file and exporting it out
module.exports.Todo = require("./todo");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoElementSchema = new Schema({
    task: String,
    isDone: Boolean
})

const TodoListSchema  = new Schema({
    name: String,
    todoElements: [TodoElementSchema]
})

const TodoList = mongoose.model("todolist", TodoListSchema);

module.exports = TodoList;
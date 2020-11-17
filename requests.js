const express = require("express");
const router = express.Router();
const TodoList = require("./lists");

router.get('/', (request, response)=>{
    TodoList.find({}).then(list => {response.send(list)});
});

router.get('/:id', (request, response)=>{
    TodoList.findOne({_id:request.params.id}).then(list => response.send(list));
});

router.put('/:id', (request, response)=>{
    TodoList.findByIdAndUpdate({_id:request.params.id}, request.body)
        .then(()=>TodoList.findOne({_id: request.params.id}).then(list=>response.send(list)));
});

router.post('/', (request, response)=>{
    TodoList.create(request.body).then(list => {TodoList.find({}).then(list => {response.send(list)})});
});

router.delete('/:id', (request, response)=>{
    TodoList.deleteOne({_id:request.params.id}).then(res=>{TodoList.find({}).then(list => {response.send(list)})})
});

module.exports = router;
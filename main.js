const express = require ('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const app = express();
mongoose.connect("mongodb://localhost/todo-db");

app.use(bodyParser.json());
app.use("/todo", require("./requests"));
app.listen(4000, ()=>{
    console.log("Server is listening you");
})
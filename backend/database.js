const mongoose=require('mongoose');
const { boolean } = require('zod');

mongoose.connect('mongodb+srv://chauhanprakhar536:Prakhar123@cluster0.9trdevz.mongodb.net/todos')
const todoschema=mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
})
const todo=mongoose.model('todo',todoschema);
module.exports={
    todo
}
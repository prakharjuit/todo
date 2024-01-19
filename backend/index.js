const express=require('express');
const { createtodo, updatetodo } = require('./types');
const { todo } = require('./database');
const cors=require('cors');
const app= express()
app.use(express.json());
app.use(cors());
app.get('/todos',async function(req,res)
{
    const todos=await todo.find({})
    res.json({todos})

})
app.post('/todo',async function(req,res)
{
    const createpayload=req.body;
    const parsedpayload=createtodo.safeParse(createpayload);
    if(!parsedpayload)
    {
        res.status(411).json({
            msg:"you entered wrong inputs"
        })
        return;
    }
    await todo.create({
        title:createpayload.title,
        description:createpayload.description,
        completed:false

    })
    res.json({
        msg:"todo created"
    })

})
app.put('/completed', function(req, res) {
    const updatepayload = req.body;
    const parsedpayload = updatetodo.safeParse(updatepayload);
    
    if (!parsedpayload) {
        return res.status(411).json({
            msg: "wrong input"
        });
    }

    todo.findByIdAndUpdate(
        req.body.id,
        { completed: true },
        { new: true }
    )
    .then(updatedTodo => {
        if (!updatedTodo) {
            return res.status(404).json({
                msg: "Todo not found"
            });
        }

        return res.json({
            msg: "Marked as complete successfully",
            updatedTodo
        });
    })
    .catch(error => {
        console.error(error);
        return res.status(500).json({
            msg: "Internal server error"
        });
    });
});



app.listen(3000)

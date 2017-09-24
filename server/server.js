const express = require('express');
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
  var newTodo = new Todo({
    text: req.body.text
  });

  newTodo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  })
})


app.get('/todos',(req,res)=>{
  Todo.find({},(err,todos)=>{
    console.log(todos)
    if(todos){
      res.send({todos});
    }else{
      console.log('undefined')
    }
  })
})

app.get('/todos/:id',(req,res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(400).send()
  }
  Todo.findById(id,(err,todo)=>{
    if(todo){
        res.send(todo)
    }else if(!todo){
      res.status(404).send("The user no found")
    }
    else if(err){
       res.status(400).send()
    }
  })
})

app.delete('/todos/:id',(req,res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

    Todo.findByIdAndRemove(id,(err,todo)=>{
      if(todo){
        return res.send(todo)
      }else{
        return res.status(404).send()
      }
      if(err){
        res.status(400).send();
      }
    })
})

app.listen(3000,()=>{
  console.log('Listening on port 3000')
})

module.exports = {app}

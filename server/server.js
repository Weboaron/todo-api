require('./config/config')

const _=require('lodash')
const express = require('express');
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')

const port = process.env.PORT;
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

app.patch('/todos/:id',(req,res)=>{
  var id = req.params.id;
  var body = _.pick(req.body,['text','completed'])

  if(!ObjectID.isValid(id)){
    return res.send(404).send();
  }

  if(_.isBoolean(body.completed)&& body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id,{$set:body},{new: true},(err,todo)=>{
    if(!todo) {
      return res.status(404).send();
    }
    if(err){
      return res.status(400).send();
    }
    res.send(todo);
  })
})

app.post('/users',(req,res)=>{
  var body = _.pick(req.body,['email','password'])
  var user = new User(body)
  user.save().then(()=>{
    return user.generateAuthToken();
  }).then((token)=>{
    res.header('x-auth',token).send(user)
}).catch((e)=>{
    res.status(400).send(e)
  })
})

app.listen(port,()=>{
  console.log(`Listening on port ${port}`)
})

module.exports = {app}

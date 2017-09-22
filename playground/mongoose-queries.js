const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


var id ='59c40d62db65210ee0f7b064'

User.findById(id,(err,doc)=>{
  if(doc){
    console.log(JSON.stringify(doc,undefined,2))
  }else{
    console.log('Unable to find the user')
  }
  if(err){
    console.log(err)
  }
})

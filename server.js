const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo',{
  text:{type:String}
,
completed:{
  type:Boolean
},
completedAt:{
  type:Number
}
});

var User = mongoose.model('User',{
  email:{
    type:String,
    require:true,
  trim:true,
  minlength:1
  }
})

var newUser = new User({
  email:"  Ofir@gmail.com  "
});

newUser.save((err,res)=>{
  if(err){
    console.log(err)
  }else{
    console.log(res)
  }
})

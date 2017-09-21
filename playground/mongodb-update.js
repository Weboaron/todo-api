//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log("There is a error",err)
  }
  console.log('Connected to MongoDB server');

    db.collection('Users').findOneAndUpdate({
      _id:new ObjectID("59c3f8ef7849313c5e9da43e")
    },{
      $set:{
        name:"Adir Boaron"
      },
      $inc:{
        age: 1
      }
    },{
      returnOriginal:false
    }).then((res)=>{
        console.log(res)
    })
  db.close();
})

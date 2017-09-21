//const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log("There is a error",err)
  }
  console.log('Connected to MongoDB server');

db.collection('Users').find({name:"Ofir Boaron"}).toArray((err,result)=>{
  console.log(result)
  var obj = new ObjectID(result[0]._id)
  console.log(obj)

  })

  db.collection('Users').findOneAndDelete({_id:new ObjectID("59c3132475f1e31054659afb")},(err,result)=>{
   console.log(JSON.stringify(result,undefined,2));
  })
  db.close();
})

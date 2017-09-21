//const MongoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log("There is a error",err)
  }
  console.log('Connected to MongoDB server');

  db.collection('Users').insertOne({
    name:"Elad Boaron",
    age:26,
    location:"Tel-aviv"
  },(err,result)=>{
    if(err){
    return  console.log("There is a error",err);
    }
    console.log(JSON.stringify(result.ops,undefined,2))
  })

  db.close();
})

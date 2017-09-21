//const MongoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log("There is a error",err)
  }
  console.log('Connected to MongoDB server');

db.collection('Users').find({name:"Elad Boaron"}).toArray().then((docs)=>{
      console.log(JSON.stringify(docs,undefined,2))
  })


  db.close();
})

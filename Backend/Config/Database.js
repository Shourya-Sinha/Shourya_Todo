const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

 function databaseConnect() {
     mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log('Connected to MongoDb Database');
    }).catch((err)=>{
        console.log('Error in Connecting to DataBase',err);
    });
}

module.exports = databaseConnect;



const mongoose =require("mongoose");
require('dotenv').config();

const connectToDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_DB_URL)
        console.log(`Mongodb connected: ${conn.connection.host}`)
    }
    catch(error){
        console.log("Error in Connection: ",error);
    }
}

module.exports  =connectToDB;
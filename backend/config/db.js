const mongoose = require('mongoose');
require('dotenv').config()

const connectdb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('mongodb connecté avec succes')
    }catch(err){
         console.error('erreur lors de la connexion de mongodb:',err.message)
    }
}

module.exports = connectdb;
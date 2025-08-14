const mongoose = require('mongoose')

const projetModele = mongoose.Schema({
    nom : {type : String ,
        required : true,
        trim : true},
    description : {type : String ,
    }, 
    
},
{ 
     timestamps : true,    
})

module.exports = mongoose.model('Projet',projetModele)
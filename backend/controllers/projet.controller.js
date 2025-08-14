const Projet = require('../models/projetModel')

//ajouter un projet
const creation = (async (req,res)=>{
    const {nom,description,timestamps} = req.body;
    try{
        const projet = new Projet({nom, description ,timestamps})
     await projet.save();
    res.status(201).json({message:'projet creer avec succes'})
    }catch(err){
        console.log(err)
        res.status(500).json({message:'erreur lors de la creation du projet',err})
    
    }
})

//afficher les projets

const afficherTous= (async (req,res)=>{
    try{
      const projet = await Projet.find();
      res.status(200).json(projet);
    }catch(err){
        console.error('error lors de l\'afficahge du projet ', err.message)
        res.status(500).json({message:'error lors de l\'afficahge du projet ',err})
    }
}
)
//afficher un projet par son id
const afficherparID =(async (req,res)=>{
    const userId = req.params.id
    try{
      const projet = await Projet.findById(userId);
      res.status(200).json(projet);
    }catch(err){
        console.error("error lors l'affichage du projet ", err.message)
        res.status(500).json({message:'error lors l\'affichage du projet',err})
    }
}
)

//modiffier un projet
const modifier=(async (req,res)=>{
    const userId = req.params.id
    const {nom,email,description,timestamps} = req.body;

    try{
      const projet = await Projet.findByIdAndUpdate(userId,
        {nom,description,timestamps},
        {new:true}
      );

      res.status(200).json(projet);
    }catch(err){
        console.error('error lors de la modification du projet ', err.message)
        res.status(500).json({message:'erreur lors de la modification du projet',err})
    }
}
)

//supprimé projet
const supprimer = (async (req,res)=>{
    const userId = req.params.id
  try{

     await Projet.findByIdAndDelete(userId);

      res.status(200).json({message : "projet supprimer avec succes"});
    }catch(err){
        console.error('error lors de la suppression du projet ', err.message)
        res.status(500).json({message:'erreur lors de la suppression du projet',err})
    }
}
)


module.exports = {
    creation,
    afficherTous,
    afficherparID,
    modifier,
    supprimer


} ;
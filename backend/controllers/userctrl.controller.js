
const User = require('../models/userModel')

//ajouter un utilisateurs
const creation =(async (req,res)=>{
    const {nom,email,motDePasse,role,timestamps} = req.body;
    try{
        const user = new User({nom, email , motDePasse, role,timestamps})
     await user.save();
    res.status(201).json({message:'utilisateur creer avec succes'})
    }catch(err){
        console.log(err)
        res.status(500).json({message:'erreur lors de la creation de le l\'utilisateur',err})
    
    }
})

// //afficher les utilisateurs

// const afficherTous =(async (req,res)=>{
//     try{
//       const users = await User.find();
//       res.status(200).json(users);
//     }catch(err){
//         console.error('error lors de l\'affichage des utilisateur ', err.message)
//         res.status(500).json({message:'erreur lors de l\'affichage des utilisateur',err})
//     }
// }
// )
// //afficher un utilisateurs par son id
// const afficherById=(async (req,res)=>{
//     const userId = req.params.id
//     try{
//       const users = await User.findById(userId);
//       res.status(200).json(users);
//     }catch(err){
//         console.error('error lors de l\'affichage des utilisateur ', err.message)
//         res.status(500).json({message:'erreur lors de l\'affichage des utilisateur',err})
//     }
// }
// )

// // controllers/userController.js
// const User = require('../models/userModel');

// Afficher tous les utilisateurs avec pagination
const afficherTous = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const users = await User.find()
            .skip(skip)
            .limit(limit);

        const total = await User.countDocuments();

        res.status(200).json({
            total,
            page,
            totalPages: Math.ceil(total / limit),
            limit,
            data: users
        });
    } catch (err) {
        console.error('Erreur lors de l\'affichage des utilisateurs:', err.message);
        res.status(500).json({ message: 'Erreur lors de l\'affichage des utilisateurs', erreur: err.message });
    }
};

// Afficher un utilisateur par ID
const afficherById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error('Erreur lors de l\'affichage d\'un utilisateur:', err.message);
        res.status(500).json({ message: 'Erreur lors de l\'affichage d\'un utilisateur', erreur: err.message });
    }
};




//modiffier un utilisateur
const modifier = (async (req,res)=>{
    const userId = req.params.id
    const updateInfos = Object.keys(req.body) ;

    try{
      const user = await User.findById(userId);
     if(!user) return res.json({message: "utilisateur n'existe pas "})

      updateInfos.forEach(update => user[update] = req.body[update]);
      
    //   const users = await User.find(); 
     
     
    await user.save();
     res.status(200).json(user);
    }catch(err){
        console.error('error lors de la modification de utilisateur ', err.message)
        res.status(500).json({message:'erreur lors de la modification de utilisateur',err})
    }
}
)

//supprimé un utilisateur
const supprimer =(async (req,res)=>{
    const userId = req.params.id
  try{
    //   const users =
     await User.findByIdAndDelete(userId);

      res.status(200).json({message : "utilisateur supprimer avec succes"});
    }catch(err){
        console.error('error lors de la suppression de utilisateur ', err.message)
        res.status(500).json({message:'erreur lors de la suppression de utilisateur',err})
    }
}
)


module.exports ={
    creation,
    afficherTous,
    afficherById,
    modifier,
    supprimer

};
const mongoose = require('mongoose')
const express = require('express')
const {proteger} = require('../middlewares/authmiddlewares')
const {autoriserRoles} = require('../middlewares/roleMiddlewares')
const { projetSchema } = require('../validator/projet validator');
const validationMiddleware  = require('../middlewares/validationMiddlewares');
const router = express.Router();
const {creation,
    afficherTous,
    afficherparID,
    modifier,
    supprimer} = require('../controllers/projet.controller')


//ajouter un utilisateurs
router.post('/projet',validationMiddleware(projetSchema),proteger,autoriserRoles('Administrateur'),creation)
//afficher les utilisateurs
router.get('/projet',/*proteger,autoriserRoles('Administrateur'),*/afficherTous)
//afficher un utilisateurs par son id
router.get('/projet/:id',/*proteger,autoriserRoles('Administrateur'),*/afficherparID)
//modiffier un utilisateur
router.put('/projet/:id',proteger,autoriserRoles('Administrateur'),modifier)
//supprimé un utilisateur
router.delete('/projet/:id',proteger,autoriserRoles('Administrateur'),supprimer)


module.exports = router;
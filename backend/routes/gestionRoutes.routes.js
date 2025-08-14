const mongoose = require('mongoose')
const express = require('express')
const {proteger} = require('../middlewares/authmiddlewares')
const {autoriserRoles} = require('../middlewares/roleMiddlewares')
const { tacheSchema } = require('../validator/tacheValidator');
const validationMiddleware  = require('../middlewares/validationMiddlewares');
const routeur = express.Router();
const { creation,afficherTous, afficherparID, modifier, supprimer } = require('../controllers/tachesctrl.controller')


//ajouter un utilisateurs
routeur.post('/Tache',validationMiddleware(tacheSchema),proteger,autoriserRoles('Administrateur','Utilisateur'),creation)
//afficher les utilisateurs
routeur.get('/Tache',/*proteger,autoriserRoles('Administrateur','Utilisateur'),*/afficherTous)
//afficher un utilisateurs par son id
routeur.get('/Tache/:id',/*proteger,autoriserRoles('Administrateur','Utilisateur'),*/afficherparID)
//modiffier un utilisateur
routeur.put('/Tache/:id',proteger,autoriserRoles('Administrateur','Utilisateur'),modifier)
//supprimé un utilisateur
routeur.delete('/Tache/:id',proteger,autoriserRoles('Administrateur','Utilisateur'),supprimer)


module.exports = routeur;
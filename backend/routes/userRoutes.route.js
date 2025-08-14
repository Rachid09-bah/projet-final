const mongoose = require('mongoose')
const express = require('express')
const {proteger} = require('../middlewares/authmiddlewares')
const {autoriserRoles} = require('../middlewares/roleMiddlewares')
const { userSchema } = require('../validator/userValidator');
const validationMiddleware  = require('../middlewares/validationMiddlewares');
const router = express.Router();
const {creation,
    afficherTous,
    afficherById,
    modifier,
    supprimer} = require('../controllers/userctrl.controller')


//ajouter un utilisateurs
router.post('/user',validationMiddleware(userSchema) ,proteger, autoriserRoles("Administrateur"), creation)
//afficher les utilisateurs
router.get('/user' ,/*proteger, autoriserRoles("Administrateur"),*/ afficherTous)
//afficher un utilisateurs par son id
router.get('/user/:id' ,/*proteger, autoriserRoles("Administrateur"),*/ afficherById)
//modiffier un utilisateur
router.put('/user/:id',proteger, autoriserRoles("Administrateur"), modifier)
//supprimé un utilisateur
router.delete('/user/:id',proteger, autoriserRoles("Administrateur"),supprimer)


module.exports = router;
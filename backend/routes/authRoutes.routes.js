const express = require('express');
const { inscription, connexion, deconnexion } = require('../controllers/connexion.controller');
const { proteger } = require('../middlewares/authmiddlewares');
const { inscriptionSchema, connexionSchema } = require('../validator/authValidator');
const validationMiddleware = require('../middlewares/validationMiddlewares');
const router = express.Router();

router.post('/inscription', validationMiddleware(inscriptionSchema), inscription);
router.post('/connexion', validationMiddleware(connexionSchema), connexion);
router.post('/deconnexion', proteger, deconnexion);

module.exports = router;

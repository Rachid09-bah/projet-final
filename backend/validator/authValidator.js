const Joi = require('joi');

// Validation pour l'inscription
const inscriptionSchema = Joi.object({
    nom: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.empty': 'Le nom est obligatoire',
            'string.min': 'Le nom doit contenir au moins 3 caractères',
            'string.max': 'Le nom ne peut pas dépasser 50 caractères',
            'any.required': 'Le nom est obligatoire'
        }),
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': "L'email est obligatoire",
            'string.email': "L'email doit être valide",
            'any.required': "L'email est obligatoire"
        }),
    motDePasse: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.empty': 'Le mot de passe est obligatoire',
            'string.min': 'Le mot de passe doit contenir au moins 6 caractères',
            'any.required': 'Le mot de passe est obligatoire'
        }),
    role: Joi.string()
        .valid('Utilisateur', 'Administrateur')
        .default('Utilisateur')
        .messages({
            'any.only': 'Le rôle doit être "Utilisateur" ou "Administrateur"',
        })
});

// Validation pour la connexion
const connexionSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': "L'email est obligatoire",
            'string.email': "L'email doit être valide",
            'any.required': "L'email est obligatoire"
        }),
    motDePasse: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.empty': 'Le mot de passe est obligatoire',
            'string.min': 'Le mot de passe doit contenir au moins 6 caractères',
            'any.required': 'Le mot de passe est obligatoire'
        })
});

module.exports = { inscriptionSchema, connexionSchema };

const Joi = require('joi');

const projetSchema = Joi.object({
    nom: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Le nom du projet est obligatoire',
            'string.min': 'Le nom du projet doit contenir au moins 3 caractères',
            'string.max': 'Le nom du projet ne peut pas dépasser 100 caractères',
            'any.required': 'Le nom du projet est obligatoire'
        }),
    description: Joi.string()
        .min(5)
        .max(500)
        .required()
        .messages({
            'string.empty': 'La description du projet est obligatoire',
            'string.min': 'La description doit contenir au moins 5 caractères',
            'string.max': 'La description ne peut pas dépasser 500 caractères',
            'any.required': 'La description du projet est obligatoire'
        }),
});

module.exports = { projetSchema };

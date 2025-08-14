const Joi = require('joi');

const tacheSchema = Joi.object({
    nom: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Le nom de la tâche est obligatoire',
            'string.min': 'Le nom de la tâche doit contenir au moins 3 caractères',
            'string.max': 'Le nom de la tâche ne peut pas dépasser 100 caractères',
            'any.required': 'Le nom de la tâche est obligatoire'
        }),
    details: Joi.string()
        .min(5)
        .max(500)
        .required()
        .messages({
            'string.empty': 'Les détails de la tâche sont obligatoires',
            'string.min': 'Les détails doivent contenir au moins 5 caractères',
            'string.max': 'Les détails ne peuvent pas dépasser 500 caractères',
            'any.required': 'Les détails de la tâche sont obligatoires'
        }),
    statut: Joi.string()
        .valid('A faire', 'En cours', 'Terminée')
        .required()
        .messages({
            'any.only': 'Le statut doit être "A faire", "En cours" ou "Terminée"',
            'any.required': 'Le statut est obligatoire'
        }),
    priorite: Joi.string()
        .valid('Basse', 'Moyenne', 'Haute')
        .required()
        .messages({
            'any.only': 'La priorité doit être "Basse", "Moyenne" ou "Haute"',
            'any.required': 'La priorité est obligatoire'
        }),
    dateLimite: Joi.date()
        .required()
        .messages({
            'date.base': 'La date limite doit être une date valide',
            'any.required': 'La date limite est obligatoire'
        }),
    assigneeA: Joi.string()
        .required()
        .messages({
            'string.empty': "L'utilisateur assigné est obligatoire",
            'any.required': "L'utilisateur assigné est obligatoire"
        }),
    creePar: Joi.string()
        .required()
        .messages({
            'string.empty': "Le créateur de la tâche est obligatoire",
            'any.required': "Le créateur de la tâche est obligatoire"
        }),
    projet: Joi.string()
        .required()
        .messages({
            'string.empty': "Le projet est obligatoire",
            'any.required': "Le projet est obligatoire"
        })
});

module.exports = { tacheSchema };


const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userModel = mongoose.Schema({
    nom: {
        type: String,
        required: [true, "Le nom est obligatoire"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "L'email est obligatoire"],
        unique: true,
        lowercase: true,
        trim: true
    },
    motDePasse: {
        type: String,
        required: [true, "Le mot de passe est obligatoire"],
        minlength: 6
    },
    role: {
        type: String,
        enum: ["Utilisateur", "Administrateur"],
        default: "Utilisateur"
    }
}, {
    timestamps: true // Ajoute automatiquement les champs createdAt et updatedAt
})

// Hash du mot de passe avant sauvegarde
userModel.pre('save', async function (next) {
    if (this.isModified('motDePasse')) {
        this.motDePasse = await bcrypt.hash(this.motDePasse, 10);
    }
    next();
});


module.exports = mongoose.model('User', userModel)
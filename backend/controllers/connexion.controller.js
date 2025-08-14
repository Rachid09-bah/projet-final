const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Générer un token JWT
const genererToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
};

// Inscription
exports.inscription = async (req, res) => {
    try {
        const { nom, email, motDePasse , role } = req.body;

        // Vérifier si l'email existe déjà
        const userExiste = await User.findOne({ email });
        if (userExiste) {
            return res.status(400).json({ message: "Cet email est déjà utilisé" });
        }

        // Créer l'utilisateur
        const nouvelUtilisateur = await User.create({ nom, email, motDePasse,role });

        // Générer le token
        // const token = genererToken(nouvelUtilisateur);

        res.status(201).json({
            message: "Utilisateur inscrit avec succès",
            // token,
            user: {
                id: nouvelUtilisateur._id,
                nom: nouvelUtilisateur.nom,
                email: nouvelUtilisateur.email,
                role: nouvelUtilisateur.role
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de l'inscription", error: err.message });
    }
};

// Connexion
exports.connexion = async (req, res) => {
    try {
        const { email, motDePasse } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email ou mot de passe invalide" });
        }

        // Vérifier le mot de passe
        const estValide = await bcrypt.compare(motDePasse, user.motDePasse);
        if (!estValide) {
            return res.status(400).json({ message: "Email ou mot de passe invalide" });
        }

        // Générer le token
        const token = genererToken(user);

        res.status(200).json({
            message: "Connexion réussie",
            token,
            user: {
                id: user._id,
                nom: user.nom,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la connexion", error: err.message });
    }
};

// Déconnexion (coté client)
exports.deconnexion = async (req, res) => {
    res.status(200).json({ message: "Déconnecté avec succès (supprimez le token côté client)" });
};

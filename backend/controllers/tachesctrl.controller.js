const gestion = require('../models/gestionModel');
const User = require('../models/userModel');
const Projet = require('../models/projetModel');

// Création d'une tâche
const creation = async (req, res) => {
    const { nom, details, statut, priorite, dateLimite, assigneeA, creePar, projet } = req.body;

    try {
        // Vérifier que l'utilisateur assigné existe
        const utilisateur = await User.findById(assigneeA);
        if (!utilisateur) return res.status(404).json({ message: "L'utilisateur assigné n'existe pas" });

        // Vérifier que le projet existe
        const projetExiste = await Projet.findById(projet);
        if (!projetExiste) return res.status(404).json({ message: "Le projet spécifié n'existe pas" });

        const Tache = new gestion({ nom, details, statut, priorite, dateLimite, assigneeA, creePar, projet });
        await Tache.save();

        res.status(201).json({ message: 'Tâche créée avec succès', Tache });
    } catch (err) {
        console.error('Erreur création tâche:', err);
        res.status(500).json({ message: 'Erreur lors de la création de la tâche', err });
    }
};

// Afficher toutes les tâches avec pagination
const afficherTous = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const Taches = await gestion.find()
            .populate('assigneeA', 'nom email') // On peut limiter les champs
            .populate('creePar', 'nom email')
            .populate('projet', 'nom description')
            .skip(skip)
            .limit(limit);

        const total = await gestion.countDocuments();

        res.status(200).json({
            total,
            page,
            totalPages: Math.ceil(total / limit),
            limit,
            data: Taches
        });

    } catch (err) {
        console.error('Erreur affichage tâches:', err);
        res.status(500).json({
            message: 'Erreur lors de l\'affichage des tâches',
            error: err.message,   // Texte clair
            stack: err.stack      // Détails utiles pour debug
        });
    }
};



// Afficher une tâche par ID
const afficherparID = async (req, res) => {
    const taskId = req.params.id;
    try {
        const Tache = await gestion.findById(taskId).populate('assigneeA creePar projet');
        if (!Tache) return res.status(404).json({ message: "Tâche non trouvée" });

        res.status(200).json(Tache);
    } catch (err) {
        console.error('Erreur affichage tâche:', err);
        res.status(500).json({ message: 'Erreur lors de l\'affichage de la tâche', err });
    }
};

// Modifier une tâche
const modifier = async (req, res) => {
    const taskId = req.params.id;
    const updateInfos = Object.keys(req.body);

    try {
        const Tache = await gestion.findById(taskId);
        if (!Tache) return res.status(404).json({ message: "Tâche non trouvée" });

        updateInfos.forEach(update => Tache[update] = req.body[update]);
        await Tache.save();

        res.status(200).json({ message: 'Tâche modifiée avec succès', Tache });
    } catch (err) {
        console.error('Erreur modification tâche:', err);
        res.status(500).json({ message: 'Erreur lors de la modification de la tâche', err });
    }
};

// Supprimer une tâche
const supprimer = async (req, res) => {
    const taskId = req.params.id;

    try {
        const Tache = await gestion.findByIdAndDelete(taskId);
        if (!Tache) return res.status(404).json({ message: "Tâche non trouvée" });

        res.status(200).json({ message: "Tâche supprimée avec succès" });
    } catch (err) {
        console.error('Erreur suppression tâche:', err);
        res.status(500).json({ message: 'Erreur lors de la suppression de la tâche', err });
    }
};

module.exports = {
    creation,
    afficherTous,
    afficherparID,
    modifier,
    supprimer
};

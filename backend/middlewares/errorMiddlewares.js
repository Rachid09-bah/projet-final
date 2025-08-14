// Middleware pour gérer les erreurs
const gestionnaireErreur = (err, req, res, next) => {
    console.error("💥 Erreur attrapée :", err.message);

    // Statut par défaut
    let statusCode = err.statusCode || 500;
    let message = err.message || "Erreur interne du serveur";

    // Gestion des erreurs Mongoose (validation, cast, etc.)
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors).map(val => val.message).join(", ");
    }

    if (err.name === "CastError") {
        statusCode = 400;
        message = `Ressource non trouvée avec l'id : ${err.value}`;
    }

    if (err.code && err.code === 11000) { // doublon unique
        statusCode = 400;
        message = `Valeur dupliquée : ${JSON.stringify(err.keyValue)}`;
    }

    res.status(statusCode).json({
        success: false,
        message
    });
};

module.exports = gestionnaireErreur;

exports.autoriserRoles = (...rolesAutorises) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Utilisateur non authentifié" });
        }

        if (!rolesAutorises.includes(req.user.role)) {
            return res.status(403).json({ message: "Accès refusé" });
        }

        next();
    };
};

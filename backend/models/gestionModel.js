// models/tacheModel.js
const mongoose = require('mongoose');

const tacheSchema = new mongoose.Schema({
  nom: { // title
    type: String,
    required: [true, "Le nom de la tâche est obligatoire"],
    trim: true
  },
  details: { // description
    type: String,
    trim: true
  },
  statut: { // status
    type: String,
    enum: ["A faire", "En cours", "Terminée"],
    default: "A faire"
  },
  priorite: { // priority
    type: String,
    enum: ["Basse", "Moyenne", "Haute"],
    default: "Moyenne"
  },
  dateLimite: { // dueDate
    type: Date
  },
  assigneeA: { // assignedTo
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Modèle User
    required: true
  },
  creePar: { // createdBy
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Modèle User
    required: true
  },
  projet: { // project
    type: mongoose.Schema.Types.ObjectId,
    ref: "Projet"
  }
}, {
  timestamps: true // Ajoute automatiquement creeLe et modifieLe
});

module.exports = mongoose.model("Tache", tacheSchema);

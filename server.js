const express = require('express');
const connectDB = require('./backend/config/db')
const UserRoute = require('./backend/routes/userRoutes.route')
const ProjetRoute = require('./backend/routes/projetRoutes.route')
const TacheRoute = require('./backend/routes/gestionRoutes.routes')
const authRoute = require('./backend/routes/authRoutes.routes')
const gestionnaireErreur = require('./backend/middlewares/errorMiddlewares');
const cors = require('cors');

const helmet = require('helmet');

const PORT = process.env.PORT || 3001


require('dotenv').config();



const app = express();
//connexion a la base de donnée
connectDB();

// Configuration basique : autoriser toutes les origines
app.use(cors());

// OU configuration plus précise
// app.use(cors({
//   origin: 'http://localhost:3000', // ton frontend
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

app.get('/', (req, res) => {
  res.send('CORS activé 🚀');
});

app.use(express.json());
app.use(helmet());

//Toutes les routes 
app.use('/api', ProjetRoute)
app.use('/api', TacheRoute)
app.use('/api', UserRoute)
app.use('/api/auth',authRoute );


// Middleware de gestion d'erreurs
app.use(gestionnaireErreur);  


app.listen(PORT, ()=>{
console.log(`le serveur est lancé sur le port ${PORT}`)
})
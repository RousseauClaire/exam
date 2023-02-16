const express = require('express');
const mongoose = require('mongoose');
const personnageRoutes = require('./routes/personnage');
const adminRoutes = require('./routes/admin');
const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');


const app = express();

mongoose.connect('mongodb+srv://claire:Svv0AfA0CD2B3meQ@cluster0.yzbttea.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.use('/api/personnage', personnageRoutes);
app.use('/api/admin', adminRoutes);

// Document Swagger
app.use('/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

module.exports = app;

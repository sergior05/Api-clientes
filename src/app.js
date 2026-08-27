const express = require('express');
const cors = require('cors'); // 1. Importa el paquete cors
const clienteRoutes = require('./routes/clienteRoutes');

const app = express();

app.use(cors()); // 2. Actívalo para todas las peticiones
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        mensaje: 'API Clientes funcionando correctamente'
    });
});

app.use('/api', clienteRoutes);

module.exports = app;
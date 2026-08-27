const express = require('express');
const clienteRoutes = require('./routes/clienteRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        mensaje: 'API Clientes funcionando correctamente'
    });
});

app.use('/api', clienteRoutes);

module.exports = app;
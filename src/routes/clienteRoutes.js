const express = require('express');

const {
    crearCliente,
    listarClientes,
    obtenerCliente,
    actualizarCliente,
    eliminarCliente
} = require('../controllers/clienteController');

const router = express.Router();

router.post('/clientes', crearCliente);

router.get('/clientes', listarClientes);

router.get('/clientes/:id', obtenerCliente);

router.put('/clientes/:id', actualizarCliente);

router.delete('/clientes/:id', eliminarCliente);

module.exports = router;
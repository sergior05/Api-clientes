const Cliente = require('../models/cliente');

// CREAR CLIENTE
const crearCliente = async (req, res) => {
    try {
        const { nombre, correo, telefono } = req.body;

        if (!nombre || !correo || !telefono) {
            return res.status(400).json({
                error: 'Los campos nombre, correo y telefono son obligatorios.'
            });
        }

        const clienteExistente = await Cliente.findOne({
            where: { correo }
        });

        if (clienteExistente) {
            return res.status(409).json({
                error: 'Ya existe un cliente con ese correo.'
            });
        }

        const cliente = await Cliente.create({
            nombre,
            correo,
            telefono
        });

        res.status(201).json(cliente);

    } catch (error) {
        console.error('Error al crear cliente:', error);

        res.status(500).json({
            error: 'Error al crear el cliente.',
            detalle: error.message
        });
    }
};


// LISTAR CLIENTES
const listarClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll({
            order: [['id', 'ASC']]
        });

        res.status(200).json(clientes);

    } catch (error) {
        console.error('Error al listar clientes:', error);

        res.status(500).json({
            error: 'Error al obtener los clientes.',
            detalle: error.message
        });
    }
};


// OBTENER CLIENTE POR ID
const obtenerCliente = async (req, res) => {
    try {
        const { id } = req.params;

        const cliente = await Cliente.findByPk(id);

        if (!cliente) {
            return res.status(404).json({
                error: 'Cliente no encontrado.'
            });
        }

        res.status(200).json(cliente);

    } catch (error) {
        console.error('Error al obtener cliente:', error);

        res.status(500).json({
            error: 'Error al obtener el cliente.',
            detalle: error.message
        });
    }
};


// ACTUALIZAR CLIENTE
const actualizarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, correo, telefono } = req.body;

        const cliente = await Cliente.findByPk(id);

        if (!cliente) {
            return res.status(404).json({
                error: 'Cliente no encontrado.'
            });
        }

        await cliente.update({
            nombre: nombre ?? cliente.nombre,
            correo: correo ?? cliente.correo,
            telefono: telefono ?? cliente.telefono
        });

        res.status(200).json(cliente);

    } catch (error) {
        console.error('Error al actualizar cliente:', error);

        res.status(500).json({
            error: 'Error al actualizar el cliente.',
            detalle: error.message
        });
    }
};


// ELIMINAR CLIENTE
const eliminarCliente = async (req, res) => {
    try {
        const { id } = req.params;

        const cliente = await Cliente.findByPk(id);

        if (!cliente) {
            return res.status(404).json({
                error: 'Cliente no encontrado.'
            });
        }

        await cliente.destroy();

        res.status(200).json({
            mensaje: 'Cliente eliminado correctamente.'
        });

    } catch (error) {
        console.error('Error al eliminar cliente:', error);

        res.status(500).json({
            error: 'Error al eliminar el cliente.',
            detalle: error.message
        });
    }
};


module.exports = {
    crearCliente,
    listarClientes,
    obtenerCliente,
    actualizarCliente,
    eliminarCliente
};
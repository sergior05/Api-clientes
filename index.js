require('dotenv').config();

const app = require('./src/app');
const sequelize = require('./src/config/database');

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
    try {
        await sequelize.authenticate();

        console.log('Conexión a PostgreSQL establecida correctamente.');

        // Crear schema si no existe (cada API tiene su propio schema en el
        // mismo servidor PostgreSQL compartido)
        await sequelize.createSchema(process.env.DB_SCHEMA || 'cliente', {
            ifNotExists: true
        });

        console.log(`Schema "${process.env.DB_SCHEMA || 'cliente'}" disponible.`);

        await sequelize.sync();

        console.log('Modelos sincronizados correctamente.');

        app.listen(PORT, () => {
            console.log(`API Clientes ejecutándose en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Error al iniciar la aplicación:', error);
    }
}

iniciarServidor();
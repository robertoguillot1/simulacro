const Sequelize = require('sequelize');

const DB_NAME = 'simulacro_mysql_nodejs';

const DB_USER = 'admin';

const DB_PASS = 'GQuin1118.';



export const database = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASS,

    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }

);


async function generateDb() {
    await database.sync({ force: false })
    console.log('Base de datos y tablas creada');
}

generateDb();

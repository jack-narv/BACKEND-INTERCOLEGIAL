const dbConfig = require("../config/db.config");

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.emisor = require("./emisor.model.js")(sequelize, Sequelize);
db.receptor = require("./receptor.model.js")(sequelize, Sequelize);
db.admin_colegio = require("./admin_colegio.model")(sequelize, Sequelize);
db.colegio_curso_paralelo = require("./colegio_curso_paralelo.model")(sequelize, Sequelize);
db.colegio = require("./colegio.model")(sequelize, Sequelize);
db.curso_paralelo = require("./curso_paralelo.model")(sequelize, Sequelize);
db.curso = require("./curso.model")(sequelize, Sequelize);
db.paralelo = require("./paralelo.model")(sequelize, Sequelize);
db.pedido_producto = require("./pedido_producto.model")(sequelize, Sequelize);
db.pedido = require("./pedido.model")(sequelize, Sequelize);
db.producto_cantidad = require("./producto_cantidad.model")(sequelize, Sequelize);
db.producto = require("./producto.model")(sequelize, Sequelize);

module.exports = db;
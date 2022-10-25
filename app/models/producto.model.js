

const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) =>{
    
    const Producto = sequelize.define("producto",{
        
        CODIGO_PRODUCTO:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        NOMBRE_PRODUCTO: {
            type: Sequelize.INTEGER
        },
        DESCRIPCION_PRODUCTO: {
            type: Sequelize.STRING
        },
        PRECIO_PRODUCTO: {
            type: DataTypes.DECIMAL
        },
        IMG_PRODUCTO: {
            type: Sequelize.STRING
        }
    },{
        tableName: 'PRODUCTO',
        
        timestamps: false,
    });

    return Producto;
}
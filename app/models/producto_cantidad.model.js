module.exports = (sequelize, Sequelize) =>{
    const Producto_Cantidad = sequelize.define("producto_cantidad",{
        
        ID_PRODUCTO_CANTIDAD:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        CODIGO_PRODUCTO: {
            type: Sequelize.INTEGER
        },
        CANTIDAD_PRODUCTO: {
            type: Sequelize.INTEGER
        }
    },{
        tableName: 'PRODUCTO_CANTIDAD',
        
        timestamps: false,
    });

    return Producto_Cantidad;
}
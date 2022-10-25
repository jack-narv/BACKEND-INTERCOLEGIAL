module.exports = (sequelize, Sequelize) =>{
    const Pedido_Producto = sequelize.define("pedido_producto",{
        
        ID_PEDIDO_PRODUCTO:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ID_PRODUCTO_CANTIDAD: {
            type: Sequelize.INTEGER
        },
        CODIGO_PEDIDO: {
            type: Sequelize.INTEGER
        }
    },{
        tableName: 'PEDIDO_PRODUCTO',
        
        timestamps: false,
    });

    return Pedido_Producto;
}
module.exports = (sequelize, Sequelize) =>{
    const Pedido = sequelize.define("pedido",{
        
        CODIGO_PEDIDO:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        CODIGO_RECEPTOR: {
            type: Sequelize.INTEGER
        },
        CODIGO_EMISOR: {
            type: Sequelize.INTEGER
        },
        ID_ADMIN: {
            type: Sequelize.INTEGER
        },
        ESTADO: {
            type: Sequelize.BOOLEAN
        },
        MENSAJE: {
            type: Sequelize.STRING
        },
        FECHA_PEDIDO: {
            type: Sequelize.DATE
        }
    },{
        tableName: 'PEDIDO',
        
        timestamps: false,
    });

    return Pedido;
}
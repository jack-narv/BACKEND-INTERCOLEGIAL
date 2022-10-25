module.exports = (sequelize, Sequelize) =>{
    const Paralelo = sequelize.define("paralelo",{
        
        CODIGO_PARALELO:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        NOMBRE_PARALELO: {
            type: Sequelize.STRING
        }
    },{
        tableName: 'PARALELO',
        
        timestamps: false,
    });

    return Paralelo;
}
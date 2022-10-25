module.exports = (sequelize, Sequelize) =>{
    const Colegio = sequelize.define("colegio",{
        
        CODIGO_COLEGIO:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        NOMBRE_COLEGIO: {
            type: Sequelize.STRING
        }
    },{
        tableName: 'COLEGIO',
        
        timestamps: false,
    });

    return Colegio;
}
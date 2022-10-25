module.exports = (sequelize, Sequelize) =>{
    const Receptor = sequelize.define("receptor",{
        
        CODIGO_RECEPTOR:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        CODIGO_COLEGIO: {
            type: Sequelize.INTEGER
        },
        ID_CURSO_PARALELO: {
            type: Sequelize.INTEGER
        },
        APELLIDO_RECEPTOR:{
            type: Sequelize.STRING
        },
        NOMBRE_RECEPTOR: {
            type: Sequelize.STRING
        }
    },{
        tableName: 'RECEPTOR',
        
        timestamps: false,
    });

    return Receptor;
}
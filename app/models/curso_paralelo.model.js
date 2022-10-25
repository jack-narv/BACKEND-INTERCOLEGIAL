module.exports = (sequelize, Sequelize) =>{
    const Curso_Paralelo = sequelize.define("curso_paralelo",{
        
        ID_CURSO_PARALELO:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        CODIGO_CURSO: {
            type: Sequelize.INTEGER
        },
        CODIGO_PARALELO: {
            type: Sequelize.INTEGER
        }
    },{
        tableName: 'CURSO_PARALELO',
        
        timestamps: false,
    });

    return Curso_Paralelo;
}
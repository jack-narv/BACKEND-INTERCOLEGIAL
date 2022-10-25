module.exports = (sequelize, Sequelize) =>{
    const Colegio_Curso_Paralelo = sequelize.define("colegio_curso_paralelo",{
        
        ID_COLEGIO_CURSO_PARALELO:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        CODIGO_COLEGIO: {
            type: Sequelize.INTEGER
        },
        ID_CURSO_PARALELO: {
            type: Sequelize.INTEGER
        }
    },{
        tableName: 'COLEGIO_CURSO_PARALELO',
        
        timestamps: false,
    });

    return Colegio_Curso_Paralelo;
}
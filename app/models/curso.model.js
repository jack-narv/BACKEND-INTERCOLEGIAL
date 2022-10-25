module.exports = (sequelize, Sequelize) =>{
    const Curso = sequelize.define("curso",{
        
        CODIGO_CURSO:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        NOMBRE_CURSO: {
            type: Sequelize.STRING
        }
    },{
        tableName: 'CURSO',
        
        timestamps: false,
    });

    return Curso;
}
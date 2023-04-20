module.exports = (sequelize, Sequelize) =>{
    const Emisor = sequelize.define("emisor",{
        
        CODIGO_EMISOR:{
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
        NOMBRE_EMISOR:{
            type: Sequelize.STRING
        },
        APELLIDO_EMISOR: {
            type: Sequelize.STRING
        },
        CORREO_EMISOR: {
            type: Sequelize.STRING
        },
        APODO: {
            type: Sequelize.STRING
        },
        TELEFONO_EMISOR: {
            type: Sequelize.STRING
        },
        TIPO_ENVIO: {
            type: Sequelize.INTEGER
        }
    },{
        tableName: 'EMISOR',
        
        timestamps: false,
    });

    return Emisor;
}
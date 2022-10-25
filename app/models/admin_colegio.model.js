module.exports = (sequelize, Sequelize) =>{
    const Admin_Colegio = sequelize.define("admin_colegio",{
        
        ID_ADMIN:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        CODIGO_COLEGIO: {
            type: Sequelize.INTEGER
        },
        USUARIO_ADMIN: {
            type: Sequelize.STRING
        },
        CONTRASENA_ADMIN: {
            type: Sequelize.STRING
        }
    },{
        tableName: 'ADMIN_COLEGIO',
        
        timestamps: false,
    });

    return Admin_Colegio;
}
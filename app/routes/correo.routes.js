module.exports = app =>{
    const correo = require('../controllers/correo.controller');

    var router = require("express").Router();

    router.post('/envio', correo.envioCorreo);

    app.use('/api/correo', router);
}
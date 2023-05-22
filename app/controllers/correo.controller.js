const nodemailer = require("nodemailer");
const { request, response } = require('express');

const envioCorreo = (req = request, resp = response) => {
    let body = req.body;
    console.log("MENSAJE: ");
    console.log(body);
    let config = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        post:587,
        auth:{
            user: 'intercolegialec@gmail.com',
            //IMPORTANTE:
            // Generar contraseña de aplicaciones
            pass: 'hlctygncuxoljvvs'
        }
    });

    const opciones = {
        from: 'Unión Estudiantil',
        subject: body.asunto,
        to: body.email,
        html: body.html
    };

    config.sendMail(opciones, function(error, result){
        if(error) return resp.json({ok:false, msg:error});

        return resp.json({
            ok:true,
            msg: result
        });
    });

}

module.exports = {
    envioCorreo
}
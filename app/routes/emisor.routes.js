module.exports = app =>{
    const emisores = require("../controllers/emisor.controller");

    var router = require("express").Router();

    //Create a new Estudiante
    router.post("/", emisores.create);

    //Retrieve all Estudiantes
    router.get("/", emisores.findAll);

    //Retreive a single Estudiante with id
    router.get("/:id", emisores.findOne);

    //Retreive a single Estudiante with id
    router.get("/findOneCorreo/:correo", emisores.findOneCorreo);

    //Update a Estudiante with id
    router.put("/:id", emisores.update);

    //Delete a Estudiante with id
    router.delete("/:id", emisores.delete);

    //Delete all Estudiantes
    router.delete("/", emisores.deleteAll);

    app.use('/api/emisores', router);
};
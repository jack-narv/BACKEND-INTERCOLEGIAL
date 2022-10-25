module.exports = app =>{
    const colegios = require("../controllers/colegio.controller");

    var router = require("express").Router();

    //Create a new Estudiante
    router.post("/", colegios.create);

    //Retrieve all Estudiantes
    router.get("/", colegios.findAll);

    //Retreive a single Estudiante with id
    router.get("/:id", colegios.findOne);

    //Retreive a single Estudiante with id
    router.get("/findOneNombre/:nombre", colegios.findOneNombre);

    //Update a Estudiante with id
    router.put("/:id", colegios.update);

    //Delete a Estudiante with id
    router.delete("/:id", colegios.delete);

    //Delete all Estudiantes
    router.delete("/", colegios.deleteAll);

    app.use('/api/colegios', router);
};
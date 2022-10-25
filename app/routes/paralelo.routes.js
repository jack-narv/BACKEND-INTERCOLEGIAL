module.exports = app =>{
    const paralelos = require("../controllers/paralelo.controller");

    var router = require("express").Router();

    //Create a new Estudiante
    router.post("/", paralelos.create);

    //Retrieve all Estudiantes
    router.get("/", paralelos.findAll);

    //Retreive a single Estudiante with id
    router.get("/:id", paralelos.findOne);

    //Retreive a single Estudiante with id
    router.get("/findOneParalelo/:paralelo", paralelos.findOneParalelo);

    //Update a Estudiante with id
    router.put("/:id", paralelos.update);

    //Delete a Estudiante with id
    router.delete("/:id", paralelos.delete);

    //Delete all Estudiantes
    router.delete("/", paralelos.deleteAll);

    app.use('/api/paralelos', router);
};
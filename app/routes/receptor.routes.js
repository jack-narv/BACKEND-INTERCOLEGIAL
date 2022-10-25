module.exports = app =>{
    const receptores = require("../controllers/receptor.controller.js");

    var router = require("express").Router();

    //Create a new Estudiante
    router.post("/", receptores.create);

    //Retrieve all Estudiantes
    router.get("/", receptores.findAll);

    //Retreive a single Estudiante with id
    router.get("/:id", receptores.findOne);

    //Retreive a single Estudiante with id
    router.get("/findOneNombre/:id", receptores.findOneNombre);

    //Update a Estudiante with id
    router.put("/:id", receptores.update);

    //Delete a Estudiante with id
    router.delete("/:id", receptores.delete);

    //Delete all Estudiantes
    router.delete("/", receptores.deleteAll);

    app.use('/api/receptores', router);
};
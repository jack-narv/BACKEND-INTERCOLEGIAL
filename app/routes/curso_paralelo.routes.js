module.exports = app =>{
    const curso_paralelo = require("../controllers/curso_paralelo.controller");

    var router = require("express").Router();

    //Create a new Estudiante
    router.post("/", curso_paralelo.create);

    //Retrieve all Estudiantes
    router.get("/", curso_paralelo.findAll);

    //Retreive a single Estudiante with id
    router.get("/:id", curso_paralelo.findOne);

    //Update a Estudiante with id
    router.put("/:id", curso_paralelo.update);

    //Delete a Estudiante with id
    router.delete("/:id", curso_paralelo.delete);

    //Delete all Estudiantes
    router.delete("/", curso_paralelo.deleteAll);

    app.use('/api/curso_paralelo', router);
};
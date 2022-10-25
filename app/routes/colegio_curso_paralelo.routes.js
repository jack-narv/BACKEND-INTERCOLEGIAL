module.exports = app =>{
    const colegio_curso_paralelo = require("../controllers/colegio_curso_paralelo.controller");

    var router = require("express").Router();

    //Create a new Estudiante
    router.post("/", colegio_curso_paralelo.create);

    //Retrieve all Estudiantes
    router.get("/", colegio_curso_paralelo.findAll);

    //Retreive a single Estudiante with id
    router.get("/:id", colegio_curso_paralelo.findOne);

    //Retreive a single Estudiante with id
    router.get("/findOneColegio/:colegio", colegio_curso_paralelo.findOneColegio);

    //Update a Estudiante with id
    router.put("/:id", colegio_curso_paralelo.update);

    //Delete a Estudiante with id
    router.delete("/:id", colegio_curso_paralelo.delete);

    //Delete all Estudiantes
    router.delete("/", colegio_curso_paralelo.deleteAll);

    app.use('/api/colegio_curso_paralelo', router);
};
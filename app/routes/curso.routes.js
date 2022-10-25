module.exports = app =>{
    const cursos = require("../controllers/curso.controller");

    var router = require("express").Router();

    //Create a new Estudiante
    router.post("/", cursos.create);

    //Retrieve all Estudiantes
    router.get("/", cursos.findAll);

    //Retreive a single Estudiante with id
    router.get("/:id", cursos.findOne);

    //Retreive a single Estudiante with id
    router.get("/findOneCurso/:curso", cursos.findOneCurso);

    //Update a Estudiante with id
    router.put("/:id", cursos.update);

    //Delete a Estudiante with id
    router.delete("/:id", cursos.delete);

    //Delete all Estudiantes
    router.delete("/", cursos.deleteAll);

    app.use('/api/cursos', router);
};
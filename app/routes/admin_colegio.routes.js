module.exports = app =>{
    const admin_colegio = require("../controllers/admin_colegio.controller");

    var router = require("express").Router();

    //Create a new Estudiante
    router.post("/", admin_colegio.create);

    //Retrieve all Estudiantes
    router.get("/", admin_colegio.findAll);

    //Retreive a single Estudiante with id
    router.get("/:id", admin_colegio.findOne);

    //Retreive a single Estudiante with id
    router.get("/findOneColegio/:id", admin_colegio.findOneColegio);

    //Update a Estudiante with id
    router.put("/:id", admin_colegio.update);

    //Delete a Estudiante with id
    router.delete("/:id", admin_colegio.delete);

    //Delete all Estudiantes
    router.delete("/", admin_colegio.deleteAll);

    app.use('/api/admins', router);
};
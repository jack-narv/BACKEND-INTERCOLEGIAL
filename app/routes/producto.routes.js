module.exports = app =>{
    const productos = require("../controllers/producto.controller");

    var router = require("express").Router();

    //Create a new Estudiante
    router.post("/", productos.create);

    //Retrieve all Estudiantes
    router.get("/", productos.findAll);

    //Retreive a single Estudiante with id
    router.get("/:id", productos.findOne);

    //Retreive a single Estudiante with id
    router.get("/findOneNombre/:nombre", productos.findOneNombre);

    //Update a Estudiante with id
    router.put("/:id", productos.update);

    //Delete a Estudiante with id
    router.delete("/:id", productos.delete);

    //Delete all Estudiantes
    router.delete("/", productos.deleteAll);

    app.use('/api/productos', router);
};
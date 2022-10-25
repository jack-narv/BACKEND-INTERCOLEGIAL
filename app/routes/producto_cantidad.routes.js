module.exports = app =>{
    const productos_cantidad = require("../controllers/producto_cantidad.controller");

    var router = require("express").Router();

    //Create a new Estudiante
    router.post("/", productos_cantidad.create);

    //Retrieve all Estudiantes
    router.get("/", productos_cantidad.findAll);

    //Retreive a single Estudiante with id
    router.get("/:id", productos_cantidad.findOne);

    //Retreive a single Estudiante with id
    router.get("/findOneProducto/:producto", productos_cantidad.findOneProducto);

    //Update a Estudiante with id
    router.put("/:id", productos_cantidad.update);

    //Delete a Estudiante with id
    router.delete("/:id", productos_cantidad.delete);

    //Delete all Estudiantes
    router.delete("/", productos_cantidad.deleteAll);

    app.use('/api/productos_cantidad', router);
};
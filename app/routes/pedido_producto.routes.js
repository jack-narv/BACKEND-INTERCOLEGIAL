module.exports = app =>{
    const pedidos_productos = require("../controllers/pedido_producto.controller");

    var router = require("express").Router();

    //Create a new Estudiante
    router.post("/", pedidos_productos.create);

    //Retrieve all Estudiantes
    router.get("/", pedidos_productos.findAll);

    //Retreive a single Estudiante with id
    router.get("/:id", pedidos_productos.findOne);

    //Retreive a single Estudiante with id
    router.get("/findOnePedido/:pedido", pedidos_productos.findOnePedido);

    //Update a Estudiante with id
    router.put("/:id", pedidos_productos.update);

    //Delete a Estudiante with id
    router.delete("/:id", pedidos_productos.delete);

    //Delete all Estudiantes
    router.delete("/", pedidos_productos.deleteAll);

    app.use('/api/pedidos_productos', router);
};
module.exports = app =>{
    const pedidos = require("../controllers/pedido.controller");

    var router = require("express").Router();

    //Create a new Estudiante
    router.post("/", pedidos.create);

    //Retrieve all Estudiantes
    router.get("/", pedidos.findAll);

    //Retreive a single Estudiante with id
    router.get("/:id", pedidos.findOne);

    //Retreive a single Estudiante with id
    router.get("/findOneEmisor/:emisor", pedidos.findOneEmisor);

    //Retreive a single Estudiante with id
    router.get("/xd/xd/findByAdmin", pedidos.findByAdmin);

    //Retreive a single Estudiante with id
    router.get("/xd/xd/xd/findPedidosCompletos", pedidos.findPedidosCompletos);
    

    //Update a Estudiante with id
    router.put("/:id", pedidos.update);

    //Delete a Estudiante with id
    router.delete("/:id", pedidos.delete);

    //Delete all Estudiantes
    router.delete("/", pedidos.deleteAll);

    app.use('/api/pedidos', router);
};
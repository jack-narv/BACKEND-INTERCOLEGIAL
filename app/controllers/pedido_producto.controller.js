const db = require("../models");
const Pedido_Producto = db.pedido_producto;
const Op = db.Sequelize.Op;


//Create and Save a new administrador
exports.create = (req, res) =>{
    //Validate request
   if(!req.body.CODIGO_PEDIDO){
       res.status(400).send({
           message: "Content can not be empty!"
       });
       return;
   }
   
    //Create a administrador
    const pedido_producto ={
        ID_PEDIDO_PRODUCTO: req.body.ID_PEDIDO_PRODUCTO,
        ID_PRODUCTO_CANTIDAD: req.body.ID_PRODUCTO_CANTIDAD,
        CODIGO_PEDIDO: req.body.CODIGO_PEDIDO
    };
    
    //Save administrador in the database
    Pedido_Producto.create(pedido_producto)
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the pedido."
        });
    });
};

//Retreive all administradors from the database.
exports.findAll = (req,res) =>{
    const codigo_pedido_producto = req.query.codigo_pedido_producto;
    var condition = codigo_pedido_producto?{codigo_pedido_producto:{[Op.like]:`%${codigo_pedido_producto}%`}}:null;

    Pedido_Producto.findAll({where: condition})
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving pedidos."
            });
        });
};

//Find a single administrador with an id
exports.findOne = (req, res) =>{
    const id = req.params.id;
    Pedido_Producto.findByPk(id)
        .then(data =>{
            
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message: "Error retrieving pedido with id="+ id
            });
        });
};

//Find a single administrador with an correo
exports.findOnePedido = (req, res) =>{
    const pedido = req.params.pedido;
    Pedido_Producto.findOne({ where: {
        CODIGO_PEDIDO: pedido
       }
   })
    .then(data =>{
        res.send(data);
   })
   .catch(err =>{
       res.status(500).send({
           message:
               err.message || "Some error ocurred while retrieving pedido."
       });
   });
};

// Update a administrador by the id in the request
exports.update = (req, res) =>{
    const id = req.params.id;
    Pedido_Producto.update(req.body,{
        where: {ID_PEDIDO_PRODUCTO:id}
    })
        .then(num =>{
            if(num == 1){
                res.send({
                    message: "pedido was update succesfully."
                });
            } else{
                res.send({
                    message: `Cannot update pedido with id=${id}. Maybe pedido was not found or req.body is empty.`
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message:"Error updating pedido with id="+ id
            });
        });
};

// Delete a administrador with the specified id in the request
exports.delete = (req, res) =>{
    const id = req.params.id;

    Pedido_Producto.destroy({
        where: {ID_PEDIDO_PRODUCTO:id}
    })
        .then(num =>{
            if(num == 1){
                res.send({
                    message: "pedido was deleted successfully!"
                });
            }else{
                res.send({
                    message: `Cannot delete pedido with id=${id}. Maybe pedido was not found!`
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete pedido with id="+ id
            });
        });
};

// Delete all administradors from the database.
exports.deleteAll = (req, res) =>{
    Pedido_Producto.destroy({
        where: {},
        truncate: false
    })
        .then(nums =>{
            res.send({message: `${nums} pedido were deleted successfully!`});
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while removing all pedidos."
            });
        });
};


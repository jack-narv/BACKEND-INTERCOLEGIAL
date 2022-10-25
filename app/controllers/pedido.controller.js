const db = require("../models");
const Pedido = db.pedido;
const Op = db.Sequelize.Op;


//Create and Save a new administrador
exports.create = (req, res) =>{
    //Validate request
   if(!req.body.MENSAJE){
       res.status(400).send({
           message: "Content can not be empty!"
       });
       return;
   }
   
    //Create a administrador
    const pedido ={
        CODIGO_PEDIDO: req.body.CODIGO_PEDIDO,
        CODIGO_RECEPTOR: req.body.CODIGO_RECEPTOR,
        CODIGO_EMISOR: req.body.CODIGO_EMISOR,
        ID_ADMIN: req.body.ID_ADMIN,
        ESTADO: req.body.ESTADO,
        MENSAJE: req.body.MENSAJE,
        FECHA_PEDIDO: req.body.FECHA_PEDIDO
    };
    
    //Save administrador in the database
    Pedido.create(pedido)
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
    const codigo_pedido = req.query.codigo_pedido;
    var condition = codigo_pedido?{codigo_pedido:{[Op.like]:`%${codigo_pedido}%`}}:null;

    Pedido.findAll({where: condition})
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
    Pedido.findByPk(id)
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
exports.findOneEmisor = (req, res) =>{
    const emisor = req.params.emisor;
    Pedido.findOne({ where: {
        CODIGO_EMISOR: emisor
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
    console.log("FECHA: "+req.body.FECHA_PEDIDO);
    Pedido.update(req.body,{
        where: {CODIGO_PEDIDO:id}
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

    Pedido.destroy({
        where: {CODIGO_PEDIDO:id}
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
    Pedido.destroy({
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


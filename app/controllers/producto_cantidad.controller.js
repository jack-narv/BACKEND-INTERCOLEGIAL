const db = require("../models");
const Producto_Cantidad = db.producto_cantidad;
const Op = db.Sequelize.Op;


//Create and Save a new administrador
exports.create = (req, res) =>{
    //Validate request
   if(!req.body.CODIGO_PRODUCTO){
       res.status(400).send({
           message: "Content can not be empty!"
       });
       return;
   }
   
    //Create a administrador
    const producto_cantidad ={
        ID_PRODUCTO_CANTIDAD: req.body.ID_PRODUCTO_CANTIDAD,
        CODIGO_PRODUCTO: req.body.CODIGO_PRODUCTO,
        CANTIDAD_PRODUCTO: req.body.CANTIDAD_PRODUCTO
    };
    
    //Save administrador in the database
    Producto_Cantidad.create(producto_cantidad)
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the product."
        });
    });
};

//Retreive all administradors from the database.
exports.findAll = (req,res) =>{
    const codigo_producto_cantidad = req.query.codigo_producto_cantidad;
    var condition = codigo_producto_cantidad?{codigo_producto_cantidad:{[Op.like]:`%${codigo_producto_cantidad}%`}}:null;

    Producto_Cantidad.findAll({where: condition})
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving products."
            });
        });
};

//Find a single administrador with an id
exports.findOne = (req, res) =>{
    const id = req.params.id;
    Producto_Cantidad.findByPk(id)
        .then(data =>{
            
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message: "Error retrieving product with id="+ id
            });
        });
};

//Find a single administrador with an correo
exports.findOneProducto = (req, res) =>{
    const producto = req.params.producto;
    Producto_Cantidad.findOne({ where: {
        CODIGO_PRODUCTO: producto
       }
   })
    .then(data =>{
        res.send(data);
   })
   .catch(err =>{
       res.status(500).send({
           message:
               err.message || "Some error ocurred while retrieving product."
       });
   });
};

// Update a administrador by the id in the request
exports.update = (req, res) =>{
    const id = req.params.id;
    Producto_Cantidad.update(req.body,{
        where: {ID_PRODUCTO_CANTIDAD:id}
    })
        .then(num =>{
            if(num == 1){
                res.send({
                    message: "product was update succesfully."
                });
            } else{
                res.send({
                    message: `Cannot update product with id=${id}. Maybe product was not found or req.body is empty.`
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message:"Error updating product with id="+ id
            });
        });
};

// Delete a administrador with the specified id in the request
exports.delete = (req, res) =>{
    const id = req.params.id;

    Producto_Cantidad.destroy({
        where: {ID_PRODUCTO_CANTIDAD:id}
    })
        .then(num =>{
            if(num == 1){
                res.send({
                    message: "product was deleted successfully!"
                });
            }else{
                res.send({
                    message: `Cannot delete product with id=${id}. Maybe product was not found!`
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete product with id="+ id
            });
        });
};

// Delete all administradors from the database.
exports.deleteAll = (req, res) =>{
    Producto_Cantidad.destroy({
        where: {},
        truncate: false
    })
        .then(nums =>{
            res.send({message: `${nums} products were deleted successfully!`});
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while removing all products."
            });
        });
};


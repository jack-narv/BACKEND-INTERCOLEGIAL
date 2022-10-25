const db = require("../models");
const Producto = db.producto;
const Op = db.Sequelize.Op;


//Create and Save a new administrador
exports.create = (req, res) =>{
    //Validate request
   if(!req.body.NOMBRE_PRODUCTO){
       res.status(400).send({
           message: "Content can not be empty!"
       });
       return;
   }
   
    //Create a administrador
    const producto ={
        CODIGO_PRODUCTO: req.body.CODIGO_PRODUCTO,
        NOMBRE_PRODUCTO: req.body.NOMBRE_PRODUCTO,
        DESCRIPCION_PRODUCTO: req.body.DESCRIPCION_PRODUCTO,
        PRECIO_PRODUCTO: req.body.PRECIO_PRODUCTO,
        IMG_PRODUCTO: req.body.IMG_PRODUCTO,
    };
    
    //Save administrador in the database
    Producto.create(producto)
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
    const codigo_producto = req.query.codigo_producto;
    var condition = codigo_producto?{codigo_producto:{[Op.like]:`%${codigo_producto}%`}}:null;

    Producto.findAll({where: condition})
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
    Producto.findByPk(id)
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
exports.findOneNombre = (req, res) =>{
    const nombre = req.params.nombre;
    Producto.findOne({ where: {
        NOMBRE_PRODUCTO: nombre
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
    console.log("PRECIO: "+req.body.PRECIO_PRODUCTO);
    Producto.update(req.body,{
        where: {CODIGO_PRODUCTO:id}
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

    Producto.destroy({
        where: {CODIGO_PRODUCTO:id}
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
    Producto.destroy({
        where: {},
        truncate: false
    })
        .then(nums =>{
            res.send({message: `${nums} product were deleted successfully!`});
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while removing all products."
            });
        });
};


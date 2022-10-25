const db = require("../models");
const Colegio = db.colegio;
const Op = db.Sequelize.Op;


//Create and Save a new administrador
exports.create = (req, res) =>{
    //Validate request
   if(!req.body.NOMBRE_COLEGIO){
       res.status(400).send({
           message: "Content can not be empty!"
       });
       return;
   }
   
    //Create a administrador
    const colegio ={
        CODIGO_COLEGIO: req.body.CODIGO_COLEGIO,
        NOMBRE_COLEGIO: req.body.NOMBRE_COLEGIO
    };
    
    //Save administrador in the database
    Colegio.create(colegio)
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the colegio."
        });
    });
};

//Retreive all administradors from the database.
exports.findAll = (req,res) =>{
    const codigo_colegio = req.query.codigo_colegio;
    var condition = codigo_colegio?{codigo_colegio:{[Op.like]:`%${codigo_colegio}%`}}:null;

    Colegio.findAll({where: condition})
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving colegios."
            });
        });
};

//Find a single administrador with an id
exports.findOne = (req, res) =>{
    const id = req.params.id;
    Colegio.findByPk(id)
        .then(data =>{
            
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message: "Error retrieving colegio with id="+ id
            });
        });
};

//Find a single administrador with an correo
exports.findOneNombre = (req, res) =>{
    const nombre = req.params.nombre;
    Colegio.findOne({ where: {
        NOMBRE_COLEGIO: nombre
       }
   })
    .then(data =>{
        res.send(data);
   })
   .catch(err =>{
       res.status(500).send({
           message:
               err.message || "Some error ocurred while retrieving colegio."
       });
   });
};

// Update a administrador by the id in the request
exports.update = (req, res) =>{
    const id = req.params.id;
    Colegio.update(req.body,{
        where: {CODIGO_COLEGIO:id}
    })
        .then(num =>{
            if(num == 1){
                res.send({
                    message: "colegio was update succesfully."
                });
            } else{
                res.send({
                    message: `Cannot update colegio with id=${id}. Maybe colegio was not found or req.body is empty.`
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message:"Error updating colegio with id="+ id
            });
        });
};

// Delete a administrador with the specified id in the request
exports.delete = (req, res) =>{
    const id = req.params.id;

    Colegio.destroy({
        where: {CODIGO_COLEGIO:id}
    })
        .then(num =>{
            if(num == 1){
                res.send({
                    message: "colegio was deleted successfully!"
                });
            }else{
                res.send({
                    message: `Cannot delete colegio with id=${id}. Maybe colegio was not found!`
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete colegio with id="+ id
            });
        });
};

// Delete all administradors from the database.
exports.deleteAll = (req, res) =>{
    Colegio.destroy({
        where: {},
        truncate: false
    })
        .then(nums =>{
            res.send({message: `${nums} colegio were deleted successfully!`});
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while removing all colegios."
            });
        });
};


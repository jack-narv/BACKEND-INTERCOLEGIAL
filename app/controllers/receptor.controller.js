const db = require("../models");
const Receptor  = db.receptor;
const Op = db.Sequelize.Op;


//Create and Save a new administrador
exports.create = (req, res) =>{
    //Validate request
    console.log(req.body);
   if(!req.body.NOMBRE_RECEPTOR){
       res.status(400).send({
           message: "Content can not be empty!"
       });
       return;
   }
   
    //Create a administrador
    const receptor ={
        CODIGO_RECEPTOR: req.body.CODIGO_RECEPTOR,
        CODIGO_COLEGIO: req.body.CODIGO_COLEGIO,
        ID_CURSO_PARALELO: req.body.ID_CURSO_PARALELO,
        APELLIDO_RECEPTOR: req.body.APELLIDO_RECEPTOR,
        NOMBRE_RECEPTOR: req.body.NOMBRE_RECEPTOR,
    };
    
    //Save administrador in the database
    Receptor.create(receptor)
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the receptor."
        });
    });
};
              
//Retreive all administradors from the database.
exports.findAll = (req,res) =>{
    const codigo_receptor = req.query.codigo_receptor;
    var condition = codigo_receptor?{codigo_codigo_receptor:{[Op.like]:`%${codigo_receptor}%`}}:null;

    Receptor.findAll({where: condition})
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving receptors."
            });
        });
};

//Find a single administrador with an id
exports.findOne = (req, res) =>{
    const id = req.params.id;
    Receptor.findByPk(id)
        .then(data =>{
            
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message: "Error retrieving receptor with id="+ id
            });
        });
};

//Find a single administrador with an correo
exports.findOneNombre = (req, res) =>{
    const nombre = req.params.id;
    console.log("NOMBRE: "+nombre);
    Receptor.findOne({ where: {
        NOMBRE_RECEPTOR: nombre
       }
   })
    .then(data =>{
        res.send(data);
   })
   .catch(err =>{
       res.status(500).send({
           message:
               err.message || "Some error ocurred while retrieving receptor."
       });
   });
};

// Update a administrador by the id in the request
exports.update = (req, res) =>{
    const id = req.params.id;

    Receptor.update(req.body,{
        where: {CODIGO_RECEPTOR:id}
    })
        .then(num =>{
            if(num == 1){
                res.send({
                    message: "receptor was update succesfully."
                });
            } else{
                res.send({
                    message: `Cannot update receptor with id=${id}. Maybe receptor was not found or req.body is empty.`
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message:"Error updating receptor with id="+ id
            });
        });
};

// Delete a administrador with the specified id in the request
exports.delete = (req, res) =>{
    const id = req.params.id;

    Receptor.destroy({
        where: {CODIGO_RECEPTOR:id}
    })
        .then(num =>{
            if(num == 1){
                res.send({
                    message: "receptor was deleted successfully!"
                });
            }else{
                res.send({
                    message: `Cannot delete receptor with id=${id}. Maybe receptor was not found!`
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete receptor with id="+ id
            });
        });
};

// Delete all administradors from the database.
exports.deleteAll = (req, res) =>{
    Receptor.destroy({
        where: {},
        truncate: false
    })
        .then(nums =>{
            res.send({message: `${nums} receptor were deleted successfully!`});
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while removing all receptors."
            });
        });
};


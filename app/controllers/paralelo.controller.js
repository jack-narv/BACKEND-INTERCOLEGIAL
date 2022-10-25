const db = require("../models");
const Paralelo = db.paralelo;
const Op = db.Sequelize.Op;


//Create and Save a new administrador
exports.create = (req, res) =>{
    //Validate request
   if(!req.body.NOMBRE_PARALELO){
       res.status(400).send({
           message: "Content can not be empty!"
       });
       return;
   }
   
    //Create a administrador
    const paralelo ={
        CODIGO_PARALELO: req.body.CODIGO_PARALELO,
        NOMBRE_PARALELO: req.body.NOMBRE_PARALELO,
    };
    
    //Save administrador in the database
    Paralelo.create(paralelo)
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the paralelo."
        });
    });
};

//Retreive all administradors from the database.
exports.findAll = (req,res) =>{
    const codigo_paralelo = req.query.codigo_curso;
    var condition = codigo_paralelo?{codigo_paralelo:{[Op.like]:`%${codigo_paralelo}%`}}:null;

    Paralelo.findAll({where: condition})
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving paralelo."
            });
        });
};

//Find a single administrador with an id
exports.findOne = (req, res) =>{
    const id = req.params.id;
    Paralelo.findByPk(id)
        .then(data =>{
            
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message: "Error retrieving paralelo with id="+ id
            });
        });
};

//Find a single administrador with an correo
exports.findOneParalelo = (req, res) =>{
    const paralelo = req.params.paralelo;
    Paralelo.findOne({ where: {
        NOMBRE_PARALELO: paralelo
       }
   })
    .then(data =>{
        res.send(data);
   })
   .catch(err =>{
       res.status(500).send({
           message:
               err.message || "Some error ocurred while retrieving paralelo."
       });
   });
};

// Update a administrador by the id in the request
exports.update = (req, res) =>{
    const id = req.params.id;

    Paralelo.update(req.body,{
        where: {CODIGO_PARALELO:id}
    })
        .then(num =>{
            if(num == 1){
                res.send({
                    message: "paralelo was update succesfully."
                });
            } else{
                res.send({
                    message: `Cannot update paralelo with id=${id}. Maybe paralelo was not found or req.body is empty.`
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message:"Error updating paralelo with id="+ id
            });
        });
};

// Delete a administrador with the specified id in the request
exports.delete = (req, res) =>{
    const id = req.params.id;

    Paralelo.destroy({
        where: {CODIGO_PARALELO:id}
    })
        .then(num =>{
            if(num == 1){
                res.send({
                    message: "paralelo was deleted successfully!"
                });
            }else{
                res.send({
                    message: `Cannot delete paralelo with id=${id}. Maybe paralelo was not found!`
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete paralelo with id="+ id
            });
        });
};

// Delete all administradors from the database.
exports.deleteAll = (req, res) =>{
    Paralelo.destroy({
        where: {},
        truncate: false
    })
        .then(nums =>{
            res.send({message: `${nums} paralelos were deleted successfully!`});
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while removing all paralelos."
            });
        });
};


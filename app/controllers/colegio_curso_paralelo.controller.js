const db = require("../models");
const Colegio_Curso_Paralelo = db.colegio_curso_paralelo;
const Op = db.Sequelize.Op;


//Create and Save a new administrador
exports.create = (req, res) =>{
    //Validate request
   if(!req.body.CODIGO_COLEGIO && !req.body.ID_CURSO_PARALELO){
       res.status(400).send({
           message: "Content can not be empty!"
       });
       return;
   }
   
    //Create a administrador
    const colegio_curso_paralelo ={
        ID_COLEGIO_CURSO_PARALELO: req.body.ID_COLEGIO_CURSO_PARALELO,
        CODIGO_COLEGIO: req.body.CODIGO_COLEGIO,
        ID_CURSO_PARALELO: req.body.ID_CURSO_PARALELO,
    };
    
    //Save administrador in the database
    Colegio_Curso_Paralelo.create(colegio_curso_paralelo)
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the colegio_curso_paralelo."
        });
    });
};

//Retreive all administradors from the database.
exports.findAll = (req,res) =>{
    const colegio_curso_paralelo = req.query.colegio_curso_paralelo;
    var condition = colegio_curso_paralelo?{colegio_curso_paralelo:{[Op.like]:`%${colegio_curso_paralelo}%`}}:null;

    Colegio_Curso_Paralelo.findAll({where: condition})
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving colegio_curso_paralelo."
            });
        });
};

//Find a single administrador with an id
exports.findOne = (req, res) =>{
    const id = req.params.id;
    Colegio_Curso_Paralelo.findByPk(id)
        .then(data =>{
            
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message: "Error retrieving colegio_curso_paralelo with id="+ id
            });
        });
};

//Find a single administrador with an correo
exports.findOneColegio = (req, res) =>{
    const colegio = req.params.colegio;
    Colegio_Curso_Paralelo.findOne({ where: {
        CODIGO_COLEGIO: colegio
       }
   })
    .then(data =>{
        res.send(data);
   })
   .catch(err =>{
       res.status(500).send({
           message:
               err.message || "Some error ocurred while retrieving colegio_curso_paralelo."
       });
   });
};


// Update a administrador by the id in the request
exports.update = (req, res) =>{
    const id = req.params.id;

    Colegio_Curso_Paralelo.update(req.body,{
        where: {ID_COLEGIO_CURSO_PARALELO:id}
    })
        .then(num =>{
            if(num == 1){
                res.send({
                    message: "colegio_curso_paralelo was update succesfully."
                });
            } else{
                res.send({
                    message: `Cannot update colegio_curso_paralelo with id=${id}. Maybe colegio_curso_paralelo was not found or req.body is empty.`
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message:"Error updating colegio_curso_paralelo with id="+ id
            });
        });
};

// Delete a administrador with the specified id in the request
exports.delete = (req, res) =>{
    const id = req.params.id;

    Colegio_Curso_Paralelo.destroy({
        where: {ID_COLEGIO_CURSO_PARALELO:id}
    })
        .then(num =>{
            if(num == 1){
                res.send({
                    message: "colegio_curso_paralelo was deleted successfully!"
                });
            }else{
                res.send({
                    message: `Cannot delete colegio_curso_paralelo with id=${id}. Maybe colegio_curso_paralelo was not found!`
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete colegio_curso_paralelo with id="+ id
            });
        });
};

// Delete all administradors from the database.
exports.deleteAll = (req, res) =>{
    Colegio_Curso_Paralelo.destroy({
        where: {},
        truncate: false
    })
        .then(nums =>{
            res.send({message: `${nums} colegio_curso_paralelo were deleted successfully!`});
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while removing all colegio_curso_paralelo."
            });
        });
};


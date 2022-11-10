const db = require("../models");
const Curso_Paralelo = db.curso_paralelo;
const Op = db.Sequelize.Op;
const Colegio_Curso_Paralelo = db.colegio_curso_paralelo;

//Create and Save a new administrador
exports.create = (req, res) =>{
    //Validate request
   if(!req.body.CODIGO_CURSO && !req.body.CODIGO_PARALELO){
       res.status(400).send({
           message: "Content can not be empty!"
       });
       return;
   }
   
    //Create a administrador
    const curso_paralelo ={
        ID_CURSO_PARALELO: req.body.ID_CURSO_PARALELO,
        CODIGO_CURSO: req.body.CODIGO_CURSO,
        CODIGO_PARALELO: req.body.CODIGO_PARALELO,
    };
    
    //Save administrador in the database
    Curso_Paralelo.create(curso_paralelo)
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the curso_paralelo."
        });
    });
};

//Retreive all administradors from the database.
exports.findAll = (req,res) =>{
    const codigo_curso_paralelo = req.query.codigo_curso_paralelo;
    var condition = codigo_curso_paralelo?{codigo_curso_paralelo:{[Op.like]:`%${codigo_curso_paralelo}%`}}:null;

    Curso_Paralelo.findAll({where: condition})
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving curso_paralelo."
            });
        });
};

//Find a single administrador with an id
exports.findOne = (req, res) =>{
    const id = req.params.id;
    Curso_Paralelo.findByPk(id)
        .then(data =>{
            
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message: "Error retrieving curso_paralelo with id="+ id
            });
        });
};

//Find a single administrador with an correo
exports.findByCursoParalelo = (req, res) =>{
    const curso = req.query.curso;
    const paralelo = req.query.paralelo;
    const colegio = req.query.colegio;

    Curso_Paralelo.findOne({ where: {
        CODIGO_CURSO: curso,
        CODIGO_PARALELO: paralelo
       }
   })
    .then(data =>{
        Colegio_Curso_Paralelo.findOne({ where: {
            CODIGO_COLEGIO: colegio,
            ID_CURSO_PARALELO: data.ID_CURSO_PARALELO
           }
       })
        .then(data =>{
            res.send(data);
       })
       .catch(err =>{
           res.status(500).send({
               message:
                   err.message || "Some error ocurred while retrieving curso."
           });
       });
   })
   .catch(err =>{
       res.status(500).send({
           message:
               err.message || "Some error ocurred while retrieving curso."
       });
   });
};


// Update a administrador by the id in the request
exports.update = (req, res) =>{
    const id = req.params.id;

    Curso_Paralelo.update(req.body,{
        where: {ID_CURSO_PARALELO:id}
    })
        .then(num =>{
            if(num == 1){
                res.send({
                    message: "curso_paralelo was update succesfully."
                });
            } else{
                res.send({
                    message: `Cannot update curso_paralelo with id=${id}. Maybe curso_paralelo was not found or req.body is empty.`
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message:"Error updating curso_paralelo with id="+ id
            });
        });
};

// Delete a administrador with the specified id in the request
exports.delete = (req, res) =>{
    const id = req.params.id;

    Curso_Paralelo.destroy({
        where: {ID_CURSO_PARALELO:id}
    })
        .then(num =>{
            if(num == 1){
                res.send({
                    message: "curso_paralelo was deleted successfully!"
                });
            }else{
                res.send({
                    message: `Cannot delete curso_paralelo with id=${id}. Maybe curso_paralelo was not found!`
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete curso_paralelo with id="+ id
            });
        });
};

// Delete all administradors from the database.
exports.deleteAll = (req, res) =>{
    Curso_Paralelo.destroy({
        where: {},
        truncate: false
    })
        .then(nums =>{
            res.send({message: `${nums} curso_paralelo were deleted successfully!`});
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while removing all curso_paralelo."
            });
        });
};


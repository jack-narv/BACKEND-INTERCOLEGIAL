const db = require("../models");
const Curso = db.curso;
const Op = db.Sequelize.Op;


//Create and Save a new administrador
exports.create = (req, res) =>{
    //Validate request
   if(!req.body.NOMBRE_CURSO){
       res.status(400).send({
           message: "Content can not be empty!"
       });
       return;
   }
   
    //Create a administrador
    const curso ={
        CODIGO_CURSO: req.body.CODIGO_CURSO,
        NOMBRE_CURSO: req.body.NOMBRE_CURSO,
    };
    
    //Save administrador in the database
    Curso.create(curso)
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the curso."
        });
    });
};

//Retreive all administradors from the database.
exports.findAll = (req,res) =>{
    const codigo_curso = req.query.codigo_curso;
    var condition = codigo_curso?{codigo_curso:{[Op.like]:`%${codigo_curso}%`}}:null;

    Curso.findAll({where: condition})
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving curso."
            });
        });
};

//Find a single administrador with an id
exports.findOne = (req, res) =>{
    const id = req.params.id;
    Curso.findByPk(id)
        .then(data =>{
            
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message: "Error retrieving curso with id="+ id
            });
        });
};

//Find a single administrador with an correo
exports.findOneCurso = (req, res) =>{
    const curso = req.params.curso;
    Curso.findOne({ where: {
        NOMBRE_CURSO: curso
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
};

// Update a administrador by the id in the request
exports.update = (req, res) =>{
    const id = req.params.id;

    Curso.update(req.body,{
        where: {CODIGO_CURSO:id}
    })
        .then(num =>{
            if(num == 1){
                res.send({
                    message: "curso was update succesfully."
                });
            } else{
                res.send({
                    message: `Cannot update curso with id=${id}. Maybe curso was not found or req.body is empty.`
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message:"Error updating curso with id="+ id
            });
        });
};

// Delete a administrador with the specified id in the request
exports.delete = (req, res) =>{
    const id = req.params.id;

    Curso.destroy({
        where: {CODIGO_CURSO:id}
    })
        .then(num =>{
            if(num == 1){
                res.send({
                    message: "curso was deleted successfully!"
                });
            }else{
                res.send({
                    message: `Cannot delete curso with id=${id}. Maybe curso was not found!`
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete curso with id="+ id
            });
        });
};

// Delete all administradors from the database.
exports.deleteAll = (req, res) =>{
    Curso.destroy({
        where: {},
        truncate: false
    })
        .then(nums =>{
            res.send({message: `${nums} cursos were deleted successfully!`});
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while removing all cursos."
            });
        });
};


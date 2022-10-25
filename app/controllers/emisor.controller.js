const db = require("../models");
const Emisor = db.emisor;
const Op = db.Sequelize.Op;


//Create and Save a new administrador
exports.create = (req, res) =>{
    //Validate request
   if(!req.body.NOMBRE_EMISOR){
       res.status(400).send({
           message: "Content can not be empty!"
       });
       return;
   }
   
    //Create a administrador
    const emisor ={
        CODIGO_EMISOR: req.body.CODIGO_EMISOR,
        CODIGO_COLEGIO: req.body.CODIGO_COLEGIO,
        ID_CURSO_PARALELO: req.body.ID_CURSO_PARALELO,
        NOMBRE_EMISOR: req.body.NOMBRE_EMISOR,
        APELLIDO_EMISOR: req.body.APELLIDO_EMISOR,
        CORREO_EMISOR: req.body.CORREO_EMISOR,
        APODO: req.body.APODO,
        TELEFONO_EMISOR: req.body.TELEFONO_EMISOR
    };
    
    //Save administrador in the database
    Emisor.create(emisor)
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the emisor."
        });
    });
};

//Retreive all administradors from the database.
exports.findAll = (req,res) =>{
    const codigo_emisor = req.query.codigo_emisor;
    var condition = codigo_emisor?{codigo_emisor:{[Op.like]:`%${codigo_emisor}%`}}:null;

    Emisor.findAll({where: condition})
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving emisors."
            });
        });
};

//Find a single administrador with an id
exports.findOne = (req, res) =>{
    const id = req.params.id;
    Emisor.findByPk(id)
        .then(data =>{
            
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message: "Error retrieving emisor with id="+ id
            });
        });
};

//Find a single administrador with an correo
exports.findOneCorreo = (req, res) =>{
    const correo = req.params.correo;
    Emisor.findOne({ where: {
        CORREO_EMISOR: correo
       }
   })
    .then(data =>{
        res.send(data);
   })
   .catch(err =>{
       res.status(500).send({
           message:
               err.message || "Some error ocurred while retrieving emisor."
       });
   });
};

// Update a administrador by the id in the request
exports.update = (req, res) =>{
    const id = req.params.id;

    Emisor.update(req.body,{
        where: {CODIGO_EMISOR:id}
    })
        .then(num =>{
            if(num == 1){
                res.send({
                    message: "emisor was update succesfully."
                });
            } else{
                res.send({
                    message: `Cannot update emisor with id=${id}. Maybe emisor was not found or req.body is empty.`
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message:"Error updating emisor with id="+ id
            });
        });
};

// Delete a administrador with the specified id in the request
exports.delete = (req, res) =>{
    const id = req.params.id;

    Emisor.destroy({
        where: {CODIGO_EMISOR:id}
    })
        .then(num =>{
            if(num == 1){
                res.send({
                    message: "emisor was deleted successfully!"
                });
            }else{
                res.send({
                    message: `Cannot delete emisor with id=${id}. Maybe emisor was not found!`
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete emisor with id="+ id
            });
        });
};

// Delete all administradors from the database.
exports.deleteAll = (req, res) =>{
    Emisor.destroy({
        where: {},
        truncate: false
    })
        .then(nums =>{
            res.send({message: `${nums} emisors were deleted successfully!`});
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while removing all emisors."
            });
        });
};


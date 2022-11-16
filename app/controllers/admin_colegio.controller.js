const db = require("../models");
const Admin = db.admin_colegio;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');


//Create and Save a new administrador
exports.create = (req, res) =>{
    //Validate request
   if(!req.body.USUARIO_ADMIN){
       res.status(400).send({
           message: "Content can not be empty!"
       });
       return;
   }
   
    //Create a administrador
    const admin ={
        ID_ADMIN: req.body.ID_ADMIN,
        CODIGO_COLEGIO: req.body.CODIGO_COLEGIO,
        USUARIO_ADMIN: req.body.USUARIO_ADMIN,
        CONTRASENA_ADMIN: req.body.CONTRASENA_ADMIN,
    };
    
    //Save administrador in the database
    Admin.create(admin)
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the admin."
        });
    });
};

//Retreive all administradors from the database.
exports.findAll = (req,res) =>{
    const codigo_admin = req.query.codigo_admin;
    var condition = codigo_admin?{codigo_admin:{[Op.like]:`%${codigo_admin}%`}}:null;

    Admin.findAll({where: condition})
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving admins."
            });
        });
};

//Find a single administrador with an id
exports.findOne = (req, res) =>{
    const id = req.params.id;
    Admin.findByPk(id)
        .then(data =>{
            
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message: "Error retrieving admin with id="+ id
            });
        });
};

//Find a single administrador with an correo
exports.findOneColegio = (req, res) =>{
    const colegio = req.params.id;
    Admin.findOne({ where: {
        CODIGO_COLEGIO: colegio
       }
   })
    .then(data =>{
        res.send(data);
   })
   .catch(err =>{
       res.status(500).send({
           message:
               err.message || "Some error ocurred while retrieving admin."
       });
   });
};

// Update a administrador by the id in the request
exports.update = (req, res) =>{
    const id = req.params.id;

    Admin.update(req.body,{
        where: {ID_ADMIN:id}
    })
        .then(num =>{
            if(num == 1){
                res.send({
                    message: "admin was update succesfully."
                });
            } else{
                res.send({
                    message: `Cannot update admin with id=${id}. Maybe admin was not found or req.body is empty.`
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message:"Error updating admin with id="+ id
            });
        });
};

// Delete a administrador with the specified id in the request
exports.delete = (req, res) =>{
    const id = req.params.id;

    Admin.destroy({
        where: {ID_ADMIN:id}
    })
        .then(num =>{
            if(num == 1){
                res.send({
                    message: "admin was deleted successfully!"
                });
            }else{
                res.send({
                    message: `Cannot delete admin with id=${id}. Maybe emisor was not found!`
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete admin with id="+ id
            });
        });
};

// Delete all administradors from the database.
exports.deleteAll = (req, res) =>{
    Admin.destroy({
        where: {},
        truncate: false
    })
        .then(nums =>{
            res.send({message: `${nums} admins were deleted successfully!`});
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while removing all admins."
            });
        });
};

//Find a single administrador with an correo
exports.findByUsuario = (req, res) =>{
    const usuario = req.params.usuario;
    Admin.findOne({ where: {
        USUARIO_ADMIN: usuario
       }
   })
    .then(data =>{
        res.send(data);
   })
   .catch(err =>{
       res.status(500).send({
           message:
               err.message || "Some error ocurred while retrieving admin."
       });
   });
};

exports.generateToken = (req, res) =>{
    const {usuario, contrasena} = req.body;
    var condition = usuario?{usuario:{[Op.like]:`%${usuario}%`}}:null;

    Admin.findOne({ where: {
             USUARIO_ADMIN: usuario,
             CONTRASENA_ADMIN: contrasena
            }
        })
         .then(data =>{
             //console.log(data.dataValues);
             const token = jwt.sign(data.dataValues, 'stil');
             res.json({token});
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving administrador."
            });
        });
}

exports.verifyToken = (req, res) => {
    if(!req.headers.authorization) return res.status(401).json('No autorizado');

    const token = req.headers.authorization.substr(7);
    if(token !== ''){
        const content = jwt.verify(token, 'stil');
        req.data = content;
        res.json("Información secreta");
    }else{
        res.status(401).json('Token vacío');
    }
    
}


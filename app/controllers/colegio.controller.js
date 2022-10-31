const db = require("../models");
const Colegio = db.colegio;
const Op = db.Sequelize.Op;
const Colegio_Curso_Paralelo = db.colegio_curso_paralelo;
const Curso_Paralelo = db.curso_paralelo;
const Curso = db.curso;
const Paralelo = db.paralelo;


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

exports.Cursos = (req, res) =>{
    cursosParalelo = [];
    cursos = [];
    i=0;
    j=0;
    const id = req.params.colegio;
    Colegio_Curso_Paralelo.findAll({
        where: {CODIGO_COLEGIO:id}
    })
        .then(data =>{

            longitud = data.length -1;
            data.forEach(item =>{
                Curso_Paralelo.findOne({
                    where: {ID_CURSO_PARALELO:item.ID_CURSO_PARALELO}
                })
                    .then(dt =>{
                        cursosParalelo.push(dt);
                        if(i==longitud){

                            long = cursosParalelo.length -1;
                            cursosParalelo.forEach(item =>{
                                Curso.findOne({
                                    where: {CODIGO_CURSO:item.CODIGO_CURSO}
                                })
                                    .then(d =>{
                                        cursos.push(d);
                                        if(j==long){
                                           res.send(cursos);
                                        }
                                        j++;
                                    })
                                    .catch(err =>{
                                        return err;
                                    });
                            });

                        }
                        i++;
                    })
                    .catch(err =>{
                        return err;
                    });
            });

        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving Colegio_Curso_Paralelo."
            });
        });
};


exports.Paralelos = (req, res) =>{
    cursosParalelo = [];
    paralelos = [];
    i=0;
    j=0;
    const id = req.params.colegio;
    Colegio_Curso_Paralelo.findAll({
        where: {CODIGO_COLEGIO:id}
    })
        .then(data =>{

            longitud = data.length -1;
            data.forEach(item =>{
                Curso_Paralelo.findOne({
                    where: {ID_CURSO_PARALELO:item.ID_CURSO_PARALELO}
                })
                    .then(dt =>{
                        cursosParalelo.push(dt);
                        if(i==longitud){

                            long = cursosParalelo.length -1;
                            cursosParalelo.forEach(item =>{
                                Paralelo.findOne({
                                    where: {CODIGO_PARALELO:item.CODIGO_PARALELO}
                                })
                                    .then(d =>{
                                        paralelos.push(d);
                                        if(j==long){
                                           res.send(paralelos);
                                        }
                                        j++;
                                    })
                                    .catch(err =>{
                                        return err;
                                    });
                            });

                        }
                        i++;
                    })
                    .catch(err =>{
                        return err;
                    });
            });

        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving Colegio_Curso_Paralelo."
            });
        });
};

exports.CursoParalelo = (req, res) =>{
    cursosParalelo = [];
    i=0;

    const id = req.params.colegio;
    Colegio_Curso_Paralelo.findAll({
        where: {CODIGO_COLEGIO:id}
    })
        .then(data =>{

            longitud = data.length -1;
            data.forEach(item =>{
                Curso_Paralelo.findOne({
                    where: {ID_CURSO_PARALELO:item.ID_CURSO_PARALELO}
                })
                    .then(dt =>{
                        cursosParalelo.push(dt);
                        if(i==longitud){
                            res.send(cursosParalelo);
                        }
                        i++;
                    })
                    .catch(err =>{
                        return err;
                    });
            });

        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving Colegio_Curso_Paralelo."
            });
        });
};

exports.ParalelosPorCurso = (req, res) =>{
    cursosParalelo = [];
    paralelos = [];
    i=0;
    j=0;
    const colegio = req.query.colegio;
    const curso = req.query.curso;
    console.log('COLEGIO: '+colegio);
    console.log('CURSO: '+curso);
    Colegio_Curso_Paralelo.findAll({
        where: {CODIGO_COLEGIO:colegio}
    })
        .then(data =>{

            longitud = data.length -1;
            data.forEach(item =>{
                Curso_Paralelo.findOne({
                    where: {ID_CURSO_PARALELO:item.ID_CURSO_PARALELO}
                })
                    .then(dt =>{
                        cursosParalelo.push(dt);
                        if(i==longitud){

                            long = cursosParalelo.length -1;
                            cursosParalelo.forEach(item =>{
                                Paralelo.findOne({
                                    where: {CODIGO_PARALELO:item.CODIGO_PARALELO }
                                })
                                    .then(d =>{
                                        if(item.CODIGO_CURSO == curso){
                                            paralelos.push(d);
                                        }

                                        if(j==long){
                                           res.send(paralelos);
                                        }
                                        j++;
                                    })
                                    .catch(err =>{
                                        return err;
                                    });
                            });

                        }
                        i++;
                    })
                    .catch(err =>{
                        return err;
                    });
            });

        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving Colegio_Curso_Paralelo."
            });
        });
};


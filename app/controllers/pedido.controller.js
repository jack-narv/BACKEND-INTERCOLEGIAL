const { producto } = require("../models");
const db = require("../models");
const Pedido = db.pedido;
const Op = db.Sequelize.Op;
const Emisor = db.emisor;
const Curso_Paralelo = db.curso_paralelo;
const Curso = db.curso;
const Paralelo = db.paralelo;
const Pedido_Producto = db.pedido_producto;
const Producto_Cantidad = db.producto_cantidad;
const Producto = db.producto;


//Create and Save a new administrador
exports.create = (req, res) =>{
    //Validate request
   if(!req.body.MENSAJE){
       res.status(400).send({
           message: "Content can not be empty!"
       });
       return;
   }
   
    //Create a administrador
    const pedido ={
        CODIGO_PEDIDO: req.body.CODIGO_PEDIDO,
        CODIGO_RECEPTOR: req.body.CODIGO_RECEPTOR,
        CODIGO_EMISOR: req.body.CODIGO_EMISOR,
        ID_ADMIN: req.body.ID_ADMIN,
        ESTADO: req.body.ESTADO,
        MENSAJE: req.body.MENSAJE,
        FECHA_PEDIDO: req.body.FECHA_PEDIDO
    };
    
    //Save administrador in the database
    Pedido.create(pedido)
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the pedido."
        });
    });
};

//Retreive all administradors from the database.
exports.findAll = (req,res) =>{
    const codigo_pedido = req.query.codigo_pedido;
    var condition = codigo_pedido?{codigo_pedido:{[Op.like]:`%${codigo_pedido}%`}}:null;

    Pedido.findAll({where: condition})
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving pedidos."
            });
        });
};

exports.findByAdmin = (req,res) =>{
    const admin = req.query.admin;

    Pedido.findAll({where: {
        ID_ADMIN: admin
       }})
        .then(data =>{
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving pedidos."
            });
        });
};

exports.findPedidosCompletos = (req,res) =>{
    
    var i =0;
    var j=0;
    const todosPedidos = [];


    const admin = req.query.admin;
    
    Pedido.findAll({where: {
        ID_ADMIN: admin
       }})
        .then(pedidos =>{

            long = pedidos.length-1;
            pedidos.map(pedido =>{
                var pedidoCompleto = {
                    codigo_pedido: '',
                    estado: null,
                    fecha_pedido: '',
                    mensaje_pedido: '',
                    nombre_emisor: '',
                    apellido_emisor: '',
                    correo_emisor: '',
                    curso: '',
                    paralelo: '',
                    productos: []
                }    
                Emisor.findByPk(pedido.CODIGO_EMISOR)
                .then(emisor =>{

                    pedidoCompleto.codigo_pedido = pedido.CODIGO_PEDIDO;
                    pedidoCompleto.estado = pedido.ESTADO;
                    pedidoCompleto.fecha_pedido = pedido.FECHA_PEDIDO;
                    pedidoCompleto.mensaje_pedido = pedido.MENSAJE;
                    pedidoCompleto.nombre_emisor = emisor.NOMBRE_EMISOR;
                    pedidoCompleto.apellido_emisor = emisor.APELLIDO_EMISOR;
                    pedidoCompleto.correo_emisor = emisor.CORREO_EMISOR;

                        Curso_Paralelo.findByPk(emisor.ID_CURSO_PARALELO)
                            .then(curso_paralelo =>{
                                Curso.findByPk(curso_paralelo.CODIGO_CURSO)
                                .then(curso =>{
                                    pedidoCompleto.curso = curso.NOMBRE_CURSO;       
                                    Paralelo.findByPk(curso_paralelo.CODIGO_PARALELO)
                                    .then(paralelo =>{

                                        pedidoCompleto.paralelo = paralelo.NOMBRE_PARALELO;

                                        Pedido_Producto.findAll({where: {
                                            CODIGO_PEDIDO: pedido.CODIGO_PEDIDO
                                           }})
                                            .then(pedidos_productos =>{
                                                var j=0;
                                                long2 = pedidos_productos.length-1;
                                                pedidos_productos.map(pedido_producto=>{
                                                    var productitos = {
                                                        producto:'',
                                                        cantidad: 0, 
                                                        precio: 0,
                                                        total: 0
                                                    }
                                                    Producto_Cantidad.findByPk(pedido_producto.ID_PRODUCTO_CANTIDAD)
                                                        .then(producto_cantidad =>{
                                                            productitos.cantidad = producto_cantidad.CANTIDAD_PRODUCTO;
                                                            Producto.findByPk(producto_cantidad.CODIGO_PRODUCTO)
                                                            .then(producto =>{
                                                                productitos.producto = producto.NOMBRE_PRODUCTO;
                                                                productitos.precio = producto.PRECIO_PRODUCTO;
                                                                productitos.total = productitos.cantidad * productitos.precio;
                                                                pedidoCompleto.productos.push(productitos);
                                                                console.log('long2: '+long2);
                                                                console.log('j: '+j);
                                                                console.log('PRODUCTS: '+pedidoCompleto.productos);
                                                                    if(j==long2){
                                                                        todosPedidos.push(pedidoCompleto);
                                                                        console.log(todosPedidos);
                        
                                                                        if(i==long){
                                                                            res.send(todosPedidos);
                                                                        }
                                                                        i++;
                                                                    }
                                                                    j++;
                                                                
                                                            })
                                                            .catch(err =>{
                                                                res.status(500).send({
                                                                    message: "Error retrieving producto with id="+ producto_cantidad.CODIGO_PRODUCTO
                                                                });
                                                            });
                                                        })
                                                        .catch(err =>{
                                                            res.status(500).send({
                                                                message:
                                                                    err.message || "Error retrieving producto_cantidad with id="+ pedido_producto.ID_PRODUCTO_CANTIDAD
                                                            });
                                                        });
                                                });
                                                               
                                            })
                                            .catch(err =>{
                                                res.status(500).send({
                                                    message:
                                                        err.message || "Some error ocurred while retrieving pedidos_productos."
                                                });
                                            });

                                        
                                    })
                                    .catch(err =>{
                                        res.status(500).send({
                                            message: "Error retrieving paralelo with id="+ curso_paralelo.CODIGO_PARALELO
                                        });
                                    });
                                })
                                .catch(err =>{
                                    res.status(500).send({
                                        message: "Error retrieving curso with id="+ curso_paralelo.CODIGO_CURSO
                                    });
                                });
                                
                            })
                            .catch(err =>{
                                res.status(500).send({
                                    message: "Error retrieving curso_paralelo with id="+ emisor.ID_CURSO_PARALELO
                                });
                            });
                })
                .catch(err =>{
                    res.status(500).send({
                        message: "Error retrieving emisor with id="+ id
                    });
                });
              
               
            });
            
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while retrieving pedidos."
            });
        });
};

//Find a single administrador with an id
exports.findOne = (req, res) =>{
    const id = req.params.id;
    Pedido.findByPk(id)
        .then(data =>{
            
            res.send(data);
        })
        .catch(err =>{
            res.status(500).send({
                message: "Error retrieving pedido with id="+ id
            });
        });
};

//Find a single administrador with an correo
exports.findOneEmisor = (req, res) =>{
    const emisor = req.params.emisor;
    Pedido.findOne({ where: {
        CODIGO_EMISOR: emisor
       }
   })
    .then(data =>{
        res.send(data);
   })
   .catch(err =>{
       res.status(500).send({
           message:
               err.message || "Some error ocurred while retrieving pedido."
       });
   });
};

// Update a administrador by the id in the request
exports.update = (req, res) =>{
    const id = req.params.id;
    console.log("FECHA: "+req.body.FECHA_PEDIDO);
    Pedido.update(req.body,{
        where: {CODIGO_PEDIDO:id}
    })
        .then(num =>{
            if(num == 1){
                res.send({
                    message: "pedido was update succesfully."
                });
            } else{
                res.send({
                    message: `Cannot update pedido with id=${id}. Maybe pedido was not found or req.body is empty.`
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message:"Error updating pedido with id="+ id
            });
        });
};

// Delete a administrador with the specified id in the request
exports.delete = (req, res) =>{
    const id = req.params.id;

    Pedido.destroy({
        where: {CODIGO_PEDIDO:id}
    })
        .then(num =>{
            if(num == 1){
                res.send({
                    message: "pedido was deleted successfully!"
                });
            }else{
                res.send({
                    message: `Cannot delete pedido with id=${id}. Maybe pedido was not found!`
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete pedido with id="+ id
            });
        });
};

// Delete all administradors from the database.
exports.deleteAll = (req, res) =>{
    Pedido.destroy({
        where: {},
        truncate: false
    })
        .then(nums =>{
            res.send({message: `${nums} pedido were deleted successfully!`});
        })
        .catch(err =>{
            res.status(500).send({
                message:
                    err.message || "Some error ocurred while removing all pedidos."
            });
        });
};


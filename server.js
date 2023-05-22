const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "*",
    credentials:false,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
};

app.use(cors(corsOptions));

//parse request of content-type - aplication/json
app.use(bodyParser.json());

//parse requests of content-type - apllication/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));

const db = require("./app/models");

db.sequelize.sync();

// drop the table if it already exists
// db.sequelize.sync({force:true}).then(()=>{
//    console.log("Drop and re-sync db.");
// });

//simple route
app.get("/",(req,res)=>{
    res.json({message:"Bienvenido al Backend de Intercolegial de Navidad"});
});

require("./app/routes/emisor.routes")(app);
require("./app/routes/receptor.routes")(app);
require("./app/routes/producto.routes")(app);
require("./app/routes/colegio.routes")(app);
require("./app/routes/admin_colegio.routes")(app);
require("./app/routes/paralelo.routes")(app);
require("./app/routes/pedido.routes")(app);
require("./app/routes/curso_paralelo.routes")(app);
require("./app/routes/producto_cantidad.routes")(app);
require("./app/routes/pedido_producto.routes")(app);
require("./app/routes/colegio_curso_paralelo.routes")(app);
require("./app/routes/curso.routes")(app);
require("./app/routes/correo.routes")(app);

// set port, listen for request
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
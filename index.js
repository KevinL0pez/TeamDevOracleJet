const express = require("express");
const app = express();
const db = require('./models');
cors = require('cors');
bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use('/registro' , require('./routes/registro'));
app.use('/obtener', require('./routes/registro'));


db.sequelize
.sync({ force: false })
.then( () => console.log('Conectado a la base de datos con sequalize-oracle'))
.catch((e) => console.log(`Error en la conexion de la DB => ${e}`))

const port = process.env.port || 80;
app.listen(port, () => console.log(`Escuchando en el puerto: ${port}`));

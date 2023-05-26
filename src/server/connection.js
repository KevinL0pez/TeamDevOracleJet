const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const service = require('./services/buildforms')
const messages = require("../constant/messages");
const listEndpoints = require('express-list-endpoints');

// Configuración de Express
app.use(cors());
app.use(express.json());
app.use(express.static('public'));


 // Rutas de tu microservicio
 app.get("/", (req, res) => {
  // const homePage = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  res.sendFile(__dirname + '/app.html');
});

app.get('/app.css', (req, res) => {
  res.set('Content-Type', 'text/css');
  res.sendFile(__dirname + '/app.css');
});

app.get("/servicios", (req, res) => {
  res.send(endpoints)
})

app.get("/consultarInformacionDifunto", async (req, res) => {
  try {
    const resultadosFormateados = await service.consultarInformacionDifunto();
    res.status(200).json({
      code: 0,
      data: resultadosFormateados,
      messages: [messages.SUCCES],
      success: true,
      status: 200
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 1,
      messages: [messages.ERROR],
      success: false,
      status: 500
    });
  }
});

app.post('/registrarInformacion', async (req, res) => {
  const body = req.body;
  try {
    const resultado = await service.crearDatosDifunto(body);
    console.log(resultado);
    res.status(201).json({
      messages: ['Se registro correctamente los datos.'],
      success: true,
      status: 201
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 1,
      messages: ['Error al registrar los datos.'],
      success: false,
      status: 500
    });
  }
});

app.get("/paises", async (req, res) => {
  try {
    const resultadosFormateados = await service.getPaises();
    res.status(200).json({
      code: 0,
      data: resultadosFormateados,
      messages: [messages.SUCCES],
      success: true,
      status: 200
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 1,
      messages: [messages.ERROR],
      success: false,
      status: 500
    });
  }
});

app.get("/departamentos", async (req, res) => {
  // var idPais = req.params.idPais;
  var idPais = req.query.idPais;
  try {
    const resultadosFormateados = await service.getDepartamentos(idPais);
    res.status(200).json({
      code: 0,
      data: resultadosFormateados,
      messages: [messages.SUCCES],
      success: true,
      status: 200
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 1,
      messages: [messages.ERROR],
      success: false,
      status: 500
    });
  }
});

app.get("/ciudades", async (req, res) => {
  // var idPais = req.params.idPais;
  var idDepartamento = req.query.idDepartamento;
  try {
    const resultadosFormateados = await service.getCiudades(idDepartamento);
    res.status(200).json({
      code: 0,
      data: resultadosFormateados,
      messages: [messages.SUCCES],
      success: true,
      status: 200
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 1,
      messages: [messages.ERROR],
      success: false,
      status: 500
    });
  }
});

app.get("/divisionMunicipal", async (req, res) => {
  // var idPais = req.params.idPais;
  var idCiudad = req.query.idCiudad;
  try {
    const resultadosFormateados = await service.getDivisionMunicipal(idCiudad);
    res.status(200).json({
      code: 0,
      data: resultadosFormateados,
      messages: [messages.SUCCES],
      success: true,
      status: 200
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 1,
      messages: [messages.ERROR],
      success: false,
      status: 500
    });
  }
});

app.get("/estadoCivil", async (req, res) => {
  try {
    const resultadosFormateados = await service.getEstadoCivil();
    res.status(200).json({
      code: 0,
      data: resultadosFormateados,
      messages: [messages.SUCCES],
      success: true,
      status: 200
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 1,
      messages: [messages.ERROR],
      success: false,
      status: 500
    });
  }
});

app.get("/estrato", async (req, res) => {
  try {
    const resultadosFormateados = await service.getEstrato();
    res.status(200).json({
      code: 0,
      data: resultadosFormateados,
      messages: [messages.SUCCES],
      success: true,
      status: 200
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 1,
      messages: [messages.ERROR],
      success: false,
      status: 500
    });
  }
});

app.get("/genero", async (req, res) => {
  try {
    const resultadosFormateados = await service.getGenero();
    res.status(200).json({
      code: 0,
      data: resultadosFormateados,
      messages: [messages.SUCCES],
      success: true,
      status: 200
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 1,
      messages: [messages.ERROR],
      success: false,
      status: 500
    });
  }
});

app.get("/allDepartments", async (req, res) => {
  try {
    const resultadosFormateados = await service.obtenerAllDepartments();
    res.status(200).json({
      code: 0,
      data: resultadosFormateados,
      messages: [messages.SUCCES],
      success: true,
      status: 200
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 1,
      messages: [messages.ERROR],
      success: false,
      status: 500
    });
  }
});


// Obtiene la lista de todos los endpoints disponibles
const endpoints = listEndpoints(app);

// Imprime la lista de endpoints disponibles en la consola
// console.log(endpoints);

// Iniciar la aplicación
app.listen(port, () => {
  console.log(
    `El microservicio está corriendo en el puerto http://localhost:${port}`
  );
});
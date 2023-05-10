const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const oracledb = require("oracledb");
const messages = require("../constant/messages");
const variables = require("../constant/variables");
const listEndpoints = require('express-list-endpoints');
// const fs = require('fs');
// const path = require('path');

// Configuración de Express
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

async function run() {
  let connection;

  try {
    
    connection = await oracledb.getConnection({
      user: variables.USER,
      password: variables.PASSWORD,
      connectString: variables.CONNECTSTRING,
    });
    console.log("Conectado a Base de datos de Oracle.");
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

    const consultarInformacionDifunto = async () => {
      try {
        const sql = `SELECT IFD.DNI, IFD.NOMBRES, IFD.PRIMER_APELLIDO, IFD.SEGUNDO_APELLIDO, 
        ES.NOMBRE_ESTRATO  AS ESTRATO_ECONOMICO, IFD.NOM_APELL_FAMILIAR, 
        P.NOMBRE_PAIS AS PAIS_RESIDENCIA, D.NOMBRE_DEPARTAMENTO AS DEPARTAMENTO_RESIDENCIA, 
        C.NOMBRE_CIUDAD AS MUNICIPIO_RESIDENCIA,IFD.DIRECCION 
        FROM INFORMACION_DIFUNTO IFD
        JOIN ESTRATOS_SOCIOECONOMICOS ES ON IFD.ESTRATO_ECONOMICO = ES.ESTRATO
        JOIN PAIS P ON IFD.PAIS_RESIDENCIA = P.REFERENCIA_PAIS  
        JOIN DEPARTAMENTO D ON IFD.DEPARTAMENTO_RESIDENCIA = D.RELACION_DEPARTAMENTO  
        JOIN CIUDAD C ON IFD.MUNICIPIO_RESIDENCIA = C.CIUDAD_PK`;
        const result = await connection.execute(sql);
        const resultadosFormateados = result.rows.map(
          ([
            dni,
            nombres,
            primerApellido,
            segundoApellido,
            estrato,
            nomapellFamiliar,
            paisResidencia,
            departamentoResidencia,
            municipioResidencia,
            direccion,
          ]) => ({
            dni,
            nombres,
            primerApellido,
            segundoApellido,
            estrato,
            nomapellFamiliar,
            paisResidencia,
            departamentoResidencia,
            municipioResidencia,
            direccion
          })
        );
        return resultadosFormateados;
      } catch (error) {
        console.error(error);
        throw new Error("Ocurrió un error en la consulta.");
      }
    }

    app.get("/consultarInformacionDifunto", async (req, res) => {
      try {
        const resultadosFormateados = await consultarInformacionDifunto();
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

    const crearDatosDifunto = async ({ primerApellido, segundoApellido, nombres, sexo, fechaNacimiento, estadoCivil, ocupacion, paisResidencia, departamentoResidencia, municipioResidencia, divisionMunicipal, direccion, numeroIdentificacion, nacionalidadFamiliar, nomapellfamiliar, estratoEconomico }) => {
      try {
        const sql = `INSERT INTO INFORMACION_DIFUNTO
          (DNI, PRIMER_APELLIDO, SEGUNDO_APELLIDO, NOMBRES, GENERO, FECHA_NACIMIENTO, ESTADO_CIVIL, OCUPACION, 
          PAIS_RESIDENCIA, DEPARTAMENTO_RESIDENCIA, MUNICIPIO_RESIDENCIA, DIVISION_MUNICIPAL, DIRECCION, 
          NACIONALIDAD_FAMILIAR, NOM_APELL_FAMILIAR, ESTRATO_ECONOMICO)
          VALUES (:1, :2, :3, :4, :5, TO_DATE(:6, 'YYYY-MM-DD'), :7, :8, :9, :10, :11, :12, :13, :14, :15, :16)`;
        const bindParams = [
          numeroIdentificacion,
          primerApellido,
          segundoApellido,
          nombres,
          sexo,
          fechaNacimiento,
          estadoCivil,
          ocupacion,
          paisResidencia,
          departamentoResidencia,
          municipioResidencia,
          divisionMunicipal,
          direccion,
          nacionalidadFamiliar,
          nomapellfamiliar,
          estratoEconomico
        ];
        const result = await connection.execute(sql, bindParams);
        connection.commit();
        console.log('Registro creado con éxito');
        return result;
      } catch (error) {
        console.error(error);
        throw new Error("No se pudo registrar los datos, comprueba el registro.");
      }
    };
    
    app.post('/registrarInformacion', async (req, res) => {
      const body = req.body;
      try {
        const resultado = await crearDatosDifunto(body);
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

    const getPaises = async () => {
      try {
        const result = await connection.execute("SELECT REFERENCIA_PAIS, NOMBRE_PAIS FROM PAIS");
        const resultadosFormateados = result.rows.map(([value, label]) => ({ value, label }));
        return resultadosFormateados;
      } catch (err) {
        console.error(err);
        throw new Error("Error al obtener los países");
      }
    };
    
    app.get("/paises", async (req, res) => {
      try {
        const resultadosFormateados = await getPaises();
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
    // do something with the connection

    const getDepartamentos = async (idPais) => {
      try {
        const result = await connection.execute(
          `SELECT DEPARTAMENTO_PK, NOMBRE_DEPARTAMENTO FROM DEPARTAMENTO d WHERE d.PAIS_FK = ${idPais}`
        );
        const resultadosFormateados = result.rows.map(([value, label]) => ({ value, label }));
        return resultadosFormateados;
      } catch (err) {
        console.error(err);
        throw new Error("Error al obtener los departamentos");
      }
    };

    app.get("/departamentos", async (req, res) => {
      // var idPais = req.params.idPais;
      var idPais = req.query.idPais;
      try {
        const resultadosFormateados = await getDepartamentos(idPais);
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

    const getCiudades = async (idDepartamento) => {
      try {
        const result = await connection.execute(
          `SELECT CIUDAD_PK, NOMBRE_CIUDAD FROM CIUDAD c WHERE c.DEPARTAMENTO_FK = ${idDepartamento}`
        );
        const resultadosFormateados = result.rows.map(([value, label]) => ({ value, label }));
        return resultadosFormateados;
      } catch (err) {
        console.error(err);
        throw new Error("Error al obtener las ciudades");
      }
    };

    app.get("/ciudades", async (req, res) => {
      // var idPais = req.params.idPais;
      var idDepartamento = req.query.idDepartamento;
      try {
        const resultadosFormateados = await getCiudades(idDepartamento);
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

    const getDivisionMunicipal = async (idCiudad) => {
      try {
        const result = await connection.execute(
          `SELECT DIVISION_PK , NOMBRE_DIVISION, DESCRIPCION FROM DIVISION_MUNICIPAL dm WHERE dm.CIUDAD_FK = ${idCiudad}`
        );
        const resultadosFormateados = result.rows.map(([value, division, descripcion]) => ({ value, label: `${division}: ${descripcion}` }));
        return resultadosFormateados;
      } catch (err) {
        console.error(err);
        throw new Error("Error al obtener la división municipal");
      }
    };

    app.get("/divisionMunicipal", async (req, res) => {
      // var idPais = req.params.idPais;
      var idCiudad = req.query.idCiudad;
      try {
        const resultadosFormateados = await getDivisionMunicipal(idCiudad);
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
    
    const getEstadoCivil = async () => {
      try {
        const result = await connection.execute(
          `SELECT ESTADOS_CIVIL_PK, NOMBRE_ESTADO FROM ESTADO_CIVIL ORDER BY NOMBRE_ESTADO ASC`
        );
        const resultadosFormateados = result.rows.map(([value, label]) => ({ value, label }));
        return resultadosFormateados;
      } catch (err) {
        console.error(err);
        throw new Error("Error al obtener la división municipal");
      }
    };

    app.get("/estadoCivil", async (req, res) => {
      try {
        const resultadosFormateados = await getEstadoCivil();
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

    const getEstrato = async () => {
      try {
        const result = await connection.execute(
          `SELECT ESTRATO, NOMBRE_ESTRATO  FROM ESTRATOS_SOCIOECONOMICOS ORDER BY ESTRATO ASC`
        );
        const resultadosFormateados = result.rows.map(([value, label]) => ({ value, label: `${value} ${label}` }));
        return resultadosFormateados;
      } catch (err) {
        console.error(err);
        throw new Error("Error al obtener la división municipal");
      }
    };

    app.get("/estrato", async (req, res) => {
      try {
        const resultadosFormateados = await getEstrato();
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

    const getGenero = async () => {
      try {
        const result = await connection.execute(
          `SELECT ABREVIATURA, NOMBRE_GENERO FROM GENERO`
        );
        const resultadosFormateados = result.rows.map(([value, label]) => ({ value, label }));
        return resultadosFormateados;
      } catch (err) {
        console.error(err);
        throw new Error("Error al obtener la división municipal");
      }
    };

    app.get("/genero", async (req, res) => {
      try {
        const resultadosFormateados = await getGenero();
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

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        
        // await connection.close();
        // console.log("Connection closed");
      } catch (err) {
        await connection.close();
        console.log("Connection closed");
        console.error(err);
      }
    }
  }

  // Obtiene la lista de todos los endpoints disponibles
  const endpoints = listEndpoints(app);

  // Imprime la lista de endpoints disponibles en la consola
  console.log("endpoints", endpoints);

}

run();

// Iniciar la aplicación
app.listen(port, () => {
  console.log(
    `El microservicio está corriendo en el puerto http://localhost:${port}`
  );
});
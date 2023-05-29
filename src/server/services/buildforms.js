const express = require("express");
const cors = require("cors");
const app = express();
const database = require('../database')

// Configuración de Express
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let connection;

const getPaises = async () => {
    connection = await database.getConnection();
    if (connection) {
        try {
            const result = await connection.execute("SELECT REFERENCIA_PAIS, NOMBRE_PAIS FROM PAIS");
            const resultadosFormateados = result.rows.map(([value, label]) => ({ value, label }));
            return resultadosFormateados;
        } catch (err) {
            console.error(err);
            res.status(500).send("Error en el servidor");
        } finally {
            console.log("Cerrada la conexión a la Base de datos de Oracle.");
            await connection.close(); // Cerrar la conexión cuando se haya terminado de usar
        }
    } else {
        res.status(500).send("Error en la conexión a la base de datos");
    }
    
};

const consultarInformacionDifunto = async () => {
    connection = await database.getConnection();
    if (connection) {
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
        } finally {
            console.log("Cerrada la conexión a la Base de datos de Oracle.");
            await connection.close(); // Cerrar la conexión cuando se haya terminado de usar
        }
    } else {
        res.status(500).send("Error en la conexión a la base de datos");
    }
};

const getDepartamentos = async (idPais) => {
    connection = await database.getConnection();
    if (connection) {
        try {
          const result = await connection.execute(
            `SELECT DEPARTAMENTO_PK, NOMBRE_DEPARTAMENTO FROM DEPARTAMENTO d WHERE d.PAIS_FK = ${idPais}`
          );
          const resultadosFormateados = result.rows.map(([value, label]) => ({ value, label }));
          return resultadosFormateados;
        } catch (err) {
          console.error(err);
          throw new Error("Error al obtener los departamentos");
        } finally {
            console.log("Cerrada la conexión a la Base de datos de Oracle.");
            await connection.close(); // Cerrar la conexión cuando se haya terminado de usar
        }
    } else {
        res.status(500).send("Error en la conexión a la base de datos");
    }
};

const getCiudades = async (idDepartamento) => {
    connection = await database.getConnection();
    if (connection) {
        try {
          const result = await connection.execute(
            `SELECT CIUDAD_PK, NOMBRE_CIUDAD FROM CIUDAD c WHERE c.DEPARTAMENTO_FK = ${idDepartamento}`
          );
          const resultadosFormateados = result.rows.map(([value, label]) => ({ value, label }));
          return resultadosFormateados;
        } catch (err) {
          console.error(err);
          throw new Error("Error al obtener las ciudades");
        } finally {
            console.log("Cerrada la conexión a la Base de datos de Oracle.");
            await connection.close(); // Cerrar la conexión cuando se haya terminado de usar
        }
    } else {
        res.status(500).send("Error en la conexión a la base de datos");
    }
};

const getDivisionMunicipal = async (idCiudad) => {
    connection = await database.getConnection();
    if (connection) {
        try {
          const result = await connection.execute(
            `SELECT DIVISION_PK , NOMBRE_DIVISION, DESCRIPCION FROM DIVISION_MUNICIPAL dm WHERE dm.CIUDAD_FK = ${idCiudad}`
          );
          const resultadosFormateados = result.rows.map(([value, division, descripcion]) => ({ value, label: `${division}: ${descripcion}` }));
          return resultadosFormateados;
        } catch (err) {
          console.error(err);
          throw new Error("Error al obtener la división municipal");
        } finally {
            console.log("Cerrada la conexión a la Base de datos de Oracle.");
            await connection.close(); // Cerrar la conexión cuando se haya terminado de usar
        }
    } else {
        res.status(500).send("Error en la conexión a la base de datos");
    }
};

const getEstadoCivil = async () => {
    connection = await database.getConnection();
    if (connection) {
        try {
          const result = await connection.execute(
            `SELECT ESTADOS_CIVIL_PK, NOMBRE_ESTADO FROM ESTADO_CIVIL ORDER BY NOMBRE_ESTADO ASC`
          );
          const resultadosFormateados = result.rows.map(([value, label]) => ({ value, label }));
          return resultadosFormateados;
        } catch (err) {
          console.error(err);
          throw new Error("Error al obtener el Estado Civil");
        } finally {
            console.log("Cerrada la conexión a la Base de datos de Oracle.");
            await connection.close(); // Cerrar la conexión cuando se haya terminado de usar
        }
    } else {
        res.status(500).send("Error en la conexión a la base de datos");
    }
};

const getEstrato = async () => {
    connection = await database.getConnection();
    if (connection) {
        try {
          const result = await connection.execute(
            `SELECT ESTRATO, NOMBRE_ESTRATO FROM ESTRATOS_SOCIOECONOMICOS ORDER BY ESTRATO ASC`
          );
          const resultadosFormateados = result.rows.map(([value, label]) => ({ value, label: `${value} ${label}` }));
          return resultadosFormateados;
        } catch (err) {
          console.error(err);
          throw new Error("Error al obtener el Estrato");
        } finally {
            console.log("Cerrada la conexión a la Base de datos de Oracle.");
            await connection.close(); // Cerrar la conexión cuando se haya terminado de usar
        }
    } else {
        res.status(500).send("Error en la conexión a la base de datos");
    }
};

const getGenero = async () => {
    connection = await database.getConnection();
    if (connection) {
        try {
          const result = await connection.execute(
            `SELECT ABREVIATURA, NOMBRE_GENERO FROM GENERO`
          );
          const resultadosFormateados = result.rows.map(([value, label]) => ({ value, label }));
          return resultadosFormateados;
        } catch (err) {
          console.error(err);
          throw new Error("Error al obtener la división municipal");
        } finally {
            console.log("Cerrada la conexión a la Base de datos de Oracle.");
            await connection.close(); // Cerrar la conexión cuando se haya terminado de usar
        }
    } else {
        res.status(500).send("Error en la conexión a la base de datos");
    }
};

const crearDatosDifunto = async ({ primerApellido, segundoApellido, nombres, sexo, fechaNacimiento, estadoCivil, ocupacion, paisResidencia, departamentoResidencia, municipioResidencia, divisionMunicipal, direccion, numeroIdentificacion, nacionalidadFamiliar, nomapellfamiliar, estratoEconomico }) => {
    connection = await database.getConnection();
    if (connection) {
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
        } finally {
            console.log("Cerrada la conexión a la Base de datos de Oracle.");
            await connection.close(); // Cerrar la conexión cuando se haya terminado de usar
        }
    } else {
        res.status(500).send("Error en la conexión a la base de datos");
    }
};

const obtenerAllDepartments = async () => {

  connection = await database.getConnection();
  if (connection) {
    try {

      const sql = `SELECT p.*, r.CODE AS ALIVECODE, r.ID AS ALIVEID, r.INE AS ALIVEINE, r.NAME AS ALIVENAME, r.STATE AS ALIVESTATE,
      rw.CODE AS READANDWRITECODE, rw.ID AS READANDWRITEID, rw.INE AS READANDWRITEINE, rw.NAME AS READANDWRITENAME, rw.STATE AS READANDWRITESTATE,
      idtp.CODE AS IDENTIFICATIONTYPECODE, idtp.ID AS IDENTIFICATIONTYPEID, idtp.NAME AS IDENTIFICATIONTYPENAME, idtp.STATE AS IDENTIFICATIONTYPESTATE,
      twd.CODE AS TOWNDIVISIONCODE, twd.ID AS TOWNDIVISIONID, twd.CITYID AS TOWNDIVISIONCITYID, twd.NAME AS TOWNDIVISIONNAME, twd.TOWNID AS TOWNDIVISIONTOWNID, rw.STATE AS TOWNDIVISIONSTATE,
      ct.CODE AS COUNTRYCODE, ct.ID AS COUNTRYID, ct.NAME AS COUNTRYNAME, ct.NATIONALITY AS COUNTRYNATIONALITY, ct.STATE AS COUNTRYSTATE,
      tw.CODE AS TOWNRESIDENCECODE, tw.ID AS TOWNRESIDENCEID, tw.DEPARTAMENTID as TOWNRESIDENCEDEPARTAMENTID, tw.NAME AS TOWNRESIDENCENAME, tw.STATE AS TOWNRESIDENCESTATE,
      ctr.CODE AS COUNTRYRESIDENCECODE, ctr.ID AS COUNTRYRESIDENCEID, ctr.NAME AS COUNTRYRESIDENCENAME, ctr.NATIONALITY AS COUNTRYRESIDENCENATIONALITY, ctr.STATE AS COUNTRYRESIDENCESTATE,
      dpt.CODE AS DEPARTAMENTRESIDENCECODE, dpt.COUNTRYCODE AS DEPARTAMENTRESIDENCECOUNTRYCODE, dpt.ID AS DEPARTAMENTRESIDENCEID, dpt.NAME AS DEPARTAMENTRESIDENCENAME, dpt.STATE AS DEPARTAMENTRESIDENCESTATE,
      atb.CODE AS ACTIVITYATBIRTHCODE, atb.ID AS ACTIVITYATBIRTHID, atb.INE AS ACTIVITYATBIRTHINE, atb.NAME AS ACTIVITYATBIRTHNAME, atb.STATE AS ACTIVITYATBIRTHSTATE,
      mst.CODE AS CONJUGALSTATECODE, mst.ID AS CONJUGALSTATEID, mst.INE AS CONJUGALSTATEINE, mst.NAME AS CONJUGALSTATENAME, mst.STATE AS CONJUGALSTATESTATE,
      msts.CODE AS MARITALSTATUSCODE, msts.ID AS MARITALSTATUSID, msts.INE AS MARITALSTATUSINE, msts.NAME AS MARITALSTATUSNAME, msts.STATE AS MARITALSTATUSSTATE,
      ocpt.CODE AS OCCUPATIONCODE, ocpt.ID AS OCCUPATIONID, ocpt.NAME AS OCCUPATIONNAME, ocpt.STATE AS OCCUPATIONSTATE,
      ocptcat.CODE AS OCCUPATIONALCATEGORYCODE, ocptcat.ID AS OCCUPATIONALCATEGORYID, ocptcat.INE AS OCCUPATIONALCATEGORYINE, ocptcat.NAME AS OCCUPATIONALCATEGORYNAME, ocptcat.STATE AS OCCUPATIONALCATEGORYSTATE,
      ppgp.CODE AS POPULATIONGROUPCODE, ppgp.ID AS POPULATIONGROUPID, ppgp.INE AS POPULATIONGROUPINE, ppgp.NAME AS POPULATIONGROUPNAME, ppgp.STATE AS POPULATIONGROUPSTATE,
      stlvl.CODE AS STUDYLEVELCODE, stlvl.ID AS STUDYLEVELID, stlvl.INE AS STUDYLEVELINE, stlvl.NAME AS STUDYLEVELNAME, stlvl.STATE AS STUDYLEVELSTATE
      FROM PERSON p
      INNER JOIN STATEOFLIFE r ON p.ALIVE = r.ID
      INNER JOIN READANDWRITE rw ON p.READANDWRITE = rw.ID
      INNER JOIN IDENTIFICATIONTYPE idtp ON p.IDENTIFICATIONTYPE = idtp.ID
      INNER JOIN TOWNDIVISION twd ON p.TOWNDIVISIONRESIDENCE = twd.ID
      INNER JOIN COUNTRY ct ON p.NATIONALITY = ct.ID
      INNER JOIN TOWN tw ON p.TOWNRESIDENCE = tw.ID
      INNER JOIN COUNTRY ctr ON p.COUNTRYRESIDENCE = ctr.ID
      INNER JOIN DEPARTAMENT dpt ON p.DEPARTAMENTRESIDENCE = dpt.ID
      INNER JOIN ACTIVITYATBIRTH atb ON p.ACTIVITYATBIRTH = atb.ID
      INNER JOIN MARITALSTATE mst ON p.CONJUGALSTATE = mst.ID
      INNER JOIN MARITALSTATE msts ON p.MARITALSTATUS = msts.ID
      INNER JOIN OCCUPATION ocpt ON p.OCCUPATION = ocpt.ID
      INNER JOIN OCCUPATIONALCATEGORY ocptcat ON p.OCCUPATIONALCATEGORY = ocptcat.ID
      INNER JOIN POPULATIONGROUP ppgp ON p.POPULATIONGROUP = ppgp.ID
      INNER JOIN STUDYLEVEL stlvl ON p.STUDYLEVEL = stlvl.ID`;

      const result = await connection.execute(sql);

      const metaData = result.metaData;
      const rows = result.rows;

      const dataStructured = [];

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const obj = {};
      
        for (let j = 0; j < metaData.length; j++) {
          const key = metaData[j].name;
          const value = row[j];
          obj[key] = value;
        }
        
        dataStructured.push(obj);
      }

      dataStructured.map((item) => {

        if (item.ALIVE) {
          const alive = {
            CODE: item.ALIVECODE,
            ID: item.ALIVEID,
            INE: item.ALIVEINE,
            NAME: item.ALIVENAME,
            STATE: item.ALIVESTATE
          };
          delete item.ALIVECODE;
          delete item.ALIVEID;
          delete item.ALIVEINE;
          delete item.ALIVENAME;
          delete item.ALIVESTATE;
          item.ALIVE = alive;
        }
        if(item.READANDWRITE) {
          const readandwrite = {
            CODE: item.READANDWRITECODE,
            ID: item.READANDWRITEID,
            INE: item.READANDWRITEINE,
            NAME: item.READANDWRITENAME,
            STATE: item.READANDWRITESTATE
          };
          delete item.READANDWRITECODE;
          delete item.READANDWRITEID;
          delete item.READANDWRITEINE;
          delete item.READANDWRITENAME;
          delete item.READANDWRITESTATE;
          item.READANDWRITE = readandwrite;
        }
        if(item.IDENTIFICATIONTYPE) {
          const identificationType = {
            CODE: item.IDENTIFICATIONTYPECODE,
            ID: item.IDENTIFICATIONTYPEID,
            INE: item.IDENTIFICATIONTYPEINE,
            NAME: item.IDENTIFICATIONTYPENAME,
            STATE: item.IDENTIFICATIONTYPESTATE
          };
          delete item.IDENTIFICATIONTYPECODE;
          delete item.IDENTIFICATIONTYPEID;
          delete item.IDENTIFICATIONTYPEINE;
          delete item.IDENTIFICATIONTYPENAME;
          delete item.IDENTIFICATIONTYPESTATE;
          item.IDENTIFICATIONTYPE = identificationType;
        }
        if(item.TOWNDIVISIONRESIDENCE) {
          const townDivision = {
            CODE: item.TOWNDIVISIONCODE,
            ID: item.TOWNDIVISIONID,
            CITYID: item.TOWNDIVISIONCITYID,
            TOWNID: item.TOWNDIVISIONTOWNID,
            NAME: item.TOWNDIVISIONNAME,
            STATE: item.TOWNDIVISIONSTATE
          };
          delete item.TOWNDIVISIONCODE;
          delete item.TOWNDIVISIONID;
          delete item.TOWNDIVISIONCITYID;
          delete item.TOWNDIVISIONTOWNID;
          delete item.TOWNDIVISIONNAME;
          delete item.TOWNDIVISIONSTATE;
          item.TOWNDIVISIONRESIDENCE = townDivision;
        }
        if(item.NATIONALITY) {
          const nationality = {
            CODE: item.COUNTRYCODE,
            ID: item.COUNTRYID,
            NAME: item.COUNTRYNAME,
            NATIONALITY: item.COUNTRYNATIONALITY,
            STATE: item.COUNTRYSTATE
          };
          delete item.COUNTRYCODE;
          delete item.COUNTRYID;
          delete item.COUNTRYNATIONALITY;
          delete item.COUNTRYNAME;
          delete item.COUNTRYSTATE;
          item.NATIONALITY = nationality;
        }
        if(item.TOWNRESIDENCE) {
          const townResidence = {
            CODE: item.TOWNRESIDENCECODE,
            DEPARTMENTID: item.TOWNRESIDENCEDEPARTAMENTID,
            ID: item.TOWNRESIDENCEID,
            NAME: item.TOWNRESIDENCENAME,
            STATE: item.TOWNRESIDENCESTATE
          };
          delete item.TOWNRESIDENCECODE;
          delete item.TOWNRESIDENCEID;
          delete item.TOWNRESIDENCEDEPARTAMENTID;
          delete item.TOWNRESIDENCENAME;
          delete item.TOWNRESIDENCESTATE;
          item.TOWNRESIDENCE = townResidence;
        }
        if(item.COUNTRYRESIDENCE) {
          const countryResidence = {
            CODE: item.COUNTRYRESIDENCECODE,
            ID: item.COUNTRYRESIDENCEID,
            NAME: item.COUNTRYRESIDENCENAME,
            NATIONALITY: item.COUNTRYRESIDENCENATIONALITY,
            STATE: item.COUNTRYRESIDENCESTATE
          };
          delete item.COUNTRYRESIDENCECODE;
          delete item.COUNTRYRESIDENCEID;
          delete item.COUNTRYRESIDENCENATIONALITY;
          delete item.COUNTRYRESIDENCENAME;
          delete item.COUNTRYRESIDENCESTATE;
          item.COUNTRYRESIDENCE = countryResidence;
        }
        if(item.DEPARTAMENTRESIDENCE) {
          const departamentResidence = {
            CODE: item.DEPARTAMENTRESIDENCECODE,
            COUNTRYCODE: item.DEPARTAMENTRESIDENCECOUNTRYCODE,
            ID: item.DEPARTAMENTRESIDENCEID,
            NAME: item.DEPARTAMENTRESIDENCENAME,
            STATE: item.DEPARTAMENTRESIDENCESTATE
          };
          delete item.DEPARTAMENTRESIDENCECODE;
          delete item.DEPARTAMENTRESIDENCEID;
          delete item.DEPARTAMENTRESIDENCECOUNTRYCODE;
          delete item.DEPARTAMENTRESIDENCENAME;
          delete item.DEPARTAMENTRESIDENCESTATE;
          item.DEPARTAMENTRESIDENCE = departamentResidence;
        }
        if(item.ACTIVITYATBIRTH) {
          const activityatbirth = {
            CODE: item.ACTIVITYATBIRTHCODE,
            ID: item.ACTIVITYATBIRTHID,
            INE: item.ACTIVITYATBIRTHINE,
            NAME: item.ACTIVITYATBIRTHNAME,
            STATE: item.ACTIVITYATBIRTHSTATE
          };
          delete item.ACTIVITYATBIRTHCODE;
          delete item.ACTIVITYATBIRTHID;
          delete item.ACTIVITYATBIRTHINE;
          delete item.ACTIVITYATBIRTHNAME;
          delete item.ACTIVITYATBIRTHSTATE;
          item.ACTIVITYATBIRTH = activityatbirth;
        }
        if(item.CONJUGALSTATE) {
          const conjugalstate = {
            CODE: item.CONJUGALSTATECODE,
            ID: item.CONJUGALSTATEID,
            INE: item.CONJUGALSTATEINE,
            NAME: item.CONJUGALSTATENAME,
            STATE: item.CONJUGALSTATESTATE
          };
          delete item.CONJUGALSTATECODE;
          delete item.CONJUGALSTATEID;
          delete item.CONJUGALSTATEINE;
          delete item.CONJUGALSTATENAME;
          delete item.CONJUGALSTATESTATE;
          item.CONJUGALSTATE = conjugalstate;
        }
        if(item.MARITALSTATUS) {
          const maritalStatus = {
            CODE: item.MARITALSTATUSCODE,
            ID: item.MARITALSTATUSID,
            INE: item.MARITALSTATUSINE,
            NAME: item.MARITALSTATUSNAME,
            STATE: item.MARITALSTATUSSTATE
          };
          delete item.MARITALSTATUSCODE;
          delete item.MARITALSTATUSID;
          delete item.MARITALSTATUSINE;
          delete item.MARITALSTATUSNAME;
          delete item.MARITALSTATUSSTATE;
          item.MARITALSTATUS = maritalStatus;
        }
        if(item.OCCUPATION) {
          const occupation = {
            CODE: item.OCCUPATIONCODE,
            ID: item.OCCUPATIONID,
            NAME: item.OCCUPATIONNAME,
            STATE: item.OCCUPATIONSTATE
          };
          delete item.OCCUPATIONCODE;
          delete item.OCCUPATIONID;
          delete item.OCCUPATIONNAME;
          delete item.OCCUPATIONSTATE;
          item.OCCUPATION = occupation;
        }
        if(item.OCCUPATIONALCATEGORY) {
          const occupationalCategory = {
            CODE: item.OCCUPATIONALCATEGORYCODE,
            ID: item.OCCUPATIONALCATEGORYID,
            INE: item.OCCUPATIONALCATEGORYINE,
            NAME: item.OCCUPATIONALCATEGORYNAME,
            STATE: item.OCCUPATIONALCATEGORYSTATE
          };
          delete item.OCCUPATIONALCATEGORYCODE;
          delete item.OCCUPATIONALCATEGORYID;
          delete item.OCCUPATIONALCATEGORYINE;
          delete item.OCCUPATIONALCATEGORYNAME;
          delete item.OCCUPATIONALCATEGORYSTATE;
          item.OCCUPATIONALCATEGORY = occupationalCategory;
        }
        if(item.POPULATIONGROUP) {
          const populationGroup = {
            CODE: item.POPULATIONGROUPCODE,
            ID: item.POPULATIONGROUPID,
            INE: item.POPULATIONGROUPINE,
            NAME: item.POPULATIONGROUPNAME,
            STATE: item.POPULATIONGROUPSTATE
          };
          delete item.POPULATIONGROUPCODE;
          delete item.POPULATIONGROUPID;
          delete item.POPULATIONGROUPINE;
          delete item.POPULATIONGROUPNAME;
          delete item.POPULATIONGROUPSTATE;
          item.POPULATIONGROUP = populationGroup;
        }
        if(item.STUDYLEVEL) {
          const studyLevel = {
            CODE: item.STUDYLEVELCODE,
            ID: item.STUDYLEVELID,
            INE: item.STUDYLEVELINE,
            NAME: item.STUDYLEVELNAME,
            STATE: item.STUDYLEVELSTATE
          };
          delete item.STUDYLEVELCODE;
          delete item.STUDYLEVELID;
          delete item.STUDYLEVELINE;
          delete item.STUDYLEVELNAME;
          delete item.STUDYLEVELSTATE;
          item.STUDYLEVEL = studyLevel;
        }

      });
      connection.commit();
      console.log('Consulta realizada con exito');
      return dataStructured;
    } catch (error) {
      console.error(error);
      throw new Error("No se pudo realiozar la consulta, comprueba el registro.");
    } finally {
        console.log("Cerrada la conexión a la Base de datos de Oracle.");
        await connection.close(); // Cerrar la conexión cuando se haya terminado de usar
    }
  } else {
      res.status(500).send("Error en la conexión a la base de datos");
  }
};

module.exports = {
    getPaises,
    consultarInformacionDifunto,
    getDepartamentos,
    getCiudades,
    getDivisionMunicipal,
    getEstadoCivil,
    getEstrato,
    getGenero,
    crearDatosDifunto,
    obtenerAllDepartments
}
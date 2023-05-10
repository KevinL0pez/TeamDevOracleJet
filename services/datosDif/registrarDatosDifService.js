const db = require('../../models');

async function registrarDatDif(datos){
    console.log(datos);
    //console.log(db)

    return await db.datosdif.create(datos);

}

module.exports = { registrarDatDif }
const db = require('../../models');

async function findByUsername(nombre){
    console.log("Recibe: " + nombre);

    if(!nombre) throw new Error('Nombre de usuario no proporcionado');
    return await db.datosdif.findOne({
        where: {
            nombre
        }
    });
}

async function findEstadoCivil(){
    return await db.ESTADO_CIVIL.findAll();
}

module.exports = { findByUsername, findEstadoCivil }
const { registrarDatDif } = require ('../services/datosDif/registrarDatosDifService');
const { findByUsername, findEstadoCivil } = require ('../services/datosDif/find');


async function _registrarDatDif(datos){
    return await registrarDatDif(datos);
}

async function _findByUsername(nombre){
    return await findByUsername(nombre);

}

async function _findEstadoCivil(){
    return await findEstadoCivil();
}




module.exports = { _registrarDatDif, _findByUsername, _findEstadoCivil }
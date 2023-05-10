const Sequelize = require('sequelize-oracle');

module.exports = (sequalize, DataTypes) => {

    return sequalize.define('datosdif', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        primerApellido: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            len: [4, 10]
        },

        segundoApellido: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            len: [4, 10]

        },
        nombre: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            len: [4, 10]

        },
        sexo:{
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            len: [4, 10]
        },
        fechaNacimiento: {
            type: Sequelize.DATEONLY,
            required: true,
            allowNull: false,
            len: [4, 10]
        },
        estadoCivil: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            len: [4, 10]
        },
        ocupacion: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            len: [4, 10]
        }

    }, {
        underscore: true, // tipo de notacion que se utiliza al momento de creacion
        paranoid: true, // define que el nivel de las tablas no sea fisico sino logico
    })



}
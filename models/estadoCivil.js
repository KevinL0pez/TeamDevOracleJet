const Sequelize = require('sequelize-oracle');

module.exports = (sequalize, DataTypes) => {

    return sequalize.define('ESTADO_CIVIL', {
        ID: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        DESCRIPCION: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
        }

    }, {
        underscore: true, // tipo de notacion que se utiliza al momento de creacion
        paranoid: true, // define que el nivel de las tablas no sea fisico sino logico
    })



}
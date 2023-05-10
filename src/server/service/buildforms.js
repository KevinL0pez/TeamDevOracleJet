const database = require("../connection")
const express = require("express");
const app = express();

// Configuración de Express
app.use(cors());
app.use(express.json());

const getPaises = async () => {
    const connection = await database.getConnection();
    if (connection) {
        try {
            const result = await connection.execute("SELECT REFERENCIA_PAIS, NOMBRE_PAIS FROM PAIS");
            const resultadosFormateados = result.rows.map(([value, label]) => ({ value, label }));
            return resultadosFormateados;
        } catch (err) {
            console.error(err);
            res.status(500).send("Error en el servidor");
        } finally {
          await connection.close(); // Cerrar la conexión cuando se haya terminado de usar
        }
    } else {
        res.status(500).send("Error en la conexión a la base de datos");
    }
    
};

module.exports = {
    getPaises
}
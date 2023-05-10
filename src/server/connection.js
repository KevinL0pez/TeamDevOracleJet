const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const database = require("./database"); // Importar el módulo de la conexión

// Configuración de Express
app.use(cors());
app.use(express.json());

// Rutas de tu microservicio
app.get("/", (req, res) => {
  res.send("¡Microservicio funcionando!");
});

app.get("/empleados", async (req, res) => {
  const connection = await database.getConnection(); // Obtener la conexión
  if (connection) {
    try {
      // Consulta a la base de datos
      const result = await connection.execute("SELECT * FROM EMPLEADOS");
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error en el servidor");
    } finally {
      await connection.close(); // Cerrar la conexión cuando se haya terminado de usar
    }
  } else {
    res.status(500).send("Error en la conexión a la base de datos");
  }
});

// Iniciar la aplicación
app.listen(port, () => {
  console.log(
    `El microservicio está corriendo en el puerto http://localhost:${port}`
  );
});
const oracledb = require("oracledb");
const dbConfig = require("./dbconfig.js");

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const dbConnection = async (id) => {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: dbConfig.user,
      password: dbConfig.password,
      connectString: dbConfig.connectString,
    });

    console.log("Base de datos conectada");

    const result = await connection.execute(
      `SELECT * FROM USUARIOS WHERE ID= :id`,
      [1]
    );
    console.log(result.rows);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
};

dbConnection();

module.exports = {
  dbConnection,
};

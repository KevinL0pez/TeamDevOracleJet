const oracledb = require("oracledb");
const variables = require("../constant/variables");

async function getConnection() {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: variables.USER,
      password: variables.PASSWORD,
      connectString: variables.CONNECTSTRING,
    });
    console.log("Conectado a Base de datos de Oracle.");
    return connection;
  } catch (err) {
    console.error(err);
    return null;
  }
}

module.exports = {
  getConnection
};
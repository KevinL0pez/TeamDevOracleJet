const {conexiondb} = require("./db");


async function addPersonService(name, age) {
  let connection;
  try {
    connection = await conexiondb();
    const sql = `INSERT INTO PERSON (name, age) VALUES (:1, :2)`;
    const result = await connection.execute(sql, [name, age]);
    console.log(result.rowsAffected, 'rows inserted');
    connection.commit();
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
}

module.exports = { addPersonService };
const oracledb = require('oracledb');

async function conexiondb() {
    oracledb.initOracleClient({libDir: 'C:\\oracle\\instantclient_21_9'});
    const connection = await oracledb.getConnection({ user: "db_suban", password: "prueba123", connectionString: "localhost/xe" });
    return connection;
}

module.exports = { conexiondb };
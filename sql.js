const sql = require('mssql')


const sqlConfig = {
    user: 'database user',
    password: 'pwd',
    database: 'dbschame',
    server: 'address',
    connectionTimeout: 20000,
    requestTimeout: 20000,
    pool: {
        max: 800,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: false // change to true for local dev / self-signed certs
    }
}

function getDbResult(input) {
    return sql.connect(sqlConfig)
        .then(pool => {
            return pool.request()
                .input("dealer_id", sql.NVarChar, input.dealer_id)
                .query("select * from xxx where dealer_id = @dealer_id")
        })
        .then(result => {
            const isBuyCar = result.rowsAffected[0] > 0;
            return { ...input, isBuyCar: isBuyCar }
        }).catch(err => {
            console.log("error", err);
            return {...input, isBuyCar: 0};
        });
}

module.exports = { getDbResult }




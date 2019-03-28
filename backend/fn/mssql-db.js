var mssql  = require('mssql');

const dbConfig = {
        server: '112.78.2.80',
        user: 'phocbfd3_hiep',
        password: 'Hiep@123',
        host: 'localhost',
        database: 'phocbfd3_AmusementPark',
        port: 1433,
        
}

exports.load = sql => {
    return new Promise((resolve, reject) => {
       let connection =  new mssql.ConnectionPool(dbConfig);
       connection.connect()
        .then(pool => {
            pool.request().query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);

                }
                else {
                    // console.log('CHỖ NÀY LÀ BÊN FILE DB');
                    // console.log(result.recordset);
                    resolve(result.recordset)
                }
                connection.close();
            // .query không cần sử dụng .catch
            });
        }).catch(err => {
            console.log(err);

        })
    });
    
}


exports.insert = sql => {
    return new Promise((resolve, reject) => {
        let connection =  new mssql.ConnectionPool(dbConfig);
        connection.connect()
         .then(pool => {
             pool.request().query(sql, (err, result) => {
                 if (err) {
                     console.log(err);
                     reject(err);
 
                 }
                 else {
                     // console.log('CHỖ NÀY LÀ BÊN FILE DB');
                     // console.log(result.recordset);
                     resolve(result.recordset)
                 }
                 connection.close();
             // .query không cần sử dụng .catch
             });
         }).catch(err => {
             console.log(err);
 
         })
     });
     
}


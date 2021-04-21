const mysql=require('mysql');
const dbConfig = require("../config/db.config.js");

var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

connection.connect( 
    function(err){
        if (err) throw err;
        console.log('¡Conectado con éxito!');
    }
)

module.exports=connection;
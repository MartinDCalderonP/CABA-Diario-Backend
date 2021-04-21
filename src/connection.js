const mysql=require('mysql');

let connection=mysql.createConnection({
        host: 'us-cdbr-east-03.cleardb.com',
        user: 'b458e2f6897bf8',
        password: '950bb926',
        database: 'heroku_31a7777b0e1610b'
})

connection.connect( 
    function(err){
        if (err) throw err;
        console.log('¡Conectado con éxito!');
    }
)

module.exports=connection;
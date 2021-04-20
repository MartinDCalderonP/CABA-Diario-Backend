const mysql=require('mysql');

let connection=mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'caba_diario'
})

connection.connect( 
    function(err){
        if (err) throw err;
        console.log('¡Conectado con éxito!');
    }
)

module.exports=connection;
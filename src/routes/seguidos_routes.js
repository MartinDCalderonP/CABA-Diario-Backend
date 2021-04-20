const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.get('/autores/:id', (req, res)=>{

    let sqlSelectAutores=`
        SELECT *
        FROM Notas
        INNER JOIN Notas_Autores
        ON Notas.Nota_ID = Notas_Autores.NoAu_Nota_ID
        INNER JOIN Autores
        ON Notas_Autores.NoAu_Autor_ID = Autores.Autor_ID
        INNER JOIN Usuarios_Autores
        ON Autores.Autor_ID = Usuarios_Autores.UsAu_Autor_ID
        WHERE Usuarios_Autores.UsAu_Usuario_ID = ?
    `;

    let valuesSelectAutores=[req.params.id]

    connection.query(sqlSelectAutores, valuesSelectAutores, (err, result, fields)=>{

    })
})

module.exports=router;
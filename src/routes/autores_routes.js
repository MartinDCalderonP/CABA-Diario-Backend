const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.get('/', (req, res)=>{

    let sqlSelectAutores=`
        SELECT *
        FROM Autores
        ORDER BY Autor_Nombre ASC
    `;

    connection.query(sqlSelectAutores, (err, result, fields)=>{
        if (err) throw err;

        res.json(result);
    })
})

router.get('/:id', (req, res)=>{

    let sqlSelectAutorID=`
        SELECT *
        FROM Autores
        WHERE Autor_ID = ?
    `;

    let valuesSelectAutorID = [req.params.id]

    connection.query(sqlSelectAutorID, valuesSelectAutorID, (err, result, fields)=>{
        if (err) throw err;

        res.json(result[0]);
    })
})

module.exports=router;
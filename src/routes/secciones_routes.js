const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.get('/', (req, res)=>{

    let sqlSelectSecciones=`
        SELECT *
        FROM Secciones
        ORDER BY Sección_ID ASC
    `;

    connection.query(sqlSelectSecciones, (err, result, fields)=>{
        if (err) throw err;

        res.json(result);
    })
})

module.exports=router;
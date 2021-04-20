const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.post('/usuarios', (req, res)=>{
    let sqlInsertUsuarios=`
        INSERT INTO Usuarios (
            Usuario_NombreDeUsuario,
            Usuario_Correo,
            Usuario_Contraseña
        )
        VALUES (
            ?,
            ?,
            ?
        )
    `;

    let valuesInsertUsuarios=[
        req.body.NombreDeUsuario,
        req.body.Correo,
        req.body.Contraseña
    ]

    connection.query(sqlInsertUsuarios, valuesInsertUsuarios, (err, result, fields)=>{
        if (err) {
            res.json({
                status: 'Error.',
                message: 'Error al realizar el registro.'
            })

            console.log(err);
        } else {
            let sqlSelectUsuarios=`
                SELECT *
                FROM Usuarios
                WHERE Usuario_NombreDeUsuario = ?
                OR Usuario_Correo = ?
                AND Usuario_Contraseña = ?
            `;

            let valuesSelectUsuarios=[
                req.body.NombreDeUsuario,
                req.body.Correo,
                req.body.Contraseña        
            ];

            connection.query(sqlSelectUsuarios, valuesSelectUsuarios, (err, result, fields)=>{
                if (err) {
                    res.json(
                        {
                            status: 'Error.',
                            message: 'No es posible acceder en este momento, intente nuevamente en unos minutos.'
                        }
                    )
                } else {
                    if (result.length==1) {
                        req.session.userID = result[0].Usuario_ID;
                        req.session.userName = result[0].Usuario_NombreDeUsuario;
                        req.session.userPhoto = result[0].Usuario_Foto;

                        res.json({
                            status: 'Ok.',
                            message: 'El registro se ha realizado exitosamente. Bienvenido.',
                            loggedUser: {
                                id: req.session.userID,
                                name: req.session.userName,
                                photo: req.session.userPhoto,
                                role: 'Usuario'
                            }
                        });
                    } else {
                        res.json({
                            status: 'Error.',
                            message: 'Usuario y/o contraseña no válidos.'
                        });
                    }
                }
            }) 
        }
    })
})

router.post('/autores', (req, res)=>{
    let sqlInsertAutores=`
        INSERT INTO Autores (
            Autor_Nombre,
            Autor_Correo,
            Autor_Contraseña
        )
        VALUES (
            ?,
            ?,
            ?
        )
    `;

    let valuesInsertAutores=[
        req.body.Nombre,
        req.body.Correo,
        req.body.Contraseña
    ]

    connection.query(sqlInsertAutores, valuesInsertAutores, (err, result, fields)=>{
        if (err) {
            res.json({
                status: 'Error.',
                message: 'Error al realizar el registro.'
            })
        } else {
            res.json({
                status: 'Ok.',
                message: 'El registro se ha realizado correctamente.'
            })
        }
    })
})

router.post('/editores', (req, res)=>{
    let sqlInsertEditores=`
        INSERT INTO Editores (
            Editor_Nombre,
            Editor_Correo,
            Editor_Contraseña
        )
        VALUES (
            ?,
            ?,
            ?
        )
    `;

    let valuesInsertEditores=[
        req.body.Nombre,
        req.body.Correo,
        req.body.Contraseña
    ]

    connection.query(sqlInsertEditores, valuesInsertEditores, (err, result, fields)=>{
        if (err) {
            res.json({
                status: 'Error.',
                message: 'Error al realizar el registro.'
            })
        } else {
            res.json({
                status: 'Ok.',
                message: 'El registro se ha realizado correctamente.'
            })
        }
    })
});

module.exports=router;
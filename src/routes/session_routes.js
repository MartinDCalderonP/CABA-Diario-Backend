const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.post('/usuarios', (req, res)=>{
    let sqlSelectUsuarios=`
        SELECT *
        FROM Usuarios
        WHERE Usuario_NombreDeUsuario = ?
        OR Usuario_Correo = ?
        AND Usuario_Contraseña = ?
    `;

    let valuesSelectUsuarios=[
        req.body.user,
        req.body.user,
        req.body.password
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
                    message: 'Sesión iniciada.',
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
})

router.post('/autores', (req, res)=>{
    let sqlSelectAutores=`
                SELECT *
                FROM Autores
                WHERE Autor_Nombre = ?
                OR Autor_Correo = ?
                AND Autor_Contraseña = ?
            `;

    let valuesSelectAutores=[
        req.body.user,
        req.body.user,
        req.body.password
    ];

    connection.query(sqlSelectAutores, valuesSelectAutores, (err, result, fields)=>{
        if (err) {
            res.json(
                {
                    status: 'Error.',
                    message: 'No es posible acceder en este momento, intente nuevamente en unos minutos.'
                }
            )
        } else {
            if (result.length==1) {
                req.session.userID = result[0].Autor_ID;
                req.session.userName = result[0].Autor_Nombre;
                req.session.userPhoto = result[0].Autor_Foto;

                res.json({
                    status: 'Ok.',
                    message: 'Sesión iniciada.',
                    loggedUser: {
                        id: req.session.userID,
                        name: req.session.userName,
                        photo: req.session.userPhoto,
                        role: 'Autor'
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
})

router.post('/editores', (req, res)=>{
    let sqlSelectEditores=`
                SELECT *
                FROM Editores
                WHERE Editor_Nombre = ?
                OR Editor_Correo = ?
                AND Editor_Contraseña = ?
            `;

    let valuesSelectEditores = [
        req.body.user,
        req.body.user,
        req.body.password
    ];

    connection.query(sqlSelectEditores, valuesSelectEditores, (err, result, fields)=>{
        if (err) {
            res.json(
                {
                    status: 'Error.',
                    message: 'No es posible acceder en este momento, intente nuevamente en unos minutos.'
                }
            )
        } else {
            if (result.length==1) {
                req.session.userID = result[0].Editor_ID;
                req.session.userName = result[0].Editor_Nombre;
                req.session.userPhoto = result[0].Editor_Foto;

                res.json({
                    status: 'Ok.',
                    message: 'Sesión iniciada.',
                    loggedUser: {
                        id: req.session.userID,
                        name: req.session.userName,
                        photo: req.session.userPhoto,
                        role: 'Editor'
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
})

router.delete('/', (req, res)=>{
    req.session.destroy(err=>{
        if (err) {
            res.json({
                status: 'Error.',
                message: 'Error al cerrar la sesión.'
            })
        }else{
            res.clearCookie('CABA Diario');
            res.json({
                status: 'Ok.',
                message: 'Sesión cerrada.'
            })
        };
    });        
});

module.exports=router;
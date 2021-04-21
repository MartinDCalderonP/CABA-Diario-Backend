const express = require('express');
const connection = require('../connection');
const router=express.Router();
const path = require('path');
const fs = require('fs');

router.get('/principales', (req, res)=>{
    let sqlSelectPrincipales = `
        SELECT *
        FROM Notas
        LEFT JOIN Notas_Autores
        ON Notas.Nota_ID=Notas_Autores.NoAu_Nota_ID
        LEFT JOIN Autores
        ON Notas_Autores.NoAu_Autor_ID=Autores.Autor_ID
        INNER JOIN Secciones
        ON Notas.Nota_Sección_ID=Secciones.Sección_ID
        WHERE Notas.Nota_Posteada = 1
        AND Secciones.Sección_ID IN (2,4)
        ORDER BY Notas.Nota_Fecha DESC
        LIMIT 6
    `;

    connection.query(sqlSelectPrincipales, (err, result, fields)=>{
            if (err) throw err;
            res.json(result);
        }
    );
});

router.get('/primerTema', (req, res)=>{
    let sqlPrimerTema = `
        SELECT *
        FROM Notas
        LEFT JOIN Notas_Autores
        ON Notas.Nota_ID=Notas_Autores.NoAu_Nota_ID
        LEFT JOIN Autores
        ON Notas_Autores.NoAu_Autor_ID=Autores.Autor_ID
        INNER JOIN Secciones
        ON Notas.Nota_Sección_ID=Secciones.Sección_ID
        INNER JOIN Notas_Temas
        ON Notas.Nota_ID = Notas_Temas.NoTe_Nota_ID
        WHERE Notas.Nota_Posteada = 1
        AND Notas_Temas.NoTe_Tema_ID = 1
        ORDER BY Notas.Nota_Fecha DESC
        LIMIT 6
    `;

    connection.query(sqlPrimerTema, (err, result, fields)=>{
            if (err) throw err;
            res.json(result);
        }
    );
});

router.get('/primeraSeccion', (req, res)=>{
    let sqlPrimeraSección = `
        SELECT *
        FROM Notas
        LEFT JOIN Notas_Autores
        ON Notas.Nota_ID=Notas_Autores.NoAu_Nota_ID
        LEFT JOIN Autores
        ON Notas_Autores.NoAu_Autor_ID=Autores.Autor_ID
        INNER JOIN Secciones
        ON Notas.Nota_Sección_ID=Secciones.Sección_ID
        WHERE Notas.Nota_Posteada = 1
        AND Secciones.Sección_ID = 5
        ORDER BY Notas.Nota_Fecha DESC
        LIMIT 6
    `;

    connection.query(sqlPrimeraSección, (err, result, fields)=>{
            if (err) throw err;
            res.json(result);
        }
    );
});

router.get('/segundoTema', (req, res)=>{
    let sqlSegundoTema = `
        SELECT *
        FROM Notas
        LEFT JOIN Notas_Autores
        ON Notas.Nota_ID=Notas_Autores.NoAu_Nota_ID
        LEFT JOIN Autores
        ON Notas_Autores.NoAu_Autor_ID=Autores.Autor_ID
        INNER JOIN Secciones
        ON Notas.Nota_Sección_ID=Secciones.Sección_ID
        INNER JOIN Notas_Temas
        ON Notas.Nota_ID = Notas_Temas.NoTe_Nota_ID
        WHERE Notas.Nota_Posteada = 1
        AND Notas_Temas.NoTe_Tema_ID = 4
        ORDER BY Notas.Nota_Fecha DESC
        LIMIT 3
    `;

    connection.query(sqlSegundoTema, (err, result, fields)=>{
            if (err) throw err;
            res.json(result);
        }
    );
});

router.get('/masLeidas', (req, res)=>{
    let sqlMásLeídas = `
        SELECT *
        FROM Notas
        LEFT JOIN Notas_Autores
        ON Notas.Nota_ID=Notas_Autores.NoAu_Nota_ID
        LEFT JOIN Autores
        ON Notas_Autores.NoAu_Autor_ID=Autores.Autor_ID
        INNER JOIN Secciones
        ON Notas.Nota_Sección_ID=Secciones.Sección_ID
        WHERE Notas.Nota_Posteada = 1
        AND Notas.Nota_Opinión = 0
        ORDER BY Notas.Nota_Contador DESC
        LIMIT 5
    `;

    connection.query(sqlMásLeídas, (err, result, fields)=>{
            if (err) throw err;
            res.json(result);
        }
    );
});

router.get('/autor/:id', (req, res)=>{
    let sqlSelectAutorNotas = `
        SELECT *
        FROM Notas
        LEFT JOIN Notas_Autores
        ON Notas.Nota_ID=Notas_Autores.NoAu_Nota_ID
        LEFT JOIN Autores
        ON Notas_Autores.NoAu_Autor_ID=Autores.Autor_ID
        INNER JOIN Secciones
        ON Notas.Nota_Sección_ID=Secciones.Sección_ID
        WHERE Autores.Autor_ID = ?
        ORDER BY Notas.Nota_Fecha DESC
    `;

    let valuesSelectAutorNotas = [req.params.id]

    connection.query(sqlSelectAutorNotas, valuesSelectAutorNotas, (err, result, fields)=>{
        if (err) throw err;
        res.json(result);
    })
});

router.get('/autor/todas/:id', (req, res)=>{
    let sqlSelectAutorNota = `
        SELECT *
        FROM Notas
        LEFT JOIN Notas_Autores
        ON Notas.Nota_ID=Notas_Autores.NoAu_Nota_ID
        WHERE Notas.Nota_ID = ?
    `;

    let valuesSelectAutorNota = [req.params.id]

    connection.query(sqlSelectAutorNota, valuesSelectAutorNota, (err, result, fields)=>{
        if (err) throw err;
        res.json(result[0]);
    })
});

router.get('/editor/:id', (req, res)=>{
    let sqlSelectEditor = `
        SELECT *
        FROM Notas
        LEFT JOIN Notas_Autores
        ON Notas.Nota_ID=Notas_Autores.NoAu_Nota_ID
        LEFT JOIN Autores
        ON Notas_Autores.NoAu_Autor_ID=Autores.Autor_ID
        INNER JOIN Secciones
        ON Notas.Nota_Sección_ID=Secciones.Sección_ID
        LEFT JOIN Editores
        ON Notas.Nota_Sección_ID=Editores.Editor_Sección_ID
        WHERE Editores.Editor_ID = ${req.params.id}
        ORDER BY Notas.Nota_Fecha DESC
    `;

    connection.query(sqlSelectEditor, (err, result, fields)=>{
        if (err) throw err;
        res.json(result);
    })
});

router.get('/posteadas/:id', (req, res)=>{
    let sqlSelectPosteadaId = `
        SELECT *
        FROM Notas
        LEFT JOIN Notas_Autores
        ON Notas.Nota_ID=Notas_Autores.NoAu_Nota_ID
        LEFT JOIN Autores
        ON Notas_Autores.NoAu_Autor_ID=Autores.Autor_ID
        INNER JOIN Secciones
        ON Notas.Nota_Sección_ID=Secciones.Sección_ID
        WHERE Notas.Nota_Posteada = 1
        AND Notas.Nota_ID = ?
    `;

    let valuesSelectPosteadaId = [req.params.id]

    connection.query(sqlSelectPosteadaId, valuesSelectPosteadaId, (err, result, fields)=>{
        if (err) throw err;
        res.json(result[0]);
    })
});

router.get('/autor/posteadas/:id', (req, res)=>{
    let sqlSelectPosteadasAutor = `
        SELECT *
        FROM Notas
        LEFT JOIN Notas_Autores
        ON Notas.Nota_ID=Notas_Autores.NoAu_Nota_ID
        LEFT JOIN Autores
        ON Notas_Autores.NoAu_Autor_ID=Autores.Autor_ID
        INNER JOIN Secciones
        ON Notas.Nota_Sección_ID=Secciones.Sección_ID
        WHERE Autores.Autor_ID = ?
        AND Notas.Nota_Posteada = 1
        ORDER BY Notas.Nota_Fecha DESC
    `;

    let valuesSelectPosteadasAutor = [req.params.id]

    connection.query(sqlSelectPosteadasAutor, valuesSelectPosteadasAutor, (err, result, fields)=>{
        if (err) throw err;
        res.json(result);
    })
});

router.get('/seccion/posteadas/:seccion', (req, res)=>{
    let sqlSelectPosteadasSección = `
        SELECT *
        FROM Notas
        LEFT JOIN Notas_Autores
        ON Notas.Nota_ID=Notas_Autores.NoAu_Nota_ID
        LEFT JOIN Autores
        ON Notas_Autores.NoAu_Autor_ID=Autores.Autor_ID
        INNER JOIN Secciones
        ON Notas.Nota_Sección_ID=Secciones.Sección_ID
        WHERE Notas.Nota_Posteada = 1
        AND Secciones.Sección_Nombre = ?
        ORDER BY Notas.Nota_Fecha DESC
    `;

    let valuesSelectPosteadasSección = [req.params.seccion]

    connection.query(sqlSelectPosteadasSección, valuesSelectPosteadasSección, (err, result, fields)=>{
        if (err) throw err;
        res.json(result);
    })
});

router.get('/tema/posteadas/:tema', (req, res)=>{
    let sqlSelectPosteadasTema = `
        SELECT *
        FROM Notas
        LEFT JOIN Notas_Autores
        ON Notas.Nota_ID=Notas_Autores.NoAu_Nota_ID
        LEFT JOIN Autores
        ON Notas_Autores.NoAu_Autor_ID=Autores.Autor_ID
        INNER JOIN Secciones
        ON Notas.Nota_Sección_ID=Secciones.Sección_ID
        INNER JOIN Notas_Temas
        ON Notas.Nota_ID = Notas_Temas.NoTe_Nota_ID
        INNER JOIN Temas
        ON Notas_Temas.NoTe_Tema_ID = Temas.Tema_ID
        WHERE Notas.Nota_Posteada = 1
        AND Temas.Tema_Nombre = ?
        ORDER BY Notas.Nota_Fecha DESC
    `;

    let valuesSelectPosteadasTema = [req.params.tema]

    connection.query(sqlSelectPosteadasTema, valuesSelectPosteadasTema, (err, result, fields)=>{
        if (err) throw err;
        res.json(result);
    })
});

router.get('/busqueda/:termino', (req, res)=>{
    let sqlSelectBúsqueda = `
        SELECT *
        FROM Notas
        LEFT JOIN Notas_Autores
        ON Notas.Nota_ID=Notas_Autores.NoAu_Nota_ID
        LEFT JOIN Autores
        ON Notas_Autores.NoAu_Autor_ID=Autores.Autor_ID
        INNER JOIN Secciones
        ON Notas.Nota_Sección_ID=Secciones.Sección_ID
        WHERE Notas.Nota_Posteada = 1
        AND Notas.Nota_Título LIKE ?
        ORDER BY Notas.Nota_Fecha DESC
    `;

    let valuesSelectBúsqueda = [`%${req.params.termino}%`];

    connection.query(sqlSelectBúsqueda, valuesSelectBúsqueda, (err, result, fields)=>{
        if (err) throw err;
        res.json(result);
    })
})

router.post('/', (req, res)=>{
    let imagenFileName = '';

    if(req.files){
        let imagenFile = req.files.Imagen;

        imagenFileName=Date.now() + path.extname(imagenFile.name);

        imagenFile.mv('/public/images/newsImages/' + imagenFileName, function(err){
            if (err){
                console.log(err);
            }
        });
    } else {
        console.log('Sin archivo.');
    }

    let sqlInsertNotas = `
        INSERT INTO Notas (
            Nota_Título,
            Nota_Sección_ID,
            Nota_Imagen,
            Nota_PieDeImagen,
            Nota_CréditoDeImagen,
            Nota_Texto
        )
        VALUES (
            ?,
            ?,
            ?,
            ?,
            ?,
            ?
        )
    `;

    let valuesInsertNotas = [
        req.body.Título,
        req.body.Sección_ID,
        process.env.NEWSIMAGES_URL + imagenFileName,
        req.body.Pie_de_Imagen,
        req.body.Crédito_de_Imagen,
        req.body.Texto
    ]

    connection.query(sqlInsertNotas, valuesInsertNotas, (err, result, fields)=>{
        if (err) {
            res.json({
                status: 'Error.',
                message: 'Error al subir la nota.'
            })
        } else {
            let sqlInsertNoAu = `
                INSERT INTO Notas_Autores (
                    NoAu_Nota_ID,
                    NoAu_Autor_ID
                )
                VALUES (
                    ?,
                    ?
                )
            `;

            let valuesInsertNoAu = [
                result.insertId,
                req.session.userID
            ]

            connection.query(sqlInsertNoAu, valuesInsertNoAu, (err, result, fields)=>{
                if (err) {
                    res.json({
                        status: 'Error.',
                        message: 'Error al subir la nota.'
                    })
                } else {
                    res.json({
                        status: 'Ok.',
                        message: 'Nota subida correctamente.'
                    })
                }
            })
        }
    })
});

router.put('/:id', (req, res)=>{
    let imagenFileName='';

    let sqlUpdate = `
        UPDATE Notas
        SET Nota_Título = ?,
            Nota_Sección_ID = ?,
            Nota_PieDeImagen = ?,
            Nota_CréditoDeImagen = ?,
            Nota_Texto = ?
    `;

    let valuesUpdate = [
        req.body.Título,
        req.body.Sección_ID,
        req.body.Pie_de_Imagen,
        req.body.Crédito_de_Imagen,
        req.body.Texto
    ]

    if (req.files) {
        let sqlSelectNotaImagen = `
                    SELECT Nota_Imagen
                    FROM Notas
                    WHERE Nota_ID = ${req.params.id}        
                `

        connection.query(sqlSelectNotaImagen, (err, result, fields)=>{
            if (err) {
                console.log('Error.');
            } else {
                fs.unlink('/public/images/newsImages/' + path.basename(result[0].Nota_Imagen), err=>{
                    if (err) throw err;
                });
            }
        })

        let imagenFile = req.files.Imagen;

        imagenFileName=Date.now() + path.extname(imagenFile.name);

        imagenFile.mv('/public/images/newsImages/' + imagenFileName, function(err){
            if (err){
                console.log(err);
            }
        });

        sqlUpdate += ', Nota_Imagen = ?';
        valuesUpdate.push(process.env.NEWSIMAGES_URL + imagenFileName);

    } else {
        console.log('Sin archivo.');
    }

    sqlUpdate += `WHERE Nota_ID = ?`
    valuesUpdate.push(req.params.id);

    connection.query(sqlUpdate, valuesUpdate, (err, result, fields)=>{
        if (err) {
            res.json({
                status: 'Error.',
                message: 'Error al editar la nota.'
            })
        } else {
            res.json({
                status: 'Ok.',
                message: 'Nota editada correctamente.'
            })
        }
    })
});

router.put('/contador/:id', (req, res)=>{
    let sqlContador = `
        UPDATE Notas
        SET Nota_Contador = ?
        WHERE Nota_ID = ?
    `;

    let valuesContador = [req.body.Contador, req.params.id]

    connection.query(sqlContador, valuesContador, (err, result, fields)=>{
        if (err) {
            res.json({
                status: 'Error.',
                message: 'Error al aumentar el contador la nota.'
            })
        } else {
            res.json({
                status: 'Ok.',
                message: 'Contador de la nota aumentado correctamente.'
            })
        }
    })
});

router.delete('/:id', (req, res)=>{
    let sqlNoAuDelete = `
        DELETE FROM Notas_Autores
        WHERE NoAu_Nota_ID = ?
    `;

    let valuesNoAuDelete = [req.params.id];

    connection.query(sqlNoAuDelete, valuesNoAuDelete, (err, result, fields)=>{
        if (err) {
            res.json({
                status: 'Error.',
                message: 'Error al eliminar la relación nota_autor.'
            })
        } else {
            let sqlSelectNotaImagen = `
                    SELECT Nota_Imagen
                    FROM Notas
                    WHERE Nota_ID = ${req.params.id}        
                `

            connection.query(sqlSelectNotaImagen, (err, result, fields)=>{
                if (err) {
                    res.json({
                        status: 'Error.',
                        message: 'Error al encontrar la imagen de la nota.'
                    })
                } else {
                    fs.unlink('/public/images/newsImages/' + path.basename(result[0].Nota_Imagen), err=>{
                        if (err) {
                            res.json({
                                status: 'Error.',
                                message: 'Error al eliminar la imagen de la nota.'
                            })
                        }
                    });

                    let sqlNotaDelete = `
                        DELETE FROM Notas
                        WHERE Nota_ID = ?
                    `;

                    let valuesNotaDelete = [req.params.id]

                    connection.query(sqlNotaDelete, valuesNotaDelete, (err, result, fields)=>{
                        if (err) {
                            res.json({
                                status: 'Error.',
                                message: 'Error al eliminar la nota.'
                            })
                        } else {
                            
                            res.json({
                                status: 'Ok.',
                                message: 'Nota eliminada correctamente.'
                            })
                        }
                    })
                }
            })
        }
    })
});

module.exports = router;
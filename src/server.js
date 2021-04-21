process.env.BASE_URL = 'http://localhost:8888/';
process.env.IMAGES_URL = process.env.BASE_URL + 'images/';
process.env.NEWSIMAGES_URL = process.env.IMAGES_URL + 'newsImages/';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const fileUpload = require('express-fileupload');
const auth = require('./auth');
const sessionRoutes = require('./routes/session_routes');
const registerRoutes = require('./routes/register_routes');
const notasRoutes = require('./routes/notas_routes');
const seguidosRoutes = require('./routes/seguidos_routes');
const seccionesRoutes = require('./routes/secciones_routes');
const autoresRoutes = require('./routes/autores_routes');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(fileUpload());

app.use('*/images', express.static('public/images'));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type'],
}));

app.use(session({
    store: new FileStore({logFn: function(){}}),
    secret: '123456789',
    resave: false,
    saveUninitialized: true,
    name: 'CABA Diario',
    })
);

app.use('/auth', sessionRoutes);
app.use('/register', registerRoutes);
app.use('/notas', notasRoutes);
app.use('/seguidos', seguidosRoutes);
app.use('/secciones', seccionesRoutes);
app.use('/autores', autoresRoutes);

if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('client/build'));

    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(process.env.PORT || 8888, ()=>{
    console.log('Escuchando...')
});
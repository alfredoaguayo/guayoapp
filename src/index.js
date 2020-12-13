const express = require('express');                                         // ok
const path = require('path');                                               // ok
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

// const multer = require('multer');
// const { v4: uuidv4 } = require('uuid');

// Inicializations
const app = express();
require('./database');
require('./config/passport');
// const morgan = require('morgan');
// const { use } = require('./routes/index.routes');

// Settings
// app.set('port', 3000);
app.set('port', process.env.PORT || 3000);                                  // OK
app.set('views', path.join(__dirname, 'views'));                            // ok
//app.set('view engine', 'ejs');                                              // 
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(session({
    secret : 'mysecretapp',
    resave : true,
    saveUninitialized : true
}))
app.use(passport.initialize());
app.use(passport.session())
app.use(flash());

// app.use(morgan('dev'));
// app.use(express.urlencoded({extended: false}));
// const storage = multer.diskStorage({
//     destination: path.join(__dirname, './public/img/uploads'),
//     filename: (req, file, cb, filename) => {
//         cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
//     }
// });
// app.use(multer({ storage: storage }).single('image'));

// const storage = multer.diskStorage({
//     destination: path.join(__dirname, './public/uploads'),
//     filename: (req, file, cb) => {
//         cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
//     }
// });

// app.use (multer({
//     storage,
//     dest: path.join(__dirname, './public/uploads'),
//     limits: {fileSize: 1000000},
//     fileFilter: (req, file, cb) => {
//         const filetypes = /jpg|jpeg|png|gif/;
//         const mimetype = filetypes.test(file.mimetype);
//         const extname = filetypes.test(path.extname(file.originalname));
//         if (mimetype && extname) {
//             return cb(null, true);
//         }
//         cb("Error: El archivo debe ser una imagen valida");
//     }
// }).single('image'));

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
})


// Rutas
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

// Static files
app.use(express.static(path.join(__dirname, './public')));

// start Server
app.listen(app.get('port'), () => {
    console.log(`Servidor escuchando en el puerto ${app.get('port')}.`);    // OK
})
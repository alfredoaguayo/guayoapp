const mongosee = require('mongoose');

mongosee.connect('mongodb://localhost/notes-db-app', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(db => console.log('Mongo está conectado.'))
    .catch(err => console.error(err));


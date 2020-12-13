const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

 passport.use(new LocalStrategy ({
     usernameField: 'email'
 }, async (email, password, done) => {
     const user = await User.findOne({email: email});
     if(!user) {
         console.log(`El correo ${email} no se encuentra registrado.`)
         return done(null, false, { message: 'La información proporcionada no es correcta.'});
     } else {
         const match = await user.matchPassword(password);
         if(match) {
             return done(null, user)
         } else {
             return done(null, false, {message: 'La información proporcionada no es correcta. Contacte a soporte.'});
         }
     }
 }));

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
})
const express = require('express');  // OK
const router = express.Router();                // OK

const User = require('../models/User');

const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('./users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}))

router.get('/users/signup', (req, res) => {
    res.render('./users/signup');
});

router.post('/users/signup', async (req, res) => {
    console.log(req.body);                                              // comemtar
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if(name.length < 4) {
        errors.push({text: 'Debe ingresar un nombre mayor a 3 caracteres.'});
    }
    if(password.length < 5 ) {
        errors.push({text: 'La contraseña debe ser mayor a 4 caracteres.'})
    }
    if(password != confirm_password) {
        errors.push({text: 'Las contraseñas no son iguales.'});
    }
    if(errors.length > 0 ) {
        res.render('users/signup', {errors, name, email, password, confirm_password})
    } else {
        const emailUser = await User.findOne({ email: email }).lean();
        if(emailUser) {
        errors.push({text: 'El correo capturado ya está en uso.'});
                if(errors.length > 0) {
                res.render('users/signup', {
                    errors,
                    name,
                    email
                });
            }
        } else {
        const newUser = new User({ name, email, password });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Usuario registrado exitosamente.');
        res.redirect('/users/signin');
        }
    }
});


module.exports = router;                // OK
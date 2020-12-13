const express = require('express');  // OK
const router = express.Router();                // OK

const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth')

router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('./notes/new-note');
});

router.post('/notes/new-note', isAuthenticated, async (req, res) => {
    const { title, description }= req.body;
    const errors = [];
    if(!title) {
        errors.push({text: 'Por favor, ingresa un nombre a la tarea'});
    }
    if(!description) {
        errors.push({text: 'Por favor, ingresa una descripción a la tarea'});
    }
    if(errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            title,
            description
        });
    } else {
        const newNote = new Note({ title, description });
        await newNote.save();
        req.flash('success_msg', 'Nota agregada correctamente.')
        console.log(newNote);                                             // COMENTAR
        res.redirect('/notes');
    }
});
//    res.render('./notes/new-note');


router.get('/notes', isAuthenticated, async (req, res) => {
    const notes = await Note.find({}).lean().sort({date: 'desc'});
    res.render('notes/all-notes', { notes });
});

router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    res.render('notes/edit-note', {note});
})

router.put('/notes/edit-note/:id', isAuthenticated, async (req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('success_msg', 'Nota editada correctamente.')
    res.redirect('/notes');
})

router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Nota borrada correctamente.')
    res.redirect('/notes');
})

module.exports = router;                // OK
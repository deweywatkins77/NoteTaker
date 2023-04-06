const express = require('express')
const PATH = require('path')
const { readFromFile, readAndAppend, writeToFile } = require('./helpers/fsUtils');
const uuid = require('./helpers/uuid')
const app =express()
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(__dirname + "/public/notes.html")
})

app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

app.post('/api/notes', (req, res) => {
    let newNote = req.body
    newNote.id = uuid()
    readAndAppend(newNote, './db/db.json')
})

app.delete('/api/notes/:id', (req, res) => {
    readFromFile('./db/db.json').then((data) => {
        let id = req.params.id;
        let dbArray = JSON.parse(data)
        dbArray = dbArray.filter(obj => obj.id !== id)
        writeToFile('./db/db.json', dbArray)
    })
})

app.listen(PORT, () =>
  console.info(`Example app listening at http://localhost:${PORT}`)
);

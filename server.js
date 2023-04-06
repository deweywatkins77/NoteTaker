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
    if (req.body){
        let newNote = req.body
        newNote.id = uuid()
        readAndAppend(newNote, './db/db.json')
        res.send('Note Added!')
    }else{
        res.send('Error Adding Note!')
    }
})

app.delete('/api/notes/:id', (req, res) => {
    let id = req.params.id
    if (id){
        
        readFromFile('./db/db.json').then((data) => {
            console.log(req.params)
            let dbArray = JSON.parse(data)
            if (dbArray){
                dbArray = dbArray.filter(obj => obj.id !== id)
                writeToFile('./db/db.json', dbArray)
            }
        })
        res.send(`Deleted Note`)
    }else{
        res.send(`Error Deleting Note!`)
    }
})

app.listen(PORT, () =>
  console.info(`Note Taker app listening at http://localhost:${PORT}`)
);

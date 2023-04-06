const express = require('express')
const PATH = require('path')
const app =express()
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');
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

app.listen(PORT, () =>
  console.info(`Example app listening at http://localhost:${PORT}`)
);

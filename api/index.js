'use strict';
const express = require('express')
const app = express()
const port = 3030
const fs = require('fs')

let db = JSON.parse(fs.readFileSync('db.json'))

app.get('/', (req, res) => {
  res.json(db)
})

app.get('/:id', (req, res)=>{
    const item = db.find( e => e.id == req.params.id )
    if(item)
        res.json(item)
    else
        res.status(404).send('Item not found')
})

app.get('/image/:id', (req, res)=>{
    const item = db.find( e => e.id == req.params.id )
    if(item){
        res.sendFile(`${__dirname}/images/${item.id}.jpg`)
    }else
        res.status(404).send('Item not found')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



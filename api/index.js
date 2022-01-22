'use strict';
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3030
const fs = require('fs')
const bodyParser = require('body-parser')

let db = JSON.parse(fs.readFileSync('db.json'))

app.use(cors())
app.use(bodyParser.json())

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

app.put('/:id', (req, res)=>{
    const item = db.find( e => e.id == req.params.id )
    if(item){
        item.price.push(req.body.price) //verificar que exista body.price y que sea un numero y que sea mayor al ultimo precio del producto y que la subasta siga abierta
        res.json(item)
    }else
        res.status(404).send('Item not found')
    
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



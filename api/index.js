'use strict';
const express = require('express')
const cors = require('cors')
const app = express()
const port = 3030
const fs = require('fs')
const bodyParser = require('body-parser')
const http = require('http').Server(app)
const io = require('socket.io')(http, {
    cors:{
        origin: "http://localhost:3000"
    }
})

app.io = io

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

app.patch('/:id', (req, res)=>{
    let item = db.find( e => e.id == req.params.id )
    if(item){
        if(req.body.price && Number.isInteger(+req.body.price) && req.body.price > item.price[item.price.length-1] && item.status === 'inProcess'){
            item.price.push(+req.body.price) 
            if(item.countDown < 15){
                item.countDown = 15
            }
        }
        if(req.body.status === 'inProcess' && item.status === 'available'){
            item.status = 'inProcess'
            item.countDown = 60
            var interval = setInterval(()=>{
                item.countDown -= 1;
                if(item.countDown === 0){
                    item.status = 'closed'
                    clearInterval(interval);
                }
                req.app.io.emit("ProductoActualizado", item)

            }, 1000);
        }
        res.json(item)
        req.app.io.emit("ProductoActualizado", item)
    }else
        res.status(404).send('Item not found')
    
})

//io.on('connection', (socket)=>{console.log('alguien se conecto')})


http.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



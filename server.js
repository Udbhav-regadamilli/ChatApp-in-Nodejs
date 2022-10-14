const express = require('express');
const bodyParser = require('body-parser');
const http = require("http");
const {Server} = require("socket.io");


var app = express()
const server = http.createServer(app);
const io = new Server(server)
const port = process.env.port || 4456;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/' || '', function(req, res){
    res.sendFile(__dirname + "/index.html")
})

io.on('connection', (socket) => {
    console.log("A user is connected")
    socket.on('msg', (msg) => {
        console.log(msg);
        io.emit('msg', msg);
    });
})

io.on('disconnect', () => {
    console.log('a user is disconnected')
})

server.listen(port, "192.168.0.163",() => {
    console.log('The server is running on:', port)
})
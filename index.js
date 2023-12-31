const http = require('http')
const express = require('express')
const path = require('path')
const { Server } = require('socket.io')
const PORT = 9000

const app = express();
const server = http.createServer(app)

const io = new Server(server)

//SocketIo
io.on('connection',(socket)=>{
    socket.on("user-message",(message)=>{
        console.log(`New user message is ${message}`);
        socket.emit("message",message);
    });
});

app.use(express.static(path.resolve('./public')))

app.get('/',(req,res)=>{
    return res.sendFile('./public/index.html')
})

server.listen(PORT, () => console.log(`Server is running on localhost:${PORT}`))
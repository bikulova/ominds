const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'room.ejs')
  res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).emit('user-connected', userId)
  })
})

server.listen(3000)

users = [];

connections = [];

io.sockets.on('connection', function(socket) {
  // console.log('Соединение') //
  connections.push(socket);

  socket.on('disconnect', function(data) {
    connections.splice(connections.indexOf(socket), 1);
  // console.log('Отсоединение') //
  });

  socket.on('send mess', function(data) {
    io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className})
  })
})

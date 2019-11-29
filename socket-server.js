import http from 'http'
import express from 'express'
import socket from 'socket.io'
import redisAdapter from 'socket.io-redis'
import { config } from './core/index'

const app = express()

let server = http.createServer(app)

var allowedOrigins = "http://localhost:* http://127.0.0.1:* http://192.168.1.145:*";
const io = socket(server, { origins: allowedOrigins })

io.adapter(redisAdapter({ host: config.redis.host, port: config.redis.port }))

io.of('winner').on('connect', (socket) => {

  socket.on('come-in', (data) => {
    socket.join(data.senderUserId, () => {
      socket.broadcast.emit('new-user', data)
    })
  })

  socket.on('share-info', (data) => {
    const receiverSocketId = data.receiverUserId
    delete data.receiverUserId
    socket.to(receiverSocketId).emit('old-user', data)
  })

  socket.on('user-action', (data) => {
    socket.broadcast.emit('action', data)
  })

  socket.on('close-window', (data) => {
    socket.broadcast.emit('leave', data)
  })

  socket.on('disconnect', () => {
    console.info(`Client gone [id=${socket.id}]`)
  });
})

server.listen(config.socket.port, config.socket.host, () => {
  console.log(`Socket server http://${config.socket.host}:${config.socket.port}`)
});
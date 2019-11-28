import http from 'http'
import uuid from 'uuid/v4'
import express from 'express'
import socket from 'socket.io'
import redisAdapter from 'socket.io-redis'
import { config } from './core/index'

const app = express()
let server = http.createServer(app)

const io = socket(server)
io.adapter(redisAdapter({ host: config.redis.host, port: config.redis.port }))

io.of('winner').on('connect', (socket) => {
  const userRoomId = uuid()
  socket.join(userRoomId, () => {
    socket.emit('handshake', { userRoomId });
  });

  socket.on('come-in', (data) => {
    socket.broadcast.emit('new-user', data);
  })

  socket.on('share-info', (data) => {
    const receiverSocketId = data.receiverRoomId
    delete data.receiverRoomId
    socket.to(receiverSocketId).emit('old-user', data);
  })

  socket.on('user-action', (data) => {
    socket.broadcast.emit('action', data);
  })

  socket.on('disconnect', () => {
    console.info(`Client gone [id=${socket.id}]`)
  });
})

server.listen(config.socket.port, config.socket.host, () => {
  console.log(`Socket server http://${config.socket.host}:${config.socket.port}`)
});
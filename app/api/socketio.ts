const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const redisClient = require('../../lib/db.ts');

const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

function findAvailableRoom(rooms, socket) {
  for (const [roomID, participants] of rooms) {
    if (participants.size === 1 && !participants.has(socket.id)) {
      return roomID;
    }
  }
  return null;
}

async function cacheUserId(id) {
  let userId = await redisClient.get(id);
  if (userId === null) {
    console.log('storing userId ' + userId);
    userId = await redisClient.set(id, id);
  } else {
    console.log('found userId ' + userId);
  }
  return userId;
}

io.on('connection', socket => {
  console.log(`User Connected: ${socket.id}`);
  cacheUserId(socket.id);
  // console.log(redisClient);
  socket.on('find_room', () => {
    // console.log(io.sockets.adapter.rooms);
    const alreadyInRoom = Array.from(socket.rooms).some(room => room !== socket.id);

    if (!alreadyInRoom) {
      const rooms = io.sockets.adapter.rooms;
      let roomID = findAvailableRoom(rooms, socket);

      if (!roomID) {
        roomID = socket.id;
        console.log('Creating a new room:', roomID);
      } else {
        console.log('Joining an existing room:', roomID);
        socket.leave(socket.id);
      }

      socket.join(roomID);
      const roomSize = io.sockets.adapter.rooms.get(roomID).size;
      const participants = Array.from(io.sockets.adapter.rooms.get(roomID).keys());
      const otherParticipant = participants.find(participant => participant !== socket.id);

      const roomInfo = {
        roomID,
        userID: otherParticipant,
        size: roomSize,
      };
      // console.log(io.sockets.adapter.rooms);
      socket.emit('room_info', roomInfo);
      if (roomSize > 1) {
        io.to(roomID).emit('user_joined', socket.id);
      }
    }
  });

  socket.on('send_message', data => {
    console.log(`Message from ${socket.id}:`, data);
    const room = Array.from(socket.rooms)[0];
    // console.log(room);
    socket.broadcast.to(room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    // console.log(io.sockets.adapter.rooms);
    socket.broadcast.emit('user_left', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
import { currentUser } from "./controller/globalController";
import events from "./events";

import { chooseWord } from "./words";

export let sockets = [];
let painter = null;
let word = null;

const choosePainter = () => sockets[Math.floor(Math.random() * sockets.length)];

export const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  const superBroadcast = (event, data) => io.emit(event, data);
  const sendPlayerUpdate = () =>
    superBroadcast(events.playerUpdate, { sockets });
  const startGame = () => {
    superBroadcast(events.gameStarted);
    painter = choosePainter();
    word = chooseWord();
    io.to(painter.id).emit(events.leaderNotif, { word });
    // io.to(painter.socketId).emit(events.painterNotif, { word });
  };

  const addPoints = (id) => {
    sockets = sockets.map((socket) => {
      if (socket.socketId === id) {
        socket.points += 10;
      }
      return socket;
    });
    sendPlayerUpdate();
  };

  socket.on(events.addPlayer, ({ username }) => {
    socket.username = username;
    sockets.push({ id: socket.id, points: currentUser.points, username });
    console.log(`addPlayer sockets:`, sockets);
    sendPlayerUpdate();
    startGame();
  });

  socket.on(events.disconnect, () => {
    console.log(`disconnect sockets:`, sockets);
    sockets = sockets.filter((aSocket) => aSocket.id != socket.id);
    console.log(`disconnect sockets:`, sockets);
    // broadcast(events.newUser, { username: socket.username });
    broadcast(events.disconnected, { username: socket.username });
    // broadcast(events.disconnected, { nickname: socket.nickname });
    sendPlayerUpdate();
  });

  socket.on(events.sendMsg, ({ message, username }) => {
    if (word === message) {
      addPoints(socket.id);
    }
    broadcast(events.newMsg, { message, username });
  });
  socket.on(events.beginPath, ({ x, y, size }) =>
    broadcast(events.beganPath, { x, y, size })
  );
  socket.on(events.strokePath, ({ x, y, color }) =>
    broadcast(events.strokedPath, { x, y, color })
  );
  socket.on(events.fill, ({ color }) => broadcast(events.filled, { color }));
  socket.on(events.erase, () => broadcast(events.erased));
  socket.on(events.setPencil, () => broadcast(events.setPenciled));
};

import events from "./events";

import { chooseWord } from "./words";
import User from "./model/User";

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
    io.to(painter.id).emit(events.painterNotif, { word });
  };
  const endGame = () => {
    superBroadcast(events.gameEnded);
  };
  const addPoints = (id) => {
    sockets = sockets.map((socket) => {
      if (socket.id === id) {
        socket.points += 10;
      }
      return socket;
    });
    sendPlayerUpdate();
  };

  socket.on(events.addPlayer, async ({ username }) => {
    const user = await User.findOne({ username });
    sendPlayerUpdate();
    startGame();
  });
  socket.on(events.disconnect, () => {
    // console.log("This socket", socket);
    // console.log("This sockets", sockets);
    sockets = sockets.filter((aSocket) => aSocket.id !== socket.id);
    broadcast(events.disconnected, { nickname: socket.nickname });
    sendPlayerUpdate();
    endGame();
  });
  socket.on(events.sendMsg, ({ message }) => {
    if (word === message) {
      addPoints(socket.id);
    }
    broadcast(events.newMsg, { message, nickname: socket.nickname });
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

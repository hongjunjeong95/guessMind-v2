import events from "./events";

import { chooseWord } from "./words";

export let sockets = [];
let painter = null;
let word = null;
let timeout = null;
let inProgress = false;

const choosePainter = () => sockets[Math.floor(Math.random() * sockets.length)];

export const socketController = (socket, io) => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  const superBroadcast = (event, data) => io.emit(event, data);
  const sendPlayerUpdate = () =>
    superBroadcast(events.playerUpdate, { sockets });
  const startGame = () => {
    if (sockets.length > 1) {
      if (inProgress === false) {
        inProgress = true;
        superBroadcast(events.gameStarted);
        painter = choosePainter();
        word = chooseWord();
        io.to(painter.id).emit(events.painterNotif, { word });
        timeout = setTimeout(() => endGame(), 30000);
      }
    }
  };
  const endGame = () => {
    inProgress = false;
    if (timeout !== null) clearTimeout(timeout);
    superBroadcast(events.gameEnded);
    setTimeout(() => startGame(), 2000);
  };

  const addPoints = (id) => {
    sockets = sockets.map((socket) => {
      if (socket.id === id) {
        socket.points += 10;
      }
      return socket;
    });
    sendPlayerUpdate();
    endGame();
  };

  socket.on(events.addPlayer, ({ username, loginNotification }) => {
    socket.username = username;
    sockets.push({ id: socket.id, points: 0, username });
    sendPlayerUpdate();
    if (!loginNotification) setTimeout(() => startGame(), 2000);
  });

  socket.on(events.disconnect, () => {
    sockets = sockets.filter((aSocket) => aSocket.id != socket.id);
    // if (sockets.length === 1) {
    //   endGame();
    // } else if (painter) {
    //   if (socket.id === painter.id) {
    //     endGame();
    //   }
    // }
    broadcast(events.disconnected, { username: socket.username });
    sendPlayerUpdate();
  });

  socket.on(events.sendMsg, ({ message, username }) => {
    if (word === message) {
      superBroadcast(events.newMsg, {
        message: `Winner is ${socket.username}, word was: ${word}`,
        username: "Bot",
      });
      addPoints(socket.id);
    } else broadcast(events.newMsg, { message, username });
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

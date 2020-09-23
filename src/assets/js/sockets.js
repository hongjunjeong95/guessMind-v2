import { handleNewMsg } from "./chat";
import { handleDisconnected, handleNewuser } from "./notifications";
import {
  handleBeganPath,
  handleErased,
  handleFilled,
  handleSetPenciled,
  handleStrokedPath,
} from "./paint";
import { handlePlayerUpdate } from "./player";

let socket = null;

export const getSocket = () => socket;

export const initSocket = (aSocket) => {
  const { events } = window;
  socket = aSocket;
  socket.on(events.newUser, handleNewuser);
  socket.on(events.disconnected, handleDisconnected);
  socket.on(events.newMsg, handleNewMsg);
  socket.on(events.beganPath, handleBeganPath);
  socket.on(events.strokedPath, handleStrokedPath);
  socket.on(events.filled, handleFilled);
  socket.on(events.erased, handleErased);
  socket.on(events.setPenciled, handleSetPenciled);
  socket.on(events.playerUpdate, handlePlayerUpdate);
};

import { handleNewuser } from "./notifications";

let socket = null;

export const initSocket = (aSocket) => {
  const { events } = window;
  socket = aSocket;
  socket.on(events.newUser, handleNewuser);
};

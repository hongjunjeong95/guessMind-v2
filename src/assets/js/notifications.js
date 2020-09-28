/* eslint-disable no-undef */
import { getSocket } from "./sockets";

const body = document.querySelector("body");
const USERNAME = "username";

const fireNotification = (text, color) => {
  const notification = document.createElement("div");
  notification.innerText = text;
  notification.style.backgroundColor = color;
  notification.className = "notification";
  body.appendChild(notification);
};

export const handleNewuser = ({ username }) => {
  localStorage.setItem(USERNAME, username);
  const text = `${username} just joined!`;
  const color = "rgb(0, 122, 255)";

  fireNotification(text, color);
  getSocket().emit(window.events.addPlayer, { username });
};

export const handleDisconnected = ({ username }) => {
  console.log("handle Disconnect");
  const text = `${username} just left!`;
  const color = "rgb(255, 149, 0)";
  fireNotification(text, color);
};

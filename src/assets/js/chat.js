import { getSocket } from "./sockets";

const messages = document.getElementById("jsMessages");
const sendMsg = document.getElementById("jsSendMsg");

const appendMsg = (message, username) => {
  const li = document.createElement("li");
  li.innerHTML = `
  <span class="author ${username ? "out" : "self"}">${
    username ? username : "You"
  }:</span> ${message}
  `;
  messages.appendChild(li);
};

const handleSendMsg = (e) => {
  e.preventDefault();
  const input = sendMsg.querySelector("input");
  const { value } = input;
  getSocket().emit(window.events.sendMsg, {
    message: value,
    username: window.JSONUser.username,
  });
  input.value = "";
  appendMsg(value);
};

export const handleNewMsg = ({ message, username }) => {
  appendMsg(message, username);
};

if (sendMsg) {
  sendMsg.addEventListener("submit", handleSendMsg);
}

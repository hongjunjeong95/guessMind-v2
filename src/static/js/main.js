(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleNewMsg = void 0;

var _sockets = require("./sockets");

var messages = document.getElementById("jsMessages");
var sendMsg = document.getElementById("jsSendMsg");

var appendMsg = function appendMsg(message, nickname) {
  var li = document.createElement("li");
  li.innerHTML = "\n  <span class=\"author ".concat(nickname ? "out" : "self", "\">").concat(nickname ? nickname : "You", ":</span> ").concat(message, "\n  ");
  messages.appendChild(li);
};

var handleSendMsg = function handleSendMsg(e) {
  e.preventDefault();
  var input = sendMsg.querySelector("input");
  var value = input.value;
  (0, _sockets.getSocket)().emit(window.events.sendMsg, {
    message: value
  });
  input.value = "";
  appendMsg(value);
};

var handleNewMsg = function handleNewMsg(_ref) {
  var message = _ref.message,
      nickname = _ref.nickname;
  appendMsg(message, nickname);
};

exports.handleNewMsg = handleNewMsg;

if (sendMsg) {
  sendMsg.addEventListener("submit", handleSendMsg);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYXQuanMiXSwibmFtZXMiOlsibWVzc2FnZXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic2VuZE1zZyIsImFwcGVuZE1zZyIsIm1lc3NhZ2UiLCJuaWNrbmFtZSIsImxpIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImFwcGVuZENoaWxkIiwiaGFuZGxlU2VuZE1zZyIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImlucHV0IiwicXVlcnlTZWxlY3RvciIsInZhbHVlIiwiZW1pdCIsIndpbmRvdyIsImV2ZW50cyIsImhhbmRsZU5ld01zZyIsImFkZEV2ZW50TGlzdGVuZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQSxJQUFNQSxRQUFRLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixZQUF4QixDQUFqQjtBQUNBLElBQU1DLE9BQU8sR0FBR0YsUUFBUSxDQUFDQyxjQUFULENBQXdCLFdBQXhCLENBQWhCOztBQUVBLElBQU1FLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUNDLE9BQUQsRUFBVUMsUUFBVixFQUF1QjtBQUN2QyxNQUFNQyxFQUFFLEdBQUdOLFFBQVEsQ0FBQ08sYUFBVCxDQUF1QixJQUF2QixDQUFYO0FBQ0FELEVBQUFBLEVBQUUsQ0FBQ0UsU0FBSCxzQ0FDc0JILFFBQVEsR0FBRyxLQUFILEdBQVcsTUFEekMsZ0JBRUVBLFFBQVEsR0FBR0EsUUFBSCxHQUFjLEtBRnhCLHNCQUdZRCxPQUhaO0FBS0FMLEVBQUFBLFFBQVEsQ0FBQ1UsV0FBVCxDQUFxQkgsRUFBckI7QUFDRCxDQVJEOztBQVVBLElBQU1JLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQ0MsQ0FBRCxFQUFPO0FBQzNCQSxFQUFBQSxDQUFDLENBQUNDLGNBQUY7QUFDQSxNQUFNQyxLQUFLLEdBQUdYLE9BQU8sQ0FBQ1ksYUFBUixDQUFzQixPQUF0QixDQUFkO0FBRjJCLE1BR25CQyxLQUhtQixHQUdURixLQUhTLENBR25CRSxLQUhtQjtBQUkzQiw0QkFBWUMsSUFBWixDQUFpQkMsTUFBTSxDQUFDQyxNQUFQLENBQWNoQixPQUEvQixFQUF3QztBQUFFRSxJQUFBQSxPQUFPLEVBQUVXO0FBQVgsR0FBeEM7QUFDQUYsRUFBQUEsS0FBSyxDQUFDRSxLQUFOLEdBQWMsRUFBZDtBQUNBWixFQUFBQSxTQUFTLENBQUNZLEtBQUQsQ0FBVDtBQUNELENBUEQ7O0FBU08sSUFBTUksWUFBWSxHQUFHLFNBQWZBLFlBQWUsT0FBMkI7QUFBQSxNQUF4QmYsT0FBd0IsUUFBeEJBLE9BQXdCO0FBQUEsTUFBZkMsUUFBZSxRQUFmQSxRQUFlO0FBQ3JERixFQUFBQSxTQUFTLENBQUNDLE9BQUQsRUFBVUMsUUFBVixDQUFUO0FBQ0QsQ0FGTTs7OztBQUlQLElBQUlILE9BQUosRUFBYTtBQUNYQSxFQUFBQSxPQUFPLENBQUNrQixnQkFBUixDQUF5QixRQUF6QixFQUFtQ1YsYUFBbkM7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFNvY2tldCB9IGZyb20gXCIuL3NvY2tldHNcIjtcblxuY29uc3QgbWVzc2FnZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzTWVzc2FnZXNcIik7XG5jb25zdCBzZW5kTXNnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqc1NlbmRNc2dcIik7XG5cbmNvbnN0IGFwcGVuZE1zZyA9IChtZXNzYWdlLCBuaWNrbmFtZSkgPT4ge1xuICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgbGkuaW5uZXJIVE1MID0gYFxuICA8c3BhbiBjbGFzcz1cImF1dGhvciAke25pY2tuYW1lID8gXCJvdXRcIiA6IFwic2VsZlwifVwiPiR7XG4gICAgbmlja25hbWUgPyBuaWNrbmFtZSA6IFwiWW91XCJcbiAgfTo8L3NwYW4+ICR7bWVzc2FnZX1cbiAgYDtcbiAgbWVzc2FnZXMuYXBwZW5kQ2hpbGQobGkpO1xufTtcblxuY29uc3QgaGFuZGxlU2VuZE1zZyA9IChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgY29uc3QgaW5wdXQgPSBzZW5kTXNnLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKTtcbiAgY29uc3QgeyB2YWx1ZSB9ID0gaW5wdXQ7XG4gIGdldFNvY2tldCgpLmVtaXQod2luZG93LmV2ZW50cy5zZW5kTXNnLCB7IG1lc3NhZ2U6IHZhbHVlIH0pO1xuICBpbnB1dC52YWx1ZSA9IFwiXCI7XG4gIGFwcGVuZE1zZyh2YWx1ZSk7XG59O1xuXG5leHBvcnQgY29uc3QgaGFuZGxlTmV3TXNnID0gKHsgbWVzc2FnZSwgbmlja25hbWUgfSkgPT4ge1xuICBhcHBlbmRNc2cobWVzc2FnZSwgbmlja25hbWUpO1xufTtcblxuaWYgKHNlbmRNc2cpIHtcbiAgc2VuZE1zZy5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGhhbmRsZVNlbmRNc2cpO1xufVxuIl19
},{"./sockets":5}],2:[function(require,module,exports){
"use strict";

require("./sockets");

require("./notifications");

require("./chat");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfNzBhNGQ4NDMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4vc29ja2V0c1wiO1xuaW1wb3J0IFwiLi9ub3RpZmljYXRpb25zXCI7XG5pbXBvcnQgXCIuL2NoYXRcIjtcbi8vIGltcG9ydCBcIi4vcGFpbnRcIjtcbiJdfQ==
},{"./chat":1,"./notifications":3,"./sockets":5}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleDisconnected = exports.handleNewuser = void 0;

var _sockets = require("./sockets");

var body = document.querySelector("body");

var fireNotification = function fireNotification(text, color) {
  var notification = document.createElement("div");
  notification.innerText = text;
  notification.style.backgroundColor = color;
  notification.className = "notification";
  body.appendChild(notification);
};

var handleNewuser = function handleNewuser(_ref) {
  var username = _ref.username;
  var text = "".concat(username, " just joined!");
  var color = "rgb(0, 122, 255)";
  fireNotification(text, color);
  console.log("HandleNewUser");
  (0, _sockets.getSocket)().emit(window.events.addPlayer, {
    username: username
  });
};

exports.handleNewuser = handleNewuser;

var handleDisconnected = function handleDisconnected(_ref2) {
  var nickname = _ref2.nickname;
  var text = "".concat(nickname, " just left!");
  var color = "rgb(255, 149, 0)";
  fireNotification(text, color);
};

exports.handleDisconnected = handleDisconnected;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdGlmaWNhdGlvbnMuanMiXSwibmFtZXMiOlsiYm9keSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImZpcmVOb3RpZmljYXRpb24iLCJ0ZXh0IiwiY29sb3IiLCJub3RpZmljYXRpb24iLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJUZXh0Iiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJjbGFzc05hbWUiLCJhcHBlbmRDaGlsZCIsImhhbmRsZU5ld3VzZXIiLCJ1c2VybmFtZSIsImNvbnNvbGUiLCJsb2ciLCJlbWl0Iiwid2luZG93IiwiZXZlbnRzIiwiYWRkUGxheWVyIiwiaGFuZGxlRGlzY29ubmVjdGVkIiwibmlja25hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQSxJQUFNQSxJQUFJLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixNQUF2QixDQUFiOztBQUVBLElBQU1DLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsQ0FBQ0MsSUFBRCxFQUFPQyxLQUFQLEVBQWlCO0FBQ3hDLE1BQU1DLFlBQVksR0FBR0wsUUFBUSxDQUFDTSxhQUFULENBQXVCLEtBQXZCLENBQXJCO0FBQ0FELEVBQUFBLFlBQVksQ0FBQ0UsU0FBYixHQUF5QkosSUFBekI7QUFDQUUsRUFBQUEsWUFBWSxDQUFDRyxLQUFiLENBQW1CQyxlQUFuQixHQUFxQ0wsS0FBckM7QUFDQUMsRUFBQUEsWUFBWSxDQUFDSyxTQUFiLEdBQXlCLGNBQXpCO0FBQ0FYLEVBQUFBLElBQUksQ0FBQ1ksV0FBTCxDQUFpQk4sWUFBakI7QUFDRCxDQU5EOztBQVFPLElBQU1PLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsT0FBa0I7QUFBQSxNQUFmQyxRQUFlLFFBQWZBLFFBQWU7QUFDN0MsTUFBTVYsSUFBSSxhQUFNVSxRQUFOLGtCQUFWO0FBQ0EsTUFBTVQsS0FBSyxHQUFHLGtCQUFkO0FBQ0FGLEVBQUFBLGdCQUFnQixDQUFDQyxJQUFELEVBQU9DLEtBQVAsQ0FBaEI7QUFDQVUsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksZUFBWjtBQUNBLDRCQUFZQyxJQUFaLENBQWlCQyxNQUFNLENBQUNDLE1BQVAsQ0FBY0MsU0FBL0IsRUFBMEM7QUFBRU4sSUFBQUEsUUFBUSxFQUFSQTtBQUFGLEdBQTFDO0FBQ0QsQ0FOTTs7OztBQVFBLElBQU1PLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBcUIsUUFBa0I7QUFBQSxNQUFmQyxRQUFlLFNBQWZBLFFBQWU7QUFDbEQsTUFBTWxCLElBQUksYUFBTWtCLFFBQU4sZ0JBQVY7QUFDQSxNQUFNakIsS0FBSyxHQUFHLGtCQUFkO0FBQ0FGLEVBQUFBLGdCQUFnQixDQUFDQyxJQUFELEVBQU9DLEtBQVAsQ0FBaEI7QUFDRCxDQUpNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0U29ja2V0IH0gZnJvbSBcIi4vc29ja2V0c1wiO1xuXG5jb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XG5cbmNvbnN0IGZpcmVOb3RpZmljYXRpb24gPSAodGV4dCwgY29sb3IpID0+IHtcbiAgY29uc3Qgbm90aWZpY2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbm90aWZpY2F0aW9uLmlubmVyVGV4dCA9IHRleHQ7XG4gIG5vdGlmaWNhdGlvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcjtcbiAgbm90aWZpY2F0aW9uLmNsYXNzTmFtZSA9IFwibm90aWZpY2F0aW9uXCI7XG4gIGJvZHkuYXBwZW5kQ2hpbGQobm90aWZpY2F0aW9uKTtcbn07XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVOZXd1c2VyID0gKHsgdXNlcm5hbWUgfSkgPT4ge1xuICBjb25zdCB0ZXh0ID0gYCR7dXNlcm5hbWV9IGp1c3Qgam9pbmVkIWA7XG4gIGNvbnN0IGNvbG9yID0gXCJyZ2IoMCwgMTIyLCAyNTUpXCI7XG4gIGZpcmVOb3RpZmljYXRpb24odGV4dCwgY29sb3IpO1xuICBjb25zb2xlLmxvZyhcIkhhbmRsZU5ld1VzZXJcIik7XG4gIGdldFNvY2tldCgpLmVtaXQod2luZG93LmV2ZW50cy5hZGRQbGF5ZXIsIHsgdXNlcm5hbWUgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaGFuZGxlRGlzY29ubmVjdGVkID0gKHsgbmlja25hbWUgfSkgPT4ge1xuICBjb25zdCB0ZXh0ID0gYCR7bmlja25hbWV9IGp1c3QgbGVmdCFgO1xuICBjb25zdCBjb2xvciA9IFwicmdiKDI1NSwgMTQ5LCAwKVwiO1xuICBmaXJlTm90aWZpY2F0aW9uKHRleHQsIGNvbG9yKTtcbn07XG4iXX0=
},{"./sockets":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handlePlayerUpdate = void 0;
// import { disableCanvas, enableCanvas } from "./paint";
var board = document.getElementById("jsPBoard");
var notif = document.getElementById("jsNotifs");

var addPlayers = function addPlayers(players) {
  console.log("playerupdate", players);
  board.innerHTML = "";
  players.forEach(function (player) {
    var playerElement = document.createElement("span");
    playerElement.innerText = "".concat(player.username, ": ").concat(player.points);
    board.appendChild(playerElement);
  });
};

var handlePlayerUpdate = function handlePlayerUpdate(_ref) {
  var sockets = _ref.sockets;
  return addPlayers(sockets);
}; // export const handleGameStarted = () => {
//   disableCanvas();
// };
// export const handlePainterNotif = ({ word }) => {
//   enableCanvas();
//   notif.innerText = `You are the painter, word: ${word}`;
// };
// export const handleGameEnded = () => {
//   notif.innerText = "";
// };


exports.handlePlayerUpdate = handlePlayerUpdate;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBsYXllci5qcyJdLCJuYW1lcyI6WyJib2FyZCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJub3RpZiIsImFkZFBsYXllcnMiLCJwbGF5ZXJzIiwiY29uc29sZSIsImxvZyIsImlubmVySFRNTCIsImZvckVhY2giLCJwbGF5ZXIiLCJwbGF5ZXJFbGVtZW50IiwiY3JlYXRlRWxlbWVudCIsImlubmVyVGV4dCIsInVzZXJuYW1lIiwicG9pbnRzIiwiYXBwZW5kQ2hpbGQiLCJoYW5kbGVQbGF5ZXJVcGRhdGUiLCJzb2NrZXRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUVBLElBQU1BLEtBQUssR0FBR0MsUUFBUSxDQUFDQyxjQUFULENBQXdCLFVBQXhCLENBQWQ7QUFDQSxJQUFNQyxLQUFLLEdBQUdGLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixVQUF4QixDQUFkOztBQUVBLElBQU1FLFVBQVUsR0FBRyxTQUFiQSxVQUFhLENBQUNDLE9BQUQsRUFBYTtBQUM5QkMsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksY0FBWixFQUE0QkYsT0FBNUI7QUFDQUwsRUFBQUEsS0FBSyxDQUFDUSxTQUFOLEdBQWtCLEVBQWxCO0FBQ0FILEVBQUFBLE9BQU8sQ0FBQ0ksT0FBUixDQUFnQixVQUFDQyxNQUFELEVBQVk7QUFDMUIsUUFBTUMsYUFBYSxHQUFHVixRQUFRLENBQUNXLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBdEI7QUFDQUQsSUFBQUEsYUFBYSxDQUFDRSxTQUFkLGFBQTZCSCxNQUFNLENBQUNJLFFBQXBDLGVBQWlESixNQUFNLENBQUNLLE1BQXhEO0FBQ0FmLElBQUFBLEtBQUssQ0FBQ2dCLFdBQU4sQ0FBa0JMLGFBQWxCO0FBQ0QsR0FKRDtBQUtELENBUkQ7O0FBVU8sSUFBTU0sa0JBQWtCLEdBQUcsU0FBckJBLGtCQUFxQjtBQUFBLE1BQUdDLE9BQUgsUUFBR0EsT0FBSDtBQUFBLFNBQWlCZCxVQUFVLENBQUNjLE9BQUQsQ0FBM0I7QUFBQSxDQUEzQixDLENBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBkaXNhYmxlQ2FudmFzLCBlbmFibGVDYW52YXMgfSBmcm9tIFwiLi9wYWludFwiO1xuXG5jb25zdCBib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianNQQm9hcmRcIik7XG5jb25zdCBub3RpZiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianNOb3RpZnNcIik7XG5cbmNvbnN0IGFkZFBsYXllcnMgPSAocGxheWVycykgPT4ge1xuICBjb25zb2xlLmxvZyhcInBsYXllcnVwZGF0ZVwiLCBwbGF5ZXJzKTtcbiAgYm9hcmQuaW5uZXJIVE1MID0gXCJcIjtcbiAgcGxheWVycy5mb3JFYWNoKChwbGF5ZXIpID0+IHtcbiAgICBjb25zdCBwbGF5ZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgcGxheWVyRWxlbWVudC5pbm5lclRleHQgPSBgJHtwbGF5ZXIudXNlcm5hbWV9OiAke3BsYXllci5wb2ludHN9YDtcbiAgICBib2FyZC5hcHBlbmRDaGlsZChwbGF5ZXJFbGVtZW50KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaGFuZGxlUGxheWVyVXBkYXRlID0gKHsgc29ja2V0cyB9KSA9PiBhZGRQbGF5ZXJzKHNvY2tldHMpO1xuLy8gZXhwb3J0IGNvbnN0IGhhbmRsZUdhbWVTdGFydGVkID0gKCkgPT4ge1xuLy8gICBkaXNhYmxlQ2FudmFzKCk7XG4vLyB9O1xuLy8gZXhwb3J0IGNvbnN0IGhhbmRsZVBhaW50ZXJOb3RpZiA9ICh7IHdvcmQgfSkgPT4ge1xuLy8gICBlbmFibGVDYW52YXMoKTtcbi8vICAgbm90aWYuaW5uZXJUZXh0ID0gYFlvdSBhcmUgdGhlIHBhaW50ZXIsIHdvcmQ6ICR7d29yZH1gO1xuLy8gfTtcbi8vIGV4cG9ydCBjb25zdCBoYW5kbGVHYW1lRW5kZWQgPSAoKSA9PiB7XG4vLyAgIG5vdGlmLmlubmVyVGV4dCA9IFwiXCI7XG4vLyB9O1xuIl19
},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSocket = void 0;

var _notifications = require("./notifications");

var _player = require("./player");

/* eslint-disable no-undef */
// import { handleNewMsg } from "./chat";
// import {
//   handleBeganPath,
//   handleErased,
//   handleFilled,
//   handleSetPenciled,
//   handleStrokedPath,
// } from "./paint";
var aSocket = io("/");
var socket = null;

var getSocket = function getSocket() {
  return socket;
};

exports.getSocket = getSocket;

var initSocket = function initSocket(aSocket) {
  var _window = window,
      events = _window.events;
  socket = aSocket;
  socket.on(events.newUser, _notifications.handleNewuser);
  socket.on(events.playerUpdate, _player.handlePlayerUpdate); // socket.on(events.disconnected, handleDisconnected);
  // socket.on(events.newMsg, handleNewMsg);
  // socket.on(events.beganPath, handleBeganPath);
  // socket.on(events.strokedPath, handleStrokedPath);
  // socket.on(events.filled, handleFilled);
  // socket.on(events.erased, handleErased);
  // socket.on(events.setPenciled, handleSetPenciled);
  // socket.on(events.gameStarted, handleGameStarted);
  // socket.on(events.painterNotif, handlePainterNotif);
  // socket.on(events.gameEnded, handleGameEnded);
};

initSocket(aSocket);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvY2tldHMuanMiXSwibmFtZXMiOlsiYVNvY2tldCIsImlvIiwic29ja2V0IiwiZ2V0U29ja2V0IiwiaW5pdFNvY2tldCIsIndpbmRvdyIsImV2ZW50cyIsIm9uIiwibmV3VXNlciIsImhhbmRsZU5ld3VzZXIiLCJwbGF5ZXJVcGRhdGUiLCJoYW5kbGVQbGF5ZXJVcGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFFQTs7QUFXQTs7QUFiQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFRQSxJQUFNQSxPQUFPLEdBQUdDLEVBQUUsQ0FBQyxHQUFELENBQWxCO0FBQ0EsSUFBSUMsTUFBTSxHQUFHLElBQWI7O0FBRU8sSUFBTUMsU0FBUyxHQUFHLFNBQVpBLFNBQVk7QUFBQSxTQUFNRCxNQUFOO0FBQUEsQ0FBbEI7Ozs7QUFFUCxJQUFNRSxVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFDSixPQUFELEVBQWE7QUFBQSxnQkFDWEssTUFEVztBQUFBLE1BQ3RCQyxNQURzQixXQUN0QkEsTUFEc0I7QUFFOUJKLEVBQUFBLE1BQU0sR0FBR0YsT0FBVDtBQUNBRSxFQUFBQSxNQUFNLENBQUNLLEVBQVAsQ0FBVUQsTUFBTSxDQUFDRSxPQUFqQixFQUEwQkMsNEJBQTFCO0FBQ0FQLEVBQUFBLE1BQU0sQ0FBQ0ssRUFBUCxDQUFVRCxNQUFNLENBQUNJLFlBQWpCLEVBQStCQywwQkFBL0IsRUFKOEIsQ0FLOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRCxDQWZEOztBQWlCQVAsVUFBVSxDQUFDSixPQUFELENBQVYiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuLy8gaW1wb3J0IHsgaGFuZGxlTmV3TXNnIH0gZnJvbSBcIi4vY2hhdFwiO1xuaW1wb3J0IHtcbiAgLy8gaGFuZGxlRGlzY29ubmVjdGVkLFxuICBoYW5kbGVOZXd1c2VyLFxufSBmcm9tIFwiLi9ub3RpZmljYXRpb25zXCI7XG4vLyBpbXBvcnQge1xuLy8gICBoYW5kbGVCZWdhblBhdGgsXG4vLyAgIGhhbmRsZUVyYXNlZCxcbi8vICAgaGFuZGxlRmlsbGVkLFxuLy8gICBoYW5kbGVTZXRQZW5jaWxlZCxcbi8vICAgaGFuZGxlU3Ryb2tlZFBhdGgsXG4vLyB9IGZyb20gXCIuL3BhaW50XCI7XG5pbXBvcnQge1xuICAvLyBoYW5kbGVHYW1lU3RhcnRlZCxcbiAgaGFuZGxlUGxheWVyVXBkYXRlLFxuICAvLyBoYW5kbGVQYWludGVyTm90aWYsXG4gIC8vIGhhbmRsZUdhbWVFbmRlZCxcbn0gZnJvbSBcIi4vcGxheWVyXCI7XG5cbmNvbnN0IGFTb2NrZXQgPSBpbyhcIi9cIik7XG5sZXQgc29ja2V0ID0gbnVsbDtcblxuZXhwb3J0IGNvbnN0IGdldFNvY2tldCA9ICgpID0+IHNvY2tldDtcblxuY29uc3QgaW5pdFNvY2tldCA9IChhU29ja2V0KSA9PiB7XG4gIGNvbnN0IHsgZXZlbnRzIH0gPSB3aW5kb3c7XG4gIHNvY2tldCA9IGFTb2NrZXQ7XG4gIHNvY2tldC5vbihldmVudHMubmV3VXNlciwgaGFuZGxlTmV3dXNlcik7XG4gIHNvY2tldC5vbihldmVudHMucGxheWVyVXBkYXRlLCBoYW5kbGVQbGF5ZXJVcGRhdGUpO1xuICAvLyBzb2NrZXQub24oZXZlbnRzLmRpc2Nvbm5lY3RlZCwgaGFuZGxlRGlzY29ubmVjdGVkKTtcbiAgLy8gc29ja2V0Lm9uKGV2ZW50cy5uZXdNc2csIGhhbmRsZU5ld01zZyk7XG4gIC8vIHNvY2tldC5vbihldmVudHMuYmVnYW5QYXRoLCBoYW5kbGVCZWdhblBhdGgpO1xuICAvLyBzb2NrZXQub24oZXZlbnRzLnN0cm9rZWRQYXRoLCBoYW5kbGVTdHJva2VkUGF0aCk7XG4gIC8vIHNvY2tldC5vbihldmVudHMuZmlsbGVkLCBoYW5kbGVGaWxsZWQpO1xuICAvLyBzb2NrZXQub24oZXZlbnRzLmVyYXNlZCwgaGFuZGxlRXJhc2VkKTtcbiAgLy8gc29ja2V0Lm9uKGV2ZW50cy5zZXRQZW5jaWxlZCwgaGFuZGxlU2V0UGVuY2lsZWQpO1xuICAvLyBzb2NrZXQub24oZXZlbnRzLmdhbWVTdGFydGVkLCBoYW5kbGVHYW1lU3RhcnRlZCk7XG4gIC8vIHNvY2tldC5vbihldmVudHMucGFpbnRlck5vdGlmLCBoYW5kbGVQYWludGVyTm90aWYpO1xuICAvLyBzb2NrZXQub24oZXZlbnRzLmdhbWVFbmRlZCwgaGFuZGxlR2FtZUVuZGVkKTtcbn07XG5cbmluaXRTb2NrZXQoYVNvY2tldCk7XG4iXX0=
},{"./notifications":3,"./player":4}]},{},[2])
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

require("./login");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfMTdmYTU2ZDEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4vbG9naW5cIjtcbiJdfQ==
},{"./login":2}],2:[function(require,module,exports){
"use strict";

var body = document.querySelector("body");
var loginForm = document.getElementById("jsLogin");
var NICKNAME = "nickname";
var LOGGED_OUT = "loggedOut";
var LOGGED_IN = "loggedIn";

var logIn = function logIn(nickname) {
  var socket = io("/");
  socket.emit("setNickname", {
    nickname: nickname
  });
};

var handleSubmitLogin = function handleSubmitLogin(e) {
  e.preventDefault();
  var input = loginForm.querySelector("input");
  var value = input.value;
  localStorage.setItem(NICKNAME, value);
  input.value = "";
  logIn(value);
};

if (loginForm) {
  loginForm.addEventListener("submit", handleSubmitLogin);
}

var nickname = localStorage.getItem(NICKNAME);

if (nickname === null) {
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
  logIn(nickname);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbImJvZHkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJsb2dpbkZvcm0iLCJnZXRFbGVtZW50QnlJZCIsIk5JQ0tOQU1FIiwiTE9HR0VEX09VVCIsIkxPR0dFRF9JTiIsImxvZ0luIiwibmlja25hbWUiLCJzb2NrZXQiLCJpbyIsImVtaXQiLCJoYW5kbGVTdWJtaXRMb2dpbiIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImlucHV0IiwidmFsdWUiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiYWRkRXZlbnRMaXN0ZW5lciIsImdldEl0ZW0iLCJjbGFzc05hbWUiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsSUFBSSxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBYjtBQUNBLElBQU1DLFNBQVMsR0FBR0YsUUFBUSxDQUFDRyxjQUFULENBQXdCLFNBQXhCLENBQWxCO0FBRUEsSUFBTUMsUUFBUSxHQUFHLFVBQWpCO0FBQ0EsSUFBTUMsVUFBVSxHQUFHLFdBQW5CO0FBQ0EsSUFBTUMsU0FBUyxHQUFHLFVBQWxCOztBQUVBLElBQU1DLEtBQUssR0FBRyxTQUFSQSxLQUFRLENBQUNDLFFBQUQsRUFBYztBQUMxQixNQUFNQyxNQUFNLEdBQUdDLEVBQUUsQ0FBQyxHQUFELENBQWpCO0FBQ0FELEVBQUFBLE1BQU0sQ0FBQ0UsSUFBUCxDQUFZLGFBQVosRUFBMkI7QUFBRUgsSUFBQUEsUUFBUSxFQUFSQTtBQUFGLEdBQTNCO0FBQ0QsQ0FIRDs7QUFLQSxJQUFNSSxpQkFBaUIsR0FBRyxTQUFwQkEsaUJBQW9CLENBQUNDLENBQUQsRUFBTztBQUMvQkEsRUFBQUEsQ0FBQyxDQUFDQyxjQUFGO0FBQ0EsTUFBTUMsS0FBSyxHQUFHYixTQUFTLENBQUNELGFBQVYsQ0FBd0IsT0FBeEIsQ0FBZDtBQUYrQixNQUd2QmUsS0FIdUIsR0FHYkQsS0FIYSxDQUd2QkMsS0FIdUI7QUFJL0JDLEVBQUFBLFlBQVksQ0FBQ0MsT0FBYixDQUFxQmQsUUFBckIsRUFBK0JZLEtBQS9CO0FBQ0FELEVBQUFBLEtBQUssQ0FBQ0MsS0FBTixHQUFjLEVBQWQ7QUFDQVQsRUFBQUEsS0FBSyxDQUFDUyxLQUFELENBQUw7QUFDRCxDQVBEOztBQVNBLElBQUlkLFNBQUosRUFBZTtBQUNiQSxFQUFBQSxTQUFTLENBQUNpQixnQkFBVixDQUEyQixRQUEzQixFQUFxQ1AsaUJBQXJDO0FBQ0Q7O0FBRUQsSUFBTUosUUFBUSxHQUFHUyxZQUFZLENBQUNHLE9BQWIsQ0FBcUJoQixRQUFyQixDQUFqQjs7QUFFQSxJQUFJSSxRQUFRLEtBQUssSUFBakIsRUFBdUI7QUFDckJULEVBQUFBLElBQUksQ0FBQ3NCLFNBQUwsR0FBaUJoQixVQUFqQjtBQUNELENBRkQsTUFFTztBQUNMTixFQUFBQSxJQUFJLENBQUNzQixTQUFMLEdBQWlCZixTQUFqQjtBQUNBQyxFQUFBQSxLQUFLLENBQUNDLFFBQUQsQ0FBTDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xuY29uc3QgbG9naW5Gb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqc0xvZ2luXCIpO1xuXG5jb25zdCBOSUNLTkFNRSA9IFwibmlja25hbWVcIjtcbmNvbnN0IExPR0dFRF9PVVQgPSBcImxvZ2dlZE91dFwiO1xuY29uc3QgTE9HR0VEX0lOID0gXCJsb2dnZWRJblwiO1xuXG5jb25zdCBsb2dJbiA9IChuaWNrbmFtZSkgPT4ge1xuICBjb25zdCBzb2NrZXQgPSBpbyhcIi9cIik7XG4gIHNvY2tldC5lbWl0KFwic2V0Tmlja25hbWVcIiwgeyBuaWNrbmFtZSB9KTtcbn07XG5cbmNvbnN0IGhhbmRsZVN1Ym1pdExvZ2luID0gKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBpbnB1dCA9IGxvZ2luRm9ybS5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIik7XG4gIGNvbnN0IHsgdmFsdWUgfSA9IGlucHV0O1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShOSUNLTkFNRSwgdmFsdWUpO1xuICBpbnB1dC52YWx1ZSA9IFwiXCI7XG4gIGxvZ0luKHZhbHVlKTtcbn07XG5cbmlmIChsb2dpbkZvcm0pIHtcbiAgbG9naW5Gb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgaGFuZGxlU3VibWl0TG9naW4pO1xufVxuXG5jb25zdCBuaWNrbmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKE5JQ0tOQU1FKTtcblxuaWYgKG5pY2tuYW1lID09PSBudWxsKSB7XG4gIGJvZHkuY2xhc3NOYW1lID0gTE9HR0VEX09VVDtcbn0gZWxzZSB7XG4gIGJvZHkuY2xhc3NOYW1lID0gTE9HR0VEX0lOO1xuICBsb2dJbihuaWNrbmFtZSk7XG59XG4iXX0=
},{}]},{},[1])
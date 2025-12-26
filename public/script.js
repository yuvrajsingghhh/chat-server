const socket = io();

const messages = document.getElementById("messages");
const msgInput = document.getElementById("msg");

function sendMsg() {
  if (msgInput.value.trim() === "") return;

  socket.emit("message", msgInput.value);
  addMessage("Me: " + msgInput.value);
  msgInput.value = "";
}

socket.on("message", data => {
  addMessage("Friend: " + data);
});

function addMessage(text) {
  const p = document.createElement("p");
  p.innerText = text;
  messages.appendChild(p);
  messages.scrollTop = messages.scrollHeight;
}

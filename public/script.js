const socket = io(); // ngrok / same server

const messages = document.getElementById("messages");
const msgInput = document.getElementById("msg");

function sendMsg() {
  const text = msgInput.value.trim();
  if (!text) return;

  addMessage(text, "me");
  socket.emit("message", text);

  msgInput.value = "";
}

socket.on("message", text => {
  addMessage(text, "friend");
});

function addMessage(text, type) {
  const div = document.createElement("div");
  div.classList.add("msg-bubble");

  if (type === "me") {
    div.classList.add("msg-me");
  } else {
    div.classList.add("msg-friend");
  }

  div.innerText = text;
  messages.appendChild(div);

  messages.scrollTop = messages.scrollHeight;
}

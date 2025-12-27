const socket = io();

const messages = document.getElementById("messages");
const msgInput = document.getElementById("msg");

/* 🔥 GENERATE 8 CHAR CODE */
function generateCode() {
  return Math.random().toString(36).slice(2, 10).toUpperCase();
}

/* 🔥 USERNAME POPUP (ALWAYS SHOW) */
let username = "";

// force popup every time
while (!username || !username.trim()) {
  username = prompt("Enter your username");
}

username = username.trim();

// generate session code
const userCode = generateCode();

// show code once
alert(`Welcome ${username}!\nYour special code: ${userCode}`);

// send join info
socket.emit("join", {
  user: username,
  code: userCode
});

/* SEND MESSAGE */
function sendMsg() {
  const text = msgInput.value.trim();
  if (!text) return;

  addMessage(text, "me");

  socket.emit("message", {
    user: username,
    code: userCode,
    text: text
  });

  msgInput.value = "";
}

/* RECEIVE MESSAGE */
socket.on("message", data => {
  // ignore own message
  if (data.user === username && data.code === userCode) return;

  addMessage(`${data.user}: ${data.text}`, "friend");
});

/* MESSAGE UI */
function addMessage(text, type) {
  const div = document.createElement("div");
  div.classList.add("msg-bubble", type === "me" ? "msg-me" : "msg-friend");

  div.innerText = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

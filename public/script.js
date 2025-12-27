const socket = io();

const messages = document.getElementById("messages");
const msgInput = document.getElementById("msg");

/* 🔥 STRONG RANDOM 8-CHAR CODE */
function generateCode() {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase();
}

/* 🔥 USERNAME (NOT STORED) */
let username = "";
while (!username || !username.trim()) {
  username = prompt("Enter your username");
}
username = username.trim();

/* 🔥 NEW CODE EVERY TIME */
const userCode = generateCode();

// show once
alert(`Welcome ${username}\nYour new chat code:\n${userCode}`);

/* SEND MESSAGE */
function sendMsg() {
  const text = msgInput.value.trim();
  if (!text) return;

  addMessage(text, "me");

  socket.emit("message", {
    code: userCode,
    text: text
  });

  msgInput.value = "";
}

/* RECEIVE MESSAGE */
socket.on("message", data => {
  // ignore own message
  if (data.code === userCode) return;

  addMessage(`[${data.code}] ${data.text}`, "friend");
});

/* UI */
function addMessage(text, type) {
  const div = document.createElement("div");
  div.classList.add("msg-bubble", type === "me" ? "msg-me" : "msg-friend");

  div.innerText = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

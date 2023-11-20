const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

const nameForm = document.getElementById('name-form');
const chatDiv = document.querySelector('.chat-app');
const nameInput = document.getElementById('username');
const displayNameSpan = document.getElementById('display-name');

nameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const displayName = nameInput.value.trim();
  if (displayName) {
    nameForm.style.display = 'none';
    chatDiv.style.display = 'block';
    displayNameSpan.textContent = displayName;
    socket.emit('user joined', displayName); // Emit an event for user joining
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    const message = `${displayNameSpan.textContent}: ${input.value}`;
    socket.emit('chat message', message);
    input.value = '';
  }
});

socket.on('chat message', (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  messages.appendChild(li);
});

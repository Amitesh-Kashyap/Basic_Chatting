const socket = io('https://willconversetogether.onrender.com');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

var audio = new Audio(`/resources/uwu.mp3`);

const append = (message , position)=>{
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left')
    {
        audio.play();
    }
};

form.addEventListener('submit' , (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}` , `right`);
    socket.emit('send' , message);
    messageInput.value = '';
})

const user = prompt(`Enter your name to join :`);
socket.emit('new-user-joining' , user);

socket.on('user-joined' , name=>{
    append(`${name} joined the chat` , 'right');
})

socket.on('receive' , data=>{
    append(`${data.name}: ${data.message}` , 'left');
})

socket.on('left-chat' , name=>{
    append(`${name} left the chat` , 'left');
})
let container = document.getElementById('container');
const section = document.querySelector('.section');
let input = document.getElementById('message-input');
let btn = document.getElementById("btn");
let form = document.getElementById('form');

const socket = io();

const Name = prompt("ENTER YOUR NAME?");
socket.emit('newUserJoined', Name);



socket.on('notification', message =>{
    const notifi = document.createElement('div');
    notifi.classList.add('notification');

    const p = document.createElement('p');
    p.innerText= message;
    notifi.appendChild(p);

    container.appendChild(notifi);
    container.scrollTop = container.scrollHeight;
});
socket.on('msgReceive',(data) =>{
    // e.preventDefault();
    console.log('mr');
    const sectionDiv = document.createElement('div');
    sectionDiv.classList.add('section');
    sectionDiv.classList.add('left');

    const nameDiv = document.createElement('div');
    nameDiv.classList.add('name');
    nameDiv.innerText= data.Name;
    sectionDiv.appendChild(nameDiv);

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerText = data.message;
    sectionDiv.appendChild(messageDiv);

    container.appendChild(sectionDiv);
    container.scrollTop = container.scrollHeight;
});


form.addEventListener("submit", sendMessage);

function sendMessage(e){
    e.preventDefault();

    const sectionDiv = document.createElement('div');
    sectionDiv.classList.add('section');
    sectionDiv.classList.add('right');

    const nameDiv = document.createElement('div');
    nameDiv.classList.add('name');
    nameDiv.innerText="You"
    sectionDiv.appendChild(nameDiv);

    const inputMessage = input.value;
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerText = inputMessage;
    sectionDiv.appendChild(messageDiv);

    container.appendChild(sectionDiv);

    socket.emit('msgSend',inputMessage);

    container.scrollTop = container.scrollHeight;
    input.value="";
    input.focus();
}




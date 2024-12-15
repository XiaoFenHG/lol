const socket = io();

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault(); // 防止表单提交
    const input = document.getElementById('input');
    const message = input.value;
    if (message) {
        socket.emit('chat message', message);
        input.value = '';
    }
});

socket.on('chat message', function(msg) {
    const item = document.createElement('li');
    item.textContent = msg;
    document.getElementById('messages').appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

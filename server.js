const net = require('net');

const handleClientData = (data) => {
    console.log('Usuário conectado');
    const parsedData = JSON.parse(data);
    
    const client = new net.Socket();
    client.connect(4001, '127.0.0.1') // Semáforo
    if (parsedData.isPNE) {
        console.log('Pessoa portadora de necessidades especiais aguardando, semáforo deve fechar');
        client.write(data)
    } else if(parsedData.shouldOpen) {
        console.log('Pessoa portadora de necessidades terminou de atravessar');
        client.write(data)
    } else {
        console.log('Não há portadores de necessidades especiais aguardando, seguir fluxo normal');
    }
}

const server = net.createServer((socket) => {
    console.log('Aguardando conexão');

    socket.on('data', handleClientData);
});

server.listen(4000, '127.0.0.1'); 
const net = require('net');

const handleCellphoneResponse = () => {
    
}

const handleTrafficLightResponse = () => {

}

const handleClientData = (data) => {
    console.log('Usuário conectado');

    const parsedData = JSON.parse(data);
    
    if (parsedData.isPNE) {
        console.log('Pessoa portadora de necessidades especiais aguardando, semáforo deve fechar');
        const client = new net.Socket();
        client.connect(4001, '127.0.0.1', handleTrafficLightResponse) // Semáforo
        client.write(data)
    } else if(parsedData.shouldOpen) {
        console.log('Pessoa portadora de necessidades terminou de atravessar');
        const client = new net.Socket();
        client.connect(4001, '127.0.0.1', handleTrafficLightResponse) // Semáforo
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
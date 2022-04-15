const net = require('net');

const client = new net.Socket();

const handleServerResponse = () => {
    server.on('connection', () => {
        console.log('Atravessando');
        setTimeout(() => {
            console.log('Atravessei');
            client.write(JSON.stringify({ shouldOpen: true })); 
        }, [1000])
    })
}

const handleCallback = () => {
    console.log('conectou')
    client.write(JSON.stringify({ isPNE: true })); 
}

const server = net.createServer((socket) => {
    socket.on('data', (data) => handleClientData(data, socket));
});
server.listen(4002, handleServerResponse)
client.connect(4000, '127.0.0.1', handleCallback); // Server

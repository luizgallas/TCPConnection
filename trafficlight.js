const net = require('net');

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        const parsedData = JSON.parse(data);
        
        if (parsedData.isPNE) {
            for(let i = 10; i > 0; i--) {
                console.log(`Semáforo fechando em ${i} segundos`);
            }
    
            console.log('Semáforo fechado');
        } else if (parsedData.shouldOpen) {
            for(let i = 10; i > 0; i--) {
                console.log(`Semáforo abrindo em ${i} segundos`);
            }
    
            console.log('Semáforo aberto');
            server.emit('connection')
    }});
});

server.listen(4001, '127.0.0.1'); 
const net = require('net');

let isOpen = true;
const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        const parsedData = JSON.parse(data);

        let intervalId = null;
        let counter = 10;
        const handleTrafficLightStatus = (isOpening) => {
            isOpen = isOpening;

            if (counter >= 1) {
                isOpening 
                    ? console.log(`Semáforo abrindo em ${counter} segundos`)  
                    : console.log(`Semáforo fechando em ${counter} segundos`)
                counter--;
            } else {
                clearInterval(intervalId);

                isOpening 
                    ? console.log('Semáforo aberto')
                    : console.log('Semáforo fechado');

                counter = 10;
                socket.end();
            }
        }
        
        if (parsedData.isPNE && isOpen) {
            intervalId = setInterval(() => handleTrafficLightStatus(false), 1000);  
        } else if (parsedData.shouldOpen && !isOpen) {
            intervalId = setInterval(() => handleTrafficLightStatus(true), 1000);  
    }});
});

server.listen(4001, '127.0.0.1'); 
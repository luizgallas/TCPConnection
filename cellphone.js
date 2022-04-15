const net = require('net');
var readline = require('readline');

const timeoutLimit = 30;

const client = new net.Socket();

var reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const handleCallback = () => {
    client.write(JSON.stringify({ isPNE: true }));
    reader.question('O semáforo está fechando, aperte qualquer tecla quando houver movimentação do dispositivo', () => {
        console.log('Atravessando');
        const mockTimeToCross = Math.round(Math.floor(Math.random() * 50));
        const willTimeout = mockTimeToCross > timeoutLimit;
        const realAvailableTimeToCross = willTimeout ? timeoutLimit : mockTimeToCross;

        setTimeout(() => {
            if (willTimeout) {
                console.log('Timeout excedido, abrindo semáforo');
                client.write(JSON.stringify({ shouldOpen: true })); 
            } else {
                console.log('Atravessei');
                client.write(JSON.stringify({ shouldOpen: true })); 
            }
        }, [realAvailableTimeToCross * 1000]);
    })
}

client.connect(4000, '127.0.0.1', handleCallback); // Server

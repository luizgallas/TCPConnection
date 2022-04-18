const net = require('net');
var readline = require('readline');

const timeoutLimit = 20;

const client = new net.Socket();

var reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const handlePNEApprouch = () => {
    client.write(JSON.stringify({ isPNE: true }));
    reader.question('O semáforo está fechando, aperte qualquer tecla quando houver movimentação do dispositivo', () => {
        console.log('Atravessando');
        const mockTimeToCross = Math.round(Math.floor(Math.random() * 30));
        const willTimeout = mockTimeToCross > timeoutLimit;
        const realAvailableTimeToCross = willTimeout ? timeoutLimit : mockTimeToCross;

        setTimeout(() => {
            if (willTimeout) {
                console.log('Timeout excedido, abrindo semáforo');
                client.write(JSON.stringify({ shouldOpen: true })); 
            } else {
                console.log('Atravessei');
                client.write(JSON.stringify({ shouldOpen: true })); 

                client.destroy();
                process.exit();
            }
        }, [realAvailableTimeToCross * 1000]);
    })
}

const handleCallback = () => {
    reader.question('É PNE?: SIM = 1, NAO = 2', (answer) => {
        const parsedAnswer = Number(answer);

        if (parsedAnswer === 1) {
            handlePNEApprouch();
        } else if (parsedAnswer === 2) {
            console.log('Pessoa não é portadora de necessidade especial, nenhuma ação necessária');

            client.destroy();
            process.exit();
        }
    });
}

client.connect(4000, '127.0.0.1', handleCallback); // Server
// client.connect(4000, '172.30.133.245', handleCallback); // Server

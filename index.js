const socketClusterServer = require('socketcluster-client');
const http = require('http');

let socket = socketClusterServer.create({
    hostname: 'https://test-socketcluster.oa.r.appspot.com',
});

const requestListener = (req, res)  => {
    socket.transmit('customRemoteEvent', {data: 'this is a transmit data'});
    res.writeHead(200);
    res.end('Transmit sent');
}

(async () => {
    try{
        let result = await socket.invoke('customProc', {data: 'rpc test data'});
        console.log('RESULT: ', result);
    } catch (err) {
        console.log(err);
    }
})();

const server = http.createServer(requestListener);
server.listen(8080);
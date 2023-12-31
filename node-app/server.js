const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    let path = './node-app/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.writeHead(200, {'content-type': 'text/html'});
            break;
        case '/about':
            path += 'about.html';
            res.writeHead(200, {'content-type': 'text/html'});
            break;
        //redirecting '/about-me' to '/about
        case '/about-me':
            res.setHeader('location', '/about');
            res.writeHead(301, {'content-type': 'text/html'});
            res.end();
            break;
        default:
            path += '404.html';
            res.writeHead(404, {'content-type': 'text/html'});
            break;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            
            res.write(data);
            res.end();
        }
    })
});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000');
});
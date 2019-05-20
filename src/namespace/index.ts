import * as express from 'express';
import * as http from 'http';
import * as socket from 'socket.io';
import * as path from 'path';

const app = express();
const server = new http.Server(app);
const io = socket(server);

server.listen(3000, () => {
    console.log('connect 3000');
})

// app.use(express.static(path.join('./src', 'views')));

app.get('/', (req: express.Request, res: express.Response) => {
    res.sendfile('./src/views/index2.htm');
})

const namespace1 = io.of('/namespace1');

namespace1.on('connection', (socket: any) => {
    namespace1.emit('news', { hello: 'Someone connected at namespace1' })
})

const namespace2 = io.of('/namespace2');

namespace2.on('connection', (socket: any) => {
    namespace2.emit('news', { hello: 'Someone connected at namespace2' })
})


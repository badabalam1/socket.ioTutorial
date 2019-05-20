import * as express from 'express';
import * as h from 'http';
import * as socket from 'socket.io';
import * as path from 'path';


const app = express();
const http = h.createServer(app);
const io = socket(http);

import { auth } from './routes';

app.get('/', auth.Socket);

io.on('connection', (socket: any) => {
    console.log(`a user connected`);

    socket.on('chat message', (msg: any) => {
        io.emit('chat message', msg);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
})


export default app;
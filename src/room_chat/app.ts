import * as express from 'express';
import * as http from 'http';
import * as socket from 'socket.io';
import * as path from 'path';

const app = express();
const server = new http.Server(app);
const io = socket(server);

let room = ['room1', 'room2'];
let a = 0;


app.get('/', (req: express.Request, res: express.Response) => {
    res.sendfile('./src/views/chat.htm');
});


io.on('connection', (socket: any) => {
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });


    socket.on('leaveRoom', (num: number, name: string) => {
        socket.leave(room[num], () => {
            console.log(name + ' leave a ' + room[num]);
            io.to(room[num]).emit('leaveRoom', num, name);
        });
    });


    socket.on('joinRoom', (num: number, name: string) => {
        socket.join(room[num], () => {
            console.log(name + ' join a ' + room[num]);
            io.to(room[num]).emit('joinRoom', num, name);
        });
    });


    socket.on('chat message', (num: number, name: string, msg: any) => {
        a = num;
        io.to(room[a]).emit('chat message', name, msg);
    });
});


server.listen(3000, () => {
    console.log('Connect at 3000');
});
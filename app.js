const app = require('express')();
// const http = require('http').createServer(app); // io가 express를 받아들이지 못하기 때문에 http를 사용
// const io = require('socket.io')(http); // http를 통해 통신

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + `/index.html`);
// })

// io.on('connection', )

app.post('/sign_up', async (req, res) => {
    try {
        if ((await User.findOne({ id: req.body.id }))) {
            throw new Error('이미 등록된 아이디입니다.');
        }
        const data = { id: req.body.id, pw: req.body.pw }
        const user = await User.create(data)
        return res.json({ "result": { "success": true, "message": "회원가입에 성공>했습니다." } })
    } catch (err) {
        const { message } = err
        res.status(400).json({ "result": { "success": false, message } })
    }
})


app.post('/sigin_ip', async (req, res) => {
    try {
        if ((await User.findOne({ id: req.body.id }))) {
            throw new Error('');
        }
    } catch (err) {
        res.status(400).json({ '': '' })
    }
})
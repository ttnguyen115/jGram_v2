require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const SocketServer = require('./socketServer');

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Socket.io
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', socket => {
    SocketServer(socket);
})

// Router
app.use('/api', require('./routes/authRouter')); 
app.use('/api', require('./routes/userRouter')); 
app.use('/api', require('./routes/postRouter')); 
app.use('/api', require('./routes/commentRouter')); 

const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log('Connect to mongoDb');
});

const port = process.env.PORT || 5000;
http.listen(port, () => {
    console.log('Server is running on port ', port);
});
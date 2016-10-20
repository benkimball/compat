/* a most-basic socket.io echo server for use in testing. */
var app = require('http').createServer(handler).listen(80);

function handler(req, res) {
  res.writeHead(200);
  res.end('index');
}

var io = require('socket.io')(app);

io.on('connection', function (socket) {
  socket.on('message', function (msg) {
    socket.send(msg);
  });
  socket.on('disconnect', function () { });
});


module.exports = function(io) {

  io.on('connection', function(socket) {
    socket.emit('news', {
      message: 'This is a new connection'
    });
    socket.on('my other event', function(data) {
      console.log(data);
    });

    socket.on('table:create', function(data) {
      socket.emit('table:new', {
        id: '123'
      });
    });
  });
};

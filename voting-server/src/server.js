import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach(8090);

  // store.subscribe takes a callback argument and runs it after every 
  // update to the state
  store.subscribe(
    // io.emit sends the arguments to all connected clients
    () => io.emit('state', store.getState().toJS())
  );

  // when we receive a connection, execute the function 
  io.on('connection', (socket) => {
    // send the state over the socket
    socket.emit('state', store.getState().toJS());
    // set up a listener on this socket that waits for an action then 
    // runs the function
    socket.on('action', store.dispatch.bind(store));
  });

}


const EventEmitter = require('events'); //Class
const emitter = new EventEmitter(); //Object

//Register a listener
emitter.on('messageLogged', (arg) => {
  console.log('Listener called', arg);
});

//Raose an event
emitter.emit('messageLogged', { id:1, url: 'http://'});


emitter.on('logging', (arg) => {
  console.log('Welcome back ' + arg.data);
});

emitter.emit('logging', { data: 'Santiago'});
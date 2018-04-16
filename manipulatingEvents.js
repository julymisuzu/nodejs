var events = require('events');
var eventEmitter = new events.EventEmitter();

/* Declaring the Events */
  var myEventHandler = function() {
    console.log('I hear a scream!');
  }
  eventEmitter.on('scream', myEventHandler);

  // This will be executed just once, even if it's called multiple times
  eventEmitter.once('testingNewScream', function() {
    console.log('Testing New Scream!');
  });

  eventEmitter.on('testingOtherScream', function() {
    console.log('Testing Other Scream');
  });
/**/

/* Calling the events */
  eventEmitter.emit('scream');

  eventEmitter.emit('testingNewScream');
  eventEmitter.emit('testingNewScream');

  eventEmitter.emit('testingOtherScream');
/**/

/* Showing all the declared events */
  console.log(eventEmitter.eventNames());
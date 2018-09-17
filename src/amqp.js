const open = require('amqplib').connect('amqp://localhost');

const send = (eventName, data) => {
  const dataStr = JSON.stringify(data);
  open.then(conn=> {
    return conn.createChannel();
  }).then(channel => {
    return channel.assertQueue(eventName).then(ok => {
      return channel.sendToQueue(eventName, Buffer.from(dataStr));
    });
  }).catch(console.warn);
}

module.exports = {
  send,
}
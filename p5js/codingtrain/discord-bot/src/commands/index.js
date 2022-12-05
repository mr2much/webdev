const replies = [
  'The answer is 42',
  ':heart:',
  ':dizzy:',
  'These are not the droids you are looking for',
];

module.exports = async (msg) => {
  console.log(`Message received: ${msg}`);

  if (msg.channel.id === process.env.CLIENT_ID && msg.content === 'choo choo') {
    // msg.reply(":heart:");
    const index = Math.floor(Math.random() * replies.length);
    msg.channel.send(replies[index]);
  }
};

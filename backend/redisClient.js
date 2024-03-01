const {createClient} = require('redis');

const redisClient = createClient(
  {
    url:'redis://127.0.0.1:6379'
  }
);

redisClient.on('error',err => {
  console.log('Redis Client Error',err);
})

redisClient.connect()
.then(()=>{
  console.log('redis connected.');
})
.catch(console.error)

module.exports = redisClient;
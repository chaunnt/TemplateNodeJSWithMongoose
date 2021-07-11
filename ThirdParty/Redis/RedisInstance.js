const redis = require("redis");

const RedisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASS
});
const DEFAULT_EXPIRE = 300; //5 minutes
const PROJECT_NAME = process.env.PROJECT_NAME || "TEMPLATEPROJECTNAME";
const NODE_ENV = process.env.NODE_ENV || "dev";

RedisClient.on("connect", function() {
  console.log(
    `Redis connected on ${process.env.REDIS_HOST}:${process.env.REDIS_PORT} for project ${PROJECT_NAME} with ${NODE_ENV} environment`
  );
});

async function initRedis() {
  return RedisClient.connected;
}

async function setWithExpire(key, value, expire = DEFAULT_EXPIRE) {
  return new Promise((resolve, reject) => {
    if (!RedisClient.connected) {
      resolve(null);
    }

    let redisKey = PROJECT_NAME + "_" + NODE_ENV + "_" + key;
    RedisClient.set(redisKey, value, "EX", expire, (err, reply) => {
      if (err) {
        console.log(err.toString());
        reject(err);
      } else {
        resolve(reply);
      }
    });
  });
}

async function setNoExpire(key, value, expire) {
  return new Promise((resolve, reject) => {
    if (!RedisClient.connected) {
      resolve(null);
    }
    let redisKey = PROJECT_NAME + "_" + NODE_ENV + "_" + key;
    RedisClient.set(redisKey, value, (err, reply) => {
      if (err) {
        console.log(err.toString());
        reject(err);
      } else {
        resolve(reply);
      }
    });
  });
}

async function get(key) {
  return new Promise((resolve, reject) => {
    if (!RedisClient.connected) {
      resolve(null);
    }
    let redisKey = PROJECT_NAME + "_" + NODE_ENV + "_" + key;
    RedisClient.get(redisKey, (err, reply) => {
      if (err) {
        console.log(err.toString());
        reject("");
      } else {
        resolve(reply);
      }
    });
  });
}

deleteAllKeys();
async function deleteAllKeys() {
  console.log("Delete all redis key");
  RedisClient.keys("*", function(err, rows) {
    rows.forEach(row => {
      RedisClient.del(row);
    });
  });
}

module.exports = {
  initRedis,
  get,
  setNoExpire,
  setWithExpire,
  deleteAllKeys
};

import redis from 'redis';
import { promisify } from 'util';

require('util.promisify').shim();

const client = redis.createClient();
const promiseGet = promisify(client.get).bind(client);
const promiseSet = promisify(client.setex).bind(client);
const promiseDel = promisify(client.del).bind(client);

class RedisCache {
  static async set(key, value) {
    const time = 3600;
    return promiseSet(key, time, JSON.stringify(value));
  }

  static async get(key) {
    const value = await promiseGet(key);
    return JSON.parse(value);
  }

  static async remove(key) {
    return promiseDel(key);
  }
}

export default RedisCache;

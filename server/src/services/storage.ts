import type { User, Room } from "../types";

class Storage<T, K> {
  #store = new Map<T, K>();

  get(key: T) {
    return this.#store.get(key);
  }

  has(key: T) {
    return this.#store.has(key);
  }

  set(key: T, value: K) {
    this.#store.set(key, value);
  }

  delete(key: T) {
    return this.#store.delete(key);
  }

  values(): K[] {
    return Array.from(this.#store.values());
  }

  keys(): T[] {
    return Array.from(this.#store.keys());
  }
}

const users = new Storage<User["id"], User>();
const userRoomMap = new Storage<User["id"], Room["id"]>();
const rooms = new Storage<Room["id"], Room>();

export { users, userRoomMap, rooms };

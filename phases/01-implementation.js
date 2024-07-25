class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null);
    this.count = 0;
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    const index = this.hashMod(key);
    let current = this.data[index];

    while (current) {
      if (current.key === key) {
        current.value = value; // update the value if the key exists
        return;
      }
      if (!current.next) break;
      current = current.next;
    }

    const newPair = new KeyValuePair(key, value);
    if (current) {
      current.next = newPair; // handle collision
    } else {
      this.data[index] = newPair; // insert at the index
    }

    this.count++;

    // check load factor to determine if resize is needed
    if (this.count / this.capacity > 0.7) {
      this.resize();
    }
  }


  read(key) {
    const index = this.hashMod(key);
    let current = this.data[index];

    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }

    return undefined;
  }


  resize() {
    const oldData = this.data;
    this.capacity *= 2;
    this.data = new Array(this.capacity).fill(null);
    this.count = 0; // reset count and reinsert all items

    for (let i = 0; i < old.Data.length; i++) {
      let current = oldData[i];
      while (current) {
        this.insert(current.key, current.value);
        current = current.next;
      }
    }
  }


  delete(key) {
    const index = this.hashMod(key);
    let current = this.data[index];
    let prev = null;

    while (current) {
      if (current.key === key) {
        if (prev) {
          prev.next = current.next; // remove the node in the middle
        } else {
          this.data[index] = current.next; // remove the head node
        }
        this.count--;
        return;
      }
      prev = current;
      current = current.next;
    }

    return "Key not found";
  }
}


module.exports = HashTable;

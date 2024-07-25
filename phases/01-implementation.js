class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {
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
    return this.hash(key) % this.capacity;
  }

  insert(key, value) {
    const index = this.hashMod(key);
    let current = this.data[index];

    console.log(`Inserting key: ${key}, value: ${value} at index: ${index}`);

    if (!current) {
      this.data[index] = new KeyValuePair(key, value);
    } else {
      let prev = null;
      while (current) {
        if (current.key === key) {
          current.value = value;
          console.log(`Updated key: ${key} with new value: ${value}`);
          return;
        }
        prev = current;
        current = current.next;
      }
      prev.next = new KeyValuePair(key, value);
    }

    this.count++;

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
    this.count = 0;

    console.log(`Resizing table to new capacity: ${this.capacity}`);

    for (let i = 0; i < oldData.length; i++) {
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
          prev.next = current.next;
        } else {
          this.data[index] = current.next;
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

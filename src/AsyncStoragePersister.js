import AsyncStorage from '@react-native-community/async-storage';

export default class AsyncStoragePersister {
  #key;

  constructor(key) {
    if (!key) {
      throw new Error('key must be provided');
    }

    this.#key = key;
  }

  save(data) {
    const serializedData = JSON.stringify(data);
    console.log('AsyncStoragePersister.save()', serializedData);
    return AsyncStorage.setItem(this.#key, serializedData);
  }

  async load() {
    const serializedData = await AsyncStorage.getItem(this.#key);
    console.log('AsyncStoragePersister.load()', serializedData);
    let data;
    if (serializedData == null) {
      data = null;
    } else {
      data = JSON.parse(serializedData);
    }
    return data;
  }
}

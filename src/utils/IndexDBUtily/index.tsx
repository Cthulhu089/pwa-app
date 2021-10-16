import { openDB } from "idb";

let dbPromise = openDB("pokedex", 1, {
  upgrade: (db) => {
    if (!db.objectStoreNames.contains("pokemon")) {
      db.createObjectStore("pokemon", { keyPath: "name" });
    }
  },
});

//TODO fix type access set as parameter
export const writeData = async (storeName: string, data: any) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    store.add(data);
    return (tx.oncomplete = () => {});
  } catch (error) {
    return error;
  }
};

export const getAllData = async (storeName: string) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    return store.getAll();
  } catch (error) {
    return error;
  }
};

export const getItemFromStore = async (
  storeName: string,
  value: string | number
) => {
  const db = await dbPromise;
  const tx = db.transaction(storeName, "readonly");
  const store = tx.objectStore(storeName);
  store.get(value);
  return (tx.oncomplete = () => {});
};

export const clearStore = async (storeName: string) => {
  const db = await dbPromise;
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  store.clear();
  return (tx.oncomplete = () => {});
};

export const removeItemFromStore = async (
  storeName: string,
  value: string | number
) => {
  const db = await dbPromise;
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  store.delete(value);
  return (tx.oncomplete = () => {});
};

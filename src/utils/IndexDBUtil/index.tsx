import { openDB } from "idb";

const createDBPromise = async (dbName: string, keyPath: string) => {
  try {
    let dbPromise = openDB(dbName, 1, {
      upgrade: (db) => {
        if (!db.objectStoreNames.contains(dbName)) {
          db.createObjectStore(dbName, { keyPath });
        }
      },
    });
    return dbPromise;
  } catch (error) {
    return;
  }
};

//TODO fix type access set as parameter
export const writeData = async (
  storeName: string,
  data: any,
  dbName: string,
  keyPath: string
) => {
  try {
    const db = await createDBPromise(dbName, keyPath);
    const tx = db?.transaction(storeName, "readwrite");
    const store = tx?.objectStore(storeName);
    store?.add(data);
    return !!tx && (tx.oncomplete = () => {});
  } catch (error) {
    return error;
  }
};

export const getAllData = async (
  storeName: string,
  dbName: string,
  keyPath: string
) => {
  try {
    const db = await createDBPromise(dbName, keyPath);
    const tx = db?.transaction(storeName, "readonly");
    const store = tx?.objectStore(storeName);
    return store?.getAll();
  } catch (error) {
    return error;
  }
};

export const getItemFromStore = async (
  storeName: string,
  value: string | number,
  dbName: string,
  keyPath: string
) => {
  const db = await createDBPromise(dbName, keyPath);
  const tx = db?.transaction(storeName, "readonly");
  const store = tx?.objectStore(storeName);
  store?.get(value);
  return !!tx && (tx.oncomplete = () => {});
};

export const clearStore = async (
  storeName: string,
  dbName: string,
  keyPath: string
) => {
  const db = await createDBPromise(dbName, keyPath);
  const tx = db?.transaction(storeName, "readwrite");
  const store = tx?.objectStore(storeName);
  store?.clear();
  return !!tx && (tx.oncomplete = () => {});
};

export const removeItemFromStore = async (
  storeName: string,
  value: string | number,
  dbName: string,
  keyPath: string
) => {
  const db = await createDBPromise(dbName, keyPath);
  const tx = db?.transaction(storeName, "readwrite");
  const store = tx?.objectStore(storeName);
  store?.delete(value);
  return !!tx && (tx.oncomplete = () => {});
};

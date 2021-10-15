import { openDB } from "idb";

let dbPromise = openDB("get-store", 1, {
  upgrade: (db) => {
    if (!db.objectStoreNames.contains("gets")) {
      db.createObjectStore("gets", { keyPath: "name" });
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

export const readData = async (storeName: string) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    return store.getAll();
  } catch (error) {
    return error;
  }
};

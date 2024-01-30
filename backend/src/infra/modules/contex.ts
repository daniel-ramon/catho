import { AsyncLocalStorage } from 'node:async_hooks';

const asyncLocalStorage = new AsyncLocalStorage();

type StoreValue = string | number | undefined;

interface IContext {
  get(key: string): StoreValue;
  set(key: string, value: StoreValue): void;
}

class Context {
  static get(key: string): StoreValue {
    const store = asyncLocalStorage.getStore() as Map<string, StoreValue>;
    return store?.get(key);
  }

  static set(key: string, value: StoreValue) {
    const store = asyncLocalStorage.getStore() as Map<string, StoreValue>;
    store?.set(key, value);
  }
}


export { IContext, Context, asyncLocalStorage };
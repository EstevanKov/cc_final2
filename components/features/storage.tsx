import AsyncStorage from "@react-native-async-storage/async-storage";

// Abstracción para usar AsyncStorage en móvil y localStorage en web
const isWeb = typeof window !== "undefined" && !!window.localStorage;

const Loginstorage = {
  getItem: async (key: string): Promise<string | null> => {
    if (isWeb) {
      return Promise.resolve(localStorage.getItem(key));
    }
    return AsyncStorage.getItem(key);
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (isWeb) {
      localStorage.setItem(key, value);
      return Promise.resolve();
    }
    return AsyncStorage.setItem(key, value);
  },
  removeItem: async (key: string): Promise<void> => {
    if (isWeb) {
      localStorage.removeItem(key);
      return Promise.resolve();
    }
    return AsyncStorage.removeItem(key);
  },
  clear: async (): Promise<void> => {
    if (isWeb) {
      localStorage.clear();
      return Promise.resolve();
    }
    return AsyncStorage.clear();
  },
};

export default Loginstorage;

export const LocalStorage = {
  get(key: string) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  set<T>(key: string, value: T) {
    return localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key: string) {
    return localStorage.removeItem(key);
  },
  clear() {
    return localStorage.clear();
  },
};

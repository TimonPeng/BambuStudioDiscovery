import { customAlphabet } from 'nanoid';

export const nanoid = customAlphabet('1234567890abcdef', 10);

export class LocalStorage {
  static get<T>(key: string, defaultValue: T) {
    let parsed: T = defaultValue;

    const value = localStorage.getItem(key);
    if (!value) return defaultValue;

    try {
      parsed = JSON.parse(value);
    } catch (error) {}

    return parsed;
  }

  static set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

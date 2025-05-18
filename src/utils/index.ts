import dayjs from 'dayjs';
import { get } from 'lodash-es';
import { customAlphabet } from 'nanoid';

import Printers from '~/printers.json';
import { Device } from '~/store';

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

export function buildSsdpMessage(device: Device) {
  return (
    'HTTP/1.1 200 OK\r\n' +
    'Server: Buildroot/2018.02-rc3 UPnP/1.0 ssdpd/1.8\r\n' +
    `Date: ${dayjs().format('ddd, DD MMM YYYY HH:mm:ss GMT')}\r\n` +
    `Location: ${device.ip}\r\n` +
    'ST: urn:bambulab-com:device:3dprinter:1\r\n' +
    'EXT:\r\n' +
    `USN: ${device.sn}\r\n` +
    'Cache-Control: max-age=1800\r\n' +
    `DevModel.bambu.com: ${get(Printers, device.model)}\r\n` +
    `DevName.bambu.com: ${device.name}\r\n` +
    'DevSignal.bambu.com: -44\r\n' +
    'DevConnect.bambu.com: lan\r\n' +
    'DevBind.bambu.com: free\r\n\r\n'
  );
}

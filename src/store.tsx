import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { LocalStorage } from '~/utils';

export type SerialNumber = string & {};
export interface Device {
  model: string;
  name: string;
  sn: SerialNumber;
  ip: string;
  studioIp: string;
}

type Devices = Record<SerialNumber, Device>;

interface State {
  devices: Devices;
  editDevice: (sn: SerialNumber, device: Device) => void;
  removeDevices: (sns: SerialNumber[]) => void;

  // undefined means new add
  editingSN: SerialNumber | null | undefined;
  setEditingSN: (sn: SerialNumber | null | undefined) => void;
}

enum StorageKey {
  DEVICES = 'devices',
}

export const useStore = create<State>()(
  immer((set, get) => ({
    devices: LocalStorage.get<Devices>(StorageKey.DEVICES, {}),
    editDevice: (sn, device) => {
      set((state) => {
        state.devices[sn] = device;

        LocalStorage.set(StorageKey.DEVICES, state.devices);
      });
    },
    removeDevices: (sns) => {
      set((state) => {
        for (const sn of sns) {
          delete state.devices[sn];
        }

        LocalStorage.set(StorageKey.DEVICES, state.devices);
      });
    },

    editingSN: null,
    setEditingSN: (sn) => {
      set({ editingSN: sn });
    },
  })),
);

export function useDevices() {
  // const { devices } = useStore(); // ❌
  // const devices = useStore.getState().devices; // ❌
  const devices = useStore((state) => state.devices); // ✅
  const editDevice = useStore((state) => state.editDevice);
  const removeDevices = useStore((state) => state.removeDevices);

  const editingSN = useStore((state) => state.editingSN);
  const setEditingSN = useStore((state) => state.setEditingSN);

  return { devices, editDevice, removeDevices, editingSN, setEditingSN };
}

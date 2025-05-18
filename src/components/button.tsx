import { Button } from 'antd';

import { useDevices } from '~/store';

export function AddButton() {
  const { setEditingSN } = useDevices();

  return (
    <Button type='primary' size='large' onClick={() => setEditingSN(undefined)}>
      Add
    </Button>
  );
}

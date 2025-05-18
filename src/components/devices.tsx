import { bind, send, unbind } from '@kuyoonjo/tauri-plugin-udp';
import { Button, notification, Popconfirm, Table, TableProps } from 'antd';

import { Device, useDevices } from '~/store';
import { buildSsdpMessage, nanoid } from '~/utils';

export function Devices() {
  const { devices, setEditingSN, removeDevices } = useDevices();

  const columns: TableProps<Device>['columns'] = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Model', dataIndex: 'model' },
    { title: 'SN', dataIndex: 'sn' },
    { title: 'Printer IP', dataIndex: 'ip' },
    { title: 'Studio IP', dataIndex: 'studioIp' },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, device) => (
        <div>
          <Button className='mr-2' type='primary' size='small' onClick={() => broadcast([device])}>
            Broadcast
          </Button>
          <Button type='link' size='small' onClick={() => setEditingSN(device.sn)}>
            Edit
          </Button>
          <Popconfirm title='Delete this device?' okText='Yes' cancelText='No' onConfirm={() => removeDevices([device.sn])}>
            <Button type='link' size='small' danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  async function report(device: Device) {
    const id = nanoid();

    await bind(id, '0.0.0.0:0');
    await send(id, `${device.studioIp}:2021`, buildSsdpMessage(device));
    await unbind(id);
  }

  function broadcast(devices: Device[]) {
    Promise.all(devices.map(report))
      .then(() => {
        notification.success({
          message: 'Broadcast success',
        });
      })
      .catch((error) => {
        notification.error({
          message: 'Broadcast failed',
          description: error.message,
        });
      });
  }

  return <Table<Device> rowKey='sn' columns={columns} dataSource={Object.values(devices)} locale={{ emptyText: 'No devices' }} />;
}

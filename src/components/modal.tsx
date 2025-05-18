import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { Button, Form, FormItemProps, FormProps, Input, Modal, Select, Space } from 'antd';
import { get } from 'lodash-es';

import Printers from '~/printers.json';
import { Device, useDevices } from '~/store';
import { IpAddress, SerialNumber } from '~/utils/validator';

function FormItem({ label, rules = [], children, ...rest }: Omit<FormItemProps, 'label'> & { label: string } & PropsWithChildren) {
  return (
    <Form.Item<Device>
      label={label}
      {...rest}
      rules={[{ required: true, message: `Please input the ${label.toLowerCase()}` }, ...rules]}
      validateFirst
      hasFeedback
    >
      {children}
    </Form.Item>
  );
}

const defaultValues = { studioIp: '127.0.0.1' };

export function EditModal() {
  const { devices, editingSN, setEditingSN, editDevice } = useDevices();
  const initialValues = useMemo(() => {
    if (!editingSN) return defaultValues;
    return get(devices, editingSN, defaultValues);
  }, [editingSN, devices]);

  const [form] = Form.useForm<Device>();
  const [submittable, setSubmittable] = useState(false);
  const values = Form.useWatch([], form);
  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  const [isLoading, setIsLoading] = useState(false);
  const onFinish: FormProps<Device>['onFinish'] = (values) => {
    setIsLoading(true);

    const sn = editingSN ?? values.sn;
    editDevice(sn, values);

    handleClose();
  };

  const handleClose = () => {
    setEditingSN(null);
    setIsLoading(false);
    form.resetFields();
  };

  return (
    <Modal
      title={editingSN === undefined ? 'Add a new device' : 'Edit a device'}
      open={editingSN !== null}
      onCancel={handleClose}
      afterClose={handleClose}
      footer={null}
      centered
      destroyOnHidden
    >
      <Form
        className='mt-8'
        form={form}
        initialValues={initialValues}
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        requiredMark={false}
        autoComplete='off'
      >
        <FormItem name='model' label='Printer Model'>
          <Select options={Object.keys(Printers).map((displayName) => ({ label: displayName, value: displayName }))} />
        </FormItem>
        <FormItem name='name' label='Printer Name'>
          <Input />
        </FormItem>
        <FormItem name='sn' label='Printer SN' normalize={(value) => value?.toUpperCase()} rules={[{ validator: SerialNumber }]}>
          <Input maxLength={15} />
        </FormItem>
        <FormItem name='ip' label='Printer IP' rules={[{ validator: IpAddress }]}>
          <Input />
        </FormItem>
        <FormItem name='studioIp' label='Studio IP' tooltip='Support Bambu Studio and Orca Slicer' rules={[{ validator: IpAddress }]}>
          <Input />
        </FormItem>

        <div className='text-right'>
          <Space>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type='primary' htmlType='submit' loading={isLoading} disabled={!submittable}>
              Save
            </Button>
          </Space>
        </div>
      </Form>
    </Modal>
  );
}

import { notification, NotificationArgsProps } from 'antd';

interface ArgsProps extends Omit<NotificationArgsProps, 'message'> {
  title: string;
}

export function success({ title, ...rest }: ArgsProps) {
  return notification.success({ message: <p className='font-medium'>{title}</p>, ...rest });
}

export function error({ title, ...rest }: ArgsProps) {
  return notification.error({ message: <p className='font-medium'>{title}</p>, ...rest });
}

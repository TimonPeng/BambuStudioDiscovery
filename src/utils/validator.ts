import { RuleObject } from 'antd/es/form';
import { z, ZodError, ZodSchema } from 'zod';

export function zod(schema: ZodSchema) {
  return (value: string) => {
    try {
      schema.parse(value);
      return Promise.resolve();
    } catch (error) {
      const { issues } = error as ZodError;
      return Promise.reject(new Error(issues[0].message));
    }
  };
}

export function SerialNumber(_: RuleObject, value: string) {
  const sn = z.string().regex(/^[0-9A-Z]{15}$/, { message: 'Not valid Serial Number' });

  return zod(sn)(value);
}

export async function IpAddress(_: RuleObject, value: string) {
  const ip = z.string().ip({ version: 'v4' });

  return zod(ip)(value);
}

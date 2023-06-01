import { getEnv } from './env';
import path from 'path';

export const getPath = (name: string) => {
  const base = getEnv('base') as string;
  return path.resolve(base, name);
};

import fs from 'fs-extra';
import { getEnv } from './env';
import { debugError } from './debug';

/**
 * @description 判断是哪个版本的vue
 */
export const checkVueVersion = (version: string) => {
  const v = version.split('.')[0];
  // ^2.match(/\d+/g) => ['2']
  const matched = v.match(/\d+/g);
  // Number(['2']) => 2
  return Number(matched);
};

/**
 * @description 判断文件夹是否存在
 */
export const pathExists = async (name: string, ext: boolean = true) => {
  const base = getEnv('base') as string;
  const res = await fs.pathExists(`${base}/${name}`);
  if (!res) {
    ext && debugError(`${base}/${name}不存在`);
    return false;
  }
  return res;
};

/**
 * @description 判断使用的是npm还是yarn
 */
export const checkNpmOrYarn = async (_basePath?: string) => {
  // 如果原项目使用的是yarn进行安装的， 那还是使用yarn进行安装，否则使用npm安装
  if (await pathExists('yarn.lock', false)) {
    return ['yarn', 'add'];
  }
  return ['npm', 'init'];
};

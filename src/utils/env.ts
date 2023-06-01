import fs from 'fs-extra';
import { checkVueVersion } from './check';
import { getPath } from './path';

export const env = {
  base: '',
  isVue: false,
  isVue3: false,
  isReact: false,
  isVue2: false,
  isVueCli: false,
  isWebpack: false,
  isEslint: false,
};
type envKeys = keyof typeof env;

/**
 * @description 设置变量
 */
export const setEnv = (key: envKeys, val: any) => {
  env[key] = val as never;
};

/**
 * @description 获取变量
 */
export const getEnv = (key: envKeys) => {
  return env[key];
};

/**
 * @description 把package.json转换为json
 */
export const getPackageJson = async () => {
  const file = getPath('package.json');
  const json = await fs.readJSON(file);
  return json;
};

export const initProjectInfo = async (pkg: any) => {
  const deps = { ...pkg.devDependencies, ...pkg.dependencies };
  if (deps['vue']) {
    setEnv('isVue', true);
    if (checkVueVersion(deps['vue']) === 2) {
      setEnv('isVue2', true);
    }
    if (checkVueVersion(deps['vue']) === 3) {
      setEnv('isVue3', true);
    }
  }
  if (deps['react']) {
    setEnv('isReact', true);
  }
  if (deps['eslint']) {
    setEnv('isEslint', true);
  }
  return true;
};

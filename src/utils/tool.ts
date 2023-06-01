import spawn from 'cross-spawn';
import fs from 'fs-extra';
import { getEnv, getPackageJson } from './env';
import { checkNpmOrYarn } from './check';
import { getPath } from './path';
import { debugInfo, debugWarning } from './debug';

export const hasElementInArray = (list: Array<string>, element: string) => {
  return list.includes(element) ? element : '';
};

export const writeInPkg = async (
  devArr: string[],
  key: string = 'devDependencies'
) => {
  let pkg = await getPackageJson();
  if (!pkg[key]) pkg[key] = {};
  devArr.forEach((item: string) => {
    // 为了防止安装包里面的名字有@
    const index = item.lastIndexOf('@');
    const k = index === -1 ? item : item.slice(0, index);
    const v = index === -1 ? '' : item.slice(index + 1) || '';
    pkg[key][k] = v;
    debugInfo(`${item}✅`);
  });
  fs.writeJsonSync(getPath('package.json'), pkg, { spaces: 2 });
};

export const run = async (str: string) => {
  const basePath = getEnv('base') as string;
  const runArr = str.split(' ');
  if (runArr.length < 2) {
    debugWarning(`运行参数错误${str}`);
    return false;
  }
  const [npm, ...args] = runArr;
  debugInfo(`${runArr.join(' ')}✅`);
  spawn.sync(npm, args, {
    stdio: 'pipe',
    cwd: basePath,
  });
};

export const downNodeModules = async () => {
  const basePath = getEnv('base') as string;
  const [n] = await checkNpmOrYarn(basePath);
  await run(`${n} install`);
};

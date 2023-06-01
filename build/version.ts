import fs from 'fs-extra';
import { getPackageJson } from '../src/utils/env';
import { getPath } from '../src/utils/path';
import { debugInfo } from '../src/utils/debug';

const versionInit = async () => {
  // 默认为pathc版本更新
  const pkg = await getPackageJson();
  let version = pkg.version.split('.');
  version[2] = Number(version[2]) + 1;
  pkg['version'] = version.join('.');
  fs.writeJsonSync(getPath('package.json'), pkg, { spaces: 2 });

  debugInfo(`当前版本升级为：${pkg['version']}`);
};
versionInit();

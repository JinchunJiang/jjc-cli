import fs from 'fs-extra';
import { getPackageJson } from '../src/utils/env';
import { getPath } from '../src/utils/path';

const buildInit = async () => {
  const pkg = await getPackageJson();
  pkg['bin'] = {
    jc: 'index.js',
  };
  pkg['main'] = 'index.js';
  // 去掉husky
  delete pkg.scripts.prepare;
  fs.outputFileSync(getPath('./dist/package.json'), JSON.stringify(pkg));
  fs.copyFileSync(getPath('./README.md'), './dist/README.md');
};

buildInit();

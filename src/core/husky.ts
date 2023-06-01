import { writeInPkg, run } from '../utils/tool';
import fs from 'fs-extra';
import { getPackageJson } from '../utils/env';
import { getPath } from '../utils/path';
import { debugInfo, debugWarning } from '../utils/debug';
import { pathExists } from '../utils/check';

// 需要安装的依赖
const devDependencies = ['husky@^8.0.1', 'lint-staged@^12.4.1'];
export const huskyInit = async () => {
  // 检查是否有git，如果没有，需要先初始化git
  if (!(await pathExists('.git', false))) {
    debugInfo('自动执行 git init');
    await run(`git init`);
  }
  // 安装依赖
  await writeInPkg(devDependencies);
  // 更改package
  let pkg = await getPackageJson();
  pkg.scripts['prepare'] = 'husky installl';
  pkg.scripts['pre-commit'] = 'lint staged';
  pkg.scripts['postinstallmac'] =
    'git config core.hooksPath .husky && chmod 700 .husky/*';
  pkg.scripts['eslint'] =
    'eslint --cache --max-warnings 0 "{src,mock}/**/*.{vue,ts,js,tsx}" --fix';
  pkg['lint-staged'] = {
    '*.js,ts,vue,jsx,tsx}': ['npm run eslint'],
    '*.{js,jsx,ts,tsx,md,html,css,less,scss,sass}': 'prettier --write',
  };
  fs.writeJsonSync(getPath('package.json'), pkg, { spaces: 2 });
  await run('npm run prepare');
  await run('npx husky add .husky/pre-commit "npm-run-pre-commit"');
};

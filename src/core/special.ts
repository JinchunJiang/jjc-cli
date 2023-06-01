// 一些特殊的处理
import fs from 'fs-extra';
import { env, getPackageJson } from '../utils/env';
import { getPath } from '../utils/path';

export const specialFn = async () => {
  // const { isVue3 } = env;
  // if (!isVue3) return;
  let pkg = await getPackageJson();
  if (pkg.type) {
    delete pkg.type;
  }
  fs.writeJsonSync(getPath('package.json'), pkg, { spaces: 2 });
  // 如果是vue3 的话 需要把package中的 type="module"去掉
};

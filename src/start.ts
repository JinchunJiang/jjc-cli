import { answersType } from './interface';
import { getPackageJson, initProjectInfo } from './utils/env';
import { debugError, debugProcess, debugTxt } from './utils/debug';
import { specialFn } from './core/special';
import { hasElementInArray } from './utils/tool';
import { eslintInit } from './core/eslint';
import { eslintIgnoreInit } from './core/eslintignore';
import { huskyInit } from './core/husky';
import { commitLintInit } from './core/commitlint';
import { vscodeInit } from './core/vscode';

export const start = async (base: string, answers: answersType) => {
  const pkg = await getPackageJson();
  const { vue3 = false, plugins = [] } = answers;
  await initProjectInfo(pkg);

  try {
    // 针对vue3模版特殊处理
    vue3 && (await specialFn());

    // 安装 eslint 和 prettier 并自动生成配置文件
    hasElementInArray(plugins, 'eslint') && (await eslintInit());

    // 添加eslint忽略文件
    hasElementInArray(plugins, 'eslint') && (await eslintIgnoreInit());

    // 安装 husky 并自动生成配置文件
    hasElementInArray(plugins, 'husky') && (await huskyInit());

    // 生成.vscode 配置文件 支持自动格式化代码
    hasElementInArray(plugins, 'commitLint') && (await commitLintInit());

    // 格式化VSCode格式
    hasElementInArray(plugins, 'vscode') && (await vscodeInit());

    await debugProcess(
      `恭喜您，成功注册${vue3 ? 'vue3' : ''} ${hasElementInArray(
        plugins,
        'eslint'
      )} ${hasElementInArray(plugins, 'husky')} ${hasElementInArray(
        plugins,
        'commitLint'
      )} ${hasElementInArray(plugins, 'vscode')} 插件`
    );

    // 部分版本依赖可能有冲突，建议重新安装node modules
    debugProcess('请重新安装依赖！npm install or yarn');
    debugTxt(``);
  } catch (e) {
    debugError(JSON.stringify(e));
  }
};

#!/usr/bin/env node
import initCli from './src/cli';
import inquirer from 'inquirer';
import { answersType } from './src/interface';
const promptList = [
  {
    type: 'confirm',
    message: '是否为vue3项目',
    name: 'vue3',
  },
  {
    type: 'checkbox',
    message: '选择要安装的插件(默认全选)',
    name: 'plugins',
    choices: [
      {
        name: 'eslint注册',
        value: 'eslint',
        checked: true,
      },
      {
        name: 'husky注册',
        value: 'husky',
        checked: true,
      },
      {
        name: 'commitLint注册',
        value: 'commitLint',
        checked: true,
      },
      {
        name: 'vscode格式化注册',
        value: 'vscode',
        checked: true,
      },
    ],
  },
];
async function question() {
  const answer: answersType = await inquirer.prompt(promptList);
  initCli(answer);
}
question();

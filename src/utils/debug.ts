import chalk from 'chalk';
const log = console.log;

let debugSwitch = true;

/**
 * @param debug boolean
 * @description debug开关，默认开启
 */
const switchDebug = (debug: boolean) => {
  debugSwitch = debug;
};

const PREFIX = chalk.hex('#646cff')(`[jjc-cli]:`);

/**
 * @param msg 错误信息
 */
const debugError = (msg: string) => {
  debugSwitch && log(PREFIX + chalk.red(msg));
  // 出错了就退出
  process.exit(0);
};

const debugInfo = (msg: string) => {
  debugSwitch && log(PREFIX + chalk.green(msg));
};

const debugProcess = (msg: string) => {
  debugSwitch && log(PREFIX + chalk.yellow(msg));
};

const debugWarning = (msg: string) => {
  debugSwitch && log(PREFIX + chalk.yellow(msg));
};

const debugTxt = (msg: string) => {
  debugSwitch && log(PREFIX + chalk.hex('#5c6d82')(msg));
};

export {
  switchDebug,
  debugError,
  debugInfo,
  debugProcess,
  debugTxt,
  debugWarning,
};

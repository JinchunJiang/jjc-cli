import cac from 'cac';
import { start } from './start';
import { answersType } from './interface';
import { name, version } from '../package.json';

const cli = cac(name);

export default async (answers: answersType) => {
  cli
    .command('[root]')
    .option('--base, -b [base]', 'base')
    .alias('alias')
    .action(async (_root, options) => {
      let base: string = options.base;
      if (!base) {
        base = process.cwd();
      }
      await start(base, answers);
    });

  cli.help();
  cli.version(version);
  cli.parse();
};

/* 
    shadcn needs a valid package.json where the vue project is
    before launch the component installation, Bun copy the package json, then install the component, finally delete the package json
    issue: https://github.com/shadcn-ui/ui/issues/939
*/

import { parseArgs } from 'node:util';

const rootPackageJson = Bun.file('../../package.json');
await Bun.write('package.json', rootPackageJson);

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    component: {
      type: 'string',
    },
  },
  strict: true,
  allowPositionals: true,
});

if (!values.component) {
  throw new Error('component not defined');
}

const proc = Bun.spawn(['bunx', '--bun', 'shadcn-vue@latest', 'add', values.component], {
  stdin: 'inherit',
  stdout: 'inherit',
  stderr: 'inherit',
});
await proc.exited;

const packageJson = Bun.file('package.json');
await packageJson.delete();

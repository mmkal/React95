const path = require('path');
const fs = require('fs-extra');

const pkg = require(path.resolve('./package.json'));
const includeTypesFolder = process.argv.find(arg => arg.includes('types'));
const outDir = './dist';

const copyFile = file => {
  const buildPath = path.resolve(outDir, path.basename(file));

  fs.copy(file, buildPath);

  return file;
};

const createPackageJson = () => {
  const {
    scripts,
    devDependencies,
    'lint-staged': lintStaged,
    release,
    config,
    ...packageDataOther
  } = pkg;

  const newPackageData = {
    ...packageDataOther,
    main: './cjs',
    module: './esm',
    private: false,
    ...(includeTypesFolder && { types: '@types' }),
  };

  const buildPath = path.resolve(`${outDir}/package.json`);

  fs.writeFileSync(buildPath, JSON.stringify(newPackageData, null, 2), 'utf8');

  return 'package.json';
};

const run = () => {
  const distFiles = [...['README.md'].map(copyFile), createPackageJson()];

  console.log(
    `Created ${distFiles.map(file => file).join(', ')} in ${pkg.name
    }${outDir.replace('.', '')}`,
  );
};

run();

/** @type {import('npm-check-updates').RunOptions} */
module.exports = {
  target: (packageName, versionRange) => {
    if (['eslint', 'tailwindcss', 'react', 'react-dom'].includes(packageName)) return 'minor';

    return 'latest';
  },
};

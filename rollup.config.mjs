/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: ['src/lib/index.js', 'src/lib/rules/import-alias.js'],
  output: {
    dir: 'lib',
    format: 'cjs',
    preserveModules: true,
  },
}

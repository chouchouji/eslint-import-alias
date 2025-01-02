import * as ImportAliasRule from './rules/import-alias';

export default {
  configs: {
    recommended: {
      plugins: ['@binbinji/import-alias'],
      rules: { '@binbinji/import-alias/import-alias': 'error' },
    },
  },
  rules: { 'import-alias': ImportAliasRule },
};
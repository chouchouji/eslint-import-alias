const path = require('path');

export const meta = {
  docs: {
    description: 'Restrict imports to path aliases or relative imports limited by a depth',
    category: 'Possible Errors',
    recommended: true
  },
  fixable: 'code',
  schema: [{
    type: 'object',
    properties: {
      rootDir: { type: 'string' },
      aliases: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            alias: { type: 'string' },
            matcher: { type: 'string' }
          },
          required: [
            'alias',
            'matcher'
          ]
        }
      }
    }
  }]
};

const RELATIVE_MATCHER = /^(?:\.{1,2}\/)+/;
const CWD = process.cwd();

export function create(context) {
  const {
    aliases: _aliases = [],
    rootDir = CWD
  } = context.options[0] || {};

  const aliases = _aliases.map(item => {
    return Object.assign({}, item, {
      matcher: new RegExp(item.matcher)
    });
  });

  return {
    ImportDeclaration(node) {
      /** @type {string} */
      const importValue = node.source.value;
      const matches = importValue.match(RELATIVE_MATCHER);

      if (matches) {
        context.report({
          node,
          message: 'Import path mush be a path alias',
          fix(fixer) {
            const parsedPath = path.parse(context.getFilename());
            const importPath = path.relative(rootDir, path.resolve(parsedPath.dir, importValue));

            for (const item of aliases) {
              const match = importPath.match(item.matcher);

              if (match) {
                const matchingString = match[match.length - 1];
                const index = match[0].indexOf(matchingString);
                const result = importPath.slice(0, index)
                  + item.alias
                  + importPath.slice(index + matchingString.length);

                return fixer.replaceTextRange([node.source.range[0] + 1, node.source.range[1] - 1], result);
              }
            }
          }
        });
      }
    },
    ImportExpression(node) {
      /** @type {string} */
      const importValue = node.source.value;
      const matches = importValue.match(RELATIVE_MATCHER);

      if (matches) {
        context.report({
          node,
          message: 'Import path mush be a path alias',
          fix(fixer) {
            const parsedPath = path.parse(context.getFilename());
            const importPath = path.relative(rootDir, path.resolve(parsedPath.dir, importValue));

            for (const item of aliases) {
              const match = importPath.match(item.matcher);

              if (match) {
                const matchingString = match[match.length - 1];
                const index = match[0].indexOf(matchingString);
                const result = importPath.slice(0, index)
                  + item.alias
                  + importPath.slice(index + matchingString.length);

                return fixer.replaceTextRange([node.source.range[0] + 1, node.source.range[1] - 1], result);
              }
            }
          }
        });
      }
    }
  }
}

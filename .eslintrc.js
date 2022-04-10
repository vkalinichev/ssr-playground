module.exports = {
  extends: ['prettier'],
  overrides: [
    {
      files: ['**/*.js'],
      env: {
        es6: true,
        node: true,
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: ['plugin:@typescript-eslint/recommended', 'plugin:import/typescript'],
      plugins: ['react', 'react-hooks'],
      env: {
        es6: true,
        'shared-node-browser': true,
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },

      rules: {},
      overrides: [
        {
          files: ['**/*.test.ts'],
          env: {
            es6: true,
            jest: true,
          },
        },
      ],
    },
  ],
};

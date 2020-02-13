module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'airbnb-typescript/base'
    ],
    rules: {
        'import/no-unresolved': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        "max-len": [2, 180, 4, {"ignoreUrls": true}],
        'interface-name-prefix': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        'import/prefer-default-export': 'off',
        'class-methods-use-this': 'off'
    }
};


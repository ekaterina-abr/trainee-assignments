module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: ['airbnb', 'prettier'],
    plugins: [
        'babel',
        'import',
        'jsx-a11y',
        'react',
        'prettier'
    ],
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        },
        requireConfigFile: false
    },
    rules: {
        'react/jsx-filename-extension': [1, { "extensions": ['.js', '.jsx'] }]
    }
}
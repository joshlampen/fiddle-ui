const path = require('path');

module.exports = {
    core: {
        builder: 'webpack5',
    },
    stories: ['../src/scripts/components/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-actions',
        '@storybook/addon-links',
    ],
    webpackFinal: async (config, { configType }) => {
        const APP_DIR = path.resolve(__dirname, '../src');
        config.resolve.modules = [
            APP_DIR,
            path.join(APP_DIR, './scripts'),
            '../node_modules',
        ];

        config.resolve.fallback = {
            crypto: require.resolve('crypto-browserify'),
            stream: require.resolve('stream-browserify'),
            path: require.resolve('path-browserify'),
            // http: false,
        };

        config.module.rules.push({
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader'],
            include: path.resolve(__dirname, '../'),
        });

        return config;
    },
};

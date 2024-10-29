const path = require('path');

module.exports = {
    entry: './frontend/src/index.js',
    output: {
        path: path.resolve(__dirname, 'frontend/public'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'tailwindcss',
                                    'autoprefixer',
                                ],
                            },
                        },
                    },
                ],
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@components': path.resolve(__dirname, 'frontend/components'),
            '@pages': path.resolve(__dirname, 'frontend/pages'),
            '@public': path.resolve(__dirname, 'frontend/public')
        }
    },
    devtool: 'source-map'
};
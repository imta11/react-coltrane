const path = require('path');

module.exports = {
    context: path.join(__dirname, './'),
    entry: './app/app.jsx',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            include: path.join(__dirname, 'app'),
        }, ],
    },
};
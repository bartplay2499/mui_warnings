const { merge } = require('webpack-merge')
const common = require('./webpack.config.js')

module.exports = env => merge(common(env), {
    mode: 'development',
    watch: false,
    devtool: 'source-map',
    watchOptions: {
        ignored: ['src/declares/**', 'node_modules/**'],
    },
})
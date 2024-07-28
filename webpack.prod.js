const {merge} = require("webpack-merge")
const base = require("./webpack.loc")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = merge(base, {
    mode: "production",
    output: {
        filename: "bundle.min.js"
    },
    devtool: false,
    performance: {
        maxEntrypointSize: 9000000,
        maxAssetSize: 9000000
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
            }

        ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false
                    }
                }
            })
        ]
    }
})

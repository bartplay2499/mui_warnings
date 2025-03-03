const path = require("path")
const webpack = require("webpack")
const { InjectManifest } = require("workbox-webpack-plugin")


module.exports = (env) => {
    const plugins = [
        new webpack.DefinePlugin({
            "process.env.withPWA": !!env.withPWA,
            "process.env.withTracking": !!env.withTracking
        })
    ]

    if (env.withPWA) {
        plugins.push(
            new InjectManifest({
                swSrc: "./src/serviceWorker.ts",
                swDest: "../sw.js",
                modifyURLPrefix: { "": "/dist/" },
                exclude: [/\.(txt|map)$/i],
                maximumFileSizeToCacheInBytes: 31457280,
            })
        )
    }


    return {
        entry: {
            desktop: "./src/main.tsx",
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".css", ".scss", ".svg"],
            modules: [path.join(__dirname, "./src"), path.join(__dirname, "./node_modules")],
        },
        output: {
            path: path.join(__dirname, "/public/dist"),
            filename: "[name].js",
            clean: true,
        },
        module: {
            rules: [
                { test: /\.svg$/i, issuer: /\.[jt]sx?$/, use: ['@svgr/webpack'], },
                { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: "asset/resource" },
                { test: /\.css$/i, use: ["style-loader", "css-loader"] },
                { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
                { test: /\.js$/, loader: "source-map-loader", enforce: "pre", exclude: /node_modules/ },
                { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
                { test: /\.(png|jpg|jpeg|gif)$/i, type: 'asset/resource' }
            ],
        },
        stats: {
            hash: false,
            entrypoints: false,
            modules: false,
        },
        optimization: {
            runtimeChunk: "single",
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        name: "vendors",
                        test: /[\\/]node_modules[\\/]/,
                        chunks: "all",
                        minChunks: 2,
                        priority: 1,
                    },
                    fonts: {
                        name: "fonts",
                        test: /[\\/]node_modules[\\/]@fontsource.*?[\\/]/,
                        chunks: "all",
                        minChunks: 1,
                        priority: 2,
                    },
                    react: {
                        name: "react",
                        test: /[\\/]node_modules[\\/]react.*?[\\/]/,
                        chunks: "all",
                        minChunks: 1,
                        priority: 3,
                    },
                    agGridCommunity: {
                        name: "agGridCommunity",
                        test: /[\\/]node_modules[\\/]@ag-grid-community.*?[\\/]/,
                        chunks: "all",
                        minChunks: 1,
                        priority: 4,
                    },
                    agGridEnterprise: {
                        name: "agGridEnterprise",
                        test: /[\\/]node_modules[\\/]@ag-grid-enterprise.*?[\\/]/,
                        chunks: "all",
                        minChunks: 1,
                        priority: 5,
                    },
                    microsoft: {
                        name: "microsoft",
                        test: /[\\/]node_modules[\\/](@azure.*?[\\/]|@microsoft.*?[\\/]|msal.*?[\\/])/,
                        chunks: "all",
                        minChunks: 1,
                        priority: 6,
                    },
                    material: {
                        name: "material",
                        test: /[\\/]node_modules[\\/]@mui.*?[\\/]/,
                        chunks: "all",
                        minChunks: 1,
                        priority: 7,
                    },
                },
            },
        },
        plugins: plugins,
    }
}

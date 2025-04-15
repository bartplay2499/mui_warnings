const path = require("path")

module.exports = (env) => {

    return {
        mode: 'development',
        watch: false,
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
                { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ }
            ],
        },
        stats: {
            hash: false,
            entrypoints: false,
            modules: false,
        }
    }
}

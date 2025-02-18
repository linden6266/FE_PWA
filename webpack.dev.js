const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/main.ts",
    devServer: {
        port: 8085,
        hot: true,
        historyApiFallback: true,
    },
    output: {
        publicPath: "auto",
    },
    resolve: {
        extensions: [".vue", ".js"],
        fallback: {
            path: require.resolve("path-browserify"),
        },
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "host",
            remotes: {
                guestpage: "guestpage@http://localhost:8082/guestpageEntry.js",
                remote: `remote@http://localhost:8081/remoteEntry.js`,
                groupcode: "groupcode@http://localhost:8084/groupcodeEntry.js",
            },
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),

    ],
};

const Dotenv = require("dotenv-webpack");
const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");

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
        new Dotenv(), // ✅ Voeg Dotenv-plugin toe om .env-bestand in te laden
        new ModuleFederationPlugin({
            name: "pwamenu",
            filename: "pwamenuEntry.js",
            exposes: {
                "./env": "./src/env" // ✅ Expose the env module
            },
            remotes: {
                guestpage: "guestpage@http://localhost:8082/guestpageEntry.js",
                remote: `remote@http://localhost:8081/remoteEntry.js`,
                groupcode: "groupcode@http://localhost:8084/groupcodeEntry.js",
            },
            shared: {
                vue: { singleton: true, eager: true, requiredVersion: "^3.2.0" },
                "vue-router": { singleton: true, eager: true, requiredVersion: "^4.0.0" },
                "vue-i18n": { singleton: true, eager: true, requiredVersion: "^9.0.0" },
                axios: { singleton: true, eager: true },
            }

        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};

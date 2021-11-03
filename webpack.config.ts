import * as path from 'path';
import * as webpack from 'webpack';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import { Epoch, Precession } from "./code/types";


const config: webpack.Configuration = {
    mode: 'production',

    entry: "./web/scripts/simple.ts",

    resolve: {
        extensions: [ '.ts', 'js' ],
    },

    output: {
        path: path.join(__dirname, './build/'),
        filename: "./all.min.js"
    },

    optimization: {
        minimize: true
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'babel-loader',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.less$/,
                use: [ 'style-loader', 'css-loader', 'less-loader' ],
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.pug$/,
                use: ['html-loader', {
                    loader: 'pug-html-loader',
                    options: {
                        data: {
                            epochs: Epoch,
                            precessions: Precession
                        }
                    },
                }],
                exclude: /(node_modules|bower_components)/
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "simple.html",
            template: './web/pages/simple.pug'
        })
    ]
}

module.exports = (env, argv) => {
    if (argv.mode == 'development') config.devtool = 'eval-source-map';
    else config.devtool = false;
    return config;
};

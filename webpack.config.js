// 引入一个包
const path = require('path');
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin')
// 引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// webpack中的所有的配置信息都应该写在module.exports中
module.exports = {
    // 指定入口文件
    entry: "./src/index.ts",

    // 指定打包文件所在的目录
    output: {
        // 指定打包文件的目录
        path: path.resolve(__dirname, 'dist'),
        // 打包后文件的文件
        filename: "bundle.js",
        // 强调兼容旧浏览器
        environment: {
            // 令别用箭头函数，因为webpack打包的代码会有一个自动生成的自启动箭头函数
            arrowFunction: false,
            const: false
        }
    },

    // 指定webpack打包时要使用的模块
    module: {
        // 指定要加载的规则
        rules: [
            {
                // test指定的是规则生效的文件
                // ts-loader处理.ts结尾的文件
                // loader是从后往前执行
                test: /\.ts$/,
                use: [
                    // 配置babel
                    {
                        // 指定加载器
                        loader: "babel-loader",
                        // 设置babel
                        options: {
                            // 设置预定义环境（代码将会在哪些浏览器上运行
                            presets: [
                                [
                                    // 指定环境的插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容的浏览器
                                        targets: {
                                            // 浏览器版本
                                            "chrome": "88"
                                        },
                                        // 3版本的corejs
                                        "corejs": "3",
                                        // 使用corejs的方式,usage按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'],
                // 要排除的文件
                exclude: /node-modules/,
            },
            // less
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                            browsers: 'last 2 version'
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    'less-loader']
            },

        ]
    },
    // 配置weibpack插件
    plugins: [
        new HTMLWebpackPlugin(
            {
                template: "./src/index.html"
            }
        ),
        new CleanWebpackPlugin(),
    ],
    // 设置引用模块
    resolve: {
        // 将后缀为ts和js的文件都视作模块并且可以引入

        extensions: ['.ts', '.js'],
    }
}
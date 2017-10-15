//entry --> output
const path=require('path');


module.exports={
    entry: './src/app.js', //main file 어디서 시작할지
    output:{
        path: path.join(__dirname, 'public'),
        filename:'bundle.js'
    },
    module:{
        rules:[{
            loader : 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]//두개 array로 사용 가능
        }]
    },
    devtool: 'cheap-module-eval-source-map',
    devServer:{
        contentBase:path.join(__dirname, 'public'),
        historyApiFallback: true
    }
};

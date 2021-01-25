module.exports = {
    mode: "development",
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                  'vue-style-loader',
                  'css-loader',
                  'sass-loader'
                ]
            }
        ]
    }
}
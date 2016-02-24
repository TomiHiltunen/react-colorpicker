module.exports = {
  entry: "./src/main.jsx",
  output: {
    path: "./",
    filename: "main.js"
  },
  devServer: {
    inline: true,
    port: 8081
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel",
        query: {
          presets: ["es2015", "react"]
        }
      }
    ]
  }
}

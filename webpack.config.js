  

var webpack = require('webpack');
var path = require('path');

var SRC_DIR = path.resolve(__dirname, 'src');
var DIST_DIR = path.resolve(__dirname, 'dist');

var debug = true;

module.exports = {
    
    entry: {
	javascript: "./src/main.js"
    },
    output: {
	path: DIST_DIR,
	filename: "dist.js"
    },
    module: {
	loaders: [
	    { test: /\.html$/,
	      loader: "file?name=[name].[ext]"
	    },
	    { test: /\.css$/, loader: "style!css"},
	    { test: /\.js?$/,
	      exclude: /(node_modules|bower_components)/,
	      loader: 'babel-loader',
	      query: {
		  presets : ['react', 'es2015'],
		  plugins : [
		      'react-html-attrs',
		      'transform-class-properties',
		      'transform-decorators-legacy'
		  ]
	      }
	    }
	]
    },
    plugins: debug ? [] : [
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: true })

    ],
    resolve: {
	alias: {
	    jquery: "../lib/jquery"
	}
    }
};

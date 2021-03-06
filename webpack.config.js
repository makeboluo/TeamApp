var webpack = require("webpack");
//生成HTML
var html = require("html-webpack-plugin")
//删除文件
var clean = require('clean-webpack-plugin');
module.exports = {
	entry:"./app/app.js",
	output:{
		path:__dirname+"/www",
		filename:"js/bundle.js"
	},
	module:{
		loaders:[
			{
				test:/\.css$/,
				loader:"style-loader!css-loader!less-loader"
			},
			{
				test:/\.(png|jpe?g|gif)$/,
				loader:"url-loader?limit=5000&name=images/[name].[hash:4].[ext]"
			},
			{
				test:/\.vue$/,
				loader:"vue-loader"
			},
			{
				test:/\.(eot|svg|ttf|woff)$/,
				loader:"file-loader?name=iconfont/[name].[hash:4].[ext]"
			}
		]
	},
	//webpack-dev-server
	devServer: {
	  contentBase:"./www",
      inline: true,
      port: 8010,
      proxy:{
      	'/common/php/*':{
      		target:"http://localhost",
      		changeOrigin:true,
      		secure:false
      	}
      }
    },
	plugins:[
		new html({
			title:"生活一家",
			template:__dirname+"/app/index.html",
			filename:"index.html",
		}),
		new clean(["www/iconfont","www/images","www/js","www/index.html"]),
		// new webpack.optimize.UglifyJsPlugin({
		// 	compress:{
		// 		warnings:false,//取消报错提示
		// 	}
		// })//压缩代码
	],
	resolve:{
		alias:{
			'vue$': 'vue/dist/vue.common.js'
		}
	}
}
// import와 require의 차이
// import = JS에서 라이브러리 가져올 때 사용
// require = Node.js에서 사용되고 있는 키워드
var path = require("path");
var webpack = require("webpack");
var fileSys = require("fs");

// __dirname = ............../study ( 프로젝트 경로 )
// path.join(__dirname, 'src') = ...../study/src
var reduxSaga = path.join(__dirname, "src");
var nodeModules = path.join(__dirname, "node_modules");

// src폴더, node_modules폴더가 있는지 판단
if(fileSys.existsSync(reduxSaga) && fileSys.existsSync(nodeModules)){
	
	// import ... from redux-saga를 호출하면
	// redux-saga를 자동으로 src경로로 매핑시켜 준다.
	module.exports.resolve = {
		alias:{
			"redux-saga" : reduxSaga
		}
	}
	
	module.exports = {
		entry: [
			path.join(__dirname, "src", "main", "webapp", "resources", "js", "index") // .../study/src/main/webapp/resources/js/index.js
		],
		mode: "development",
		cache: true,
		devtool: "sourcemaps",
		plugins: [
			// UglifyJsPlugin : 컴파일한 코드의 용량을 줄이고 읽기 어렵게 만든다.
			new webpack.optimize.OccurrenceOrderPlugin(), // 발생 시점에 따라 ID값을 할당시켜주며 자주 사용되는 ID는 더 낮은 ID를 갖는다.
			new webpack.HotModuleReplacementPlugin(), // dev-server 모드에서 Hot Module Replace를 가능하게 해준다.
			new webpack.NoEmitOnErrorsPlugin(), // 컴파일 도중 오류가 발생한 리소스들은 제외하고 bundling한다.
			new webpack.DefinePlugin({ // 컴파일할 코드에서 특정 문자열을 설정한 값으로 치환.
				"process.env.NODE_ENV" : JSON.stringify("development")
			})
		],
		module:{
			rules: [
				{
					test: path.join(__dirname, "."),
					exclude: /(node_modules)/,
					use: [
						{
							loader: "babel-loader",
							options: {
								presets: [
									"@babel/preset-env",
									"@babel/preset-react"
								],
								plugins: [
									"@babel/plugin-proposal-class-properties"
								]
							}
						}
					]
				},
				{
					test: /\.css$/,
					loader: "style-loader"
				},
				{
					test: /\.css$/,
					loader: "css-loader"
				},
				{
					test: /\.(woff2?|ttf|eot|svg|png|jpe?g|gif)$/,
					loader: "file"
				},
				{
					test: /\.js$/,
					loader: "babel-loader",
					options: {
						presets: [
							"@babel/preset-env",
							"@babel/preset-react"
						],
						plugins: [
							"@babel/plugin-proposal-class-properties"
						]
					},
					include: reduxSaga
				},
				{
					test: /\.js$/,
					loader: "babel-loader",
					options: {
						presets: [
							"@babel/preset-env",
							"@babel/preset-react"
						],
						plugins: [
							"@babel/plugin-proposal-class-properties"
						]
					},
					include: path.join(__dirname, "sagaMonitor")
				}
			]
		},
		// module rules ... 를 거쳐 output에 저장
		output: {
			path: path.join(__dirname, "src", "main", "webapp", "resources", "build"),
			filename: "bundle.js",
			publicPath: "/resources/"
		}
	}
	
}
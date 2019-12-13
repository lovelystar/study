// import와 require의 차이
// import = JS에서 라이브러리 가져올 때 사용
// require = Node.js에서 사용되고 있는 키워드
var path = require("path");
var webpack = require("webpack");
var fileSys = require("fs");

// 인터넷 환경에 따라 자동으로 -webkit이나 -ms 같은 접두어를 붙여줌
const autoprefixer = require("autoprefixer");

// __dirname = ............../study ( 프로젝트 경로 )
// path.join(__dirname, 'src') = ...../study/src
var reduxSaga = path.join(__dirname, "src");
var nodeModules = path.join(__dirname, "node_modules");

// 적정사이즈의 bundle을 생성하고 관리
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

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
				"process.env.NODE_ENV" : JSON.stringify("development"),
				"REACT_APP_WEBPACK_CLIENT_HOST" : JSON.stringify("http://localhost:8081/study"),
				"REACT_APP_WEBPACK_AUTH_HOST" : JSON.stringify("http://localhost:8082/studyoauthserver"),
				"REACT_APP_WEBPACK_RESOURCE_HOST" : JSON.stringify("http://localhost:8083/studyresourceserver")
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
				// css 모듈 설정
				{
					test: /\.css$/,
					use: [
						require.resolve("style-loader"), // 스타일을 불러와서 페이지에서 활성화
						{
							loader: require.resolve("css-loader"), // import와 url(...) 구문을 require 기능을 통하여 처리
							options: {
								importLoaders: 1,
								//modules: true, // css module 활성화
								localIdentName: "[path][name]__[local]--[hash:base64:5]" // css module 활성화
							},
						},
					],
				},
				{
					test: /\.s[ac]ss$/i,
					exclude: /(node_modules)/,
					use: [
						require.resolve("style-loader"), // 스타일을 불러와서 페이지에서 활성화
						{
							loader: require.resolve("css-loader"), // import와 url(...) 구문을 require 기능을 통하여 처리
							options: {
								importLoaders: 1,
								//modules: true, // css module 활성화
								localIdentName: "[path][name]__[local]--[hash:base64:5]" // css module 활성화
							},
						},
						{
							loader: require.resolve("postcss-loader"),
							options: {
								ident: "postcss",
								plugins: () => [
									require("postcss-flexbugs-fixes"),
									// 인터넷 환경에 따라 자동으로 -webkit이나 -ms 같은 접두어를 붙여줌
									autoprefixer({
										overrideBrowserslist:[
											">0.2%",
											"last 4 version",
											"Firefox ESR",
											"not ie < 9",
										],
										flexbox: "no-2009"
									}),
								],
							},
						},
						{
							loader: require.resolve("sass-loader"),
							options: {
								
								sassOptions: {
									includePaths: [
										path.join(__dirname, "src", "main", "webapp", "resources", "scss"),
									],
								},
								
							},
						},
					],
				},

				// 이미지와 폰트를 다루는데 file-loader와 url-loader를 많이 사용
				// file-loader : 파일 그대로 로딩한다.
				// scss, css에서 url함수에 파일을 지정하게 되는데
				// 발견하게 되면 실제 사용되는 파일만 복사한다.
				// options가 없이 test와 loader만 설정하게 되면 output경로에 복사되게 되므로 경로를 지정.

				// url-loader : 작은 이미지나 글꼴은 파일을 복사하지 않고 문자열 형태로 변환하여 bundle파일에 넣음
				{
					test: /\.(woff2?|ttf|eot|svg|png|jpe?g|gif)$/,
					loader: "file-loader",
					options: {
						publicPath: "./resources/build/",
					},
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
		},

	}
	
}
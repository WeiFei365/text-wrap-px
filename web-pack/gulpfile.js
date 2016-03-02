'use strict'

// Load some modules which are installed through NPM.
var gulp = require('gulp');
// 实现能在浏览器端像 node 后端一样使用模块化
var browserify = require('browserify');

// 兼容 gulp 与 node 中的流，将常规流转换为包含 Stream 的 vinyl 对象
var source = require('vinyl-source-stream');
// 将 vinyl 对象内容中的 Stream 转换为 Buffer
var buffer = require('vinyl-buffer');

// gulp 插件错误处理
var plumber = require('gulp-plumber');

// 压缩
var uglify = require('gulp-uglify');
// 对应生成压缩文件的 sourcemap 文件
var sourcemaps = require('gulp-sourcemaps');

// 全局导入的预编译工具
var aliasify = require('aliasify');

// transform es6 to es**
var babelify = require('babelify');

//
var rename = require('gulp-rename');


// custom utils
var utils = require('./utils.js');

const DEST_DIR = './dest/';
const DEST_FILE = 'textwrap.px.js';

var allTasks = [];

// 编译检查的状态
var isOnErrorState = false;


/********************************** js file ***********************************/


/**
 * 打包文件
 * @param  {[type]} gulp [description]
 * @param  {Object} opts 配置不需要的编译模块 :
 *                       {
 *                       	notES6: 不需要 ES6 转义
 *                       	notAliasify: 不需要全局 模块导入
 *                       	notSourcemap: 不需要 sourcemap 文件
 *                       	notUglify: 不需要压缩打包后的包
 *                       }
 * @return {[type]}      [description]
 */
function getJSPackage (gulp, opts) {
	utils.logMsg(false, {
		state: '2',
		name: 'javascript',
		operator: '1'
	});

	opts = opts || {};

	return function () {
		var b = browserify({ debug: true});	// debug 生成 sourcemap

		// 支持 ES6 转换
		if (!opts.notES6) {
			b = b.transform(babelify, { presets: ['es2015'] });
		}

		// 预编译全局配置的模块导入
		// if (!opts.notAliasify) {
		// 	b = b.transform(aliasify, aliasifyConfig);
		// }

		b = b.require('./index.js', { entry: true });
		b = b.bundle(function(err, bff){
				if (bff) {
					// 避免一直弹窗
					isOnErrorState && utils.popMsg(isOnErrorState = false);
				}

				utils.logMsg(false, {
					state: '1',
					name: 'javascript',
					operator: '2'
				});
			})
		b = b.on("error", function (err) {
				utils.logMsg(true, err);
				this.emit('end');
				// 避免一直弹窗
				!isOnErrorState && utils.popMsg(isOnErrorState = true, err);
			});

		// 转换 browserify 中的常规流为 gulp 中支持的流
		b = b.pipe(source(DEST_FILE));
		b = b.pipe(buffer());

		// 防止 gulp 插件出错时导致整个进程退出
		b = b.pipe(plumber());

		// 生成 sourcemap 映射文件；起始点 ===>>>
		if (!opts.notSourcemap) {
			b = b.pipe(sourcemaps.init({ loadMaps: true }));
		}

		// 压缩
		if (!opts.notUglify) {
			b = b.pipe(uglify());
			b = b.pipe(rename(DEST_FILE.substr(0, DEST_FILE.length - 3) + '.min.js'));
		}

		// 生成 sourcemap 映射文件；结束点 <<<===
		if (!opts.notSourcemap) {
			b = b.pipe(sourcemaps.write('./'));
		}

		return b.pipe(gulp.dest(DEST_DIR));
	};
}

gulp.task('javascript', getJSPackage(gulp,
	{
		notUglify: true
	}));

gulp.task('javascript-product', getJSPackage(gulp));

gulp.task('watch', function () {
    return gulp.watch('**.js', ['build']);
});
/********************************* css file ***********************************/




gulp.task('dev', ['watch']);
gulp.task('build', ['javascript']);

gulp.task('product', ['javascript-product']);


module.exports = gulp;

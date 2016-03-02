'use strict'

// 运行参数处理
var minimist = require('minimist');


var gulp = require('./gulpfile.js');


var argvs = minimist(process.argv.slice(2));


// build
if (argvs.job == 'build' || argvs.job == 'b') {
    gulp.start('build');
}

// watch
if (argvs.job == 'watch' || argvs.job == 'w') {
    gulp.start('dev');
}

// for product
if (argvs.job == 'product' || argvs.job == 'p') {
    gulp.start('product');
}

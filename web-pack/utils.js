'use strict'

// node 中的 path 模块
var path = require('path');

// Mac & window & linux 中的报错弹窗气泡
var notifier = require('node-notifier');

// 彩色控制台输出
var chalk = require('chalk');

// 气泡提醒
var popMsg = function (isError, msg) {
	var config = isError
		? {
			message: "Error: " + msg.message.slice(0,30),
            title: "Failed running browserify",
            icon: path.join(__dirname, 'webpack', 'fail.png')
		}
		: {
			message: "You just fixed it!",
            title: "Resolved",
            icon: path.join(__dirname, 'webpack', 'approved.png')
		};

	notifier.notify(config);
};

function getStateMsg (state) {
	var msg;
	switch (state) {
		case "1":
			msg = "finished";
			break;
		case "2":
			msg = "added"
			break;
		default:
			msg = "";
	}
	return msg;
}
function getOperatorMsg (operator) {
	var msg;
	switch (operator) {
		case '1':
			msg = 'task'
			break;
		case '2':
			msg = 'package';
			break;
		default:
			msg = '';
	}
	return msg;
}
function buildConsoleMsg (config) {
	var msg = chalk.white('');

	// 时间
	msg += chalk.green('[') + chalk.white(new Date().toLocaleTimeString()) + chalk.green(']') + ' ';
	// 状态
	msg += chalk.green(getStateMsg(config.state)) + ' ';
	// 名称
	msg += chalk.green("'") + chalk.cyan(config.name || '-') + chalk.green("'") + ' ';
	// 操作
	msg += chalk.magenta(getOperatorMsg(config.operator)) + ' ';
	// 耗时
	msg += chalk.yellow(config.times || '0' + 'ms');

	return msg;
}
// 控制台打印
var logMsg = function (isError, msg) {
	if (isError) {
		return console.log(chalk.red(msg.toString()));
	}

	console.log(buildConsoleMsg(msg));
};

// 路径相关
const PROJECT_PATH = path.resolve(__dirname, '../');
const SourcePaths = {
	PROJECT_PATH: PROJECT_PATH,
	src: path.join(PROJECT_PATH, './', 'src')
};


module.exports = {
	popMsg,
	logMsg,
	SourcePaths
};

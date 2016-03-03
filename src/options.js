'use strict'

var isElement = require('lodash/lang/isElement');
var isNumber = require('lodash/lang/isNumber');
var isPlainObject = require('lodash/lang/isPlainObject');
var isString = require('lodash/lang/isString');
var merge = require('lodash/object/merge');

var __getElement = require('./utils.js').__getElement;


const DEFAULT_STYLE = {
    'display': 'inline-block',
    'position': 'absolute',
    'margin-top': '-99999px',
    'white-space': 'nowrap'
};

function __options (options) {
    let _opts = options && isPlainObject(options) ? merge({}, options) : {};

    // 一行最大宽度（像素）
    if (!isNumber(_opts.maxWidth) || _opts.maxWidth < 10) {
        _opts.maxWidth = 200;
    }
    // text 中单词与单词间的分隔符
    if (!isString(_opts.splitSymbol)) {
        _opts.splitSymbol = ' ';
    }
    // 如果发生单行截断，需要添加的后缀
    if (!isString(_opts.suffix)) {
        _opts.suffix = '...';
    }
    // 需要给 text 加的 className
    if (!isString(_opts.class)) {
        _opts.class = false;
    }
    // 需要给 text 加的 css-style
    if (isPlainObject(_opts.style)) {
        _opts.style = merge({}, DEFAULT_STYLE, _opts.style);
    } else {
        _opts.style = DEFAULT_STYLE;
    }
    // 需要依赖的父 DOM，text 的 DOM 会 append 到 parent 中
    if (!isElement(_opts.parent)) {
        _opts.parent = document.getElementsByTagName('body')[0];
    }

    if (!isElement(_opts.element)) {
        _opts.element = __getElement(_opts);
    }

    return _opts;
}

module.exports = __options;

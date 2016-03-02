'use strict'

var jquery = require('jquery');
var camelCase = require('lodash/string/camelCase');
var isElement = require('lodash/lang/isElement');
var isFunction = require('lodash/lang/isFunction');
var isNumber = require('lodash/lang/isNumber');
var isPlainObject = require('lodash/lang/isPlainObject');
var isString = require('lodash/lang/isString');
var merge = require('lodash/object/merge');


function string_isEN (text) {
    return new RegExp('^[a-zA-Z0-9.,-]+$').test(text.replace(/\s/g, ''));
}

const STYLE = {
    'display': 'inline-block',
    'position': 'absolute',
    'margin-top': '-99999px'
};
function __getElement (opts) {
    const _parent = opts.parent;
    const _class = opts.class;
    let _style = STYLE;

    if (isPlainObject(opts.style)) {
        _style = merge({}, STYLE, opts.style);
    }

    let element = document.createElement('span');
    _parent.appendChild(element);

    _class && (element.className = _class);
    for (var key in _style) {
        _style.hasOwnProperty(key) && (element.style[camelCase(key)] = _style[key]);
    }

    element.$height = function () {
        return jquery(element).height();
    };
    element.$width = function () {
        return jquery(element).width();
    };
    element.$destroy = function () {
        jquery(element).remove();
    };

    return element;
}

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
    if (!isPlainObject(_opts.style)) {
        _opts.style = false;
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

/**
 * 截断字符串，并追加后缀
 * @param  {[type]} text   [description]
 * @param  {[type]} suffix [description]
 * @return {[type]}        [description]
 */
function __textBreak (text, suffix) {
    return text.substr(0, text.length - suffix.length) + suffix;
}
/**
 * 按字符追加，直到达到最大宽度（像素级）：单个单词
 * @param  {[type]} el       [description]
 * @param  {[type]} anyStr   [description]
 * @param  {[type]} maxWidth [description]
 * @return {[type]}          [description]
 */
function __checkWordByChar (el, anyStr, maxWidth) {
    let i = 0;
    let len = anyStr.length;
    let lastText;

    do {
        lastText = el.textContent;
        el.textContent = lastText + anyStr.charAt(i++);
    } while (el.$width() < maxWidth && i < len);

    return i;
}
/**
 * 按字符追加，直到达到最大宽度（像素级）：text 行级别
 * @param  {[type]} el    [description]
 * @param  {[type]} words [description]
 * @param  {[type]} index [description]
 * @param  {[type]} opts  [description]
 * @return {[type]}       [description]
 */
function __appendByChar (el, words, index, opts) {
    let word = words[index];
    let maxWidth = opts.maxWidth;
    let splitSymbol = opts.splitSymbol;
    let isOnlyEN = string_isEN(word);

    el.textContent = words.slice(0, index).join(splitSymbol);

    let i;
    let finalText;

    // for splitSymbol
    if (index != 0) {
        i = __checkWordByChar(el, splitSymbol, maxWidth);
        if (el.$width() >= maxWidth) {
            // append 分隔符就已经超了，直接舍去下一个单词
            words.splice(0, index);

            return el.textContent;
        }
    }
    // for last word(this row)
    i = __checkWordByChar(el, word, maxWidth);

    // 不检查 i 是否小于 word.length 了，因为肯定会大于

    if (isOnlyEN) {
        // 直接截断该 word，并舍弃
        finalText = (index == 0) ?
            __textBreak(el.textContent, opts.suffix)
            : words.slice(0, index).join(splitSymbol);

        words.splice(0, index == 0 ? 1 : index);
    } else {
        // 截断中文
        words.splice(0 ,index);
        words[0] = words[0].substr(i);
        finalText = el.textContent;
    }

    return finalText;
}

function _textWrapDestroy (notReal) {
    isFunction(this.options.element.$destroy) && this.options.element.$destroy();

    this.options.element = null;

    if (!notReal) {
        this.options.parent = null;
    }
}
function _textWrapBuild (text) {
    this.text = (text == undefined) ? this.text : text;
    const _text = this.text;
    const _opts = this.options;

    if (!isString(_text)) { return []; }

    const maxWidth = _opts.maxWidth;
    const splitSymbol = _opts.splitSymbol;
    let el = _opts.element;

    el.textContent = _text;
    if (el.$width() <= maxWidth) {
        !this.isInstance && _textWrapDestroy.call(this);
        return [_text];
    }

    let textRows = [];

    let words = _text.split(splitSymbol);

    el.textContent = '';
    let index = 0;
    while (words.length > 0 && index < words.length) {
        el.textContent = el.textContent + (index == 0 ? '' : splitSymbol) + words[index];
        if (el.$width() >= maxWidth) {
            textRows.push(__appendByChar(el, words, index, _opts));

            index = 0;
            el.textContent = '';
        } else {
            index++;
        }
    }

    el.textContent != '' && textRows.push(el.textContent);

    !this.isInstance && _textWrapDestroy.call(this);

    return textRows;
}

function textWrap (text, options) {
    const isInstance = (this || {}).__NAME === 'TextWrapPX';
    var self = isInstance ? this : {};

    self.isInstance = isInstance;
    self.options = __options(options);
    self.text = text;

    return isInstance ? this : _textWrapBuild.call(self);
}


textWrap.prototype.__NAME = 'TextWrapPX';
textWrap.prototype.setOptions = function (options) {
    !isPlainObject(options) && (options = {});


    if (isElement(options.element)) {
        this.destroy(true);
    } else {
        if (isElement(options.parent)
            || isString(options.class)
            || isPlainObject(options.style)) {
            this.destroy(true);
        }
    }

    merge(this.options, __options(options));

    return this;
};
textWrap.prototype.build = _textWrapBuild;
textWrap.prototype.destroy = _textWrapDestroy;


module.exports = textWrap;

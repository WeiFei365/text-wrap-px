'use strict'

var lodash = require('lodash');
var isElement = lodash.isElement;
var isFunction = lodash.isFunction;
var isPlainObject = lodash.isPlainObject;
var isString = lodash.isString
var merge = lodash.merge;
// var isElement = require('lodash/lang/isElement');
// var isFunction = require('lodash/lang/isFunction');
// var isPlainObject = require('lodash/lang/isPlainObject');
// var isString = require('lodash/lang/isString');
// var merge = require('lodash/object/merge');

var __options = require('./options.js');
var __appendByChar = require('./utils.js').__appendByChar;
var __textBreak = require('./utils.js').__textBreak;
var array_scale = require('./array.js').array_scale;


function _textWrapPXDestroy (notReal) {
    isFunction(this.options.element.$destroy) && this.options.element.$destroy();

    this.options.element = null;

    if (!notReal) {
        this.options.parent = null;
    }
}
function _textWrapPXBuild (text) {
    // 赋新值
    (text != undefined) && (this.text = text);

    const _text = this.text;
    const _opts = this.options;

    if (!isString(_text)) { return []; }

    const maxWidthRows = _opts.maxWidth;
    const maxRow = _opts.maxRow;
    const splitSymbol = _opts.splitSymbol;
    const suffix = _opts.suffix;
    let el = _opts.element;
    let rowNum = 0;
    let maxWidth = array_scale(maxWidthRows, rowNum);

    el.textContent = _text;
    if (el.$width() <= maxWidth) {
        // 不需要截断，直接返回原始值（组装成数组）
        !this.isInstance && _textWrapPXDestroy.call(this);
        return [_text];
    }

    let textRows = [];

    let words = _text.split(splitSymbol);

    el.textContent = '';
    let index = 0;
    while (words.length > 0 && index < words.length) {
        el.textContent = el.textContent + (index == 0 ? '' : splitSymbol) + words[index];
        if (el.$width() >= maxWidth) {
            textRows.push(__appendByChar(el, words, index, maxWidth, splitSymbol, suffix, (textRows.length + 1) >= maxRow));

            rowNum++;
            maxWidth = array_scale(maxWidthRows, rowNum);
            index = 0;
            el.textContent = '';
        } else {
            index++;
        }
        if (textRows.length >= maxRow) {
            el.textContent = '';
            break;
        }
    }

    el.textContent != '' && textRows.push(el.textContent);

    !this.isInstance && _textWrapPXDestroy.call(this);

    return textRows;
}


/**
 * 既可以作为方法使用，又可以作为类实例化使用，实例会有更加丰富的 API 工具方法；
 * @param {String} text    需要格式化的文本
 * @param {Object} options 一些个性化的配置项，请参考：https://github.com/WeiFei365/text-wrap-px#options
 */
function TextWrapPX (text, options) {
    const isInstance = (this || {}).__NAME === 'TextWrapPX';
    var self = isInstance ? this : {};

    self.isInstance = isInstance;
    self.options = __options(options);
    self.text = text;

    return isInstance ? this : _textWrapPXBuild.call(self);
}


merge(TextWrapPX.prototype, {
    __NAME: 'TextWrapPX',

    build: _textWrapPXBuild,

    destroy: _textWrapPXDestroy,

    /**
     * 更新自定义配置；
     * @param {Object} options 一些个性化的配置项，请参考：https://github.com/WeiFei365/text-wrap-px#options
     */
    setOptions (options) {
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

        // 这里要先 merge this.options 再传递给 __options，是为了避免再次 createElement
        merge(this.options, __options(merge(this.options, options)));

        return this;
    },
    $width (text) {
        const _text = text || this.text;
        let el = this.options.element;
        el.textContent = _text;

        return el.$width();
    },
    $height (text) {
        const _text = text || this.text;
        let el = this.options.element;
        el.textContent = _text;

        return el.$height();
    }
});


module.exports = TextWrapPX;

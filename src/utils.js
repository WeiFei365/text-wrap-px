'use strict'

var jquery = require('jquery');
var camelCase = require('lodash/string/camelCase');
var uniqueId = require('lodash/utility/uniqueId');

var string_isEN = require('./string.js').string_isEN;


function __getElement (opts) {
    const _parent = opts.parent;
    const _class = opts.class;
    let _style = opts.style;


    let element = document.createElement('span');
    _parent.appendChild(element);

    _class && (element.className = _class);
    element.id = uniqueId('text_wrap_px_');
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
 * @param  {[type]} el          [description]
 * @param  {[type]} words       [description]
 * @param  {[type]} index       [description]
 * @param  {[type]} maxWidth    [description]
 * @param  {[type]} splitSymbol [description]
 * @param  {[type]} suffix      [description]
 * @param  {[type]} isMaxRow    [description]
 * @return {[type]}             [description]
 */
function __appendByChar (el, words, index, maxWidth, splitSymbol, suffix, isMaxRow) {
    let word = words[index];
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

            return isMaxRow ? __textBreak(el.textContent, suffix) : el.textContent;
        }
    }
    // for last word(this row)
    i = __checkWordByChar(el, word, maxWidth);

    // 不检查 i 是否小于 word.length 了，因为肯定会大于

    if (isOnlyEN) {
        // 直接截断该 word，并舍弃
        finalText = (index == 0 || isMaxRow) ?
            __textBreak(el.textContent, suffix)
            : words.slice(0, index).join(splitSymbol);

        words.splice(0, index == 0 ? 1 : index);
    } else {
        // 截断中文
        words.splice(0 ,index);
        words[0] = words[0].substr(i);
        finalText = isMaxRow ? __textBreak(el.textContent, suffix) : el.textContent;
    }

    return finalText;
}

module.exports = {
    __getElement,
    __textBreak,
    __checkWordByChar,
    __appendByChar
}

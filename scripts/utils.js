var lodash = require('lodash');

export var isString = lodash.isString;
export var isNumber = lodash.isNumber;
export var isArray = lodash.isArray;
export var isPlainObject = lodash.isPlainObject;
export var isElement = lodash.isElement;
export var isFunction = lodash.isFunction;
export var merge = lodash.merge;
export var cloneDeep = lodash.cloneDeep;
export var camelCase = lodash.camelCase;
export var uniqueId = lodash.uniqueId;

var $ = require('jquery');


export function arrayScale(array, index) {
    if (array.length === 0) { return; }

    if (index < 0) {
        array = [].concat(array).reverse();
        index = Math.abs(index);
    }

    index = index % array.length;

    return array[index];
}

export function stringIsEN(string) {
    return /^[a-zA-Z0-9.,()-]+$/.test(string.replace(/\s/g, ''));
}

export function doElement({ element, parent, class: classNames, style }) {
    let isNewDom = false;

    if (!isElement(element)) {
        element = document.createElement('span');
        parent.appendChild(element);

        isNewDom = true;
    }

    element.className = classNames;

    for (const name in style) {if (style.hasOwnProperty(name)) {
        element.style[camelCase(name)] = style[name];
    }}

    const $element = $(element);

    if (isNewDom) {
        element.id = uniqueId('text_wrap_px_');
        element.$height = function() { return $(element).height(); };
        element.$width = function() { return $(element).width(); };
        element.$destroy = function() { return $(element).remove(); };
    }

    return element;
}

export function textBreak(text, suffix) {
    return text.substr(0, text.length - suffix.length) + suffix;
}

export function testByChar(element, text, maxWidth) {
    const length = text.length;

    let index = -1;
    let content = '';

    do {
        content = element.textContent;
        element.textContent = content + text.charAt(++index);
    } while (element.$width() < maxWidth && index < length);

    return [index, content];
}

export function appendByChar({ element, words, index, maxWidth, splitSymbol, suffix, isMaxRow }) {
    const word = words[index];
    const isOnlyEN = stringIsEN(word);

    let lastIndex;
    let lastContent;
    let finalText;

    element.textContent = lastContent = words.slice(0, index).join(splitSymbol);

    if (index != 0) {
        [lastIndex] = testByChar(element, splitSymbol, maxWidth);
        if (element.$width() >= maxWidth) {
            words.splice(0, index);
            // 因为这次拼接的是 splitSymbol，所以如果是最后一行时才追加 suffix，
            // 否则这行的显示文本是不需要带上最后这个 splitSymbol 的
            return isMaxRow && (index + 1) <= words.length ? textBreak(lastContent, suffix) : lastContent;
        }
    }

    // if not return, test the next word
    // 之所以能走到这里，肯定是字符会超出，所以下面新返回的 lastIndex < word.length 必定成立
    [lastIndex, lastContent] = testByChar(element, word, maxWidth);

    // if (element.$width() > maxWidth) { 这个判断条件是不需要的，必定成立
    if (lastIndex === 0) {
        // 一个字符都放不下！
        if (index === 0) {
            // 为了避免死循环，截掉这个字符，并且用 suffix 来作为这行的显示文本
            if (isOnlyEN) {
                words.splice(0, 1);
            } else {
                words[0] = words[0].substr(1);
            }
            finalText = suffix;
        } else {
            // 在 splitSymbol 后加个字符都不行，所以，处理方式同第一个 testByChar 的调用处
            lastContent = words.slice(0, index).join(splitSymbol);
            finalText = isMaxRow && (index + 1) <= words.length ? textBreak(lastContent, suffix) : lastContent;

            words.splice(0, index);
        }

        return finalText;
    }

    if (isOnlyEN) {
        // 至少截掉一个单词，不然会导致死循环
        finalText = (index === 0 || isMaxRow) ? textBreak(lastContent, suffix) : words.slice(0, index).join(splitSymbol);

        words.splice(0, index === 0 ? 1 : index);
    } else {
        // 截断其他语种
        finalText = isMaxRow && (index + 1) <= words.length ? textBreak(lastContent, suffix) : lastContent;
        words.splice(0, index);
        words[0] = words[0].substr(lastIndex);
    }

    return finalText;
}

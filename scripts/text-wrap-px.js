import {
    isString, isNumber, isArray, isPlainObject, isElement, isFunction, merge, cloneDeep,
    textBreak, appendByChar, doElement,
    arrayScale
} from './utils.js';

import { getoptions, optionByKeyPath } from './text-wrap-px.options.js';


export class TextWrapPX {
    constructor(options, text) {
        const self = this;

        self.text = text;
        self.options = getoptions(options);

        return self.setOptions({});
    }

    build(text) {
        const self = this;
        const { options } = self;

        self.text = text = text === undefined ? self.text : text;

        if (!isString(text)) { return []; }

        const { maxWidth: maxWidthRows, maxRow, splitSymbol, suffix, element } = options;

        let rowNum = 0;
        let maxWidth = arrayScale(maxWidthRows, rowNum);

        element.textContent = text;

        if (element.$width() <= maxWidth) {
            // 不需要截断，直接返回原始值（组装成数组）
            return [text];
        }

        let textRows = [];
        let words = text.split(splitSymbol);

        element.textContent = '';

        let index = 0;
        let textContent = '';
        while (words.length > 0 && index < words.length) {
            textContent = element.textContent;
            element.textContent = `${textContent}${index == 0 ? '' : splitSymbol}${words[index]}`;
            if (element.$width() > maxWidth) {
                textRows.push(appendByChar({
                    element, words, index, maxWidth, splitSymbol, suffix, isMaxRow: (textRows.length + 1) >= maxRow
                }));

                maxWidth = arrayScale(maxWidthRows, ++rowNum);
                index = 0;
                element.textContent = '';
            } else {
                index++;
            }

            if (textRows.length >= maxRow) {
                element.textContent = '';
                break;
            }
        }

        if (element.textContent != '') {
            textRows.push(element.textContent);
        }

        return textRows;
    }

    destroy(notReal) {
        const self = this;
        const { options } = self;

        if (isFunction(options.element.$destroy)) {
            options.element.$destroy();
        }
        options.element = undefined;
        options.parent = undefined;
    }

    setOptions(userOptions) {
        const self = this;
        let { options } = self;

        if (!isPlainObject(userOptions)) { return self; }

        if (isElement(userOptions.element) || isElement(userOptions.parent)) {
            self.destroy(true);
        }

        self.options = options = merge(options, userOptions);

        for (const key in userOptions) {if (userOptions.hasOwnProperty(key)) {
            optionByKeyPath(options, key);
        }}

        if (!isElement(options.parent)) {
            optionByKeyPath(options, 'parent');
        }

        if (!isElement(options.element)) {
            options.element = doElement(options);
        } else {
            doElement(options);
        }

        return self;
    }

    $width(content) {
        const self = this;
        const { options, text } = self;

        options.element.textContent = content || text;

        return options.element.$width();
    }

    $height(content) {
        const self = this;
        const { options, text } = self;

        options.element.textContent = content || text;

        return options.element.$height();
    }

    getoptions() {
        return cloneDeep(this.options);
    }
}

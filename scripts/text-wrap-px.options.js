import {
    isString, isNumber, isArray, isPlainObject, isElement, merge, cloneDeep
} from './utils.js';


const wrapOptions = {
    maxWidth: [200],
    maxRow: 99999,
    splitSymbol: ' ',
    suffix: '...',
    class: '',
    style: {
        'display': 'inline-block',
        'position': 'absolute',
        'margin-top': '-99999px',
        'white-space': 'nowrap',
        'line-height': 'normal'
    },
    parent: null
};


export function getoptions(userOptions = {}) {
    let options = cloneDeep(wrapOptions);

    options = merge(options, userOptions);

    for (const key in userOptions) {if (userOptions.hasOwnProperty(key)) {
        optionByKeyPath(options, key);
    }}
    optionByKeyPath(options, 'parent');

    return options;
}

export function optionByKeyPath(option, keyPath, nextPaths) {
    let anything = option[keyPath];

    switch (keyPath) {
        case 'maxWidth':
            if (isArray(anything) && anything.length >= 1) {
                // TODO check number
            } else if (isArray(anything)) {
                option.maxWidth = cloneDeep(wrapOptions.maxWidth);
            } else if (!anything) {
                option.maxWidth = cloneDeep(wrapOptions.maxWidth);
            } else {
                option.maxWidth = [anything];
                // TODO check number
            }
            break;
        case 'maxRow':
            if (!isNumber(anything) || anything < 1) {
                option.maxRow = wrapOptions.maxRow;
            }
            break;
        case 'splitSymbol':
            if (!isString(anything)) {
                option.splitSymbol = wrapOptions.splitSymbol;
            }
            break;
        case 'suffix':
            if (!isString(anything)) {
                option.suffix = wrapOptions.suffix;
            }
            break;
        case 'class':
            if (!isString(anything)) {
                option.class = wrapOptions.class;
            }
            break;
        case 'style':
            if (isPlainObject(anything)) {
                option.style = merge(anything, wrapOptions.style);
            } else {
                option.style = cloneDeep(wrapOptions.style);
            }
            break;
        case 'parent':
            if (!isElement(anything)) {
                option.parent = document.body;
            }
            break;
        case 'element':
            // TODO
            if (!isElement(anything)) {
                option.element = undefined;
            }
            break;
        default:

    }

    return option;
}

let UNIQUE_ID_COUNTER = 0;


/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * isString('abc');
 * // => true
 *
 * isString(1);
 * // => false
 */
export function isString(str) {
    return typeof str == 'string';
}
/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
 * as numbers, use the `_.isFinite` method.
 *
 * @static
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * isNumber(8.4);
 * // => true
 *
 * isNumber(NaN);
 * // => true
 *
 * isNumber('8.4');
 * // => false
 */
export function isNumber(num) {
    return typeof num == 'number';
}
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * isArray([1, 2, 3]);
 * // => true
 *
 * isArray(function() { return arguments; }());
 * // => false
 */
export function isArray(arr) {
    if (typeof arr != 'object') {
        return false;
    }
    const length = arr.length;
    if (!isNumber(length) || length < 0 || length != Number.parseInt) {
        return false;
    }
    return true;
}
/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * **Note:** This method assumes objects created by the `Object` constructor
 * have no inherited enumerable properties.
 *
 * @static
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * isPlainObject(new Foo);
 * // => false
 *
 * isPlainObject([1, 2, 3]);
 * // => false
 *
 * isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * isPlainObject(Object.create(null));
 * // => true
 */
export function isPlainObject(obj) {
    if (typeof obj != 'object' || Object.prototype.toString.call(obj) != '[object Object]') {
        return false;
    }
    // TODO plain
    return true;
}
/**
 * Checks if `value` is a DOM element.
 *
 * @static
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
 * @example
 *
 * isElement(document.body);
 * // => true
 *
 * isElement('<body>');
 * // => false
 */
export function isElement(el) {
    return el && el.nodeType === 1;
}
export function merge(obj, source) {
    if (!isPlainObject(obj)) {
        return obj;
    }
}
/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @static
 * @category String
 * @param {string} [str=''] The string to convert.
 * @returns {string} Returns the camel cased string.
 * @example
 *
 * camelCase('Foo Bar');
 * // => 'fooBar'
 *
 * camelCase('--foo-bar');
 * // => 'fooBar'
 *
 * camelCase('__foo_bar__');
 * // => 'fooBar'
 */
export function camelCase(str) {
    const upper = '[A-Z\\xc0-\\xd6\\xd8-\\xde]';
    const lower = '[a-z\\xdf-\\xf6\\xf8-\\xff]+';
    const wordRegx = RegExp(`${upper}+(?=${upper}${lower})|${upper}?${lower}|${upper}+|[0-9]+`, 'g');

    const words = (str || '').toLowerCase().match(wordRegx) || [];

    let result = '';

    words.forEach((w, i) => {
        if (i === 0) {
            result = w;
        } else {
            result += w.charAt(0).toUpperCase() + w.slice(1);
        }
    });

    return result;
}
/**
 * Generates a unique ID. If `prefix` is provided the ID is appended to it.
 *
 * @static
 * @category Utility
 * @param {string} [prefix] The value to prefix the ID with.
 * @returns {string} Returns the unique ID.
 * @example
 *
 * uniqueId('contact_');
 * // => 'contact_104'
 *
 * uniqueId();
 * // => '105'
 */
export function uniqueId(str) {
    return `${isString(str) ? str : ''}${UNIQUE_ID_COUNTER++}`;
}

'use strict'

function array_scale(array, index) {
    let _array = [].concat(array);
    let _index = index;
    if (_array.length == 0) { return; }

    if (_index < 0) {
        _array.reverse();
        _index = -_index;
    }

    _index = _index % _array.length;

    return _array[_index];
}

module.exports = {
    array_scale
};

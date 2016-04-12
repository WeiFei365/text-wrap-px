'use strict'

function string_isEN (text) {
    return new RegExp('^[a-zA-Z0-9.,-]+$').test(text.replace(/\s/g, ''));
}

module.exports = {
    string_isEN: string_isEN
};

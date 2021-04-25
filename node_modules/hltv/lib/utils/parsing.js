"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.percentageToDecimalOdd = exports.popSlashSource = exports.hasNoChild = exports.hasChild = exports.prev = exports.text = void 0;
var text = function (el) { return el.text(); };
exports.text = text;
var prev = function (el) { return el.prev(); };
exports.prev = prev;
var hasChild = function (childSelector) { return function (el) {
    return el.find(childSelector).length !== 0;
}; };
exports.hasChild = hasChild;
var hasNoChild = function (childSelector) { return function (el) {
    return el.find(childSelector).length === 0;
}; };
exports.hasNoChild = hasNoChild;
var popSlashSource = function (el) {
    return el.attr('src').split('/').pop();
};
exports.popSlashSource = popSlashSource;
var percentageToDecimalOdd = function (odd) {
    return parseFloat(((1 / odd) * 100).toFixed(2));
};
exports.percentageToDecimalOdd = percentageToDecimalOdd;

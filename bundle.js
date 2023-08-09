(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    function add(a, b) {
        return a + b;
    }

    function sub(a, b) {
        return a - b;
    }

    console.log(add(1,3));
    console.log(sub(1,3));

}));

define([
    'jquery',
    'common'
], function(
    $,
    common
) {

    'use strict';

    var collection = {};

    function setSelector(selector) {
        collection[selector] = $(selector);
    }

    function getSelector(selector) {
        if(common.isEmpty(collection[selector])) {
            setSelector(selector);
        }

        return collection[selector];
    }

    return {
        getSelector: getSelector
    };
});
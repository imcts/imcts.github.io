define([
    'jquery'
], function(
    $
) {

    'use strict';

    function isEmpty(s) {

        if(typeof s === 'string') {
            s = $.trim(s);
        }

        if(s === undefined || s === null || s === '' || s.length === 0) {
            return true;
        }

        return false;
    }

    function isNotEmpty(s) {

        if(typeof s === 'string') {
            s = $.trim(s);
        }

        if(s !== undefined || s !== null || s !== '' || s.length !== 0) {
            return true;
        }

        return false;
    }

    return {
        isEmpty:    isEmpty,
        isNotEmpty: isNotEmpty
    };
});
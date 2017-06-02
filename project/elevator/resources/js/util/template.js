define([
    'jquery',
    'selector'
], function(
    $,
    selector
){
    'use strict';

    var $container;

    function init(containerSelector) {
        $container = selector.getSelector(containerSelector);
    }

    function getTemplate(selector) {
        if(!selector) {
            return;
        }

        return $container.find(selector).html();
    }

    function setData(template, data) {
        for(var i in data) {
            template = template.replace(new RegExp('{{' + i + '}}', 'g'), data[i]);
        }

        return template;
    }

    return {
        init:        init,
        getTemplate: getTemplate,
        setData:     setData
    };
});

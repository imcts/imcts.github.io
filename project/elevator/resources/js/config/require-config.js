window.require = requirejs.config({
    baseUrl: './resources/js',
    paths:   {
        common:   'common/common',
        config:   'config/common-config',
        template: 'util/template',
        html:     'html/index.html',
        selector: 'util/selector',
        jquery:   'library/jquery-1.11.1.min'
    }
});

window.require(['controller/main-controller'], function(controller) {
    controller.init();
});
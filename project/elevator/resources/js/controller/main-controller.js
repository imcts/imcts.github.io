define([
    'template',
    'selector',
    'config',
    'controller/elevator-controller',
    'controller/floor-controller',

    'module/Elevator',
    'module/Floor'
], function(
    template,
    selector,
    config,
    elevatorController,
    floorController,

    Elevator,
    Floor
) {

    'use strict';

    function makeElevators(elevatorCount, floorCount) {
        var $container             = selector.getSelector('.js_contentContainer'),
            $elevatorListContainer = $container.find('.js_contentElevatorListContainer'),
            tmpl                   = template.getTemplate('.js_templateElevator'),
            elevators              = [];

        for(var i = 0, html; i < elevatorCount; i++) {
            html = template.setData(tmpl, {
                index: i
            });

            elevators.push(
                new Elevator({
                    index:       i,
                    floor:       config.ELEVATOR_DEFAULT_FLOOR,
                    isMove:      config.ELEVATOR_DEFAULT_STATE,
                    selector:    config.ELEVATOR_SELECTOR,
                    activeClass: config.ELEVATOR_ACTIVE_CLASS
                })
            );

            $elevatorListContainer.append(html);
        }

        $container
            .css({
                height: config.ANIMATION_DISTANCE * floorCount
            });

        return elevators;
    }

    function makeFloors(count) {
        var $floorContainer = selector.getSelector('.js_floorContainer'),
            tmpl            = template.getTemplate('.js_templateFloor'),
            floors          = [];

        for(var i = count, length = count - 1, html; i--;) {
            html = template.setData(tmpl, {
                targetFloor: i,
                floor: i + 1
            });

            floors.push(
                new Floor({
                    index:       length - i,
                    floor:       i,
                    isActive:    config.FLOOR_DEFAULT_STATE,
                    selector:    config.FLOOR_SELECTOR,
                    activeClass: config.FLOOR_ACTIVE_CLASS
                })
            );

            $floorContainer.append(html);
        }

        return floors;
    }

    function startSimulation(e) {
        var $selectModal       = selector.getSelector('.js_selectContainer'),
            $floorSelect       = selector.getSelector('.js_selectFloorSelector'),
            $elevatorSelect    = selector.getSelector('.js_selectElevatorSelector'),
            floorCount         = Number($floorSelect.val()),
            elevatorCount      = Number($elevatorSelect.val()),
            MODAL_ACTIVE_CLASS = config.MODAL_ACTIVE_CLASS;

        //floor controller initialize
        floorController.init({
            elevatorController: elevatorController,
            floors:             makeFloors(floorCount)
        });

        //elevator controller initialize
        elevatorController.init({
            floorController: floorController,
            elevators:       makeElevators(elevatorCount, floorCount)
        });

        //hide modal
        $selectModal.removeClass(MODAL_ACTIVE_CLASS);

        e.preventDefault();
        e.stopPropagation();
    }

    function clickFloorBtn(e) {
        var $this        = $(this),
            targetFloor  = $this.data('floor');

        floorController.clickFloorBtn(targetFloor);

        elevatorController.moveTheElevator();

        e.preventDefault();
        e.stopPropagation();
    }

    function setGlobal() {
        window.isActiveFloor  = floorController.isActiveFloor;
        window.setActiveFloor = floorController.setActiveFloor;
    }

    function setEvent() {
        var $container = selector.getSelector('.js_container');

        $container
            .on('click', '.js_selectSubmitBtn', startSimulation)
            .on('click', '.js_floorBtn', clickFloorBtn);
    }

    function init() {
        //template initialize
        template.init('.js_elevatorTemplateContainer');

        //event bind
        setEvent();

        //set global
        setGlobal();
    }

    return {
        init: init
    };
});
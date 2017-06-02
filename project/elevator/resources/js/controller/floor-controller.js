define([
    'selector'
], function(
    selector
) {

    'use strict';

    var floors      = [],
        readyQueue  = [],
        elevatorController;

    function removeActiveFloor(targetFloor) {
        var floor  = findFloor(targetFloor),
            $floor = getJqueryFloor(floor);

        floor.setActive(false);
        $floor.removeClass(floor.getActiveClass());
    }

    function setActiveFloor(targetFloor) {
        var floor  = findFloor(targetFloor),
            $floor = getJqueryFloor(floor);

        floor.setActive(true);
        readyQueue.push(floor);
        $floor.addClass(floor.getActiveClass());
    }

    function findFloor(targetFloor) {
        for(var i = 0, floor; floor = floors[i]; i++) {
            if(floor.getFloor() == targetFloor) {
                return floor;
            }
        }
    }

    function getJqueryFloor(floor) {
        return  selector.getSelector(floor.getSelector()).eq(floor.getIndex());
    }

    function clickFloorBtn(targetFloor) {
        var isButtonActive    = isActiveFloor(targetFloor),
            isWaitingElevator = elevatorController.isWaitingElevatorOnFloor(targetFloor);

        if(isButtonActive || isWaitingElevator) {
            return;
        }

        //set target floor active
        setActiveFloor(targetFloor);
    }


    function isActiveFloor(targetFloor) {
        var floor = findFloor(targetFloor);

        return floor.isActive();
    }

    function getReadyFloor() {
        return readyQueue.shift();
    }

    function isReadyFloor() {
        return readyQueue.length !== 0;
    }

    function init(init) {
        //elevator controller injection
        elevatorController = init.elevatorController;

        //floors injection
        floors = init.floors;
    }

    return {
        init:              init,
        clickFloorBtn:     clickFloorBtn,
        isReadyFloor:      isReadyFloor,
        getReadyFloor:     getReadyFloor,
        removeActiveFloor: removeActiveFloor,
        isActiveFloor:     isActiveFloor,
        setActiveFloor:    setActiveFloor
    };
});
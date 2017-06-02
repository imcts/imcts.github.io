define([
    'selector',
    'config'
], function(
    selector,
    config
) {

    'use strict';

    var elevators = [],
        floorController;

    function clearAnimationElevator(elevator) {
        setTimeout(function() {
            //remove Active
            removeActiveElevator(elevator);

            //find target floor
            moveTheElevator();

        }, config.ANIMATION_END_WAIT_TIME);
    }

    function doAnimationElevator(elevator, floor) {
        var $elevator      = getJqueryElevator(elevator),
            targetFloor    = floor.getFloor(),
            distance       = Math.abs(elevator.getFloor() - floor.getFloor()),
            animationTime  = config.ANIMATION_TIME * distance,
            elevatorHeight = $elevator.outerHeight(),
            bottom         = elevatorHeight * targetFloor;

        $elevator
            .stop()
            .animate({
                bottom: bottom
            }, animationTime, 'linear', function() {
                //animation done
                clearAnimationElevator(elevator);

                //floor active clear
                floorController.removeActiveFloor(floor.getFloor());
            });
    }

    function removeActiveElevator(elevator) {
        var $elevator = getJqueryElevator(elevator);

        elevator.setMove(false);
        $elevator.removeClass(elevator.getActiveClass());
    }

    function setActiveElevator(elevator, floor) {
        var $elevator = getJqueryElevator(elevator);

        elevator.setMove(true);
        elevator.setFloor(floor.getFloor());
        $elevator.addClass(elevator.getActiveClass());
    }

    function getJqueryElevator(elevator) {
        return selector.getSelector(elevator.getSelector()).eq(elevator.getIndex());
    }

    function moveTheElevator() {
        var isReadyFloor    = floorController.isReadyFloor(),
            isReadyElevator = isReadyElevators();

        if(!isReadyFloor || !isReadyElevator) {
            return;
        }

        var floor       = floorController.getReadyFloor(),
            elevator    = getNearElevator(floor.getFloor());

        //animation elevator
        doAnimationElevator(elevator, floor);

        //active elevator
        setActiveElevator(elevator, floor);
    }

    function getNearElevator(targetFloor) {
        var distance = Infinity,
            nearElevator;

        for(var i = elevators.length, elevator, calcDistance; i--;) {
            elevator = elevators[i];

            if(!elevator.isMove()) {
                calcDistance = Math.abs(targetFloor - elevator.getFloor());

                if(calcDistance < distance) {
                    nearElevator = elevator;
                }

                distance = calcDistance;
            }
        }

        return nearElevator;
    }

    function isReadyElevators() {
        for(var i = 0, elevator; elevator = elevators[i]; i++) {
            if(!elevator.isMove()) {
                return true;
            }
        }

        return false;
    }

    function isWaitingElevatorOnFloor(targetFloor) {
        for(var i = 0, elevator; elevator = elevators[i]; i++) {
            if(elevator.getFloor() === targetFloor) {
                return true;
            }
        }

        return false;
    }

    function init(init) {
        //floor controller injection
        floorController = init.floorController;

        //elevators injection
        elevators = init.elevators;
    }

    return {
        init:                     init,
        moveTheElevator:          moveTheElevator,
        isWaitingElevatorOnFloor: isWaitingElevatorOnFloor
    };
});
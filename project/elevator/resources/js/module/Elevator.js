define(function() {

    'use strict';

    var Elevator = function(init) {
        this._index       = init.index;
        this._floor       = init.floor;
        this._isMove      = init.isMove;
        this._selector    = init.selector;
        this._activeClass = init.activeClass;
    };


    Elevator.prototype.getActiveClass = function() {
        return this._activeClass;
    }

    Elevator.prototype.getSelector = function() {
        return this._selector;
    }

    Elevator.prototype.getIndex = function() {
        return this._index;
    }

    Elevator.prototype.setFloor = function(floor) {
        this._floor = floor;
    }

    Elevator.prototype.getFloor = function() {
        return this._floor;
    };

    Elevator.prototype.setMove = function(isMove) {
        this._isMove = isMove;
    };

    Elevator.prototype.isMove = function() {
        return this._isMove;
    };

    return Elevator;
});
define(function() {

    'use strict';

    var Floor = function(init) {
        this._index       = init.index;
        this._floor       = init.floor;
        this._isActive    = init.isActive;
        this._selector    = init.selector;
        this._activeClass = init.activeClass;
    };

    Floor.prototype.setActive = function(isActive) {
        this._isActive = isActive;
    }

    Floor.prototype.getActiveClass = function() {
        return this._activeClass;
    }

    Floor.prototype.getIndex = function() {
        return this._index;
    }

    Floor.prototype.getSelector = function() {
        return this._selector;
    }

    Floor.prototype.getFloor = function() {
        return this._floor;
    };

    Floor.prototype.setActive = function(isActive) {
        this._isActive = isActive;
    };

    Floor.prototype.isActive = function() {
        return this._isActive;
    };

    return Floor;
});
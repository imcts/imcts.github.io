var Elevator = function(index, floor) {
    this._index       = index;
    this._floor       = floor;
    this._isMove      = false;
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
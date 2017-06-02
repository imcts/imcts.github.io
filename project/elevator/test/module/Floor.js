var Floor = function(index, floor) {
    this._index       = index;
    this._floor       = floor;
    this._isActive    = false;
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


define(function() {

    'use strict';

    var config = {
        //modal
        MODAL_ACTIVE_CLASS: 'select--active',

        //animation
        ANIMATION_TIME:          1000,
        ANIMATION_DISTANCE:      110,
        ANIMATION_END_WAIT_TIME: 3000,

        //elevator
        ELEVATOR_SELECTOR:      '.js_contentElevator',
        ELEVATOR_DEFAULT_FLOOR: 0,
        ELEVATOR_DEFAULT_STATE: false,
        ELEVATOR_ACTIVE_CLASS:  'content__cell__container__elevator--active',

        //floor
        FLOOR_SELECTOR:      '.js_floorBtn',
        FLOOR_ACTIVE_CLASS:  'floor__container__btn--active',
        FLOOR_DEFAULT_STATE: false
    };

    return config;
});
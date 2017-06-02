const state = {
    element:   $('.js_listUl'),
    isSwipe:   false,
    left:      0,
    startX:    0,
    endX:      0,
    time:      0,
    distance:  0,
    animate:   0
};


const setEvent = () => {
    const $container = $(document);

    $container
        .off('.swipe')
        .on('mousedown.swipe touchstart.swipe', '.js_listContainer', doClick)
        .on('mouseup.swipe touchend.swipe touchcancel.swipe', '.js_listContainer', doUp)
        .on('mousemove.swipe touchmove.swipe', '.js_listContainer', doMove);
};

const doMove = e => {
    state.isSwipe && doSwipe(e);

    e.preventDefault();
};

const doUp = e => {
    state.isSwipe = false;
    state.time = Date.now() - state.time;
    state.animate = state.distance / state.time * 300 + state.element.offset().left;

    console.log(state);

    state.element.animate({
        left: state.animate
    }, 100, 'swing', e => console.log('end!'));

    e.preventDefault();
};

const doClick = e => {
    state.isSwipe = true;
    state.startX  = state.endX = getXPoint(e);
    state.left    = state.element.offset().left;
    state.time    = Date.now();

    e.preventDefault();
};

const doSwipe = e => {
    state.distance = state.endX - state.startX;

    state.endX = getXPoint(e);

    state.element.css({
        left: state.left + state.distance
    });

    e.preventDefault();
};

const getXPoint = e => e.clientX || (e.originalEvent.touches && e.originalEvent.touches[0] && e.originalEvent.touches[0].clientX) || 0;

const init = () => {
    setEvent();
};

init();
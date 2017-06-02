const floors     = Array(...Array(5)).fill(0).map((v, i) => new Floor(i, Math.abs(4 - i)));
let readyQueue = [];

const findFloor = targetFloor => floors.find(floor => floor.getFloor() === targetFloor);

const isActiveFloor = targetFloor => findFloor(targetFloor).isActive();

const setActiveFloor = targetFloor => {
    const floor = findFloor(targetFloor);
    floor.setActive(true);
    readyQueue.push(floor);
};

const removeActiveFloor = targetFloor => {
    var floor  = findFloor(targetFloor);
    floor.setActive(false);
}

const getReadyFloor = () => readyQueue.shift();

const isReadyFloor = () => readyQueue.length !== 0;

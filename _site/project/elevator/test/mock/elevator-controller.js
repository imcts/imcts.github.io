const elevators = Array(...Array(5)).fill(0).map((v, i) => new Elevator(i, 0));

const isWaitingElevatorOnFloor = targetFloor => !!elevators.find(elevator => elevator.getFloor() === targetFloor);

const isReadyElevators = () => elevators.find(elevator => !elevator.isMove()) !== undefined;

const setActiveElevator = (elevator, floor) => {
    elevator.setMove(true);
    elevator.setFloor(floor.getFloor());
}

const removeActiveElevator = elevator => elevator.setMove(false);

const getNearElevator = targetFloor => {
    let distance = Infinity,
        nearElevator;

    elevators.forEach((elevator, i, calcDistance) => {
        if(!elevator.isMove()) {
            calcDistance = Math.abs(targetFloor - elevator.getFloor());

            if(calcDistance < distance) {

                nearElevator = elevator;
            }

            distance = calcDistance;
        }
    });

    return nearElevator;
}
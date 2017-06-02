describe('객체의 생성 테스트', () => {
    it('Floor 객체의 생성을 확인한다.', () => expect(floors.length).toBe(5));

    it('Floor 객체의 인덱싱을 확인한다.', () => floors.map(floor => floor.getIndex()).forEach((index, i) => expect(index).toBe(i)));

    it('Floor 객체의 층수를 확인한다.', () => floors.map(floor => floor.getFloor()).reverse().forEach((floor, i) => expect(floor).toBe(i)));

    it('Elevator 객체의 생성을 확인한다.', () => expect(elevators.length).toBe(5));

    it('Elevator 객체의 인덱싱을 확인한다.', () => elevators.map(floor => floor.getIndex()).forEach((index, i) => expect(index).toBe(i)));
});

describe('Floor Controller의 함수를 테스트한다.', () => {
    it('findFloor 함수를 테스트한다. 찾고자하는 층수를 입력하고 해당 floor 객체를 얻는다.', () => {
        const targetFloor = 3;
        const floor = findFloor(targetFloor);

        expect(floor.getFloor()).toBe(targetFloor);
    });

    it('setActiveFloor 함수를 테스트한다. 활성화할 층수를 입력하고 해당 층이 활성화 되었는지 확인한다.', () => {
        const targetFloor = 3;
        const floor = findFloor(3);

        setActiveFloor(targetFloor);

        expect(floor.isActive()).toBe(true);
        expect(readyQueue[0]).toBe(floor);
    });

    it('removeActiveFloor 함수를 테스트한다. 확인하고자 하는 층수를 넘겨주고 해당 층의 상태를 확인한다.', () => {
        const targetFloor = 3;
        const floor = findFloor(3);

        removeActiveFloor(targetFloor);

        expect(floor.isActive()).toBe(false);
    });

    it('getReadyFloor 함수를 테스트한다. Queue에서 객체를 빼고 해당 객체의 Active상태를 확인한다.', () => {
        const floor = getReadyFloor();

        expect(floor.isActive()).toBe(false);
    });

    it('isReadyFloor 함수를 테스트한다. Queue에서 객체를 꺼낸 뒤 해당 Queue가 비어있는지 확인한다.', () => expect(isReadyFloor()).toBe(false));

    it('isActiveFloor 함수를 테스트한다. 확인하고자 하는 층수를 넘겨주고 해당 층의 상태를 확인한다.', () => expect(isActiveFloor(3)).toBe(false));
});

describe('Elevator Controller의 함수를 테스트한다.', () => {
    it('isWaitingElevatorOnFloor 함수를 테스트한다. 확인해보고자 하는 층수를 입력하고, 해당 층에 엘레베이터가 있는지 확인한다.', () => expect(isWaitingElevatorOnFloor(0)).toBe(true));

    it('isReadyElevators 함수를 테스트한다. 현재 대기중인 엘리베이터가 하나라도 있는지 확인한다.', () => expect(isReadyElevators()).toBe(true));

    it('setActiveElevator 함수를 테스트한다. 엘레베이터의 상태와 옴겨야할 층수가 잘 설정되었는지 확인한다.', () => {
        const targetFloor = 2,
              floor       = findFloor(targetFloor),
              elevator    = elevators[2];

        setActiveElevator(elevator, floor);

        expect(elevator.getFloor()).toBe(floor.getFloor());
        expect(elevator.isMove()).toBe(true);
    });

    it('removeActiveElevator 함수를 테스트한다. 엘레베이터의 상태가 잘 설정되었는지 확인한다.', () => {
        const elevator = elevators[2];

        removeActiveElevator(elevator);

        expect(elevator.isMove()).toBe(false);
    });

    it('getNearElevator 함수를 테스트한다. 원하는 층수를 넘겨주고 해당 층수와 제일 가까운 엘레베이터를 찾는다.', () => {
        const targetFloor = 3;
        const elevator = getNearElevator(targetFloor);

        expect(elevator.getFloor()).toBe(2);
    });
});



---

layout: post
title: ES6 - ITERABLE ITERATOR
date: 2018-11-28 00:00:00
img: javascript.jpg
---

### Duck Typing
```java
class Integer {
    public static void main (String [] args) {
        int value = 1;        
    }    
}
``` 
사람은 손가락이 10개이기 때문에 주로 10진법에 익숙하지만, 전자 기기의 경우에는 특정한 신호(물, 바람, 힘, 전기, 방향등)를 받아들여 `on`, `off`만으로 구분해야 하기에 
0과 1로만 이루어지는 수 체계인 [2진법](https://ko.wikipedia.org/wiki/%EC%9D%B4%EC%A7%84%EB%B2%95)을 주로 사용합니다. 당연하게도 전자기기인 컴퓨터는 2진법을 사용하여 저장 장치에 값을 기록하고 
사용하는데요. 이때 메모리안에 수도 없이 이어져있는 `bit`공간중에 어디서부터 어디까지가 내가 만든 값일까요? 프로그래밍 언어 별로 정수, 실수, 문자열등에 사용되는 메모리양은 전부 다르지만 보통의 프로그래밍 언어는 값의 크기를 지정합니다. 
유명한 정적언어인 `C`, `JAVA`를 기준으로 정수형의 숫자값은 `4Byte`의 크기를 갖게 됩니다. `1Byte`는 `8Bit`이므로 `32Bit`라는 공간을 갖게 되는데요. 
그로인해 변수 `value`의 메모리에는 `00000000 00000000 00000000 00000001`이라는 값이 저장되게 됩니다. 그렇다면 왜 꼭 특정 값을 저장하는데 크기를 지정해 놓은 것일까요? 
그래야만 연속적으로 이어져있는 비트 공간의 값들 중 현재 내가 얻어야 하는 값의 길이를 알 수 있기 때문 입니다. 우리는 이를 [`데이터 타입` 또는 `자료형`](https://ko.wikipedia.org/wiki/%EC%9E%90%EB%A3%8C%ED%98%95) 이라고 부릅니다. 
많은 언어들은 프로그래머들이 별도의 자료형을 정의할 수 있게 허용하는데요. 이런 별도의 자료형들을 `구조체`나 `class`라고 합니다. 이런 별도의 자료형들을 사용하면 메소드나 함수에 전달된 값이 어떤 자료형을 갖게 되는지를 알 수 있을 뿐더러 
그 자료형에 선언된 값이나 속성이 존재한다는 것도 확신할 수 있게 됩니다. 정해진 자료형으로 생성된 인스턴스는 반드시 해당 자료형의 값이나 속성을 가지고 태어날 것이라는 것을 확신할 수 있기 때문이죠.

반면 `Duck Typing`이라는 것은 클래스의 상속이나 인터페이스의 구현으로 자료형을 판단하는 것이 아닌, 인스턴스의 `값`이나 `속성`을 기준으로 해당 객체를 판단하겠다는 것입니다. 
이는 오리처럼 걷고 오리처럼 울면 오리라고 간주한다라는 [덕테스트](https://ko.wikipedia.org/wiki/%EC%9C%84%ED%82%A4%EB%B0%B1%EA%B3%BC:%EC%98%A4%EB%A6%AC_%EC%8B%A4%ED%97%98)에서 유래한 말이기도 합니다.  

```javascript
class Bird {
  quack () {
    console.log('꽥 꽥!')
  }
  
  walk () {
    console.log('뒤뚱 뒤뚱!')
  }
}

class Person {
  quack () {
    console.log('나는 오리로 분장했어요.')
  }
    
  walk () {
    console.log('뒤뚱 뒤뚱 오리처럼 걸어요!')
  }
}
```
`Bird`나 `Person`이나 모두 `quack`처럼 울 수 있고 `walk`로 걸을 수 있으니 오리로 간주하겠다는 것이죠. 

### Iterable
```java
interface Iterable {
    Iterator [Symbol.iterator] ();
}
```
`Iterable`은 객체 또는 객체의 `prototype`체인중 하나라도 `Symbol.iterator`속성을 보유하고 있어야 하며 
실행시 반드시 `Iterator`프로토콜을 준수하는 객체를 반환해야 합니다. `Iterable`은 `iteration`을 위한 행동을 정의하는 역할을 수행 합니다. 
`DuckTyping`에서 설명드렸던 것과 같은 맥락으로 객체(*Object*)는 속성값(*prototype*)을 가질 수 있고 `Iterable`이 되기 위한 조건은 `Symbol.iterator`속성만 보유하고 있으면 되므로 
모든 자바스크립트의 객체는 `Iterable`할 수 있습니다. 


### Iterator
```java
interface Iterator {
    IteratorResult next ();
}
```
`Iterator`는 `next`메소드를 가지고 있어야 하고 실행할 때마다 `IteratorResult`를 반환 해야 합니다.


### Iterator Result
```java
interface IteratorResult {
    boolean done;
    Object value;
}
```
`Iterator`가 반환하는 `IteratorResult`는 `iteration`의 완료 여부를 나타내는 `done`과 `value`를 속성으로 보유하고 있어야 합니다. 
`done`은 모든 `iteration`이 완료 되면 `true`를 그 외에는 `falsy`를 갖게 됩니다. `value`에는 해당 `iteration`에서 사용될 값을 반환하며 자료형은 `Object`이므로 그 어떠한 값도 담길 수 있습니다. 
 

### default execute
```javascript
const iterable = {
  [Symbol.iterator] () {
    let value = 0
    return {
      next () {
        return value++ < 3 ? {value} : {done: true}
      }
    }
  }
}

const iterator = iterable[Symbol.iterator]()

console.log(iterator.next()) // {value: 1}
console.log(iterator.next()) // {value: 2}
console.log(iterator.next()) // {value: 3}
console.log(iterator.next()) // {done: true}
```
`Iterable`을 실행하며 `Iterator`객체를 얻고 이를 통해 `Iteration`을 수행하여 `IteratorResult`를 얻는 것을 확인할 수 있습니다.

### 반복문
반복에는 보통 2가지가 존재하는데 `iteration`과 `recursion`입니다. 
`iteration`이란 동일한 구조를 계속하여 반복하는 것을 말하며 `recursion`이란 알고리즘을 통해 재귀적으로 반복되는 것을 말 합니다. 
자바스크립트의 `iteration`을 수행하는 방법은 언어적으로 굉장히 풍부합니다. 
 
```javascript
let i = 0
while (i < 10) {
  i ++
}

for (let i = 0; i < 10; i++) {
  // do something
}
```
반복문의 경우에는 반드시 `3가지`가 존재해야 하는데 `초기값`, `조건문`, `증감식`이 그것들 입니다. 이 중 하나라도 없다면 반복문은 영원히 실행되지 않거나, 영원히 실행되게 됩니다.  

### forEach
````javascript
const array = [1, 2, 3, 4, 5]
array.forEach(v => console.log(v))
array.map(v => v)
array.some(v => v)
array.every(v => v)
````
자바스크립트는 언어적으로 반복문에 필요한 복잡한 값들을 언어차원에서 흡수하여 루프를 추상화하여 수행할 수 있도록 도와 줍니다. 특별히 인덱스를 사용해야 하거나 커스텀하게 반복을 해야 하는 일이 아니라면 
최대한 추상화된 반복문을 사용하는 것을 권고 합니다.  

### Iterable executor for-of
```javascript
for (const value of iterable) {
  // statement
}
```
`for-of`문은 전달받은 `Iterable`을 수행하여 `Iterator`를 얻고 `IteratorResult`의 `done`이 `true`를 반환할때까지 실행하여 값을 전달해 줍니다. 

#### Array
```javascript
const iterable = [10, 20, 30];

for (let value of iterable) {
  console.log(value) // 10, 20, 30
}
```

#### String
````javascript
const iterable = '12345'

for (let value of iterable) {
  console.log(value) // 1, 2, 3, 4, 5
}
````

#### Map
```javascript
const iterable = new Map([
  ['a', 1], 
  ['b', 2], 
  ['c', 3]
])

for (let [key, value] of iterable) {
  console.log(key, value)
  // a, 1
  // b, 2
  // c, 3
}
```

#### Set
```javascript
const iterable = new Set([1, 1, 2, 2, 3, 3]);

for (let value of iterable) {
  console.log(value) // 1, 2, 3
}
```

#### Generator
````javascript
function * generator () {
  yield 1
  yield 2
  yield 3
}

for (let value of generator()) {
  console.log(value) // 1, 2, 3
}
````
자바스크립트의 많은 객체들은 `Iterable`을 구현하고 있습니다. 별도의 순서에 의한 실행이 아닌 `iteration`을 위한 `Iterable`이라면 `for-of`를 활용하면 좀 더 쉽게 사용할 수 있습니다.  
`for-of`는`Iterable`을 실행해주는 `executor`이기 때문이죠. 앞서 말씀드린 추상화된 반복문들에서 사용할 수 없는 `break`문을 사용할 수 있다는 점 또한 큰 이점이 될 수 있겠네요. 

`Iterable`과 `executor for-of` 였습니다.

---
layout: post
title: ES6 - PARAMETERS
date: 2018-12-14 00:00:00
image: '/assets/img/'
main-class: 'js'
description: 'ES6 Basic Study'
tags: 
- javascript
- rest
- default value

introduction: '- javascript parameters -'
---

### Default Parameter
````javascript
function f (a, b, c) {
  if (!a) {
    a = 1
  }
  
  b = b || 2
  
  c = c 
    ? c 
    : 3
}
````
`ES6`이전에는 위에 기술해놓은 3가지 방법등으로 파라미터에 값이 없는경우 기본값을 할당 했었습니다. 그러나 이렇게 기본값을 할당하는 경우, 전달된 인자의 값이 `falsy`인 경우에는 문제가 되곤 했었죠. 

```javascript
console.log(Boolean(0)) // false
console.log(Boolean(NaN)) // false
console.log(Boolean(false)) // false
console.log(Boolean(null)) // false
console.log(Boolean('')) // false
```  
자바 스크립트의 특정한 값들은 `Boolean`으로 변경했을때 `falsy`로 판단됩니다. 그렇기 때문에 위의 값들이 함수의 인자로 전달되었을 경우에는 원하지 않는 기본 값들이 할당되곤 했었죠.
이를 해결 하기 위해서는 전달된 인자를 `typeof 인자 === 'undefined'`로 비교하여 판단하면 비교적 안전하지만 이 또한 만만치 않은 작업비용이 들어갑니다.

```javascript
const f = (a = 1, b = 2, c = 3) => {
  console.log(a, b, c)
}

f()  // 1, 2, 3
f(null, 0, NaN) // null, 0, NaN
f('', false, undefined) // '', false, 3
``` 
`ES6`에서는 번거롭고 오류가 발생할 수 있는 동작을 하는 여러 방법들 대신에, 파라미터에 기본값을 할당할 수 있게 변경 되었습니다. 
단순히 매개변수 뒤에 대입 연산자로 표기만 해 두면 인자에 `undefined`가 전달되었을때 기본값을 할당 해 줍니다. 주의해야 할 것은 기존처럼 `falsy`한 특성을 갖는 값들은 그대로 할당되며 
오로지 `undefined`만 기본값이 할당된다는 점 입니다. 

```javascript

const f1 = a => a * 2

const f = (a = 1, b = f1(a)) => {
  console.log(a, b)
}

f() // 1, 2
```
기본 값에는 `식`에 해당되는 모든 것이 들어갈 수 있습니다. 자바스크립트에서는 함수 또한 값에 해당하는 식이기 때문에 기본값으로 할당할 수 있게 됩니다. 그 뿐 아니라 자신의 앞에 선언된 변수의 값 또한 사용할 수 있습니다. 
주의해야 할 점은 기본값 `b`에서 실행될 `f1`은 함수 `f`의 두번째 인자의 값으로 `undefined`가 전달되었을때 실행된다는 점입니다. 

```javascript
const f = (a = b * 3, b = 2) => {
  console.log(a, b)
}

f() // b is not defined
``` 
함수의 매개변수 영역에 선언된 변수는 `let`으로 선언됩니다. 그렇기 때문에 [`TDZ`](https://imcts.github.io/ES6-LET-CONST-TDZ/) 또한 동일하게 적용되게 됩니다. 
자바스크립트는 좌에서 우로, 위에서 아래로 읽어 들이기 때문에 변수 `a`가 선언되었을때 아직 `b`는 선언되지 않은 상태이며 변수 `b`는 `TDZ`영역이 됩니다.  

### Named Value
```javascript
const f = ({a, b}) => {
  console.log(a, b)
}

f({ a: 1, b: 2 }) // 1, 2
```
지난 포스팅에서 설명했듯이 [`Destructuring`](https://imcts.github.io/ES6-DESTRUCTURING_ASSIGNMENT/)을 활용하면 객체를 인자로 전달받을때에도 구조분해를 할 수 있게 되었습니다. 
함수에 객체를 전달할때 함수에 정의된 키값을 전달하면 해당 값이 각 매개변수에 매칭되게 됩니다.  

```javascript
const f = ({a = 1, b = 2}) => {
  console.log(a, b)
}

f({ a: undefined }) // 1, 2
```
만약 전달된 객체의 키 값이 존재하지 않거나 해당 키의 값이 `undefined`인 경우에는 기본 값을 할당 합니다. 

```javascript
const f = ({a = 1, b = 2}) => {
  console.log(a, b)
}

f() // Cannot destructure property `a` of 'undefined' or 'null'.
```
주의해야할 점은 객체를 구조분해하고 있는 함수에 `undefined`를 전달하는 경우에는 `undefined.a`와 `undefined.b`를 수행하기 때문에 에러가 발생하게 됩니다. 
아무런 값이 전달되지 않았을 경우에는 그 즉시 프로그램을 종료하는 `우아한 실드패턴`이라고도 부르지만 만약 구성해야하는 서비스가 함수에 값이 전달되지 않았을때 에러 로그를 전송하고 
다른 기능을 수행하거나 앱을 존속시켜야 하는 경우라면 주의하여 사용해야 합니다.  

### Rest Parameter
```javascript
function f () {
  console.log(arguments)
}

f(1, 2, 3, 4, 5) // Arguments(5) [1, 2, 3, 4, 5]
```
`ES6`이전에는 함수에 정해지 않은 불특정한 값들을 인자로 전달받기 위해서는 `arguments`라는 유사배열객체를 사용하여 왔습니다. 
그 뿐 아니라 `arguments`는 배열이 아닌 객체이기 때문에 배열처럼 사용하려면 `Array.prototype.slice.call(arguments)`등의 방법으로 사용하는 불편함도 있었습니다. 
물론 `ES6`에서 도입된 `Array.from(arguments)`를 사용하면 되지만 불편한 건 변하지 않습니다. 게다가 `Arrow Function`에서는 `arguments`를 지원하지 않기 때문에 
정해지지 않은 개수의 인자를 전달받으려면 새로운 방법이 필요하게 되었죠.

```javascript
const f = (a, ...b) => {
  console.log(a, b)
}

f(1, 2, 3, 4, 5)
```
기존의 불편했던 동작들을 `ES6`에서는 `Rest Parameter`라는 기능으로 지원해주고 있습니다. 사용방법은 보시는바와 같이 맨 마지막 변수의 앞에 `...`를 붙여주기만 하면 됩니다. 
`나머지 연산자`라고도 불리우는 이 연산자는 앞에 지정된 변수가 있다면 순서대로 해당 변수에 값을 할당해 주고 더이상 선언된 변수가 없다면 함수에 전달된 남은 모든 인자들을 
배열로 할당 합니다. 이때 `b`에 할당된 배열은 `arguments`와 같은 유사배열이 아닌 진짜 `Array`입니다. 

```javascript
const f = (a, ...b, c) => {
  console.log(a, b, c)
}

f(1, 2, 3, 4, 5) // Rest parameter must be last formal parameter
```
`나머지 연산자`는 반드시 맨 마지막에 선언되어야 하며 변수의 선언 중간에 포함될 수 없습니다. 중간에 나머지 연산자를 넣는경우 몇개의 파라미터를 절삭해야하는지 판단하기 어렵기 때문이죠. 

```javascript
const A = class {
  constructor () {
    this._a = 3
  }
  
  set a (...a) { 
    this._a = a
  }
}
// Setter function argument must not be a rest parameter
```
그 뿐 아니라 `setter`함수에서도 `나머지 연산자`는 사용될 수 없습니다. `getter`함수에서 인자를 받을 수 없듯이 `setter`함수에서는 하나의 인자만 받도록 구성되어 있기 때문입니다. 















---
layout: post
title: ES6 - ARROW FUNCTION
date: 2018-11-17 02:00:00
img: javascript.jpg
---

### 1. The Arrow Function
화살표 함수라 부르는 ES6에 도입된 이 문법은 여러가지 기능 및 장점을 가지고 있습니다. 일반 `function`표현식에 비하여 표현 구문이 짧고 간결할 뿐 아니라, 
`this, arguments, super`등을 허용 하지 않기도 합니다. 화살표 함수는 항상 익명함수이며 메소드가 아닌 일반 함수 표현에 유용하게 사용할 수 있습니다.  

### 2. Syntax
```javascript
// 표현식 (param1, param2, ... paramN) => {statements}
const f = function (a, b) {return a + b} // 일반 함수 표현식
const arrow = (a, b) => {return a + b} // 화살표 함수 표현식
```
기본적인 표현방법 입니다. 단순히 `function`표현식 대신에 `=>`화살표 표현식이 들어간 것으로 보일 수도 있습니다만 두 표현식은 많은 부분이 다릅니다. 
다음 예제들을 통하여 여러가지 사용 문법들을 알아봅니다.  

```javascript
const f = a => {}
```
인자가 1개인 경우 `()` 중괄호를 생략할 수 있습니다.

```javascript
const f = a => console.log(a)
```
함수의 본문이 1줄인 경우 `{}`를 생략할 수 있습니다.


```javascript
const f = (a, b) => {
  const c = a + b
  return c
}
```
반환하고자 하는 값이 있는경우 일반 함수와 동일하게 `return`문을 사용할 수 있습니다.

```javascript
const f = a => a + 1
```
함수의 본문이 1줄이고 해당 값을 바로 반환하는 경우 `{}`를 생략함으로 `return` 구문을 생략할 수 있습니다.  

```javascript
const f = a => ({
  a,
  b: 0
})
```
객체를 반환하고자 하는 경우 `{}`앞에 `()`를 추가하여 객체를 반환하는 것임을 나타낼 수 있습니다.

```javascript
const f = a 
=> a + 1
```
화살표 함수 이전에 라인 개행을 허용하지 않습니다. 

### 3. this
```javascript
function f(){
  this.age = 0
  setInterval(() => this.age++, 1000)
}
window.f()
```

기존의 함수들은 실행될때마다 자신의 `this`를 정의했습니다. 생성자인 경우에는 새로운 객체를, 객체의 메서드로 실행될 때에는 
객체의 context를, 엄격 모드등에서는 undefined를 삼는등 언제나 `this`는 존재했습니다. 하지만 화살표 함수는 실행될때 자신만의 this를 
정의하지 않습니다. 다만 화살표 함수 바깥의 `this`를 사용하게 됩니다. 즉 코드에 작성된 그대로의 스코프를 갖는 [`렉시컬 스코프`](https://medium.com/@appear.ko/%EB%A0%89%EC%8B%9C%EC%BB%AC-%EC%8A%A4%EC%BD%94%ED%94%84-%ED%8C%8C%ED%97%A4%EC%B9%98%EA%B8%B0-ef3c8e8584d4)를 사용 합니다. 
그렇기 때문에 위의 예제의 화살표 함수는 바깥의 `this`객체를 그대로 참조하여 `age`를 증가 시키게 됩니다.  

```javascript
const o = {
  v: 0
}
const f = () => console.log(this)
f.call(o) // NaN
```
화살표함수는 `this`바인딩을 허용하지 않기 때문에 `call`메소드를 사용하여도 무시합니다. 현재 `this`인 `window`객체에는 v라는 값이 없으므로 `NaN`이 표시 됩니다. 

```javascript
const f = () => this = {} // Invalid left-hand side in assignment
```
화살표함수 내부에서는 `this`를 변경할 수 없습니다.  
 
### 4. arguments
```javascript
const f = () => console.log(arguments) // undefined
const f = (...arg) => console.log(arg)
```

기존 함수와 다르게 화살표 함수는 `arguments`객체를 바인드 하지 않습니다. 그렇기 때문에 나머지 연산자를 사용하는 방법이 좋은 대안이 될 수 있습니다.  

### 5. new
```javascript
const Class = () => {};
const c = new Class(); // TypeError: Class is not a constructor
```
화살표 함수는 오로지 함수로서의 기능만으로 추가되었기 때문에 `new`연산자를 사용할 수 없습니다. 

### 6. prototype
```javascript
const Class = () => {};
console.log(Class.prototype) // undefined
```
화살표 함수는 `new`연산자를 사용하여 인스턴스화할 수 없으므로 `prototype`또한 가질 수 필요가 없습니다.  



---

layout: post
title: ES6 - DESTRUCTURING ASSIGNMENT 
date: 2018-11-23 00:00:00
image: '/assets/img/'
main-class: 'js'
description: 'ES6 Basic Study'
tags: 
- javascript
- destructuring assignment

introduction: '- javascript destructuring assignment -'
---

해체 할당이란 배열이나 객체의 값을 해체하여 새로운 변수에 할당하는 표현식 입니다. ES6에 추가되었으며 활용도가 가장 높은 기능 중 하나이죠. 
오늘은 배열이나 객체에 담겨져있는 값들을 해체하여 새로 할당하는 방법에 대해 정리하고자 합니다. 

### 1. 배열의 해체 할당

#### 기본 사용 방법
```javascript
var array = [1, 2, 3]
var a = array[0]
var b = array[1]
var c = array[2]

var aa = array[0], bb = array[1], cc = array[2]
```
`ES5`이하 버전에서는 배열에 할당되어 있던 값들을 별도의 변수에 할당 하기 위해서는 다음과 같은 방법을 사용했었습니다. 배열의 `인덱스`를 참조하여 새로운 변수에 
값을 할당 하는 방법이죠. 

```javascript
const array = [1, 2, 3]
const [a, b, c] = array

console.log(a, b, c) // 1, 2, 3
```
`ES6`에서는 위처럼 간단하게 표현할 수 있게 되었습니다. 대입연산자를 기준으로 우항에 할당된 값의 인덱스 순서에 맞춰서 좌항에 대입 되는 방식 입니다. 


#### 발췌 할당
````javascript
const array = [1, 2, 3]
const [a, ,c] = array

console.log(a, c) // 1, 3
```` 
발췌 할당이란 필요한 값만 꺼내어 새로운 변수에 할당 하는 방법을 말 합니다. 대입 연산자를 기준으로 우항에 있는 배열의 인덱스에 맞춰 좌항에 있는 새로운 변수에 
할당 하는 구조이므로 위처럼 각 인덱스 순서에 맞게 변수를 선언한다면 필요한 값만 변수에 할당할 수도 있습니다.


#### 다차원 배열의 할당 
```javascript
const array = [
  [[1, 2, 3], 4, 5],
  [[6, 7, 8], 9, 10]
]

const [
  [[a, ,b], , c],
  [[, , d], e, f]
] = array

console.log(a, b, c, d, e, f) // 1, 3, 5, 8, 9, 10
```
다차원 배열도 마찬가지로 할당한 배열의 구조와 동일하게 좌항을 구성하면 필요한 값만을 꺼내어 새로운 변수에 할당할 수 있습니다.  

#### 변수의 값 바꾸기
```javascript
let a = 1
let b = 2
```
`ES5`이전에서는 `a`와 `b`의 값을 스위칭 하기 위해서는 새로운 변수가 하나 필요했습니다. 이건 굳이 자바스크립트가 아닌 그 어떤 언어도 마찬가지였죠. 

```javascript
let a = 1
let b = 2
let tmp

tmp = a
a = b
b = tmp

console.log(a, b) // 2, 1
```
이렇게 서로의 값을 다른 변수에게 할당하려면 변수 세 개를 이용하는 방법 말고는 없었습니다. 

```javascript
let a = 1
let b = 2

a^=b
b^=a
a^=b

console.log(a, b) // 2, 1
``` 
물론 `XOR`연산을 이용한 방법도 존재했지만 음수 또는 문자열등은 적용되지 않으므로 여기에서는 논외로 하겠습니다.  

```javascript
let [a, b] = [1, 2]
[b, a] = [a, b]
console.log(a, b) // 2, 1
```
`ES6`에서는 해체 할당을 통해 좀 더 쉽게 값을 교환할 수 있습니다.

#### Iterable
````javascript
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
const [a, b, c] = iterable
console.log(a, b, c) // 1, 2, 3
````
배열 해체 할당은 사실 자바스크립트의 배열만 해체할당 할 수 있는게 아니며 `Iterable`객체라면 어떤 객체든 구애받지 않고 해체 할당을 수행할 수 있습니다. 


### 2. 객체의 해체 할당

#### 기본 사용 방법

```javascript
var object = {
  a: 1,
  b: 2,
  c: 3
}

var a = object.a
var b = object.b
var c = object.c
```
`ES5`이전까지는 매번 객체에 접근하여 값을 찾고, 새로운 변수에 할당해야만 했습니다. 


```javascript
const object = {
  a: 1,
  b: 2,
  c: 3
}

const {a: name, b: name2, c: name3} = object
console.log(name, name2, name3) // 1, 2, 3
```
`ES6`부터는 객체도 해체하여 새로운 변수에 값을 할당할 수 있습니다. 보기에는 복잡하고 어려워보이지만 조금만 살펴보면 쉽게 이해할 수 있습니다.  


#### 객체 할당 규칙

```text
1. {할당할 객체의 프로퍼티명: 새로 선언할 변수명} = 할당할 객체
2. 변수명을 생략할 경우 프로퍼티명과 동일한 변수가 생성됩니다.
3. 프로퍼티를 지정하지 않으면 별도의 할당 및 변수 선언은 일어나지 않습니다. 
```
기존의 객체 표현식과 다른 부분이라면 객체의 선언 표현식인 `{}`를 대입 연산자 좌항에서도 사용할 수 있게 되었다는 것과, 해당 객체 표현식의 프로퍼티명 이었던 곳이 
해체할 객체의 키값이되고, 객체 표현식의 값을 적는 곳이 새로 선언할 변수명이 된다는 점 뿐 입니다. 

#### 발췌 할당

```javascript
const object = {
  a: 1,
  b: 2,
  c: 3
}
const {a, c} = object
console.log(a, c) // 1, 3
console.log(b) // b is not defined
```
해체 할당시에 새로운 변수명을 지정해 주지 않고 해체할 객체의 프로퍼티명만 작성 한다면 해당 프로퍼티명으로 새로운 변수가 생성 됩니다. 그 뿐 아니라 원하는 값만 해체하여 새로운 변수에 할당하는 것이기 때문에 
`b`를 사용시 에러가 발생하는 것도 확인할 수 있습니다.

````javascript
const object = {
  a: 1,
  b: 2,
  c: 3
}

const {} = object
````
객체 할당시에 해체할 프로퍼티명을 입력하지 않는다면 별도의 할당이나 선언과정 없이 해당 실행문을 건너뛰게 됩니다.


#### 중첩 객체 할당

````javascript
const object = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3
    }
  }
}

const {
  a, 
  b: {
    d: {
      e: f
    }
  }
} = object
console.log(a, f) // 1, 3
console.log(b) // b is not defined
console.log(d) // d is not defined
````
배열과 마찬가지로 해체할 객체와 동일한 구조로 할당할 객체를 작성 한다면 중첩된 객체의 필요한 값들만 가져올 수 있게 됩니다. 서버에서 가져온 JSON 데이터중 필요한 데이터만 
가져오는데에 사용하면 유용하겠죠? 

```javascript
const object = {
  a: 1
}

const {
  a, 
  b: {
    d: {
      e: f
    }
  }
} = object // Cannot destructure property `d` of 'undefined' or 'null'
``` 
해체 할당을 사용할때에는 조심해야 하는 부분도 있습니다. 해체 할당을 수행하기 위해 `b`안의 `d`를 접근하려는 시도를 하자 해당 프로그램은 에러를 반환하며 
종료되는데요. 이는 `object.b`의 값이 `undefined`이기 때문입니다. 만약 서비스하는 프로그램이 객체의 구조나 값이 없는경우 바로 `종료`되는 것을 원한다면 상관 없겠지만 
그렇지 않고 계속 `유지되며 동작`해야 한다면 `객체 할당은 조심스럽게` 사용되어야 할 것입니다. 
 




















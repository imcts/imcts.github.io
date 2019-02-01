---
layout: post
title: ES6 - THE NEW METHODS OF STRING AND ARRAY
date: 2019-01-21 00:00:00
img: javascript.jpg
---

## String
`ES6`의 `String`에는 몇 가지 메소드가 추가 되었습니다. 기존 메소드에 비해 새로운 메소드들의 실행 결과값은 의도를 쉽게 파악할 수 있도록 구현 되었습니다.

#### includes, startsWith, endsWith
````javascript
const str = 'str'

// ES5
str.indexOf('s') === 0              // true
str.indexOf('r') === str.length - 1 // true
str.indexOf('tt') === -1            // true

// ES6
str.startsWith('s')   // true
str.startsWith('str') // true

str.endsWith('r')     // true
str.endsWith('tr')    // true
str.endsWith('')      // true

str.includes('tt')    // false
````
`ES5`까지는 `indexOf`메소드를 활용하여, 문자열 안에 문자를 찾고 해당 문자의 `index`를 반환받아 결과를 판단해야만 했습니다. `indexOf`메소드는 인자로 전달한 문자가 문자열에 포함되어 있으면 해당 `index`값을 반환하고 
포함되어 있지 않는 경우에는 `-1`을 반환합니다. 이 결과값들은 여러가지 혼란스러운 점을 제공할 수 있는데요. 기존에 자바스크립트를 접하고 사용하던 개발자들이라면 크게 문제될 것 없이 해당 메소드를 사용할 수 있지만 
자바스크립트에 익숙하지 않은 개발자들의 경우에는 해당 반환값이 어떤 의미를 갖는지 알기 어렵습니다. `-1`이라는 값은 자바스크립트에서는 `trusy`이기 때문입니다. 
<br><br>
`ES6`에서는 문자열 메소드에 새로운 `startsWith`, `endsWith`, `includes`메소드들을 제공하며 `Boolean`값을 반환하도록 하고 있습니다. 
새로 추가된 메소드들을 사용하면 좀 더 명확하게 코드에 의도를 나타낼 수 있을 뿐더러 반환되는 `Boolean`값을 사용하여 결과를 판단하기도 수월해 졌습니다.
 

#### iteration
```javascript
const str = 'str'

// ES5
for (var i = 0; i < str.length; i++) {
  console.log(str[i]) // s, t, r 
}

// ES6
for (const c of str) {
  console.log(c) // s, t, r
}

[...str].forEach(console.log) // s, t, r
```
자바스크립트의 문자열은 내부적으로 `length`프로퍼티를 갖고 각 문자열마다 `index`를 갖게 됩니다. 그렇기 때문에 `ES5`까지는 문자의 `index`를 참조하여 각 문자를 순회하는 방식의 코드를 작성했었습니다. 
`ES6`에서 자바스크립트의 문자열은 `Iterable`이기 때문에 `for..of`구문을 사용할 수 있고 `Destrucuring`또한 가능하기 때문에 `Spread`연산자도 사용할 수 있습니다. 

````javascript
// ES5
let result = ''
for (var i = 0; i < 5; i++) {
  result += 's'
}
console.log(result) // sssss

// ES6
console.log('s'.repeat(5)) // sssss
````
`ES5`에서는 문자열을 반복해서 더하려면 꽤나 복잡한 코드를 작성해야만 했습니다. 문자를 합성한 결과를 매번 저장할 변수를 선언해야 하고 반복문을 사용하여 문자를 원하는 횟수만큼 더해주어야 했습니다. 
이처럼 반복적으로 작성해야 하는 코드들은 복사되어 여러군데에 생성되기 쉬웠고 사소한 실수로 인해 프로그램이 망가지기도 했습니다. `ES6`에서는 문자열을 반복하여 더해주는 메소드를 언어 차원에서 제공합니다. 
`String.repeat`을 사용하면 원하는 문자열을 원하는 만큼 반복시킬 수 있습니다. 


#### padStart, padEnd
```javascript
const str = '123'

str.padStart(10) //        123
str.padEnd(10)   // 123      

str.padStart(5, '*') // **123
str.padEnd(5, '*')   // 123**
```  
`ES7`에서는 `padStart`, `padEnd`메소드가 추가 되었습니다. 인자는 2개의 값을 전달받으며 첫 번째 인자는 `maxLength`이고 두 번째 인자는 채워줄 값이 됩니다. 두 번째 인자를 전달하지 않았을 경우에는 
공백 문자가 기본값이 됩니다. 
<br>
<br>
<br>




## Array
`ES6`에는 `Array`객체에도 메소드들이 추가 되었습니다. 

#### from
````javascript
const str = 'str'

// ES5
Array.prototype.slice.call(str)

// ES6
Array.from(str) // ['s', 't', 'r']
Array.from(str, c => c + c) // ['ss', 'tt', 'rr']
````
`ES5`까지는 `slice`메소드에 인자를 전달하지 않으면 새로운 배열을 생성하여 반환하는 점을 이용해 `유사배열`을 전달하여 진짜 배열 객체를 생성하고는 했습니다. 
`ES6`에서 추가된 `from`메소드는 배열의 형태를 갖거나 `Iterable`객체를 전달받아 얕은 복사를 수행한 새로운 `Array`객체를 반환 합니다. 인자로는 3가지를 전달 받으며 첫 번째인자는 순회가능한 객체이고 
두 번째로는 해당 객체가 배열로 반환되기 전에 실행될 `map`함수 이며 마지막 인자로는 `this`를 바인딩할 객체입니다. 

#### of
```javascript
Array.of(4) // [4]
Array.of(1, 2, 3) // [1, 2, 3]

Array(5) // [, , , ,]
Array(1, 2, 3) // [1, 2, 3]
```
`Array`생성자는 여러개의 인자를 전달할 경우 배열을 생성하여 반환하지만 하나의 값만 전달하는 경우에는 비어있는 배열을 생성하여 반환합니다. `Array.of`메소드는 생성자와는 다르게 전달된 인자를 `값`으로 갖는 새로운 배열을 반환 합니다. 

```javascript
const arr = Array.of(1, 2, 3) // [1, 2, 3]
const brr = [1, 2, 3]         // [1, 2, 3]
const crr = [...'123']        // ['1', '2', '3']
``` 
그렇다면 배열 리터럴을 사용하는 것과 `Array.of`를 사용하는 것에 무슨 차이가 있을까요.   

```javascript
const Class = class extends Array {}
Class.from([1, 2, 3], v => v + 1) instanceof Class // true
Class.of(1, 2, 3) instanceof Class                 // true
```
`ES6`에서는 자바스크립트의 내장객체를 `prototype`이 아닌 `HomeObject`를 사용하여 상속받을 수 있습니다. 
`Array.of`메소드와 `Array.from`메소드를 활용하면 특정 `class`의 인스턴스로서 배열을 생성할 수 있습니다. `Array.form`의 경우에는 생성 시 사용할 `map`함수도 같이 전달할 수 있게 되어 
유사배열로 특정 인스턴스를 생성할때 유용하게 사용할 수도 있습니다. 


#### find
```javascript
Array.of(1, 2, 3).find(v => v === 3) // 3
Array.of(1, 2, 3).find(v => v === 5) // undefined
```
`ES5`까지는 배열에 있는 값을 찾기 위해서는 `반복문`으로 순회하며 해당 값을 찾으면 반환하는 로직을 매번 작성하였습니다. `Array.find`를 사용하면 인자에 전달된 `predicate`함수에서 `truthy`를 반환하는 요소 중 첫번째 요소를 반환 합니다.  


#### findIndex
```javascript
Array.of(1, 2, 3).findIndex(v => v === 3) // 2
Array.of(1, 2, 3).findIndex(v => v === 5) // -1
```
`Array.findIndex`는 인자로 전달된 `predicate`함수에서 `truthy`를 반환하는 첫번째 값의 인덱스값을 반환 합니다. 만약 일치하는 값이 없는 경우에는 `-1`을 반환 합니다. 

```javascript
[NaN].indexOf(NaN) // -1
Array.of(NaN).findIndex(v => Number.isNaN(v)) // 0
```
얼핏 보면 `Array.findIndex`는 `Array.indexOf`와 동일한 기능을 하는 것 처럼 보이지만 사실은 다릅니다. 인자로 `predicate`함수를 전달받기 때문입니다. 
자바스크립트의 `NaN`은 `Not a Number`로서 `이항연산`을 수행하는경우 `좌항`이나 `우항`에 `NaN`이 들어오면 무조건 `false`를 반환하도록 구현되어 있습니다. 
그렇기 때문에 인자를 전달받아서 동작하는 `Array.indexOf`로는 `NaN`을 찾을 수 없었습니다. `ES6`에 도입된 `Number.isNaN`함수와 `Array.findIndex`를 사용하여 `NaN`을 찾을 수 있게 되었습니다. 
 
#### fill
````javascript
Array(5).fill('*') // ["*", "*", "*", "*", "*"]
Array.of(1, 2, 3, 4, 5).fill('*') // ["*", "*", "*", "*", "*"]
Array.of(1, 2, 3, 4, 5).fill('*', 0, 4) // ["*", "*", "*", "*", 5]
````
`Array.fill`은 배열의 값을 인자로 주어진 값으로 모두 대체 합니다. 1개의 인자만 전달하게 되면 해당 값으로 배열을 채우게 되지만 `startIndex`와 `endIndex`를 전달하게 되면 어디서부터 어디까지 채울 것인지를 지정할 수 있게 됩니다. 


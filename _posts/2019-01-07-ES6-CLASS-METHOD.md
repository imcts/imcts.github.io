---
layout: post
title: ES6 - CLASS
date: 2019-01-07 00:00:00
image: '/assets/img/'
main-class: 'js'
description: 'ES6 Basic Study'
tags: 
- javascript
- method
- extends

introduction: '- javascript class -'
---

### Class
`ES6`에서는 새로운 `class`문법을 지원하여 `prototype` 기반의 상속보다 간단하게 기술합니다. 그로 인해 객체를 생성하고 객체의 관계를 정의하는데에 훨씬 단순하고 명확한 문법을 제공 하게 되었습니다.  

#### Class 선언문
```javascript
class Class {
  method () {}
}
typeof Class // function
```

#### Class 표현식
```javascript
const Class = class {}
typeof Class // function
```
`class`는 함수의 일종으로 분류 되어 집니다. 자바스크립트에서의 함수는 1급객체로서 선언문으로표현하거나 표현식으로 표시할 수 있듯이 클래스 또한 선언문과 표현식을 지원합니다.

```javascript
class Class {}
Class = 123
new Class() // Class is not a constructor.
```
클래스를 선언할때에는 `표현식`을 사용하길 권장합니다. `선언문`으로 선언되어진 클래스는 `let`으로 선언되므로 선언 이후 덮어씌워질 가능성이 존재하며 자바스크립트의 함수는 `문`이 아닌 `식`으로 수렴하기 때문에 
변수에 할당하여 사용하는 것이 올바르기 때문입니다. 

### Constructor
```javascript
function F (a) {
  this.a = a
}

F(3)
console.log(window.a) // 3
console.log(new F(3)) // F {a: 3}
```
자바스크립트에서의 함수는 여러가지 기능을 할 수 있습니다. `new`연산자를 만나게 하여 객체로 생성할 수도 있고, 함수 그 자체로도 사용할 수 있습니다. 
그로인해 함수가 어떤 기능을 하게 될 것인지를 알아차리기 어려운 경우도 많습니다. 더군다나 `this`바인딩으로 인해 함수로 인해 호출한 객체의 `property`로 값이 할당되는 경우도 심심찮게 발생하곤 합니다. 


```javascript
class Class {}
Class(3) // Class constructor Class cannot be invoked without 'new'
``` 
`class`문법에서는 `new`연산자를 사용하지 않으면 객체를 인스턴스화 할 수 없도록 구성되어 있습니다. 이로 인해 객체가 아는 것과 하는 것을 정의하고, 그 인스턴스를 생성하기 위한 `class`의 용법으로만 사용할 수 있게 되었습니다. 


```javascript
const Class = class {
  constructor () {}
  constructor () {}
}
// Uncaught SyntaxError: A class may only have one constructor
```
`constructor`는 해당 class body 내부에서 반드시 한 번만 선언되어져야 하며 메소드와 함께 사용시 그 순서는 상관 없습니다. `class` 최하단에 위치해도 됩니다.

```javascript
const Class = class {
  constructor (a) {
    this._a = a
  }
}
const a = new Class(1)
const b = new a.constructor(123) // Class {_a: 123}

// ERROR
a.constructor() // Class constructor Class cannot be invoked without 'new'
```
`class`에 선언된 `constructor`는 클래스를 가르키므로 직접 호출할 수 없고 `new`연산자와 함께 호출해야 합니다. 생성자 메소드에서 객체가 생성될때 제공되는 `this`객체에 값을 할당할 경우 클래스의 `property`에 값을 할당할 수 있게 됩니다. 

#### new.target
```javascript
const Class = class {
  constructor () {
    console.log(new.target === Class) 
  }
}

new Class() // true


function f () {
  console.log(new.target)
}

f() // undefined
```
`ES6`에서는 `function`이 호출될때 엔진에서 자동으로 `new.target`을 전달 합니다. 이 값은 일반 함수로서 호출될 경우에는 `undefined`를 갖지만, `new`연산자를 사용하여 호출 될 경우 해당 클래스 또는 함수를 가르키게 됩니다. 

````javascript
const Class = function () {
  if (new.target !== Class) {
    throw new TypeError('Class is not constructor.')
  }
}
````
`ES5`이전 코드에서는 생성자로서 함수를 사용하고자 한다면 위처럼 변경할 수 있습니다.



### Methods Definition

#### ES5
````javascript
function Class (a) {
  this.a = a
}
Class.prototype.getA = function () {
  return this.a
}
Class.newInstance = function (a) {
  return new Class(a)
}

var a = new Class(1)
var a1 = Class.newInstance(1)
````
`ES5`이전까지는 함수를 사용하여 객체를 정의하고 메소드를 정의하였습니다. 함수의 `prototype`에 정의하면 모든 인스턴스가 공통으로 사용하는 메소드로 정의되었고, 함수의 `property`에 정의하면 `static` 메소드처럼 함수명으로 접근하여 사용할 수 있었죠.

#### ES6
```javascript
const Class = class {
  static newInstance (a) {
    return new Class(a)    
  }
  
  constructor (a) {
    this._a = a
  }
  
  getA () {
    return this._a
  }
}

const a = new Class(1)
const a1 = Class.newInstance(1)

a.newInstance() // a.newInstance is not a function
```
`ES6`부터는 `class`문법을 사용하여 메소드를 정의합니다. 메소드는 함수를 선언하는 것처럼 클래스 바디 안쪽에 선언하면 되며, 메소드명과 매개변수를 받는 곳, 메소드 바디로 구성되어 있습니다. 메소드 명 앞에 예약어인 `static`을 선언하면 해당 메소드는 정적 메소드로서 `class`명으로 접근하여 
사용할 수 있습니다. 정적 메소드는 클래스변수에 직접 할당되는 메소드이기 때문에 인스턴스에서는 접근할 수 없습니다.


```javascript
const Class = class {
  ;
  method () {}, // Unexpected token ,
}
```
클래스의 바디에서 `;`은 사용할 수 있습니다. 추후 스펙에 관련되어 허용된 문법인 것 같습니다만, 아직은 확인할 수 없습니다. 그에 반해 메소드뒤에 `,`연산자는 사용할 수 없습니다. 


### Block Scope & Hoisting
```javascript
function f () {
  new Class()
}

const Class = class {}

f()
```
앞전 포스팅에서 설명 했듯이 클래스 또한 [`호이스팅`](https://imcts.github.io/ES6-LET-CONST-TDZ/)을 지원하지 않습니다. 그렇기 때문에 당연히 [`TDZ`](https://imcts.github.io/ES6-LET-CONST-TDZ/)도 동일하게 유지 됩니다. 

```javascript
const Class = class Me {
  method () {
    return Me.name
  }
}

Me.name // Me is not defined
MyClass.name // Class
new Class().method() // Me
```
`표현식`으로 클래스를 정의하면 뒤쪽의 `선언문`에서 작성한 클래스명은 변수로 생성되지 않습니다. 그렇기 때문에 `Me`의 `name`을 찾더라도 외부 스코프에서는 참조할 수가 없게 됩니다. 
하지만 `closure`로 인하여 클래스 내부에서 `Me`객체를 참조하여 `name`을 찾게 되면 접근할 수 있게 됩니다. 

### Derived classes 
```javascript
const Parent = class {
  constructor (a) {
    this._a = a
  }
  
  say () {
    console.log('parent.')
  }
}

const Child = class extends Parent {
  constructor (a) {
    super(a)
  }
  
  say () {
    console.log('child.')
  }
}

const child = new Child(123)
child.say() // child.
```
[`ES5이전의 자바스크립트 상속`](https://imcts.github.io/javascript-extends/)은 해당 포스팅에 정리해 두었습니다.  위 포스팅에서 알 수 있듯이 꽤나 복잡한 과정들을 걸쳐서 상속을 구현해 왔었는데요. 이는 자바스크립트가 `prototype`을 활용한 `OOP`를 지원하고 있기 때문입니다. 
`ES6`의 `class`문법에서는 `extends`예약어를 사용하여 클래스를 상속할 수 있습니다. 특정 클래스를 상속받게 되면 그 클래스는 `파생클래스`라고 명명 되어집니다. 자바스크립트는 `OOP`를 지원하는 언어 이므로 `내적동질성`과 `대체가능성`에 따라 `overridding`과 `polymorphism`을 지원 합니다. 

#### super & HomeObject
```javascript
const ParentA = class {
  say () {
    console.log('parent A.')
  }
}

const ParentB = class {
  say () {
    console.log('parent B')
  }
}

const ChildA = class extends ParentA {
  tell () {
    super.say()
  }
}

const ChildB = class extends ParentB {
  tell () {
    super.say()
  }
}
ChildB.prototype.tell = ParentA.prototype.say
new ChildB().tell() // parent A.
```
`class`문에서 `super`에 접근할 수 있도록 하는 것은 [`[[HomeObject]]`](http://2ality.com/2015/02/es6-classes-final.html) 덕분 입니다. 이는 함수의 프로토타입과는 다르게 class문에서 메소드가 `정의`되는 시점에 확정되고 변경할 수 없습니다. 
`HomeObject`는 상속받은 부모의 연결을 참조하는 `super`키워드를 사용할때 접근되는 객체입니다. 그렇기 떄문에 `ChildB`의 `tell`메소드를 호출하여 `super`에 접근했을때 `ParentB`의 `tell()`메소드가 호출되는것이 아니라, `ParentA`클래스의 `tell()`메소드가 
호출 되게 되는 것 입니다. 이 때문에 `ES6`에서는 메소드를 빌려 사용하거나 믹스인할 수 없습니다. `HomeObject`는 반드시 `class`문법에서 `method`를 정의하는 시점에 생성되므로 `화살표함수`나 `function`에서는 생성되지 않습니다.

#### Extends chaining
```javascript
const Class = class A extends class B extends class C {
  constructor () {
    // C
  }
} {
  constructor () {
    super()
    // B
  } 
} {
  constructor () {
    super()
    // A
  }
}
```
상속 체이닝이라고 불리우는 이 문법은 클래스를 선언함과 동시에 상속하는 문법 입니다. 이를 활용하면 클래스를 역할별로 분리하여 선언하고 추후에 각 역할에 맞게 분리하기 쉽도록 작성할 수 있습니다.

````javascript
const Class = class extends class extends class {
  constructor () {
    // C
  }
} {
  constructor () {
    super()
    // B
  } 
} {
  constructor () {
    super()
    // A
  }
}
````
클래스 표현법에 따라 클래스명은 생략할 수 있습니다. 

### Native Classes
`class` 문법은 여러가지 `Native Class`객체 또한 상속받을 수 있습니다.

#### Collections
```javascript
const A = class extends Array {
  constructor (...args) {
    super(...args)
  }
  
  pop () {
    throw new Error('This method is not allowed to use.')
  }
  
  shift () {
    throw new Error('This method is not allowed to use.')
  }
  
  map (f) {
    
    // before doing.
    
    return super.map(f)
  }
}

const arr = new A(1, 2, 3)

a.shift() // This method is not allowed to use.
a.pop()   // This method is not allowed to use.
```
자바스크립트 내장객체인 `Array`를 상속한 클래스를 만들고, `pop`, `shift`메소드를 사용하지 못하도록 구현 하였습니다. 물론 자바스크립트의 `Array`는 여타 정적 언어의 배열처럼 동작하지 않고 
일종의 `Linked HashMap`처럼 동작하므로 `arr.length`의 값을 `0`으로 변경하는 것만으로 초기화 되기는 하지만, 해당 객체의 메소드를 외부에서 사용하지 못하게 할 것이라는 의도는 표현할 수 있습니다. 
뿐만 아니라 특정 메소드를 `override`하여 메소드가 호출되기 전에 특수한 처리 등을 할 수 있게 되기도 합니다. 

````javascript
const T = class {}

const S = class extends Set {
  constructor (...args) {
    super(...args)
  }
  
  add () {
    throw new Error('This method is not allowed to use.')
  }
  
  has () {
    throw new Error('This method is not allowed to use.')
  }
  
  delete () {
    throw new Error('This method is not allowed to use.')
  }
  
  addT (t) {
    super.add(t)
  }
}
new S().add()         // This method is not allowed to use. 
new S().addT(new T())
````
`ES6`에 추가된 `Set`은 자동으로 중복된 객체를 저장하지 않으므로 별도의 중복 체크 여부없이 데이터를 저장할때 사용할 수 있습니다. 그 뿐 아니라 `내적동질성`에 의하여 원래 외부로 노출되어야 하는 메소드는 사용하지 못하도록 하고 
`S`에서는 `super`를 사용하여 부모의 메소드에 접근하게 할 수 있습니다. 

#### Error
```javascript
const E = class extends Error {
  constructor (...args) {
    super(...args)
  }
}

e = new E('My error') // My error
```
자바스크립트의 [`에러타입`](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Error)은 이미 8가지가 존재합니다. 그러나 이 외에도 별도의 에러 타입을 지정하면 유용할때가 있습니다. 

```javascript
const Error404 = class extends Error {
  constructor (...agrs) {
    super(...args)
    this._sendLog()
  }
  
  _sendLog () {
    // Send log.
  }
}
```
흔히 사용하는 `ajax`통신시에 실패했을 경우 `Error`인스턴스를 전달 받게 되는데, 그 안에는 여러가지 상태값들이 존재하게 됩니다. 해당 에러를 기준으로 여러곳의 화면에서는 동시 다발적으로 변화가 발생해야 할 때가 많습니다. 
단적인 예로 화면을 에러 화면으로 교체한다거나, 에러 로그를 남긴 뒤 사용자에게 메시지 팝업을 노출한다거나 하는 등의 것들이죠. 에러의 종류는 굉장히 많을 수 있고 에러를 판단하는 방법 중 가장 흔한 방법은 문자열 비교 이므로 
변경되어져야 하는 부분에서는 `e.message`를 가지고 비교하곤 합니다. 이럴때 상황에 맞는 에러 객체를 생성하여 `instanceof`로 에러의 형을 판단할 수 있다면 공통된 에러처리를 분리 할 수도 있습니다. 

### Private Patterns
```javascript
var Class = (function () {
  var CLASSES = {}
  var index = 0
  
  function Class (value) {
    this.id = Class.name + index++
    CLASSES[this] = {
      value: value
    }
  }
  
  Object.assign(Class.prototype, {
    toString: function () {
      return this.id
    },
    
    getValue () {
      return CLASSES[this].value
    }
  })
  
  return Class
})()

new Class(123).getValue() // 123
new Class(456).getValue() // 456
```
`ES5`까지는 클래스에서 `private`변수를 사용하기 위해서는 매번 생성되는 객체마다 `id`와 `index`를 조합하여 객체에 저장하는 방식으로 사용하곤 했었습니다. 즉시 실행 함수로 
클래스 선언문을 감싸고 그 안에서 클래스를 선언하고 `closure`영역에 객체를 하나 두어 매번 생성되는 인스턴스를 저장하는 방법이죠. 이렇게 되면 외부에서는 해당 객체의 내부 프로퍼티에 접근할 수가 없게 되고 
클래스는 내부 프로퍼티들을 `은닉화` 할 수 있습니다. 

```javascript
const Class = (() => {
  const PRIVATE = Symbol()
  
  return class {
    constructor (value) {
      this[PRIVATE] = {value}
    }
    
    get value () {
      return this[PRIVATE].value
    }
    
    set value (value) {
      const PRIVATE = this[PRIVATE]
      if (PRIVATE.value !== value) {
        PRIVATE.value = value
      }
    }
  }
})()

new Class(123).value // 123
new Class(456).value // 456
```
`ES6`의 [`Symbol`](https://imcts.github.io/ES6-SYMBOL/)과 클래스 구문을 활용하면 좀 더 편리하게 `private`를 구현할 수 있습니다. 하지만 `Symbol`을 사용하기 때문에 
`console.log`를 사용하여 객체를 들여다 보면 프로퍼티가 보일 뿐더러 `Reflect.ownKeys`메소드를 사용하면 해당 인스턴스의 `Symbol`값 마저도 구할 수 있기 때문에 정확한 `은닉화`라고 보기는 어렵습니다. 

```javascript
const Class = (() => {
  const CLASSES = new Map()
  
  return class {
    constructor (value) {
      CLASSES.set(this, {value})
    }
    
    get value () {
      return CLASSES.get(this).value
    }
    
    set value (value) {
      const PRIVATE = CLASSES.get(this)
      if (PRIVATE.value !== value) {
        PRIVATE.value = value
      }
    }
  }
})()

new Class(123).value
```  
`ES6`의 `Map`은 그 어떤 값이라도 `key`로 지정할 수 있는 표현력이 좋은 자료구조이므로 객체 인스턴스의 주소값 또한 `key`로 사용할 수 있습니다. 
`Map`을 사용하면 클래스 인스턴스의 `은닉화`를 확실하게 할 수 있게 됩니다. `Map`이 아닌 `WeekMap`을 사용한다면 
해당 객체의 인스턴스가 그 어떤 객체도 참조하지 않을때(`GC대상일때`) `CLASSES`에서도 제거되므로 더 편리하게 사용할 수 있습니다. 


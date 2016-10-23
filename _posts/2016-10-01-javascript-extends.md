---
layout: post
title: 자바스크립트 상속에 관하여. 
categories: [JavaScript]
tags: [상속, extends]
comments: true
share: true
---

**자바스크립트의 상속**을 정리해보겠습니다.

예전에 정리해두었던건데, 영 마구잡이식이어서 블로그도 새로 만들었고 되새김질도 하는 김에 정리해봅니다. 

시작해볼까요 :)




### - 기본적인 상속



```js
function Parent(name) {
    this.name = name || 'Parent';
}

Parent.prototype.say = function() {
    return this.name;
}


function Child() {}
Child.prototype = new Parent();

var c = new Child();

console.log(c);

c.name = 'Test';


console.log(c.name); //Test

delete c.name; //ok.

console.log(c.name); //Parent
```

실행 결과를 보게되면 Child 함수에는 자신의 프로토타입 프로퍼티를 가리키는 __proto__ 변수외에는 아무것도 없습니다.

__proto__를 열어보게되면 c.__proto__ -> 안에는 Parent.__proto__에 할당되어있는 값이 할당되는데 그 값은 다음과 같습니다.

```js
{
 name : 'Parent',
 __proto__ : {
     constructor : function(name) {
         this.name = name || 'Parent';
     },
     say : function() {
         return this.name;
     }
 }
}
```

그렇기 때문에 기본적으로 c.name을 검색했을때에는 연쇄적인 체이닝 검색이 일어나게 되는거지요. 

이 패턴의 방식은 this로 지정된 Child함수에서 매번 name값을 찾으려면 c.__proto__.name 을 찾게 되고

c.say() 를 하려 한다면, c.__proto__.__proto__.say(); 를 하게 된다는 점입니다. 

만약 say()를 못 찾게 되면 최상단 오브젝트까지 가서 찾게 되는 거지요.


또한 c.name 을 하게 되면 name 객체 자체 오브젝트에 값이 할당되므로, name = Test로 할당되지만, 그 객체값이 사라지게 되면, 

다시 __proto__ 값을 참조하게 되며 결국은 부모객체중의 name 값을 가져오게 됩니다.
 

그리고 또 한가지 위험한 단점이 존재하게 되는데요.


```js
function Parent(name) {
    this.name = name || 'Parent';
    this.arr = [1, 2];
}

Parent.prototype.say = function() {
    return this.name;
}


var p = new Parent();

function Child() {}
Child.prototype = p;


var c = new Child();

c.arr.push(3);

console.log(c.arr, p.arr); // 두개가 같은것을 바라보게 된다.
```

결국 Prototype Chaning을 사용한 상속은 단순히 부모가 가지고있는 값을 참조할 수 있다는 점에서 굉장한 위험을 동반할 수 있게 됩니다.

하나의 부모객체가 인스턴스화 된 후, 해당 객체가 여러개의 자식객체에게 상속을 해 주었고 여러개의 자식객체가 하나의 부모객체의 값을 참조하게 된다면 그 이슈는 어마어마하게 되겠죠. 





### - 생성자 빌려쓰기의 다중상속

위에서 언급했듯이, 부모 객체를 자식의 프로토타입에 덮어씌우는 상속은 꽤나 많은 문제점을 일으킬 수 있습니다. 

그래서 다른 방법을 찾게 된것이 바로 생성자 빌려쓰기 입니다. 

자바스크립트의 함수는 생성자 함수로 동작하게 될때 여러가지 재미있는 행동을 하게 되는데요.

```js
function Constructor() {
    this.test = 3;
}

const test = new Test();

console.log(test.test); //3
```

이게 가능한 이유는 실제 자바스크립트는 이렇게 동작하기 때문입니다.


```js
function Constructor() {
    var this = undefined; //보이지는 않지만 this를 생성한 후 undefined를 할당한다.
    
    this.test = 3;
    
    return this; //return 되는 값이 없다면 암묵적으로 this를 리턴한다.
}
```


이걸 이용한다면 우리는 재미있는 동작을 하게 만들 수 있게 되요 ! 

함수를 생성자로서만 동작하게 만드는 것이지요.


```js
function Parent(name) {
    this.name = name || 'Parent';
    this.arr = [1, 2];
}

Parent.prototype.say = function() {
    return this.name;
}


function Child(name) {
    Parent.apply(this, arguments);
}


var c = new Child('Child Name');

console.log(c.name);
```

이렇게 함으로써 자식객체는 Parent를 단순히 함수로 사용하게 되는 것이기 때문에 참조에 의한 생성이 이루어지지 않게 되요 :) 

물론, 부모의 prototype에 선언되어있는 프로퍼티와는 전혀 상관없이 부모의 참조 변수값만 할당 받는 방식이기 때문에 경우에 따라서 잘 사용해야 하겠지요.
 
 
```js
function Parent(name) {
    this.name = name || 'Parent';
    this.arr = [1, 2];
}

Parent.prototype.say = function() {
    return this.name;
}

function Parent2(name) {
    this.name = name || 'Parent2';
    this.brr = [3, 4];
}


function Child(name) {
    Parent.apply(this, arguments);
    Parent2.apply(this, arguments);
}


var c = new Child('Child Name');

console.log(c.name); //Child Name
```

또한 이런 식의 다중상속또한 가능하게 됩니다. 


그런데 이건 완전한 상속이 아니게 됩니다. 부모의 say 함수는 상속받지 못하였거든요.. 


그러면 부모의 함수마저도 상속받으려면 어떻게 하면 좋을까요 ?? 



```js
function Parent(name) {
    this.name = name || 'Parent';
    this.arr = [1, 2];
}

Parent.prototype.say = function() {
    return this.name;
}

function Parent2(name) {
    this.name = name || 'Parent2';
    this.brr = [3, 4];
}

function Child(name) {
    Parent.apply(this, arguments);
    Parent2.apply(this, arguments);
}

Child.prototype = new Parent();
Child.prototype = new Parent2();
```


이처럼 하게 되면, 자식은 자신만의 변수를 할당하게 되고, 참조 또한 모든 참조를 하게 됩니다.

하지만 생성자에서 한번, 프로토타입에서 한번 총 2번의 부모 생성자를 호출하게 되는 불편함이 존재하며 결국 부모를 생성하여 프로토타입을 가져오게 되어 
 
애초에 문제를 재기하였던 프로토타입 체이닝이 이어지게 됩니다. 


그렇다면, 부모생성자를 호출하지 않고도 사용하는 방법이란 이런것도 있지 않을까요 ?  


```js
function Parent(name) {
    this.name = name || 'Parent';
    this.arr = [1, 2];
}

Parent.prototype.say = function() {
    return this.name;
}

function Parent2(name) {
    this.name = name || 'Parent2';
    this.brr = [3, 4];
}

Parent2.prototype = Parent.prototype;

Parent2.prototype.say2 = function() {
    return this.name;
}

function Child(name) {
    Parent.apply(this, arguments);
    Parent2.apply(this, arguments);
}


Child.prototype = Parent2.prototype;

```

하지만, 이렇게 하면 모든 프로토타입은 공유될 수 있을지 모르나 다중 프로토타입을 구현하려면 굉장히 복잡하게 될 뿐더러
 
모두가 하나의 프로토타입만 바라보게 되기 때문에 위험해집니다.  

어느 한군데에서 변경하게 되면 전부 망가질 가능성이 있기 때문이죠 T ^T.
 
 

### - Proxy 타입의 완벽한 상속 

```js
function Parent(name) {
    this.name = name || 'Parent';
    this.arr = [1, 2];
}

Parent.prototype.say = function() {
    console.log('say');
    return this.name;
}

function Child() {
    console.log('생성대따아!!');
    Parent.apply(this, arguments);
}


function Proxy() {};

Proxy.prototype = Parent.prototype;

Child.prototype = new Proxy();

Child.prototype.constructor = Child;

Proxy.prototype = null;

var c = new Child();

console.log(c);
```

자 어떤가요 ? 이해가 가셨나요 ? 

1. Proxy 함수에 부모의 prototype을 복제합니다.
2. 자식에게 Proxy의 프h로토타입을 상속해 줍니다.
3. 자식의 생성자 함수를 Child함수로 지정해 줍니다. 
4. Proxy 의 prototype을 삭제함으로 체인을 끊어 줍니다. (이미 new Proxy()가 되어 메모리에 올라가 있으므로 자식의 prototype은 전혀 지장을 받지 않습니다.)
5. 자식을 인스턴스화합니다. (말 그대로 완벽한 상속이 이루어졌습니다.)



자 이제 이걸 함수화 시켜볼까요 ??

```js
function Parent(name) {
    this.name = name || 'Parent';
    this.arr = [1, 2];
}

Parent.prototype.say = function() {
    console.log('say');
    return this.name;
}

function Child() {
    console.log('생성돼떠!');
    Parent.apply(this, arguments);
}


var inherit = (function() {
    var Proxy = function() {};

    return function(Child, Parent) {
        Proxy.prototype = Parent.prototype;
        Child.prototype = new Proxy();
        Child.prototype.constructor = Child;
        Proxy.prototype = null;
    }
}());


inherit(Child, Parent);

var c = new Child();

console.log(c);
```
 


Child는 부모의 변수값만 복사해왔고, constructor는 자식의 값으로 지정되어 있으며 __proto__ 의 값을 확인해보면 Proxy가 물려준 부모의 prototype이 입력되어 있습니다.

이상 상속의 정리를 마칩니다. 


ES6의 CLASS에 대해서 아주 잘 정리된 곳이 있으니 공유합니다. :) 

[고무곰님의 ES6의 CLASS에 대하여](https://gomugom.github.io/es6/2016/10/04/is-class-only-a-syntactic-sugar)
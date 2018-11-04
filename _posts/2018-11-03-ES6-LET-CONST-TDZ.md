---
layout: post
title: ES6 - INTRODUCE, LET, CONST
date: 2018-11-03 20:00
image: '/assets/img/'
main-class: 'js'
description: 'ES6 Basic Study'
tags: 
- javascript
- ES6 Introduce
- TDZ
- let
- const

introduction: '- ES6 Basic Study -'
---

### 1. ECMAScript
**ECMA**란 European Computer Manufactures Association에서 출발하여 **1994**년에 정보 통신 기술 표준 연구회의 의미로서 변경된 기관명 입니다. 
그 결과 더이상 ECMA는 단어의 앞글자를 따서 만들어진 글자가 아닌 그 자체로의 의미를 가지게 됩니다. 
이 협회는 다양한 언어나 규격에 대한 표준을 정의하게 되는데 그 중 하나가 ECMA-262 입니다.  


|  판  |  출판일  |                특징                  |
|:---:|:-----------:|:-----------------------------------|
| 1   |1997년 6월    | 초판                                 |          
| 2   |1998년 6월    | ISO/IEC 16262 국제 표준과 완전히 동일한 규격을 적용|          
| 3   |1999년 12월   | 정규 표현식, 문자열 처리, 제어문, 예외처리, 오류 정의, 수치형 출력 포맷팅등 언어로서의 <br>기능 추가|          
| 4   |    -        | 정치적 차이 및 이슈 및 너무 급격한 변화에 대해 반대가 심하여 폐기되었다. <br> 이때 만들어진 스펙은 5판의 기본이 되었다.|          
| 5   |2009년 12월   | 더 정확한 오류검사 지원, "strict mode"지원, Object.define 지원 등을 함으로써 read only <br>property등을 만들 수 있도록 변경되었다.|                    
| 6   |2015년 6월    | Class, Module등의 기능을 지원한다. "ECMAScript Harmony", "ES6 Harmony", <br>"ECMAScript 2015"등으로 불리워진다.|
| 7   |2016년 3월    | Array.prototype.includes, 지수연산(**) 스펙을 추가|
| 8   |2017년 6월    | Async Await및 Object.entries, String.padStart, String.padEnd 추가|

3판 출시 이후 5판 출시까지 10년이 걸렸습니다. 그 후 6판까지 다시 7년이라는 시간이 지나는 바람에 6판이 출시될때에는 많은 변화가 있었는데요. 
앞으로 ECMA측은 매년 새로운 표준을 정의 하며 두번 다시 6판처럼 많은 변화가 일어날 일은 없을거라고 하였습니다. 또한 자바스크립트는 하위버전의 모든것을 그대로 유지하는 것을 약속 했으니 
기존 코드로 작성되어 있던 모든 브라우저도 문제 없이 동작하겠네요.


### 2. 호이스팅(Hoisting)
자바스크립트의 호이스팅이란 함수 선언식으로 선언된 함수와 변수를 함수 스코프의 최상단으로 끌어 올리는 것을 말 합니다.  
즉, `var`로 선언된 변수나 `function f () {}`로 선언된 함수는 현재 스코프의 최상단으로 끌어 올려 진다는 이야기 입니다.  

#### 변수의 호이스팅
```javascript
    console.log(a); // undefined
    
    var a = 1; // global scope
```
먼저 변수의 호이스팅을 볼까요? `global scope`에 `var a`가 선언되기 전에 a를 호출을 하면 `undefined`가 출력 된다는 것이지요. 
형 안전언어 (safe language)를 사용하던 개발자분들에게는 퍽이나 당황스러운 상황인 거죠. 변수를 선언하기 전에 사용하면 값이 할당되어 있다는 것은 꽤나 충격적인 일이니까요.  
<br> 

```javascript
    var a = undefined;
    
    console.log(a); // undefined
    
    a = 1; // global scope
```
처음의 코드의 실행 부분이 `undefined`가 출력되었던 이유는 다음과 같습니다. 자바스크립트는 현재 스코프의 모든 변수들을 읽어들여 최상단에서 해당 변수들을 선언하고 `undefined`를 할당하기 때문이죠. 
이런 동작은 자바스크립트 개발자들에게는 너무나 당연한 동작인 반면 처음 자바스크립트를 접하는 개발자들의 경우에는 당황하게 되는 요소기도 합니다.   

#### 함수의 호이스팅
다음은 함수의 호이스팅도 한번 볼까요?

```javascript
    var f = new F()
    
    function F () {}
```
함수또한 변수와 마찬가지로 함수 선언식으로 구현된 함수라면 현재 스코프의 최상단으로 끌어 올려지게 됩니다. 변수의 호이스팅을 보고 오니 별로 어렵진 않죠?  

```javascript
    var f = new F(); // TypeError: F is not a constructor

    var F = function F () {};
```
하지만 이렇게 작성하면 `TypeError`를 출력하게 되니 조심하셔야 해요. 자바스크립트에서 함수는 값으로 전달될 수 있는 일급객체로서 변수에 할당될 수 있기 때문인데요.  
위처럼 함수를 변수에 할당하게 되면 함수는 값으로 처리되어, 호이스팅 되지 않기 때문입니다.

```javascript
    var F = undefined;

    var f = new F(); // TypeError: F is not a constructor
    F = function F () {};
``` 
이렇게 해석되기 때문이죠. 


### 3. var 선언식의 문제점

#### 중복 선언

기존 변수 선언식 `var`의 문제점은 뭘까요? 첫번째로는 중복으로 선언이 가능하다는 점 입니다. 
```javascript
    var a = 12345;
    console.log(a); // 12345
    
    var a = 56789;
    console.log(a); // 56789
```
위 코드와 같이 같은 스코프 내에 있음에도 불구하고 지속적으로 같은 변수를 선언할 수 있게 되는거죠. `var` 변수 선언식으로 작성 되었기 때문에 호이스팅되어 동작에 문제가 없다는 것은 
위의 `호이스팅`으로 인해 알게 되었지만, 자바스크립트를 능숙하게 사용하지 않는 개발자가 접했을때에는 충분히 당황하게 될만한 코드임에는 분명 합니다. 추후에 하나의 코드를 지워야할때 어떤 var를 지워야할지도 
알 수 없게 될 수 있겠네요. 

#### 함수 스코프
두번째로는 변수의 스코프가 함수 스코프를 참조 한다는 것입니다.  

````javascript
    function f () {
        if (true) {
           var color = "blue";
        }
        for (var i = 0; i < 10; i++) {}

        console.log(color); // blue
        console.log(i) // 10 
    }
````
조건문 안에서 선언된 변수가 조건문의 블록스코프 밖에서 사용되어지고 반복문의 초기값에 선언된 변수가 반복문의 블록스코프를 벗어난 후에도 사용될 수 있다는 것이죠.
이로 인해 기존의 자바스크립트는 백엔드 개발자 분들에게는 두려움의 세계였던 것이기도 합니다. 실제로 잘 모르는 상태로 접근한다면 중복 선언된 변수를 사용하거나 없어졌다고 생각했던 변수가 함수 스코프에 남아 있기 때문에 
오류를 발생시키는 등의 일도 빈번했었죠. 물론 이 외에도 var를 붙이지 않고 값을 사용하면 window에 값이 적용되는 등 버그가 있는등 수없이 많은 문제가 재기되어 왔었습니다. 

### 4. const, let

그렇다면 `ES6`에 추가된 많은 기능 중 오늘 정리할 `let`과 `const`의 사용법을 먼저 알아볼까요?

```javascript
    // 선언
    let value;

    // 할당
    value = 'variable';
    
    // 재할당
    value = 'variable2';
    
    // 선언 및 할당
    const finalValue = 'finalValue';
    
    // 선언
    const finalValue1; // Uncaught SyntaxError: Missing initializer in const declaration
```
`let`의 경우에는 기존의 `var` 선언식처럼 선언문과 할당문을 나누어서 사용할 수 있으며, 값의 재할당도 얼마든지 가능 합니다. 정말 변하는 값을 담는 수인 변수의 역할로 사용할 수 있습니다.  
`const`의 경우에는 상수이기 때문에 선언과 동시에 값을 할당해야 하며 한번 값을 한번하게 되면 두번 다시 변경할 수 없습니다.  


#### 중복선언 불가
`var`표현식의 문제점이었던 중복 선언에는 어떤지 한번 볼까요 ?

```javascript
    let value;

    let value; // Uncaught SyntaxError: Identifier 'value' has already been declared
    
    const value = 'value'; // Uncaught SyntaxError: Identifier 'value' has already been declared
```
보다시피 동일한 스코프에서 중복하여 같은 변수를 선언하개 되면, 중복 선언 에러를 발생시키며 프로그램이 종료 됩니다. 이는 `let`과 `const`모두 동일합니다.  
즉, `let`또는 `const`로 선언된 변수가 있다면 또 다시 같은 변수를 선언할시 무조건 중복 선언 에러를 발생시킵니다. 

#### 블록 스코프
`let`과 `const`는 함수 스코프가 아닌 블록 스코프를 변수의 유효 범위로 생성 합니다. 

```javascript
    let value = 1;

    if (true) {
      let value = 2;
      console.log(value); // 2
    }
    console.log(value); // 1
    
    for (let i = 0; i < 10; i++) {
      let value2 = 3;
    }
    console.log(i); // Chrome: 10
    console.log(i); // Safari, Firefox, Opera : ReferenceError: i is not defined
    console.log(value2); // value2 is not defined
```
`let`과 `const`는 블록 스코프 안에서 사용되는 경우 해당 블록에 대한 별도의 정적 스코프를 생성 합니다. 
그로인해 중복 선언의 개념이 아닌 새로운 스코프에 변수를 선언하는 개념으로 생각하면 됩니다. 그렇기 때문에 조건문 안에서 출력된 `value`는 조건문 밖에서 선언된 `value`와 중복 선언에 대한 오류를 발생시키지 않고 
상위 변수를 가리는(shading) 역할을 수행하게 됩니다. 마찬가지로 반복문의 블록 스코프 안에서 선언된 `value2`는 블록 스코프 밖에서 사용되는 경우 비선언 에러를 발생시키게 됩니다.  
재미있는 것은 반복문의 초기값 영역에서 선언된 `let i`의 경우 현재 시간 크롬에서는 에러를 발생시키지 않고 정상적으로 10을 출력하고 있다는 점이네요. **(예전에는 안됐었는데)**

#### 조건문에서의 블록 스코프
조건문에서 블록 스코프를 만들지 않고도 변수를 선언할 수 있을까요? 

```javascript
    if (true)
      const value = true; // Unexpected token const
```
`let`이나 `const`는 반드시 블록 스코프를 자신의 정적 스코프 영역으로 삼아야 하므로 조건문에 블록 스코프가 없는 경우라면 에러를 발생 시키는 것을 알 수 있습니다. 
  

#### TDZ (Temporal Dead Zone)
임시 죽음 공간이라 불리워지는 이 공간은 변수를 선언하기 직전에 호출하면 에러를 발생시키는 영역입니다.  

```javascript
    // TDZ
    console.log(value); // value is not defined // TDZ
    // TDZ
    let value = true;
```
위 코드처럼 변수가 실제로 선언되기 직전 변수를 호출하면 그 즉시 프로그램을 종료하는 영역이라고 생각하면 됩니다. 

```javascript
    const value = true;

    if (true) {
      console.log(value); // value is not defined
      const value = true;
    }
```
마찬가지로 상위에 변수가 선언되어 있더라도, 자바스크립트는 새로운 블록을 만나는 순간 새로운 블록 스코프를 생성하므로 비선언 에러를 발생시키며 프로그램을 종료 합니다.  

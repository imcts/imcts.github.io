---
layout: post
title: 자바스크립트 디자인 패턴.
date: 2016-10-02 20:00:00
image: '/assets/img/'
description: 'pattern'
main-class: 'js'
tags: 
- pattern

introduction: '- javascript pattern -'
---

**패턴에 관해서** 정리해 볼까요 ? 


### - SingleTon Pattern

**싱글톤 패턴**이란 전역적으로 단 하나의 객체만을 두고 사용하는 방식을 말합니다.

```js
var obj = {};
var obj2 = {};

console.log(obj === obj2); //false 
console.log(obj == obj2); //false




function Single() {

    var instance = this;

    this.name = 'test';

    Single = function() {
        return instance;
    }

    return instance;
}


var s = new Single();
var s1 = new Single();

console.log(s === s1); // true

```

자바스크립트는 이미 객체 그 자체만으로도 싱글톤 입니다.

그런데 왜 싱글톤을 사용하느냐면 함수가 일급 객체가 아닌 정적이고 엄격한 자료형 언어에서 설계상의 문제를 우회하기 위해 고안해 낸 이론적인 해결책을 자바스크립트로 구현해서 사용한다고 생각하시면 됩니다.

말이 좀 어려웁지만.. 음.... 공부한다고 생각하면 된다는 뜻이겠지요 ㅎ! 




어쨌든 싱글톤 패턴은 위처럼 사용하면 아무 문제없이 작동하지만, prototype을 사용함에 있어서는 문제가 될 소지가 있습니다.


```js
function Single() {
    var instance = this;

    this.name = 'test';

    Single = function() {
        return instance;
    }

    return instance;
}

Single.prototype.test = true;

var s = new Single();

Single.prototype.test2 = true;

var s1 = new Single();

console.log(s.test); //true
console.log(s1.test); //true;
console.log(s.test1); //undefined
console.log(s1.test1); //undefined
```

즉, 한번 생성된 객체는 추가된 프로토타입을 참조할 수가 없다는게 문제가 된다는것이죠. 



```js
function Single() {
 
var instance;

Single = function() {
    return instance;
}

Single.prototype = this;

instance = new Single();

instance.constructor = Single;

return instance;
}

Single.prototype.test = true;
Single.prototype.test1 = true;

var s = new Single();


Single.prototype.test2 = true;

console.log(s.test2);

```


prototype을 놓치게 되었던 원인은 함수를 재정의하기 때문인데요.

위처럼 생성자 안에서 prototype을 연결해 주면 됩니다.




### - Factory Pattern

**팩토리 패턴**이란 공장을 생각하시면 편합니다. 

자동차를 만들고 싶은데, 어떤 자동차를 만들것인지만 지정해주면 공장안에서 물건을 만들어주는 거라고 생각하시면 되지요. :)

우리는 매번 어떤 자동차라는 것을 계속 만들어낼 필요 없이, 해당 자동차의 생산라인만 추가해주면 되는겁니다 ! 

해볼까요 ? 

```js
function Car() {}

Car.prototype.drive = function() {
    console.log(this.door);
};

Car.factory = function(type) {
    if(!Car[type])
        throw Error(type + 'is not exist');

    if(typeof Car[type].prototype.drive !== 'function')
        Car[type].prototype = new Car();

    return new Car[type]();
}

Car.four = function() {
    this.door = 4;
}

Car.five = function() {
    this.door = 5;
}

Car.ten = function() {
    this.door = 10;
}

var car = Car.factory('ten');
```

팩토리 패턴에서 중요한점은 생성자 함수를 호출해주는 거에요 ! 
 


### - Decoration Pattern

**데코레이션 패턴**이란 생산라인을 만들어두고, 필요한 옵션들을 데코레이션 한다고 생각하시면 편합니다 ! 

```js
function Sale(p) {
    this.price = p || 0;
    this.decorationList = [];
}

Sale.prototype = {
    constructor : Sale,

    decorator : {
        jibang : function() {
            var jibangMoney = 300;

            this.price += jibangMoney;
        },

        yunbang : function() {
            var yunbangMoney = 500;

            this.price += yunbangMoney;
        },

        dollar : function() {
            this.price = '$' + this.price.toFixed(2);
        }
    },
    
    decorate : function(str) {
        this.decorationList.push(str);
    },

    getPrice : function() {
        var arr = this.decorationList;
        for(var i = 0, len = arr.length; i < len; i++)
            this.decorator[arr[i]].call(this);

        return this.price;
    }
}; 



var sale = new Sale(100);
sale.decorate('jibang');
sale.decorate('dollar');

console.log(sale.getPrice());
```


이런식으로 말이죠 ! 어떤 것을 데코레이팅 할 것인가만 지정해주면 결과는 자연스레 도출되는거죠 !



### - Validator Pattern

**유효성 검사**패턴은 form작업을 할때 정말 많이 사용되는 작업들 입니다.

```js
function Validator() {}
 
Validator.prototype = {
    constructor : Validator,

    fncs : {
        isNotEmpty : function(str) {
            return str === '';
        },

        isNumber : function(n) {
            return Number.isInteger(n);
        }
    },

    config : {},

    validate : function(data) {
        var type,
            validate,
            val;

        for(i in data) {
            type     = this.config[i];
            validate = this.fncs[type];
            val      = data[i];

            console.log(type, validate);

            if(validate(val)) 
                return {
                    type : type, 
                    val : i
                };
            
        }

        return false;
    }
};

validator = new Validator();

validator.config = {
    first : 'isNotEmpty',
    age : 'isNumber'
};

var data = {
    first : '',
    age : 333
};

var index = validator.validate(data);

if(index) 
    console.log(index);
    
    
//clear. do somthing..!!    
```


위처럼 사용하게 되면 어떤 validation을 처리할 것인지만 정의해주면 되니까 정말 편리하겠죠 ? 

만약 if문 안에서 정합성에서 걸리게 되었다면 어떤 타입에 해당되는것인지가 나오게 되니까 디버깅도 편리해집니다. :) 



### - Facade Pattern

**[퍼사드 패턴](https://ko.wikipedia.org/wiki/%ED%8D%BC%EC%82%AC%EB%93%9C_%ED%8C%A8%ED%84%B4)**이란 건물의 정면이라는 뜻을 가지고 있어요 ! 

예를 들어 건물에 들어가서 어떤곳으로 진입하게 된다는 의미로도 쓰일 수 있는거죠. 

퍼사드는 클래스 라이브러리 같은 어떤 소프트웨어의 다른 커다란 코드 부분에 대한 간략화된 인터페이스를 제공하는 객체이며 

어떠한 공통 작업들을 하나에 몰아서 그 안에서 처리하게 된다 라고 생각하시면 되겠습니다.

```js
function stop(e) {
    e.stopImmediatePropagation(); //현재 레벨의 다른 이벤트도 동작하지 않도록 !
    e.preventDefault(); //현재 이벤트의 기본동작 중지 !
    e.stopPropagation(); //이벤트 버블링 금지 !
    
    return false; 
    // jquery 사용시 -> stopPropagation + preventDefault와 동일하며
    // 미사용시 preventDefault와 같은 의미를 갖습니다.
}
```


이런식으로 사용할 수 있겠네요 !! 



### - Observer Pattern

**옵저버 패턴**입니다. 

웹 서비스를 제공하는 프로그래머라면 반드시 알고 있어야만 하는 패턴입니다.

별표 다섯개 ! 돼지꼬리 땡땡입니다 ! 

```js
function Observer() {
    this.subscriber = {};
}

Observer.prototype = {
    constructor : Observer,

    subscribe : function(type, cbf) {
        if(typeof this.subscriber[type] === 'undefined')
            this.subscriber[type] = [];

        this.subscriber[type].push(cbf);
    },

    publish : function(type, o) {
        var subscriberFnc = this.subscriber[type];

        for(var i = subscriberFnc.length; i--;) 
            subscriberFnc[i](o);
    },

    unsubscribe : function(type, cbf) {
        var subscriberFnc = this.subscriber[type];

        for(var i = subscriberFnc.length; i--;) 
            if(subscriberFnc[i] == cbf)
                subscriberFnc.splice(i, 1);
    }
};

var paper = new Observer();

var joe = {
    daily : function(o) {
        console.log('joe가 paper의' + o + '를 구독하였습니다.');
    },

    weekly : function(o) {
        console.log(o);
    }
};

var tay = {
    daily : function(o) {   
        console.log('tay가 paper의' + o + '를 구독하였습니다.');
    }
};


paper.subscribe('daily', joe.daily);
paper.subscribe('daily', tay.daily);

paper.publish('daily', '조간신문을 발간 하였습니다!!');

paper.unsubscribe('daily', joe.daily);

paper.publish('daily', '조간신문을 발간 하였습니다!!');  
```


이렇게 구독자와 발행자로 나누어지게 됩니다 :) 

신문사는 신문을 발행하고, 단순히 구독자들에게 발행하는것으로 자신의 행동을 종료합니다.


구독자들은 언제든 자기가 구독하고 싶을때에 구독하고, 구독하고 싶지 않을때엔 구독하지 않습니다.


이상 자주 사용되는 패턴들이었습니다 ! 
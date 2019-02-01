---
layout: post
title: ES6 - REFLECTION
date: 2017-1-13 02:00:00
img: javascript.jpg
---

### 1. Reflection의 정의
ES6의 Reflection을 알아보기 전에 먼저 자바의 Reflection의 개념에 대해서 알아보겠습니다.  
**Reflection**이란 사전적으로 **'거울에 비친 그림자, 반사'**등의 의미로 사용 되는 단어 입니다.  
조금만 생각해 보자면, Reflection은 사전적 의미를 그대로 따른다고 볼 수 있습니다.  

Reflection은 객체의 형태를 모르고, 메모리만 알고 있더라도 그 형태를 알아낼 수 있게 해주는 프로그래밍 기법이라고 볼 수 있습니다.  
만약 객체의 메모리만 알고 있고, 그 메모리의 주체의 형태를 모른다고 가정해 볼까요.

```java
class Test {
    private String value;
     
    public String getValue() {
        return this.value;
    }
}

public class TestMain {
    public static void test(Object o) {
        o.getValue(); //Compile Error
    }
    
    public static void main(String [] args) {
        test(new Test());   
    }
}

```

위의 경우에는 컴파일 에러가 발생하게 됩니다.  
Object class에는 getValue() 메소드가 존재하지 않기 때문이죠.  
<br>

```java
class A {
    private String name;
    private String gender;

    public A() {}

    public A(String name) {
        this.name = name;
    }

    public A(String name, String gender) {
        this.name = name;
        this.gender = gender;
    }

    public void testMethod() {
        System.out.println("The Test Method");
    }

    public static String print(String str) {
        System.out.println(str);
        return str;
    }
}
```

그렇다면 이번에는 A라는 class를 정의해보고 알아보도록 하겠습니다.  

```java
public class Relection {

    public static void main(String[] args) throws Throwable{

        //class 정보를 가져옵니다.
        Class cls = A.class;


        //생성자의 정보를 확인합니다.
        for(Constructor constructor : cls.getDeclaredConstructors()) {

            System.out.println(constructor.getName() + " : constructor name");

            for(Parameter param : constructor.getParameters())
                System.out.println(param + " : param");

            for(Class type: constructor.getParameterTypes())
                System.out.println(type + " : type");
        }


        System.out.println("------------------------------------------------------");


        //선언된 필드를 확인 합니다.
        for(Field field : cls.getDeclaredFields()) {
            System.out.println(field.getName() + " : name");
            System.out.println(field.getType() + " : type");
            System.out.println(field.getDeclaringClass() + " : class");
        }


        System.out.println("------------------------------------------------------");

        //method를 실행 합니다.
        for(Method method : cls.getMethods()) {
            System.out.println(method.getName() + " : name");

            if(method.getName().equals("print")) {
                method.invoke(cls.newInstance(), "print to the " + method.getName());
            }
        }
    }
}
```

```text
com.company.java8.java.java8.mains.A : constructor name
java.lang.String arg0 : param
java.lang.String arg1 : param
class java.lang.String : type
class java.lang.String : type
com.company.java8.java.java8.mains.A : constructor name
java.lang.String arg0 : param
class java.lang.String : type
com.company.java8.java.java8.mains.A : constructor name
------------------------------------------------------
name : name
class java.lang.String : type
class com.company.java8.java.java8.mains.A : class
gender : name
class java.lang.String : type
class com.company.java8.java.java8.mains.A : class
------------------------------------------------------
print : name
print to the print
testMethod : name
wait : name
wait : name
wait : name
equals : name
toString : name
hashCode : name
getClass : name
notify : name
notifyAll : name
```

보다시피, 우리는 객체를 참조하여 해당 객체의 클래스 정보를 모두 가져와서 확인할 수 있을 수 있다는것을 확인하였습니다.  
어떻게 이런일이 가능할지에 대해서 잠시 알아볼까요.  
우선은 컴파일과 인터프리터 과정에 대해서 살짝 이해할 필요가 있습니다.  
<br>
우리는 자바로 프로그래밍 코드를 작성하게 되는데, 그 결과로는 항상 **ClassName.java** 파일이 생성되게 됩니다.  
**.java** 파일을 사용하여 **compile**과정을 거치게 되면, JVM이 읽어들일 수 있는 기계어인, 바이트 코드로 변환시키게 되어 **ClassName.class** 파일을 생성하게 됩니다.  
그러면 **java.exe** 프로그램이 JVM을 기동시키면서 인터프리터 방식으로 해당 기계어를 한라인씩 읽어들여 OS에 맞는 기계어로 컴파일해주게 되고 그 코드를 사용하여 Application을 실행하게 됩니다.  
매번 코드가 실행될 때마다 말이죠.  
<br>
즉, 코드상에서는 모든 객체가 상속받고 있는 Object의 형태로 메소드의 매개변수를 전달받을 수 있게 된다는 이야기도 됩니다. 매번 **.class**의 바이트 코드를 읽어들여 OS에 맞는 기계어로 매번 다시 컴파일 하고 실행시키기 때문이죠.  
<br>
모든 객체가 상속받고 있는 Object의 형태로 메소드의 매개변수를 전달받을 수 있다는 것은 그 어떤 것도 전달받을 수 있게 됨과 동시에, 그 어떤것이 넘어오는지 모를 수도 있다는 이야기이기도 하지요.  
그래서 객체의 주소값을 가지고 해당 객체의 형태를 알아낼 필요가 있을 때가 있습니다.  
그리고 이 방식을 **Reflection** 이라고 하는거지요.  

그럼 어떻게 런타임중의 객체의 메모리만으로 해당 정보를 알아낼 수 있느냐에 대한 고민 또한 해볼 필요가 있게 됩니다.  
자바의 클래스 파일들은 앞서 말씀드렸다 시피 **.class**파일로 컴파일되어 static 영역에 존재하게 되는데요.  
이 이야기는 객체의 이름을 알 수 있다면 static 영역에 존재하는 언제든 클래스의 구조를 얻어낼 수 있다는 이야기이기도 합니다.  

그렇다면, 상식적으로 내가 프로그래밍을 하고 있는데 메소드에 전달되어질 매개변수의 형을 모를 때가 있을까요 ?? 의외로 많이 존재하며 알게 모르게 많이 사용되고 있다고 합니다.  

대표적으로 IDE의 자동완성기능이나 스프링의 BeanFactory, 또는 Annotaion등에서 사용되어 집니다.  
부착되어질 클래스가 어느 클래스인지는 모르지만, 일단 작성 하고 런타임에서 확인하여 적용시키는 것이죠.  

또한 이 Reflection의 기능과 REST API를 적용시키면 Spring One Controller도 구현할 수 있게 됩니다.  


### 2. ES6 - Reflect
자 그렇다면 ES6의 객체 리플렉션 (객체 프로퍼티를 들여다보고 조작하는 등의 프로그래밍)에 대해서 알아보겠습니다. 
```javascript
const r = new Reflect(); //Reflect is not a constructor
Reflect(); // Reflect is not a function
```
Reflect는 함수 객체가 아니므로 호출할 수 없고 new 연산자를 이용하여 생성할 수도 없습니다.  


#### 1. Reflect.apply
**Object.prototype.apply**와 동일한 기능을 합니다. 
매개변수는 총 3가지를 전달하게 되는데, **(fnc, bindObject, [params])** 순으로 전달 됩니다.
 
```javascript
function fnc(a, b) {
  console.log(a, b, this.test); 
}

Reflect.apply(fnc, {test: 3}, [1, 2]); // 1, 2, 3

fnc.apply({test: 3}, [1, 2]); //1, 2, 3 
```


#### 2. Reflect.constructor
new 연산자를 사용하여 객체를 생성하는것과 동일한 효과를 냅니다.  
```javascript
function Test(a, b) {
    this.a = a;
    this.b = b;
    this.f = function() {
        console.log(this.a, this.b, this.c);
    }
}

function Test2() {
    this.c = 30;
}

Test2.prototype.c = 50;

var data = Reflect.construct(Test, [1, 2], Test2);


console.log(data.f()); //1, 2, 50

Test2.prototype.c = 3;

console.log(data.f()); //1, 2, 3
```
**new** 와 동일하게 prototype 체이닝을 상속합니다. 매개변수로 전달되는 인자는 총 3가지이며
1. 첫번째 인자는 타깃 생성자가 됩니다.  
2. 두번째 인자는 첫번째 생성자의 매개변수입니다.  
3. 세번째 인자는 타깃 생성자의 prototype으로 사용할 생성자 입니다.  

```javascript
class Test1 {
  constructor(a, b) {
    this.a = a;
    this.b = b;
    this.f = () => console.log(this.a, this.b, this.test());
  }
}

class Test2 {
   constructor() {
     console.log('init');
	 this.c = 30;
   }
   
   test() {
     console.log('test method');
     return 30;
   }
}


var data = Reflect.construct(Test1, [1, 2], Test2); //1, 2, 30
```

두번째로 전달된 객체는 prototype으로서의 기능만 수행하기 때문에 constructor 함수는 실행되지 않습니다.
  
#### 3. Reflect.defineProperty

```javascript
const obj = {};
Reflect.defineProperty(obj, 'person', {
	value: {
		name: 'dolen',
		age:  '31'
    }
}); //true 

Reflect.defineProperty(obj, 'person', {
	value: 3
}); //false
```

객체의 property를 정의 합니다. 매게변수는 총 3가지가 전달 되어야 합니다.  
  
1. property의 주체가 될 객체
2. property의 key value 
3. 셋팅 되어질 property Object . (반드시 { value: 'value' } 의 형태로 입력 합니다.  

함수가 실행된 결과는 Boolean 으로 전달되게 되며, 한번 정의되어 있는 Property는 다시 선언하더라도 정의되지 않습니다.  

```javascript 
const obj = {
    a: 3
};

obj.a = 3; // 이러한 행위를 차단할 수 있는 것이지요.
```

이로써 객체 **property**의 **override**를 막을 수 있는 효과를 얻을 수 있습니다.  


#### 4. Reflect.get

```javascript
const obj = {
	x: 1, 
	y: {
		yx: 2,
		yy: 3
	}
};

Reflect.get(obj, 'x'); //1
Reflect.get(obj, 'y'); //{yx: 2, yy: 3} 
```

get 함수는 말 그대로 객체의 property의 값을 가져오는 역할을 수행합니다.  
예를 들어 Reflect.get(obj, 'y').get(obj, 'yx'); 이런식의 동작은 불가능 합니다.  
단순히 객체의 값안에 있는 키를 사용한 getter로서만 동작 합니다.  

```javascript
class Test {
	constructor() {
		this._a = 3;
	}
	
	set a(v) {this.a = v;} 
	get a() {return this.a;}
}

Reflect.get(t, '_a'); //3 
Reflect.get(t, 'a'); //이런식의 동작은 Maximum call stack 을 발생 시킵니다.  
```

Class의 경우또한 객체이기 때문에, key를 사용해서 property를 취하는건 가능하지만, getter 또는 setter를 실행시키지는 못합니다.  

```javascript
const arr = [1, 2, 3, 4, 5];
Reflect.get(arr, 1); // 2 
```

배열의 경우에는 두번째 인자로 배열의 인덱스 값을 전달 합니다.
  
  
#### 5. Reflect.getOwnPropertyDescriptor

```javascript
const obj = {
	x: 1, 
	y: {
		yx: 2,
		yy: 3
	}
};

const arr = [1, 2, 3, 4, 5];

Reflect.getOwnPropertyDescriptor(obj, 'x'); //Object {value: 1, writable: true, enumerable: true, configurable: true}

Reflect.getOwnPropertyDescriptor(obj, 'y'); //Object {value: Object, writable: true, enumerable: true, configurable: true}

Reflect.getOwnPropertyDescriptor(obj, 'z'); //undefined 

Reflect.getOwnPropertyDescriptor(arr, 0); //Object {value: 1, writable: true, enumerable: true, configurable: true}
```

getOwnPropertyDescriptor함수는 내가 가지고 있는 속성의 상세 설명을 얻을 수 있는 함수입니다.  
선언되어 있지 않은 속성은 자동으로 undefined를 return 하며 배열의 경우에는 전달받은 index를 사용하여 value의 속성을 전달합니다.

```javascript
Object.getOwnPropertyDescriptor('err', 0); //Object {value: "e", writable: false, enumerable: true, configurable: false}
Object.getOwnPropertyDescriptor('err', 1); //Object {value: "r", writable: false, enumerable: true, configurable: false}
Object.getOwnPropertyDescriptor('err', 2); //Object {value: "r", writable: false, enumerable: true, configurable: false}


Reflect.getOwnPropertyDescriptor('error', 1); //TypeError: Reflect.getOwnPropertyDescriptor called on non-object
```

Object가 가지고 있는 함수와 다른점은 객체가 생성되지 않았을 경우에는 TypeError를 발생시킵니다.  
Object가 아니기 때문이죠 ! 


##### 6. Reflect.getPrototypeOf

```javascript
class Test {
	getTest() {

	}
}


class Test2 extends Test {

}

const t = new Test();
const t2 = new Test2();

Reflect.getPrototypeOf(t); // Object {} Object Prototype
Reflect.getPrototypeOf(t2); // Test {} Test prototype
Reflect.getPrototypeOf({}); // Object {}  Object Prototype
Reflect.getPrototypeOf(Object.prototype); // null
```

getPrototypeOf 함수는 대상 객체의 prototype을 return 합니다.  
위 코드에서 보여지듯이 {} 일반 객체를 전달하면 Object의 prototype을 return 합니다.  
Test를 상속받은 Test2를 전달하면 Test2의 Prototype을 return 합니다.  
Test를 전달하면 마찬가지로 Test의 Prototype을 return 합니다.
만약 매개변수로 prototype을 전달한다면 null을 return 합니다.  
전달한 객체의 Prototype을 얻어오는 함수로 활용할 수 있습니다.  (예를 들자면 inherit function의 구축등에서) 

#### 7. Reflect.has

```javascript 
const obj = {
	x: 1, 
	y: {
		yx: 2,
		yy: 3
	}
};

Reflect.has(obj, 'x'); //true
Reflect.has(obj, 'y'); //true
Reflect.has(obj, 'xx'); //false

document.body.setAttribute('data-test', 3); 
Reflect.has(document.body.attributes, 'data-test'); //true 
```

has 함수는 객체에 해당 key값이 존재하는지를 판단해줍니다.  

#### 8. Reflect.preventExtensions
```javascript
var obj = {};

Reflect.isExtensible(obj); // === true

Reflect.preventExtensions(obj);

Reflect.isExtensible(obj); // === false
```

preventExtensions 함수는 객체를 확장불가능한 상태로 변경합니다.  

```javascript
Reflect.preventExtensions(1);
// TypeError: 1 is not an object

Object.preventExtensions(1);
// 1
```

Object에 있는 preventExtensions함수와 다른점은 객체가 아닐 경우 Type Error를 발생합니다.  



#### 9. Reflect.isExtensible

```javascript
const obj = {};
Reflect.isExtensible(obj); // === true 

Reflect.preventExtensions(obj); //교체 불가능한 객체로 변경
Reflect.isExtensible(obj); // === false
 
Reflect.defReflect.defineProperty(obj, 'person', {
    value: 3
}); //false 객체에 값을 정의할 수 없음 

obj.a = 3; //실행은 되지만 할당되지 않음 

Object.freeze(obj); 

Reflect.isExtensible(obj); // false
```

Reflect.isExtensible 함수는 객체가 현재 확장 가능한 상태인지를 return해 줍니다.  



#### 10. Reflect.ownKeys

```javascript
const obj = {
	x: 1, 
	y: {
		yx: 2,
		yy: 3
	}
};

const arr = [1, 2, 3, 4, 5];

Reflect.ownKeys(obj); // x, y
Reflect.ownKeys(arr); // 1, 2, 3, 4, 5, length 

const key = Symbol('test');

const obj2 = {
   [key]: 'symbolKey',
   key2: 'key2'
};

Reflect.ownKeys(obj2); // key2, Symbol(test)

```

Reflect.ownKeys 는 객체의 key배열을 얻어옵니다.  
해당 객체에 지정되어있는 모든 속성의 key값을 얻어올 수 있으며 Symbol key 또한 얻어올 수 있습니다.  


#### 11. Reflect.set

```javascript
// Object
const obj = {};
Reflect.set(obj, "prop", "value"); // true
obj.prop; // "value"

// Array
const arr = ["duck", "duck", "duck"];
Reflect.set(arr, 2, "goose"); // true
arr[2]; // "goose"

// It can truncate an array.
Reflect.set(arr, "length", 1); // true
arr; // ["duck"];

// With just one argument, propertyKey and value are "undefined".
Reflect.set(obj); // true , Object {undefined: undefined}
Reflect.getOwnPropertyDescriptor(obj, "undefined"); 
// { value: undefined, writable: true, enumerable: true, configurable: true }
```

Reflect.set 함수는 객체의 property의 value를 설정하는 함수입니다.  
간단하게 전달된 객체의 key값을 이용하여 값을 저장하는 방식을 취하며, 배열의 경우 length property를 사용하여 길이를 줄여줄 수도 있습니다.  
만약 Reflect.set 함수를 사용할때 아무런 인자도 전달하지 않는다면, undefined가 key값으로 undefined가 value로 지정되게 됩니다.  


#### 12. Reflect.setPrototypeOf
```javascript
const obj = {};

Reflect.setPrototypeOf(obj, null); //true 

console.log(obj); //No Properties 

obj.a = 3; 

console.log(obj); //obj.__proto__ = null 과 동일 합니다. 
```

setPrototypeOf함수는 객체의 prototype을 지정해줍니다.  
객체의 prototype = null로 설정하게 되면 해당 객체의 prototype chaining 은 끊어지게 되며, 객체의 properties 는 null value로 지정됩니다.  
 
 
```javascript
const obj = {};

Reflect.preventExtensions(obj); //true

Reflect.set(obj, 'test', function() {console.log(33);}); //false
```

마찬가지로 객체가 확장되지 못할경우에는 set properties를 설정할 수가 없습니다.  


```javascript
const target = {};
const proto = Object.create(target);
Reflect.setPrototypeOf(target, proto); // false
```

만약 prototype chain 사이클이 발생하면 false를 반환하게 됩니다.  


이상으로 Reflection과 ES6 Reflecttion에 대해 알아보았습니다.  :)

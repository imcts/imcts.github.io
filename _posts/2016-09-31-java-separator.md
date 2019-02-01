---
layout: post
title: JAVA 가변인자와 ENUM
date: 2016-09-31 21:00:00
img: java.png
---

### 가변인자

```java
public class Gabyun {
    public static void test(int a, String... test) {
        System.out.println(test);
 
        System.out.println(a);
 
        for(String s : test)
            System.out.println(s);
    }
 
    public static void main(String [] args) {
        String [] srr = {"dd", "dd"};
        test(2, srr);
    }
}
```

`가변인자`란 동일한 타입의 매개변수를 배열로 넘겨받아 사용하는 매개변수 입니다. 

```js
const fnc = (...args) => {
    args.map(v => console.log(v););
};

```


Javascrip의 spread operator 와 동일 하다고 보면 됩니다.



### ENUM 

````java
public class Enum {
 
    public enum Test {
        A, B, C, D;
    }
 
 
    public static void main(String[] args) {
 
        switch (Test.A) {
 
            case A :
                System.out.println("a");
                break;
 
            case B :
                System.out.println("b");
                break;
 
            case C :
                System.out.println("c");
                break;
 
            case D :
                System.out.println("d");
                break;
        }
 
 
 
    }
}
````


기본적인 사용법은 위와 같습니다.

특정 enum 아래에 상수를 선언하게 되면 

```java
public static final Test A = new Test();
```

라고 선언되는 것과 동일한 결과를 얻습니다. 

즉 Test.A 로 접근이가능하다는 이야기이지요. 


스위치 케이스는 enum 형태의 열거형 자료가 들어오면 자연스럽게 그 열거형의 형태로 변경시켜주기 때문에 사용하기 용이합니다. 



```java
public class Enum {
 
    public enum Test {
        A, B, C, D,
        E("E", 1),
        F("F", 2);
 
        private String test;
        private int code;
 
        Test() {}
 
        Test(String test, int code) {
            this.test = test;
            this.code = code;
        }
 
        public int getCode() {
            return code;
        }
 
        public String getTest() {
            return test;
        }
 
 
        @Override
        public String toString() {
            return this.code == 1 ? "E" : "ㄴㄴ";
        }
    }
 
 
    public static void main(String[] args) {
 
        switch (Test.E) {
 
            case A :
                System.out.println("a");
                break;
 
            case B :
                System.out.println("b");
                break;
 
            case C :
                System.out.println("c");
                break;
 
            case D :
                System.out.println("d");
                break;
 
            case E :
                System.out.println("e");
                break;
 
            case F :
                System.out.println("f");
                break;
        }
 
 
        if(Test.E.getTest().equals("E"))
            System.out.println("이렇게 사용합니다 ! +ㅅ +");
 
        System.out.println(Test.E.toString());
 
    }
}
```

1. 메소드를 enum 내부에서 오버라이드하거나, 생성하여 쓸 수도 있습니다.
2. 사용하는 곳에서 직접 if 문으로 비교를 한다거나 할 수도 있으며, enum자체를 문자열로 비교할 수 있기 때문에 매우 유용하게 사용할 수 있습니다.

---
layout: post
title: JAVA 람다 표현식 (Lambda Expression)
date: 2016-10-04 21:00:00
image: '/assets/img/'
description: 'Lambda'
main-class: 'java'
tags: 
- 람다표현식
- Lambda Expression

introduction: '-Lambda Expression-'
---

### - 람다 표현식에 관하여 

```java
@FunctionalInterface
interface compareFunction<T, F, Z> {
    public Z myFunction(T o, F z);
}
```

1. @FunctionalInterface가 정의되어있어야 합니다. 
2. 1개의 인터페이스에 1개의 메서드만 구현되어 있어야 합니다.
 
 
```java
new Thread(
    new Runnable() {
            @Override
                public void run() {
                    System.out.println("다시 스레드 시작");
                }
            }
).start();
```


원래 기존 스레드를 선언하고 실행하기 위해서는, 쓰레드 생성자에 매개변수로, Runnable Interface를 구현한 객체를 넘겨야했었지요. 

하지만, 람다 표현식으로 표현하고자 한다면, 


```java
new Thread(
    () -> {System.out.println("쓰레드 시작");
}).start();
```

이렇게 표현이 가능 합니다. 

람다 표현식의 경우 단 하나의 인터페이스와 단 하나의 메소드를 가져야 하는데 Runnable의 경우 인터페이스를 구현한 클래스이고 해당 클래스는 Runnable 인터페이스를 implements하였고

Runnable 인터페이스는 run 메소드 하나만 구축하고 있으므로 람다 표현식으로서의 조건이 충족됩니다.(**하나의 인터페이스에 하나의메소드**) 



```java
@FunctionalInterface
interface arrayFunction<T> {
    public T myFunction(T... t);
    
    static void myStaticFunction() {
        System.out.println("인터페이스안에 static으로 정의할 수 있어요.");
    }
}
```


위 코드를 보면 하나의 람다 표현식을 사용하기 위한 메소드를 정의하였습니다. 

@FunctionalInterface의 조건은 1개의 인터페이스와 1개의 메소드이다.

**JAVA8**의 기능으로 static 메소드가 인터페이스 안에서 구현될 수 있게 되었습니다. static 메소드는 람다 조건에 무시됩니다. 
  
  
```java
private static void test() {
    arrayFunction<Integer> integerFunction = (Integer... arr) -> {
        int sum = 0; 
        
        for(int i = 0; i < arr.length; i++) 
            sum += arr[i];
        
        List<Integer> list = new ArrayList<Integer>();
        list.add(10);
        list.add(12);
        list.add(2);
        
        return sum;
    };
    
    System.out.println(
        integerFunction.myFunction(new Integer[] {1, 2, 3, 4, 5})
    );
}

```

사용할때에는 정의해서 사용하면 되는거죠. 

일단 기초적인 방법입니다. 

integerFunction interface 에 선언해둔 myFunction을 재정의하여 사용하는 방식이지요. 

일단은 사용법만 알아둘 예정이기 때문에 여러가지 더 좋은 응용방법은 찾아보며 공부하시길 바랍니다.




```java
@FunctionalInterface
interface compareFunction<T, F, Z> {
    public Z myFunction(T o, F z);
}


@FunctionalInterface
interface arrayFunction<T> {
    public T myFunction(T... t);
    
    //인터페이스명으로 메소드를 접근할 수 있습니다.
    static void myStaticFunction() {
        System.out.println("인터페이스안에 static으로 정의할 수 있습니다.");
    }
}

private static void test3() {
    //매개변수가 여러개지만, 리터럴이 1번에 해결될때. 중괄호와 리턴구문을 생략가능합니다.
    compareFunction<String, Integer, String> customFunction = (str, num) -> str + num;
    
    System.out.println(
            customFunction.myFunction("3", 5)
    );
}

private static void test2() {
    //매개변수 1개일때
    arrayFunction<String> strSum = arr -> { 
        String str = "";
        
        for(String s : arr)
            str += s;
        
        return str;
    };
        
    //결국 strSum <- 아래의 인터페이스를 재정의한 인터페이스가 되겠지요. 
    /*@FunctionalInterface
    interface arrayFunction<String> {
        public String myFunction(String... t) { 
            String str = "";
            
            for(String s : arr)
                str += s;
            
            return str;
        };
    }*/
    
    System.out.println(
        strSum.myFunction(new String[] {"a", "b", "c", "d", "e"})
    );
}
```




```java
interface defaultTest {
    default void testFunction() {
        System.out.println("나는 디폴트야");
    }
    
    static void testStatic() {
        System.out.println("나는 테스트 스태틱 메소드야.");
    }
}
 
 
public class Ramda implements defaultTest{
    //JAVA 8 
    public static void main(String[] args) {
        new Ramda().testFunction();
        
        defaultTest.testStatic();
    }
 
}
```
java8부터는 인터페이스 안에 default로 메소드를 선언할 수 있으며 해당 인터페이스를 상속받은 클래스는 해당 메소드를 오버라이드하지 않아도 됩니다.  

static 메소드는 인스턴트화된 객체로는 접근할 수 없습니다. 따라서 해당 인터페이스에 직접 접근해서 메소드를 사용합니다. :)





### - 익명클래스

```java
class A {
    public void test() {
        System.out.println("나는 원래의 test야");
    }
}


class Test {
    public static void main() {
        A a = new A() {
            public void test() {
                super.test();
                System.out.println("나는 변경된 test야");
            }
            
            public void test2() {}
        };
        
        a.test();
        
        a.test2(); //사용할 수 없어요 ! A는 test2를 모르기 때문이지요 ㅎㅅㅎ
    }
}
```


**익명클래스**를 인스턴스화 함과 동시에 메소드를 오버라이드합니다.

좀 더 알고있는 지식을 동원하자면, A()생성자 메소드를 실행하여 객체를 인스턴스화하고 new 연산자가 해당 객체의 주소값을 리턴하면 = 대입연산자를 통하여 A 타입의 변수 a에 해당 객체의 주소값을 할당합니다.

생성하면서 public void test2() {} 라는 메소드를 만들어도 부모는 test2를 모르는 상태이기 때문에, 해당 메소드를 사용할 수 없습니다. (클래스의 다형성) 



```java
Runnable r = new Runnable() {
    @Override
    public void run() {
        // TODO Auto-generated method stub
        
    }
};

r.run();
```


마찬가지로 인터페이스인 Runnable을 new 하는 원리는 익명클래스에 Runnable을 상속받아서 구현한 구현 클래스를 r에 할당하는 것 입니다. 

근데 위 코드를 람다식으로 변환하기 위해서는 전제 조건이 @FunctionalInterface 어노테이션을 가진, 구현해야 하는 메소드가 반드시 하나여야 하는 인터페이스여야만 했지요 ?  


```java
@FunctionalInterface
public interface MyFunction<T> {    
    public T rambdaFunction(T... list);
}
```

이런식으로 말이지요. 


하지만 java8로 업그레이드 되면서 Runnable interface 에는 @FunctionalInterface 어노테이션이 추가 되어 있습니다.

따라서 익명함수로 생성할때 반드시 오버라이드 해야 하는 메소드의 개수가 1개이므로  


```java
Runnable run = () -> {
    //do something...
    System.out.println("나는 쓰레드 안의 람다 표현식이야 ! + ㅅ+");
};

```

위처럼 익명함수에 Runnable을 상속시켜 바로 오버라이드 해서 사용하는 방식으로 람다식을 구현할 수 있게 되는 거지요 :)




함수형 언어가 되고 있는 JAVA와 JAVASCRIPT에 대해 지속적인 공부를 해야할 듯 싶습니다.
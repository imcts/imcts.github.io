---
layout: post
title: JAVA 제네릭 클래스와 메소드
categories: [JAVA]
tags: [제네릭]
comments: true
share: true
---

### - Generic 

```java
import java.util.ArrayList;
import java.util.List;
 
/**
 * Created by imcts on 2016. 3. 12..
 */
 
class B extends A {}
 
class C {}
 
class A<T extends A, B> {
    private T a;
    private B b;
 
    public A() {}
 
    public A(T a, B b) {
        this.a = a;
        this.b = b;
    }
 
    public T getA() {
        return a;
    }
 
    public void setA(T a) {
        this.a = a;
    }
 
    public B getB() {
        return b;
    }
 
    public void setB(B b) {
        this.b = b;
    }
 
    public <E> List<E> test(E e) {
        System.out.println(e);
 
        return new ArrayList<E>();
    }
}
 
 
public class Generic {
    public static void main(String [] args) {
 
        A<B, String> a = new A<B, String>(new B(), "dd");
 
 
        System.out.println(a.getA() + a.getB());
 
        a.test("eeee");
        a.test(11111);
 
        System.out.println(a.test("String"));
    }
}
```

**제네릭 클래스**  
1. 제네릭 클래스의 경우 생성은 일반 클래스와 똑같고 사용방법 또한 동일합니다.  
2. 다만, 선언시 Class<E> , class<E, T> 처럼 자신의 클래스 안에서 선언될 구분자를 미리 클래스에 기술해 두어야 해요.   
3. 생성시에는 반드시 선언한 제네릭 개수만큼의 제네릭을 선언 해 주어야 합니다.  
4. 생성 후 생성자단에서 값을 셋팅해줄 수도 있고, getter setter 또한 사용 가능합니다.   
5. <T extends A, B> T는  A를 상속받은 클래스만 들어올 수 있고 두번째 제네릭 인자로 B를 받습니다.  
  
  
**제네릭 메소드**   
1. 그 어떤 클래스의 내부인자로도 사용가능 합니다.  
2. 메소드의 public 뒷부분에 <E> 해당 메소드의 매개변수로 넘어오는 곳의 제네릭을 선언 합니다.   
3. 여러개라면 < E, T > 등 콤마로 구분하여 선언가능해요 !  

```java
//기본 사용방법
List<?> wildList = new ArrayList<String>();

//강제성
List<? extends String> wildList1 = new ArrayList<String>();
```

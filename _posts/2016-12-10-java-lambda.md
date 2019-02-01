---
layout: post
title: JAVA8 람다 표현식(Lambda Expression)
date: 2016-12-09 15:00:00
img: java.png
---

### 람다 표현식에 관하여 

자바8에 들어오면서 함수형 표현식 (Lambda Expression)이 도입되었습니다.  
물론 Javascript 진영 또한 ES6에 접어들면서 마찬가지로 람다 표현식을 도입하였지요.  
오늘은 자바의 람다식에 대해서 알아보겠습니다.

#### Interface

```java
@FunctionalInterface
interface myFunction {
    public void run(); 
}
```

- @FunctionalInterface가 정의되어있어야 합니다.  
- 정의해 둔 인터페이스에 추상메소드는 1개여야만 합니다.
- default 메소드와 static 메소드는 무시합니다.




#### How to use

람다 표현식은 함수 표현식이기 때문에 불필요한 부분을 제거할 수 있게 됩니다.  
정말 많이 작성 하였었던 Thread를 오랜만에 생성해 보겠습니다.  
조금 기본적인 코드를 만들어 볼까요 ?  


```java
Thread thread = new Thread() {
    @Override
    public void run() {
        System.out.println("run thread!!");
    }
};

thread.start();

new Thread(
    new Runnable() {
        @Override
        public void run() {
            System.out.println("run thread!!");
        }
    }
).start();
```
`Thread`를 생성하기 위해서는 보통 새로운 `Thread`를 생성할때 `run`메소드만 오버라이드 하거나 `익명클래스`또는 `Runnable`의 구현체를 생성하여 전달하곤 했습니다.  
<br>
<br>



```java
Runnable thread = () -> System.out.println("start");
thread.run();

new Thread(
() -> System.out.println("start")
).start();
```
하지만 람다 표현식을 사용하게 되면 이런식으로 표현이 가능 합니다.  
Runnable이 구현해야 하는 메소드는 run()메소드 하나 뿐이니 해당 메소드를 구현체로 전달해주면 되는것이지요. 
<br>
<br>
<br>



```java
Comparator<Integer> compare = new Comparator<Integer>() {
@Override
public int compare(Integer o1, Integer o2) {
    return o1 - o2;
}
};

System.out.println(
    compare.compare(1, 2) // -1 
);
```

정말 많이 사용했었던 compare 메소드 입니다.  
sort를 할때 정말 많이 사용하게 되는 메소드이기도 하지요 !  
Comparator 인터페이스 또한 `@FunctionalInterface`이므로 람다 표현식을 적용시킬 수 있습니다. 
<br>

```java
Comparator<Integer> compare = (Integer o1, Integer o2) -> {
    return o1 - o2
};

System.out.println(
    compare2.compare(1, 2) // -1 
);
```

어때요 ? 조금 더 간결하게 표현이 되는 것을 볼 수 있죠 ?? 즉 불필요한 메소드명과 접근 제한자의 표기를 제거하고,  
매개변수와 메소드 body만 구현하게 되는 것이지요. :)  
조금 더 간결하게 표현해 볼까요 ?
<br>
<br>
<br>


```java
Comparator<Integer> compare2 = (o1, o2) -> o1 - o2;

System.out.println(
    compare2.compare(1, 2) // -1 
);
```

매개변수에는 어차피 자료형이 선언되어있으므로 별도로 표기하지 않아도 괜찮습니다. :)  
또한 구현해야 하는 body는 라인수가 1라인이므로 {} 를 생략할 수 있게 됩니다.  
<br>
<br>
<br>


#### custom interface

그렇다면 인터페이스를 내가 원하는대로 만들 수는 없을까요 ?  
물론 가능 하겠지요 ? :)


```java
@FunctionalInterface
interface myFunction<T> {
    public T excute(T a, T b);
}
```

구현해야 하는 추상메소드가 1개인 인터페이스를 정의해 줍니다.  

```java
myFunction<Integer> sum = (a, b) -> a + b;

System.out.println(
    sum.excute(1, 5)
);
```

그리고 표현식을 적용하고, 실행하면 끝입니다.  
살짝 응용해 볼까요 ?
<br>
<br>
<br>

```java
@FunctionalInterface
interface myFunction<T> {
    public T excute(T a, T b);
}

class TestClass {
    public static <T> T operator(myFunction<T> func, T a, T b) {
        return func.excute(a, b);
    }
}


main() {

    System.out.println(
            TestClass.operator((a, b) -> a + b, 5, 3) //8 
    );
    
}
```
메소드에 lambda표현식을 매개변수로 넘겨주고, 해당 lambda표현식을 실행하는 것으로 여러가지를 할 수 있게 되었습니다.  

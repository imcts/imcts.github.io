---

layout: post
title: JAVA8 메소드 레퍼런스(Method Reference)
date: 2016-12-09 20:00:00
image: '/assets/img/'
main-class: 'java'
tags: 
- JAVA8
- method reference

introduction: '- JAVA8 Method Reference -'

---

### - JAVA8 Method Reference

메소드 참조와 생성자 참조에 대해서 알아보도록 하겠습니다.  
우리는 람다 표현식에서 알아보았듯이, 구현해야 하는 메소드의 본문을 람다 표현식으로 (익명클래스로 생성되도록 하는) 대체할 수 있다는 것을 알았습니다.  
하지만, 이미 우리가 구현하고자 하는 람다식 자체가 구현되어있는 경우가 있습니다.  
이럴때 사용하는 메서드 참조용 특수 문법이 있는데, 이 방식을 메소드 참조라고 표현합니다.
<br>
<br>


```java
    String [] strings = new String [] {
        "6", "5", "4", "3", "2", "1"
    };

    List<String> list = Arrays.asList(strings);

    for(String s : strings)
        System.out.println(s);
```

일단 간단한 예제를 하나 적어보았습니다.  
한창 자바 코딩할때에는 하루에도 수십번씩 적었던 코드들이죠.  
리스트를 순회하며 요소를 출력하는 단순한 예제 코드 입니다.  

하지만 반복적인 for문의 사용과 iterator는 굉장히 지치게 하죠.  

```java
    default void forEach(Consumer<? super T> action) {
        Objects.requireNonNull(action);
        for (T t : this) {
            action.accept(t);
        }
    }
```
그래서 자바8의 ArrayList 클래스에는 각 요소에 함수를 적용하는 forEach 메소드를 지원합니다.  

코드를 조금 수정해 볼까요 ?
<br>
<br>
<br>

```java
    String [] strings = new String [] {
        "6", "5", "4", "3", "2", "1"
    };

    List<String> list = Arrays.asList(strings);
    
    list.forEach(x -> System.out.println(x));
```
이런식으로 간결해 지는것을 볼 수 있습니다.  
하지만, 결과적으로 따지고 본다면, forEach메소드는 매개변수로 Consumer interface를 전달받죠.   
물론 우리는 람다식을 이용하여, Consumer가 가지고있는 accept 메소드 구현체를 직접 전달함으로써 해결하고 있지만  
지금 우리가 전달함 람다식의 내용은 list의 요소를 입력받아, 단순히 println메소드에 전달해주는 역할만 하고 있게 되는것이지요.  
즉, Consumer가 구현해야 되는 accept메소드가 실행될때 println메소드를 한번더 실행해주는 형태라고 보시면 될 것 같습니다.  
그렇다면 결국 메소드의 call stack이 1depth 깊어진 결과라고 보여지는데요, 그냥 System클래스가 가진 println메소드를 forEach에게 전달할 순 없을까요?  
<br>
<br>

그게바로 **메소드 참조** 입니다.  
<br>
<br>

```java
    String [] strings = new String [] {
        "6", "5", "4", "3", "2", "1"
    };

    List<String> list = Arrays.asList(strings);
    
    list.forEach(System.out::println);
```

이렇게 표현해 주는 것만으로, forEach에게 println을 전달해 주게 되는것이지요.  
이러한 예에서 볼 수 있듯이 :: 연산자는 메소드 이름과 클래스를 분리하거나, 메소드 이름과 객체의 이름을 분리합니다.  
이는 다음과 같이 세 가지 형태로 사용할 수 있습니다.  

1. 클래스::인스턴스메소드 (public)
2. 클래스::정적메소드 (static)
3. 객체::인스턴스메소드 (new)

**첫 번째 형태에서는 첫번째 파라미터가 메소드의 수신자가 되고, 나머지 파라미터는 해당 메소드로 전달 됩니다.**  
ex) String::compareToIgnoreCase는 (x, y) -> x.compareToIgnoreCase(y) 와 같습니다.  
<br>

**두 번째 형태에서는 모든 파라미터가 정적 메소드로 전달됩니다.**   
ex) Object::isNull은 x -> Object.isNull(x) 와 같습니다.  
<br>

**세 번째 형태에서는 주어진 객체에서 메소드가 호출되며 파라미터는 인스턴스 메소드로 전달 됩니다.**  
ex) System.out::println은 x -> System.out.println(x)와 동일합니다.  
<br>

즉 우리는 세 번째 방식인 객체의 인스턴스 메소드를 전달해준 셈이지요. :)

<br>
<br>
<br>

#### - 생성자 참조


```java
@Data
    class Person {
        private String name;
        private String gender;
    
        public Person() {}
    
        public Person(String name) {
            this.name = name;
        }
    
        public Person(String name, String gender) {
            this.name = name;
            this.gender = gender;
        }
    }
```

일단 클래스를 하나 생성해볼까요.  
person 클래스를 생성하여 사용하는 방법은, 생성자에 정의된 방법과 동일 합니다.  

```java
    Person member = new Person();
    Person member1 = new Person("dolen1");
    Person member2 = new Person("dolen2", "man");
```

이렇게 사용할 수 있겠지요 ?  
하지만 우리는 람다식을 배웠기 때문에 이 식을 이렇게도 표현할 수 있다는 것을 알고 있습니다.  

```java
    Function<String, Person> myFunction = name -> new Person(name);
```

또한 생성자는 메소드라는 것을 자바를 공부했다면 알고 계셔야 하는 부분 중 하나이지요?  
따라서 생성자 메소드 또한 메소드 참조를 할 수 있습니다. :)   

```java
    Function<String, Person> myFunction = Person::new;
    myFunction.apply("dolen");
    
    BiFunction<String, String, Person> myFunction1 = Person::new;
    myFunction1.apply("dolen", "man");
```

이렇게 말이죠 !  
당연히 메소드 참조이기때문에, 메소드의 오버로딩이 적용된다는 점은 기본이겠지요 ?  

#### - 자주 사용하는 함수형 인터페이스

|함수형 인터페이스        |파라미터타입|반환 타입|추상 메서드 이름|설명                                    |다른 메소드                       |
|:------------------:|:-------:|:-----:|:----------:|:------------------------------------:|:------------------------------:|
|Runnable            |없음      |void   |run         |인자나 반환 값 없이 액션을 수행한다.            |없음                            |
|Supplier<T>         |없음      |T      |get         |T 타입 값을 공급한다.                       |없음                            |
|Consumer<T>         |T        |void   |accept      |T 타입 값을 소비한다.                       |andThen                        |
|BiConsumer<T, U>    |T, U     |void   |accept      |T와 U타입 값을 소비한다.                     |andThen                       |
|Function<T, R>      |T        |R      |apply       |T 타입 인자를 받는 함수다.                    |compose<br>andThen<br>identity|
|BiFunction<T, U, R> |T, U     |R      |apply       |T와 U타입 인자를 받는 함수다.                 |andThen                        |
|UnaryOperator<T>    |T        |T      |apply       |T 타입에 적용하는 단항 연산자다.               |compose<br>andThen<br>identity |
|BinaryOperator<T>   |T, T     |T      |apply       |T 타입에 적용하는 이항 연산자다.               |andThen<br>maxBy<br>minBy      |
|Predicate<T>        |T        |boolean|test        |Boolean 값을 반환하는 함수다.                |and<br>or<br>negate<br>isEqual |
|BiPredicate<T, U>   |T, U     |boolean|test        |두 가지 인자를 받고 boolean 값을 반환하는 함수다.|and<br>or<br>negate            |


자바8 메소드 참조 정리 였습니다. :)  



 
 
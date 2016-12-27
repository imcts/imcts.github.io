---

layout: post
title: JAVA 8 스트림 (Stream)
date: 2016-12-16 20:00:00
image: '/assets/img/'
main-class: 'java'
tags: 
- JAVA8
- stream

introduction: '- JAVA8 Stream -'

---

### - JAVA8 Stream

자바 **스트림(Stream)**에 대해서 정리해보려 합니다.

스트림(Stream)은 컬렉션보다 개념적으로 높은 수준의 데이터 뷰 역할을 하며, 이를 이용하면 좀 더 직관적으로 계산을 명시할 수 있다고합니다.  
스트림을 이용할때에는 일을 수행하는 방법이 아닌 하고싶은 일을 명시하면 되는데요, 연산을 스케줄링 하는 것은 해당 구현체에 맡기면 됩니다.  
<br>

먼저 스트림을 시작하기 전에 스트림의 특징을 알아볼까요 ?  

1. 스트림은 요소를 저장하지 않습니다. 요소는 스트림을 지원하는 컬렉션에 저장되거나 필요한 때에 생성됩니다.  
2. 스트림 연산은 원본을 변경하지 않습니다. **(Immutable)** 합니다. 
3. 스트림 연산은 가능하면 지연시켜 둡니다. 즉 연산 결과가 필요하기 전까지는 실행되지 않습니다.

#### - 반복에서 스트림 연산으로의 전환 
```java
    String str = "When one thinks of the labors which the the English have devoted to digging the tunnel under the Thames, the tremendous expenditure of energy involved, and then how a little accident may for a long time obstruct the entire enterprise, one will be able to form a fitting conception of this critical undertaking as a whole.";
    
    String [] strings = str.split(" ");

    int count = 0;

    for(String s : strings)
        if(s.length() > 5)
            count += 1;

    System.out.println(count); //21
```

컬렉션을 처리할때 보통은 요소를 순회하면서 각 요소를 이용해 원하는 작업을 수행하는데요, 예를 들자면 책에 긴 단어가 얼마나 나오는지 알아보고자 한다면 위 코드처럼 작성하곤 했습니다.  
<br>

```java
    long cnt = Arrays.asList(strings).stream().filter(v -> v.length() > 5).count();
    
    System.out.println(cnt);
```

스트림을 이용하면 이처럼 간단하게 표현할 수 있게 됩니다  
카운팅을 증명하기 위해 로직이나 루프를 살펴볼 필요가 없고 메서드 이름을 보면 코드가 무엇을 의도하는지를 바로 알 수 있게 해 주지요.  
게다가 루프에서는 연산 순서를 자세하 작성해야 하지만 스트림은 결과만 맞으면 원하는 방식으로 연산을 운용할 수도 있습니다.  


#### - 스트림의 생성 

```java
    String str = "When one thinks of the labors which the the English have devoted to digging the tunnel under the Thames, the tremendous expenditure of energy involved, and then how a little accident may for a long time obstruct the entire enterprise, one will be able to form a fitting conception of this critical undertaking as a whole.";
    
    //배열을 사용한 스트림의 생성
    Stream<String> stream = Stream.of(str.split(" "));
    Stream<String> stream1 = Stream.of("a", "b", "c");
    
    //빈 스트림
    Stream<String> stream3 = Stream.empty();
    
    //컬렉션에서 생성
    Stream<String> stream4 = Arrays.asList(str.split(" ")).stream();
```

Collection Interface의 stream 메소드를 이용하면 어느 컬렉션이든 스트림으로 변환할 수 있습니다.  
또한 일반 변수나 배열은 Stream.of를 이용하면 스트림으로 생성 가능 합니다.  
빈 스트림은 Stream.empty();로 생성 가능 합니다.  

```java
    Stream<String> stream5 = Pattern.compile(" ").splitAsStream("hello world");
    stream5.forEach(System.out::println); //hello world
```

또한 자바 API의 여러 메소드들은 스트림을 돌려주는데요. Patten에 있는 splitAsStream을 이용해서도 Stream을 생성할 수 있습니다.
<br>
<br>

#### - 자주 사용되는 메소드들 

스트림 메소드 중 자주 사용되는 메소드를 알아볼게요. 

```java
    Integer [] intArr = new Integer [] { 1, 2, 3, 4, 5 };
    
    System.out.println(intArr); //1, 2, 3, 4, 5

    Stream<Integer> intStream = Stream.of(1, 2, 3, 4, 5).map(v -> v + 1);

    System.out.println(intArr); //1, 2, 3, 4, 5

    intStream.forEach(System.out::println); //2, 3, 4, 5, 6
```

스트림 변환은 또 다른 스트림에 들어 있는 요소에서 파생된 요소의 스트림을 만들어 냅니다.  
이 중 map 메소드는 원본 스트림에서 새로운 스트림을 mapping 해서 돌려 줍니다.  
언제나 새로운 스트림이 생성되어지는 것이죠.  
 
 
```java
Stream<Integer> intStream1 = Stream.of(intArr).filter(v -> v > 3);

intStream1.forEach(System.out::println); //4, 5

```

filter 메소드의 인자는 Predicate<T> 입니다.  
즉 T를 인자로 받아서 boolean을 return 해줍니다.  


```java
    public static <T> Stream<T> getLetterStream(T... t) {
        return Stream.of(t);
    }
```

flatMap을 설명하기 전에 위와 같은 메소드를 하나 만들어 두겠습니다.  

```java
    String str = "hello world";
    
    Stream<Stream<String>> stream6 = Pattern.compile("").splitAsStream(str).map(s -> getLetterStream(s));
    
    stream6.forEach(System.out::println); //Stream, Stream
```

위 코드를 실행해보면 [ [ "h", "e", "l", "o" ], [ "w", "o", "r", "l", "d" ] ] 라는 스트림이 생성됩니다.  
이 스트림을 하나의 문자열 스트림으로 펼쳐내려면 flatMap을 사용하면 됩니다  

```java
    String str = "hello world";
    
    Stream<Stream<String>> stream6 = Pattern.compile("").splitAsStream(str).flatMap(s -> getLetterStream(s));
    
    stream6.forEach(System.out::println); //h e l l o w o r l d 
```

두 개의 스트림을 하나의 스트림으로 만들어 줍니다.  

```java
    Stream<String> stream7 = Stream.concat(getLetterStream("Hello".split("")), getLetterStream("World".split("")));
    stream7.forEach(System.out::println); //H e l l o W o r l d
```

flatMap처럼 두개의 스트림을 합쳐주는 메소드로는 concat이 있습니다.  인자로 Stream을 넘겨받아, 하나의 Stream으로 변환시켜줍니다.  


```java
    //reduce
    System.out.println(
        Stream.iterate(1, v -> v + 1).limit(100).reduce(0, (v1, v2) -> v1 + v2).intValue() //5050
    );
```

reduce는 줄이다라는 의미를 가진 메소드입니다.  
첫번째 매개변수로 seed 값을 전달하고, 해당 값부터 시작하여 주어진 값들을 처리한 뒤 결과를 돌려주게 됩니다. 


#### - Collection을 반환하자 !

모든 Collection 에서 Stream을 사용할 수 있다는 점은 알겠지만, 어떠한 스트림 연산을 마친 뒤 결과를 Array또는 Collection등으로 반환해야 하는 경우가 더 많을 겁니다.  
그럼 몇가지 예제를 통해서 어떤식으로 결과를 모아야하는지 알아볼까요.  

```java
    //Array
    int [] integerArr = Stream.iterate(1, v -> v + 1).limit(10).mapToInt(v -> v).toArray();
    
    for(Integer i : integerArr)
        System.out.println(integerArr); // 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
```

우리는 앞서 Stream.of(Array)를 통하여 배열을 스트림으로 변환할 수 있다는점을 알았습니다.  
마찬가지로 toArray 메소드를 통하여 기본 타입 배열을 반환할 수 있습니다.  

```java
    //List
    List<Integer> list = Stream.iterate(1, v -> v + 1).limit(100).collect(Collectors.toList());
```

List객체는 collect메소드를 통하여 반환할 수 있습니다.  

```java
    //Map
    Map<String, Human> humanMap =
            Stream.iterate(0, v -> v + 1)
            .limit(20)
            .map(v -> {
                StringBuilder name = new StringBuilder("name-");
                name.append(v);

                return new Human(name.toString(), Long.parseLong(v.toString()));
            })
            .collect(Collectors.toMap(Human::getName, Function.identity()));
```

Map의 경우에는 toMap 메소드를 통하여 반환할 수 있는데, 각각 인자로 key와 value를 전달받습니다.  
만약 값으로 객체 자신이 되어야 한다면, v -> v 로도 처리할 수 있지만, Function.identity를 사용할 수 있습니다.  


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
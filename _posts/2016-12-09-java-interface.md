---

layout: post
title: JAVA 8 Interface
date: 2016-12-09 15:00:00
image: '/assets/img/'
main-class: 'java'
tags: 
- JAVA8
- Interface

introduction: '- JAVA8 Interface -'

---

### - JAVA8 Interface에 관하여

자바8 에 접어들면서 가장 크게 변한 부분이 바로 interface가 아닐까 싶습니다.  
오늘은 어떤식으로 interface가 변경되었고 또 어떤식으로 응용이 가능한지에 대해 정리해보았습니다.

```java
    public interface myInterface {
        public void method(); 
    }
```

자바 8 이전의 interface의 역할은 다중 상속을 지원하고, 표준 규격을 강제하며, 확장성과 유지보수성을 높이고 다형성을 지원하기 위해서 사용되었습니다.  
따라서 interface에는 메소드의 정의를 해놓은 추상메소드만이 존재할 수 있었습니다. 또한 변수를 선언할 수 있었지만, 권고하지 않았지요.  
**자바8의 인터페이스**는 어떻게 변경 되었는지 알아볼까요. 



#### - 인터페이스의 변수선언 및 메소드 구현

```java
    public interface InterfaceInnerVariable {
        int AGE2 = 28; 
        public static final int AGE = 30; //위 코드와 동일한 역할을 합니다.
    
        void getName(); 
    
        default int getCount(int value) {
            return InterfaceInnerVariable.AGE + value;
        }
    
        default int getCount1(int value) {
            return InterfaceInnerVariable.AGE + value;
        }
    
        static String getNames() {
            return "Hello My Name is Dolen.";
        }
    }

```



이제는 인터페이스에 선언된 변수는 기본적으로 **public static final** 이 선언되어 집니다.  
즉 **public static final int AGE = 30; === int AGE = 30;** 이렇게 두 가지는 동일합니다.   
또한 인터페이스에는 **default**를 선언함으로서 메소드의 body부분을 구현할 수 있게 되었습니다.  
물론 **static**메소드 또한 구현할 수 있게 되었지요.  



#### - 상속 

```java
    class Extends implements InterfaceInnerVariable {
        @Override
        public void getName() {
            //method body 구현
        }
    }
    
    
    public class interfaceInnerVariableMain {
    
        public static void main(String[] args) {
               
               System.out.println(
                    new Extends().getCount(3) //33출력
               );
               
               System.out.println(
                    InterfaceInnerVariable.getNames() //Hello My Name is Dolen.
               );
        }
    
    }
```

상속은 동일하게 implements로 진행하시면 됩니다.  
하지만 자세히 보시면 @Override해야 하는 메소드가 1개 밖에 없는 것을 보실 수 있습니다.  
즉 인터페이스에 정의되어있는 추상메소드는 기존처럼 반드시 구현해야 하지만, default로 구현되어있는 메소드는 클래스를 상속받는 것처럼 그냥 사용할 수 있습니다.  
getCount()를 구현하지 않았음에도 33이 출력되는 것을 확인할 수 있기 때문이죠.  
물론 static 메소드의 경우에는 InterfaceInnerVariable 로 바로 접근이 가능하겠지요 :)  


#### - 다중상속

자바에서 인터페이스를 사용하는 또 다른 이유가 바로 다중상속을 구현하기 위해서인데요.  
그렇다면 동일한 메소드명을 가지고있는 인터페이스 2가지를 상속받았을때에는 어떻게 될까요??  
일단 인터페이스를 하나 더 만들어 보겠습니다. 


```java

    interface CommonStaticMethod {
        default int getCount(int value) {
            return 20 + value;
        }
    
        default int getCount1(long value) {
            return (int)(20 + value);
        }
    }
```


그리고 아까 만들어두었던 클래스에 상속시켜 볼까요 ?


```java
    class Extends implements InterfaceInnerVariable, CommonStaticMethod {
        @Override
        public void getName() {
            //do something..
        }
    
        @Override
        public int getCount(int value) {
            //메소드를 오버라이드하여 재정의 하거나, 하나의 인터페이스 메소드를 선택해 주어야 합니다 ! 
            return CommonStaticMethod.super.getCount(value); 
        }
    }
```

**InterfaceInnerVariable와 CommonStaticMethod**는 둘다 getCount() 메소드를 보유하고 있습니다.  
따라서 두 메소드는 충돌하게 되며, 반드시 상속받은 자식 객체에서 구현해주어야 합니다.  
하지만 이미 구현되어있는 인터페이스의 메소드를 그냥 사용하고 싶다면, **super**로 접근하여 하나의 인터페이스에 정의된 메소드를 호출하여 줍니다.  
이 과정에서 자세히 보시면, getCount1의 경우에는 메소드의 오버로딩 현상이 적용되고 있다는 것 또한 알아두시면 좋을 듯 합니다.

자바8 인터페이스 였습니다.  
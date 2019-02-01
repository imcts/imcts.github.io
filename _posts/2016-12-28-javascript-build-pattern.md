---
layout: post
title: 빌더 패턴.
date: 2016-12-27 20:00:00
img: pattern.jpg
---

### - Builder Pattern

`빌더 패턴`은 생성자에 들어갈 매개 변수가 많든 적든 차례차례 매개 변수를 받아들이고 모든 매개 변수를 받은 뒤에 이 변수들을 통합해서 한번에 생성하는 패턴을 말합니다.  

```java

public class BuildPattern {
    private final String name;
    private final String age;
    private String sex;
    private String height;

    private BuildPattern(Builder builder) {
        this.name = builder.name;
        this.age = builder.age;
        this.sex = builder.sex;
        this.height = builder.height;
    }

    public static class Builder {
        private final String name;
        private final String age;
        private String sex;
        private String height;

        public Builder(String name, String age) {
            this.name = name;
            this.age = age;
        }

        public Builder setSex(String sex) {
            this.sex = sex;
            return this;
        }

        public Builder setHeight(String height) {
            this.height = height;
            return this;
        }

        public BuildPattern build() {
            return new BuildPattern(this);
        }
    }
}


BuildPattern pattern = new BuildPattern.Builder("dolen", "30").setSex("man").setHeight("173").build(); //객체의 생성

```

이런식으로 객체를 생성하고 최종적으로 build()메소드를 수행함으로써 진짜 객체를 빌드하게 되는것이죠.

그래서 이 패턴을 자바스크립트에서는 어떻게 녹여볼 수 있을까 하고 고민하여 적용해 보았습니다.  



```javascript
class BuildTest {
    constructor(Builder) {
        this.name    = Builder.name; //필수
        this.age 	 = Builder.age;  //필수
        this.gen     = Builder.gen;
        this.address = Builder.address;
    }

    static Builder(name, age) {
        if(!name || !age)
            throw new Error('name, age is final value.');

        return {
            name,
            age,
            gen:     null,
            address: null,

            setName(v) {
                this.name = v;
                return this;
            },

            setAge(v) {
                this.age = v;
                return this;
            },

            setGen(v) {
                this.gen = v;
                return this;
            },

            setAddress(v) {
                this.address = v;
                return this;
            },

            build() {
                return new BuildTest(this);
            }
        };
    }
}

BuildTest
  .Builder('dolen', 30)
  .setGen('man')
  .build();
```

물론, ES6 문법을 활용하면 굳이 이렇게 해야할 필요는 전혀 없지만 (js는 정적언어가 아니기 때문에) 그래도 패턴을 활용하면 좀더 명확한 코드를 생산해낼 수 있을거라 생각하며 정리합니다.  

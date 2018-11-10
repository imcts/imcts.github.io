---

layout: post
title: ES6 - TEMPLATE LITERAL
date: 2018-11-09 02:00:00
image: '/assets/img/'
main-class: 'js'
description: 'ES6 Basic Study'
tags: 
- javascript
- template literal

introduction: '- javascript template literal -'
---

### 1. String 객체를 생성
```javascript
    let str1 = new String('string')
    let str2 = new String("string")
```
`JavaScript`에서 `String`은 원시타입`primitiv` 입니다. 그 자체로 값인 것이죠. 물론 전역 객체로서 `String` 또한 존재하기 때문에 `new`연산자를 사용하여 객체 형태로 생성되도록 
할 수도 있습니다. 이렇게 사용할 경우 객체가 매번 생성되어지기 때문에 추천하지 않는 방법이죠. 

```javascript
    console.log(str1 === str2) // false
``` 
뿐만 아니라 서로 객체의 주소값을 비교하기때문에 비교 연산자도 사용할 수 없습니다. 

### 2. String literal
```javascript
    let str1 = 'string';
    let str2 = "string";
```
`JavaScript`에서 문자열 리터럴을 표현하는 방법은 2가지가 있습니다. `"(쌍따옴표)`, `'(홑따옴표)`로 표현하고 싶은 문자열을 감싸는 방법이죠. 
두 가지 모두 익숙하게 사용하고 있는 문자열을 생성하는 표현식입니다만, 두개를 혼용해서 사용하는 경우도 있습니다. 

```javascript
    let inner1 = " '문자열 중간에 홑따옴표 표현' ";
    let inner2 = ' "문자열 중간에 쌍따옴표 표현" ';
```
표현식인 `"(쌍따옴표)`, `'(홑따옴표)`를 문자로서 사용하고 싶을때입니다. 

```javascript
    let backSlashSingle = '\'';
    let backSlashDual = '\"';
```
물론 문자로 만들어주는 `\(백슬러쉬)`를 사용하셔도 괜찮습니다. 

```javascript
    console.log('string' === "string") // true
```
문자열 리터럴은 그 자체로 값이기 때문에 비교연산자로도 비교할 수 있습니다. 

### 3. 문자열의 합성

```javascript
    let string = 'string';
    let number = 1
    
    console.log(string + number) // string1
```
`javascript`에서는 `+(더하기 연산자)`를 수행할 때 좌항이나 우항에 문자열 리터럴이 존재하는 경우 좌항 및 우항의 `toString`메소드를 호출한 값을 가지고 
문자열 합산을 수행 합니다. 그렇기 때문에 우리는 여러가지 문자열을 조합하여 다양한 표현을 할 수 있습니다. 그리고 이미 우리는 `HTML`문자열을 생성하거나 특정 형태의 
`template`기능을 만들어야 할때 익숙하게 사용하고 있습니다.

```javascript
    let html = '<html>'
    html += '<div>'
    html += '<span>'
    html += '안녕하세요. 반갑습니다.'
    html += '</span>'
    html += '</div>'
    html += '</html>'
    document.body.innerHTML = html
```
특정 문자열을 더하여 `HTML`문자열을 생성 하기도 하고

````javascript
    const NAME = 'dolen'
    
    let message = '안녕하십니까. \n'
    message += NAME
    message += ' 고객님.\n'
    message += '문의하신 내용은 온라인상으로는 처리가 어렵습니다.\n'
    message += '직접 내방해 주시기 바랍니다.'
    console.log(message)
    
    /*
      안녕하십니까.
      dolen 고객님.
      문의하신 내용은 온라인상으로는 처리가 어렵습니다.
      직접 내방해 주시기 바랍니다.
    `*
````
특정 변수의 문자열을 조합하여 메시지를 만들어 내기도 합니다. 우리는 이런 방법으로 원하는 결과를 얻어내지만 불편한 점도 많습니다. 
계속해서 `+=`연산자를 사용해야하고, 줄바꿈을 하려면 `\n`을 매번 추가해주어야 한다는 것은 코드를 작성 할때 많은 피로감을 느끼게 만들죠. 
그 뿐 아니라 한눈에 안들어오는 장황한 문자열 조합은 코드를 수정할 때에도 많은 시간과 노력을 들게 하곤 합니다.

#### 4. Template Literal
```javascript
    const string = `template literal string`
```
`ES6`에서 새로 추가된 템플릿 리터럴 문자열은 위에 언급했던 많은 불편함을 해소시켜 주며, 사용 방법 또한 무척이나 간단 합니다. 
기존의 `"(쌍따옴표)`, `'(홑따옴표)`대신 `` `(백틱)(키보드 숫자 1키 좌측에 위치. 물결무늬) ``으로 문자열을 감싸주기만 하면 됩니다.  

#### 5. Expression Interpolation
```javascript
    const NAME = 'dolen'
    const message = `
      안녕하십니까. 
      ${NAME} 고객님.
      문의하신 내용은 온라인상으로는 처리가 어렵습니다.
      직접 내방해 주시기 바랍니다.
    `
    console.log(message)
``` 
`ES6`애서 새로 추가된 템플릿 리터럴은 `삽입 표현식`을 지원 합니다. 사용방법은 `$`로 시작하고 `{}`중괄호를 열고 닫음으로 사용 할 수 있습니다. 
또한 삽입 표현식 안에는 `식`이라면 전부 전달할 수 있는데요. 그 어떤 식이라도 넣기만 하면 전달한 문자열과 조합하여 반환하게 됩니다.


#### 6. 중첩된 표현 방법
```javascript
    const a = 1
    const message = `${
      a === 1
      ? `a는 1입니까: ${true}`
      : `a는 1입니까: ${false}`
    }`
    console.log(message) // a는 1입니까: true
```
삽입 표현식 내부에서는 또 다시 템플릿 리터럴을 사용할 수 있습니다. 물론 그 안에서 다시 삽입 표현식을 사용할 수도 있습니다. 필요한 경우에 중첩 표현식을 사용하면 코드를 좀 더 쉽게 표현할 수 있게 되기도 합니다. 


#### 7. Multi Line 
```javascript
    const message = `
      문자열을
      자동으로
      개행해
      줍니다.
    `
    
    console.log(message)
    /*
      문자열을
      자동으로
      개행해
      줍니다.
     */
```
템플릿 리터럴은 문자열에 `\n`을 사용하지 않더라도 자동으로 문자열을 개행해 줍니다. 그렇다면 단순히 출력할 때에만 그렇게 보여주기만 하는 것일까요?

```javascript
    const message = `
      문자열을
      자동으로
      개행해
      줍니다.
    `
    message.indexOf('\n') // 0
    message.indexOf('문') // 7
```
`\n`을 넣어줄 뿐만 아니라 공백 문자열도 넣어주는 것을 확인할 수 있습니다. 

#### 8. Tagged Template Literals

```javascript
    const tag = (strings, ...values) => {
      const [first, second, third] = [...strings]
      const [firstValue, secondValue] = [...values]
      
      console.log(first) // 'Hello'
      console.log(second) // 'world'
      console.log(third) // ''

      console.log(firstValue) // 15
      console.log(secondValue) // 50
      
      return `
        ${first}: ${firstValue} 
        ${second}: ${secondValue}
      `
    }
    
    console.log(
      tag `Hello${15}world${50}`
    )
    
    /*
      Hello: 15  
      world: 50    
    */    
````

`Template literal` 의 더욱 발전된 한 형태는 `Tagged Template Literal` 입니다. 함수를 사용하여 반환값을 변경할 수 있습니다. 
사용법은 간단 합니다. 먼저 `tagged`함수를 하나 선언 합니다. 그리고 해당 함수를 `()`함수 실행으로 사용하는 것이 아니라, `함수명 + 템플릿 리터럴`을 기술 하는 것이 전부입니다. 
함수의 첫 번째 인자에는 문자열들이 들어있는 배열이 전달되고, 두 번째 인자부터는 삽입 표현식에 전달된 식들이 순차적으로 전달 됩니다. 함수 내부에서 반환된 최종문자열이 반환 됩니다. 

```javascript
    const tag = (strings, ...values) => {
      const max = Math.max(strings.length, values.length)
      let result = ''
      
      for (var i = 0; i < max; i++) {
        const str = strings[i]
        const value = values[i]
        
        if (str) {
          result += str
        }
        if (value) {
          result += ` my value is ${value} `
        }
      }
      return result
    }
    
    console.log(
      tag `Hello${15}world${50}`
    )
    
    // Hello my value is 15 world my value is 50 
```
삽입 표현식이 사용된 문자열에 대한 검증 또는 전처리 등의 기능을 수행할 때 유용하게 사용할 수 있을 것 같습니다. 

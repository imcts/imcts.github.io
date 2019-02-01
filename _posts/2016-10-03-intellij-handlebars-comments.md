---
layout: post
title: IntelliJ 유용한 설정들 !
date: 2016-10-03 20:00:00
img: tool.png
---

### Handlebars로 주석을 변경하는 방법 !! 

Handlebars 를 프로젝트에 적용해서 사용하다 보면, html 태그에 주석을 달아서 처리해야 할 일이 있지요 ? 

```code
<!--HTML 주석 입니다-->
```

보통 html에서는 이렇게 주석처리를 해서 사용하게 되는데요. 

handlebars에서는 그렇지 않거든요. 


```js
'{ {!----} }' <-- 이렇게 잘 보여집니다. 주석때문에 안보이길래 중괄호 시작과 끝을 { 한칸씩 띄웠습니다. } 
``` 


근데 매번 주석할때마다 저걸 다 치려면 너무 힘이 들어요 :(..

```code
Block Select + (Command + /)
```

그래서 이렇게 주석 단축키를 눌러보면 항상 HTML주석이 달립니다. 

그래서 포기하고 그냥 쓰는 분도 봤는데요. 

이걸 변경해 봅시다 ! 


```code
Preferences -> language & frameworks -> javascript -> templates
```  


![이미지](/images/intellij/intellij1.png)


위처럼 수정해 주시면 정상적으로 주석이 handlebars 용으로 달리게 됩니다 ! :)
 
 
 
 
### Live Template 

front-end 개발자로서 작업하면서 가장 많이 치는 코드가 뭘까요 ? 

저는 이겁니다.


```js
console.log();
```

매번 저거 다 치려다 보면 너무 힘이 든데요 T ^T..

저걸 쉽게 칠 수 있도록 해봅시다 ! 


```code
Preferences -> Editor -> Live Templates
```  

![이미지](/images/intellij/imtellij2.png)

이런식으로 설정하면 

```js
csl + TAP -> console.log(//cursor위치);
```

로 이용할 수 있습니다 ! 

각자 편한것들을 등록해서 사용해 보도록 해요 :) 


### Auto Code Style

코드를 치다보면 꽤나 귀찮은 작업들이 있을때가 많지요 ?? 

예를 들면 저 같은 경우에는 = 를 정렬 시키는걸 아주 좋아하는데요. 


```js
    const testA  = 3,
          testAA = 4;
          
          
    const object = {
        a:   333,
        aaa: 444,
        aa:  555
    };
    
    
```

이런식으로 말이죠 ! 

물론 이렇게 사용하지 않는 분들도 있지만, 개인적으로 javascript object의 선언이나 그런것들은 보기 명확해지는 경향이 있더라구요.


근데 매번 스페이스 쳐가면서 indent 맞춰주기에는 너무 힘이 드니까 좀더 쉬운 방법을 찾아 봅시다 ! 


```code
Preferences -> Editor -> Code Style -> JavaScript > Other
```  

![이미지](/images/intellij/intellij3.png)

이 화면으로 가셔서 본인이 편한대로 설정해 주시구요 !

변경하고 싶은 코드들을 블록 해 주시구요 ! 

```code
Command + option + L 
```  

을 눌러주시면 내가 설정해놓은 컨벤션 대로 코드가 수정이 됩니다 ! 
 

 
 

### Power Code 

불꽃 타이핑 !! 불꽃 타이핑을 쳐봅시다아 !! 

**[불꽃 타이핑 플러그인](https://plugins.jetbrains.com/plugin/8251?pr=)** 여기에 들어가서 플러그인 적용법을 확인할 수 있습니다.

```code
Preferences -> Appearance & Behavior -> POWER MODE II
```  

![이미지](/images/intellij/intellij4.png)

해당 설정화면에서 다양한 효과들을 설정할 수 있습니다.


![이미지](/images/intellij/intellij5.png)

**적용샷!!** 입니다.


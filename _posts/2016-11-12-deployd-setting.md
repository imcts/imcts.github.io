---
layout: post
title: MONGODB를 쉽게 사용하게 해주는 DEPLOYD
date: 2016-11-12 20:00:00
img: tool.png
---

[DEPLOYD 사이트](http://deployd.com)<br>
[DEPLOYD DOCUMENT](http://docs.deployd.com/docs/)<br

deployd 에 접속하여 보면 간단한 소개 동영상과 함께 document등이 있으니 참고하길 바랍니다.  
먼저 deployd는 mongodb를 사용하여 동작하므로 mongodb를 설치해볼까요 ? 
  
[MONGODB WINDOW](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)<br
[MONGODB MAC OS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) <br>
[MONGODB LINUX](https://docs.mongodb.com/manual/administration/install-on-linux/) <br>

  
저의 경우에는 MAC 을 사용하니 MAC 설치방법에 대해서 볼까요 ?   

```cli
brew update
brew install mongodb
```  

MAC OS의 경우에는 이것으로 끝 입니다.   
WINDOW의 경우에는 별도의 환경변수를 설정해주시면 됩니다.   
그다음에는 deployd를 설치해주어야 하는데요.   
deployd는 npm 으로 설치가능합니다.  

```cli
npm install deployd -g
```


설치가 성공적으로 완료가 되었으면 이제 실행해볼 차례 입니다.   
deployd를 설치할 폴더 아무곳이나 이동해주세요.   
그리고 명령어를 입력해주시면 됩니다.   

```cli
dpd create [폴더명]
```

deployd 라고 이름짓고 생성해보겠습니다.  

![이미지](/resources/images/library/deployd/1.png)  

폴더가 예쁘게 만들어졌죠 ? 
이제 해당 폴더로 이동 한 후 실행 시키면 됩니다.

```cli
cd deployd
dpd -d 
```

dpd로 실행하면 별도의 dash board창이 오픈되지는 않고, dpd -d 로 실행하시면 dashboard 페이지가 등장합니다. 

![이미지](/resources/images/library/deployd/2.png)  
  
그러면 이제 DB Collection (RDB 기준으로는 TABLE) 을 생성해볼까요 ? 

![이미지](/resources/images/library/deployd/3.png)  

Collection을 클릭합니다.   

![이미지](/resources/images/library/deployd/4.png)

원하는 컬렉션명을 적어주신 후 엔터를 입력하는 것만으로 테이블 생성이 완료 됩니다.  
이제 Properties를 클릭하여 column을 생성할 차례 입니다.  

![이미지](/resources/images/library/deployd/5.png)

컬럼별로 데이터 타입을 지정할 수 있으니 원하는 타입의 데이터 column을 설정하시면 됩니다.  
이제 데이터를 넣어볼까요 ?    

![이미지](/resources/images/library/deployd/6.png)

데이터 타입에 맞춰서 입력하시면 됩니다.   
mongodb 특성상 ID는 자동으로 입력해 주니 신경쓰지 맙시다. 

![이미지](/resources/images/library/deployd/7.png)

API를 기본적으로 제공해 주니 저대로 request를 요청하면 됩니다.   
GET요청을 한번 해볼까요 ??   

![이미지](/resources/images/library/deployd/8.png)

deployd 였습니다. :)

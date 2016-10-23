---
layout: post
title: 수포자가 필요해서 정리하는 수학공식 -비례식- 
categories: [Math]
tags: [비례식]
comments: true
share: true
---

가로값:세로값 = 변경된가로값:세로값;

**비례식**에대해 알아보게된 이유는 별다른게 아니었습니다. 필요했기 때문이죠. 

```html
<div id="parent" class="parent">
    <img id="profile" class="children" src="url"/>
</div>
```

위와 같은 상황이었을때 이미지를 상황에 따라서 가운데 정렬을 하고 싶었거든요. 

물론 **css**를 사용하여 정렬할 수도 있습니다. 

이미지 태그를 사용하는게 아니라, 백그라운드를 사용하는게 그것이지요.

```css
.parent {
    background: #fff url("url") no-repeat;
    background-size: cover;
}
```


또는 이런 방법도 있을 수 있겠네요 ! 


```css
.parent {
    position: relative; 
    width: 100px;
    height: 100px;
    overflow: hidden;
}

.children {
    position: absolute;
    top: 50%;
    left: 50%;
}
```

```js
const parent = document.getElementById('parent');
const img = document.getElementById('profile');
 
img.style.marginLeft = img.width / 2;
img.style.marginTop  = img.height / 2;
```

이렇게 말이죠. 

이미지를 절반씩 밀어놓고 이미지의 절반만큼 좌측으로 밀어넣고, 위로 밀어올리는 방법입니다. 

하지만 이 방법은 이미지의 크기가 일정하거나, 특정하게 리사이징 될 필요가 없을때에나 가능한 방법이지요.. 



문제는 가로 사이즈가 더 길 수도 있고, 세로 사이즈가 더 길 수도 있을때에 일어났습니다. 

가로가 몇이 들어올지 세로가 몇이 들어올지 알 수 없을때, 이미지의 가로값과 세로값에 따라서 중앙 정렬을 하게 되면 이미지가 뭉개지는 현상이 발생하죠 ?

![이미지가 깨지는 것](/resources/images/math/ratio_screen_shot.png)

바로 이렇게 말이죠 !

아래이미지가 원본이미지인데, 위 이미지의 width를 조정했더니 깨져보이는거죠. 


이런걸 어떻게 하면 가로 세로사이즈에 맞춰 이미지를 확장하거나 줄이거나 할 수 있을까를 고민하다보니 비례식에 도달하게 되었습니다.


예를들어 원본이미지가 1024 * 900 이었는데 부모 div 의 크기는 100 * 100 인 상황인거죠. 


위 이미지는 가로가 더 긴 이미지이기 때문에, 세로를 부모의 높이값에 맞춰서 100px로 변경해주고, 가로를 그 비율에 맞춰 축소시킨 다음에 좌우의 가운데 정렬을 하면 어떨까 ? 
 
만약 원본이미지가 900 * 1024 라면 원본의 세로이미지가 더 크다면 가로사이즈를 100px로 변경해주고 그 비율만큼 세로 이미지를 축소시킨 후 위아래를 정렬한다면 가운데 정렬이 되지 않을까 ? 

라는 생각에 도달하게 된 거죠. 



그럼 그 비율을 어떻게 측정할 수 있지 ? 

그걸 하기 위해 비례식이 필요합니다 ! 

이게 **비례식** 입니다.

![비례식](/resources/images/math/ratio1.jpg)

 
 
우선 가로사이즈가 큰 이미지를 100 * 100 의 부모안에 정렬해 봅시다.

가로사이즈가 큰 이미지니까 세로를 부모에 맞춰주고 가로의 좌우를 정렬 하겠습니다.

```js
let originWidth  = 1024;
let originHeight = 900;

let changeHeight = 100;


//1024:900 = x:100; //세로가 100으로 변경 되었을때 변경될 x값. 

let y = changeWidth * changeHeight / originHeight; 

console.log(y); //113.77777777777777
```


우리는 가로가 긴 이미지의 세로값을 100px로 축소했을때 가로값이 몇으로 변경되어야 비율이 깨지지 않고 작아질지를 알게 된 거죠 ! //113.77777777777777px 이면 되는군요 

그러면 부모의 가로값 에서 이미지의 가로값을 뺴면 차이를 얻을 수 있고 그 값을 2로 나누면 마진을 구할 수 있게 되겠지요 ? 해봅시다 !


```css
.parent {
    position: relative; 
    width: 100px;
    height: 100px;
    overflow: hidden;
}

.children {
    position: absolute; 
    top: 0; 
    left: 0;
}
```


```js
const parent = document.getElementById('parent');
const children = document.getElementById('children');

let marginLeft = (parent.offsetWidth - x) / 2;

children.style.width = 'auto';
children.style.height = '100%';
children.style.marginLeft = marginLeft;
```

이렇게 사용할 수 있겠습니다. 


이걸 함수화 시켜보자면 이렇게 쓸 수 있겠네요 ! 

```js
function setImagePosition(parent, src) {
    var image = new Image();
    image.src = src;
    image.onload = onload;

    function onload() {
        var imgWidth     = image.width,
            imgHeight    = image.height,
            parentWidth  = parent.offsetWidth,
            parentHeight = parent.offsetHeight;

        if(imgWidth > imgHeight) {
            image.style.width = 'auto';
            image.style.height = '100%';
            image.marginLeft = - (imgWidth * parentHeight / imgHeight - parentWidth) / 2;
        } else {
            image.style.width = '100%';
            image.style.height = 'auto';
            image.style.marginTop = - (imgHeight * parentWidth / imgWidth - parentHeight) / 2;
        }
    }
}
```


부모의 사이즈가 500px * 500px 이고 

원본 이미지가 1280px * 722px로 테스트해볼까요 ?


![결과이미지](/resources/images/math/ratio_screen_shot2.png)


예쁘게 중앙에 정렬되었죠 :) 


**비례식** 이었습니다.
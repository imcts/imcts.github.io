---

layout: post
title: Debugging Node.js.
date: 2019-01-24 20:00:00
img: tool.png
---

## Debugging
자바스크립트로 개발하다보면 `console.log`함수나 `debugger`를 사용하여 디버깅 하는 경우가 많이 있습니다. 웹브라우저에서는 `Chrome`개발자 도구가 워낙 잘 지원해주기 때문에 편리하게 사용하고 있지만 
`Node.js`서버에서의 디버깅은 크게 신경쓰지 않고 `console.log`만 사용하여 디버깅하곤 했습니다. 하지만 `console.log`만을 사용하여 디버깅할 경우 생산성이 많이 저하 되고 시간도 오래 걸리므로 
`Node.js`에서 쉽게 디버깅하는 방법에 대해 알아보고 정리하고자 합니다. 

### Chrome Inspector
![이미지](/images/node-debugger/debugger1.png)
`Chrome`에서 디버깅을 수행하기 위해 이미지와 같은 구조를 갖는 [`Node Express`](https://github.com/imcts/express-boiler-plate) 프로젝트를 생성 합니다. 

<br><br><br>
![이미지](/images/node-debugger/debugger2.png)
크롬 브라우저를 실행하여 주소창에 `chrome://inspect`을 입력합니다. 

<br><br><br>
![이미지](/images/node-debugger/debugger3.png)<br>
기본적으로 디버깅 포트는 `9229`로 설정되어 있습니다. `configue`버튼을 선택하여 `localhost:9229`를 입력 합니다.
<br>
```bash
// default 9229 port
node --inspect bin/www

// custom port
node --inspect=port bin/www
```
`--inspect`옵션을 추가하여 `debugging`모드의 `node`서버를 실행합니다. 
<br><br><br>
![이미지](/images/node-debugger/debugger4.png)
`chrome://inspect`화면을 새로고침하면 방금 실행한 노드서버가 노출되는 것을 확인할 수 있습니다. 
<br><br><br>
![이미지](/images/node-debugger/debugger5.png)
`inspect`를 클릭하면 `debugger`화면이 노출되는데 좌측 폴더 목록에 `workspace`가 비어있습니다. 
<br><br><br>
![이미지](/images/node-debugger/debugger6.png)
`+Add folder to workspace`를 선택하여 `local`경로의 프로젝트 `root`경로를 선택합니다.
<br><br><br>
![이미지](/images/node-debugger/debugger7.png)
<br>작업하고 있는 `project`의 폴더목록이 전부 추가된 것을 확인할 수 있습니다. 
<br><br><br>
![이미지](/images/node-debugger/debugger8.png)
`chrome inspector`에서 `debugger`를 입력 후 화면을 새로고침 했을때 정상적으로 동작하는 것을 확인할 수 있습니다. 
<br><br><br>
![이미지](/images/node-debugger/debugger9.png)
`inspector`에서 변경한 코드가 `local`의 실제 파일에도 반영되는 것을 확인할 수 있습니다. 

좀 더 자세한 내용은 [Debugger Document](https://nodejs.org/api/debugger.html)에서 확인할 수 있습니다.


### IntelliJ Inspector<br><br><br>
![이미지](/images/node-debugger/debugger10.png)
`IntellJ`에서 `NodeJs`를 디버깅하기 위해 `Preference -> Plugins`메뉴에서 `NodeJs`플러그인을 설치해 줍니다.
<br><br><br>
![이미지](/images/node-debugger/debugger11.png)
우측 상단의 `Edit Configuration`을 클릭합니다. 
<br><br><br>
![이미지](/images/node-debugger/debugger12.png)
`NodeJs`용 설정을 하나 추가하고 `entry file`경로를 입력 합니다. 
<br><br><br>
![이미지](/images/node-debugger/debugger13.png)
`Debugger`모드로 `express`를 실행합니다. 
<br><br><br>
![이미지](/images/node-debugger/debugger14.png)<br><br><br>
![이미지](/images/node-debugger/debugger15.png)
`Break Point`를 설정하여 디버깅을 수행할 수 있으며 자세한 내용은 [IntelliJ Debugger Document](https://www.jetbrains.com/help/idea/running-and-debugging-node-js.html)에서 확인할 수 있습니다.

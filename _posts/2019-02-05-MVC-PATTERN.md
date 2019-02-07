---
layout: post
title: MVC PATTERN
date: 2019-02-05 20:00:00
img: pattern.jpg
--- 

`MVC`패턴을 사용하여 `TODO`앱을 작성해보고 그 과정에서 `MVC`패턴에 대해 정리하고 이해해 봅니다.  
<br>
디자인 패턴에서는 `MVC Pattern`처럼 여러가지 패턴들을 사용하여 새로운 형태의 패턴을 생성하는 경우 [Composite Pattern](https://en.wikipedia.org/wiki/Composite_pattern)이라고 부릅니다. 
그렇다면 단순히 패턴을 조합하여 새로운 패턴을 생성하면 무조건 패턴이라고 불리는가하면 그렇지는 않습니다. `MVC Pattern`처럼 어떠한 형태의 패턴이 남들에게 명확하게 인식될 수 있을때에만 패턴이라고 말하며 디자인 패턴의 궁극적인 목표는 그 상황에 맞는 새로운 `Composite Pattern`을 만들어내는 것에 있습니다.  
<br>
그럼 우리는 `왜 패턴을 배워야 할까요?` 많은 선배 개발자분들이 만들어놓으신 패턴을 습득하면 좀 더 쉽고 빠르게 원하는 결과물을 작성할 수 있기 때문입니다. 
<br><br>

<h2>The Origin MVC</h2>
![이미지](/images/2019-02-05-MVC-PATTERN/mvc1.png) <br>
`MVC`패턴은 역사상 2가지 종류로 분류할 수 있습니다. 먼저 예전에 많이 사용되던 `Model`과 `View`가 직접적으로 관계하며 통신하는 방식의 `MVC`패턴입니다. 
`View`는 `Visualization`을 담당하고 사용자의 인터렉션을 `Controller`에게 알리는 역할을 합니다. `Controller`는 `View`에서 전달된 요청에 반응하여 순수한 데이터 집합체인 `Model`을 변경하고 
`Model`은 데이터의 변경이 완료 되면 `View`를 호출하여 화면을 갱신합니다. 

<br><br>
<h2>Recently MVC</h2>
<br>
![이미지](/images/2019-02-05-MVC-PATTERN/mvc2.png) <br>
근래에 우리가 알고 있는 많은 프레임워크들에서 가장 많이 사용되고 있는 `MVC`패턴은 `제왕적 컨트롤러`방식의 `MVC Pattern` 입니다.  
<br>
`Controller`는 자신이 소비할 `Model`과 `View`를 생성하거나 섭외해야할 책임을 갖습니다. 상용 서비스에서는 `service`나 `dispatcher`를 통하여 `Model`을 제공 받기도 합니다.   
<br>
`Model`은 순수한 데이터를 표현하며 자신이 소유하고 있는 데이터의 변경이 일어날때마다 `Controller`에게 알려야 할 책임을 갖습니다. 
보통 `MVC`패턴을 구성을할 때 `Model`은 `Controller`를 직접적으로 알지 못하므로 `Observer Pattern`을 활용하여 `Controller`에게 상태를 알리게 됩니다.  
<br>
`View`는 `Controller`가 전달해준 `Model`을 기반으로 화면을 구성 하고 `User Interaction`을 받아들입니다.  
<br>

> `View`는 화면을 구성하여 `User Interaction`을 `Controller`에게 전파하고 `Controller`는 `Model`의 데이터를 변경하며 `Model`이 변경되면 `View`를 사용하여 화면을 재구성하는 순환구조를 갖게 됩니다. 

<br>
`Controller`는 누가 만들어줄까요? 바로 `App`입니다. `App`은 여러가지로 이름으로 사용되는데 `Application`, `Dispatcher`, `Servlet Dispatcher`등 많은 이름이 있지만 일반적으로 `Router`를 사용합니다. 
`Router`는 중앙에서 주어진 상황에 따라 필요한 `Controller`를 섭외하고 `Controller`에게 해야할 일을 위임하는 역할을 담당합니다.   
<br>
<br>

<h2>Why do we use this pattern for programing?</h2>
`MVC`패턴을 사용하는 궁극적인 이유는 `Model`과 `View`의 `변화율`이 다르기 때문입니다. `Model`이 수정되는 빈도나 `View`가 수정되는 빈도가 다르기 때문에 두개의 로직이 한데 뒤엉켜 있으면 
프로그램에 변화가 발생했을때 대응하기가 쉽지 않습니다. 우리는 보통 서로 다른 두 객체의 `변화율`이 다를때 각 역할에 맞는 객체로 분리하고 두 객체 사이에 `protocol`을 둡니다. `MVC`패턴에서는 `protocol`역할을 담당하는 객체가 바로 
`Controller`입니다.  
<br>
그럼 왜 `제왕적 컨트롤러`라고 불릴까요. `Router`가 `Controller`를 생성하긴 하지만 `Router`는 초기의 진입점 역할만 해 줄뿐 모든 책임은 `Controller`에게 있습니다. 
`Model`과 `View`의 생성 및 연동의 책임을 `Controller`가 전부 갖기 때문입니다.  
<br>
`Controller`는 너무 많은 책임을 갖기 때문에 엄청나게 거대해질 수 밖에 없습니다. 
`Controller`의 크기를 줄이려면 `Component Pattern`을 활용하여 작은 역할 단위로 `Controller`를 분리하는 방법 외에는 없습니다. 
<br>
<br>
<br>

<h2>What are we going to be supposed to do?</h2>
<br>
![이미지](/images/2019-02-05-MVC-PATTERN/example1.png) <br>
`ES6`를 활용하여 간단한 `TODO`를 작성하고 앞서 설명한 `MVC`패턴을 이해해 봅니다. 
예제코드가 `ES6`로 작성되어 있기 때문에 때문에 각 항목별로 최대한 상세하게 설명 합니다. 

> 1. 왼쪽의 할일목록들은 `folder`명 입니다.
> 2. 오른쪽의 목록들은 선택된 폴더에 속해 있는 `Task`목록 입니다.
> 3. `Task`는 `Sub Task`를 보유할 수 있습니다.
> 4. `Task`를 선택하여 완료 여부를 표현할 수 있습니다.  
> 5. `X`를 클릭하여 `Task`목록을 삭제할 수 있습니다. 
       
<br>
<br>

<h3>Observer</h3>
```javascript
const Observer = class extends Set {
  addListener (listener) {
    super.add(listener)
  }

  removeListener (listener) {
    super.delete(listener)
  }

  notify () {
    this.forEach(v => v.listen(this))
  }

  listen () {throw 1}
  
  has () {throw 1}
  delete () {throw 1}
  add () {throw 1}
}
```
범용적으로 사용되어질 `Observer`를 정의합니다. `ES6`에 도입된 `Set`을 활용하여 `Observer`를 구현합니다. 
`Set`은 중복된 `Listener`를 자동으로 제거해주기 때문에 `Set`을 사용하면 쉽게 `Observer`를 구현할 수 있습니다.   

> 1. `addListener`와 `removeListener`는 `Listener`를 전달 받아 저장 및 삭제 합니다.  
> 2. `notify`는 `Set`에 저장되어 있는 `listener`를 순회하며 이벤트를 전파 하며 매개변수로 `this`를 전달합니다.
> 3. `listen`은 `Observer`를 상속받은 구상객체가 구현해야 하는 `추상메소드`입니다.   
> 4. `has`, `delete`, `add`메소드는 `Observer`를 `Set`처럼 사용하지 못하도록 `override`합니다.  

<br>
<br>

<h3>Model</h3>
````javascript
const Model = (() => {
  const PRIVATE = new WeakMap()

  return class extends Observer {
    constructor (props) {
      super()
      PRIVATE.set(this, Object.assign(Object.create(null), props))
    }

    get (key) {
      return PRIVATE.get(this)[key]
    }

    set (key, value) {
      const props = PRIVATE.get(this)
      if (props[key] !== value) {
        props[key] = value
      }
    }
  }
})()
````
`Model`은 순수한 데이터를 표현합니다. 자바스크립트는 언어적으로 `은닉화`를 지원하지 않으므로 `WeakMap`과 `closure`를 활용하여 `PRIVATE`변수를 선언 합니다.  
<br>
`Model`이 인스턴스화 되면 해당 객체를 `key`로 사용하여 `properties`를 저장하고 사용할 수 있도록 `은닉화`하고 외부에서 `properties`에 접근할 수 없도록 합니다.   

> 1. `constructor`에서는 전달받은 `properties`를 `PRIVATE`에 저장 합니다. 
> 2. `get`, `set`메소드는 `key`와 `value`를 전달받아 값을 반환하거나 저장 합니다.  

<br>
<br>

<h3>Task</h3>
````javascript
const Task = class extends Model {
  constructor (title) {
    super({
      title,
      complete: false,
      list: []
    })
  }

  listen () {
    this.notify()
  }

  toggle () {
    this.set('complete', !this.get('complete'))
    this.notify()
  }

  add (title) {
    const task = new Task(title)
    this.get('list').push(task)
    task.addListener(this)
    this.notify()
  }

  remove (task) {
    const list = this.get('list')
    if (!list.includes(task)) {
      return
    }
    list.splice(list.indexOf(task), 1)
    task.removeListener(this)
    this.notify()
  }

  list () {
    return {
      task: this,
      list: this.get('list').map(task => task.list())
    }
  }

  get title () {
    return this.get('title')
  }

  get isComplete () {
    return this.get('complete')
  }
}
````
`Todo`에서 사용되어질 `Model`의 구상객체인 `Task`를 정의합니다. 보통의 `Todo`프로그램에서는 `Task`하위에 `Sub Task`가 존재 할 수 있으며 `Sub Task`의 데이터가 변화하게 되면 화면을 다시 구성해야 합니다.  
<br>
`Task`는 데이터를 담당하는 `Model`이므로 자체적으로 화면을 갱신하는 책임을 가질 수 없습니다. `MVC Pattern`에서 화면을 갱신하는 역할은 `View`의 역할이고 `Model`이 
상태 변화를 알려야하는 대상은 `Controller`입니다.  
<br>
`Task Tree`내부의 어느곳에서 변화가 일어나면 지속적으로 상위 `Task`에게 전파하게 되며 최상단의 `Task`는 `Controller`에게 보고해야 하는 책임을 갖게 됩니다.  
<br>
`Controller`는 `Task`에게서 변경 이벤트가 발생하면 화면을 재구성할 수 있도록 `View`에게 요청 합니다. 

> 1. `constructor`에서는 할일을 나타내는 `title`과 `Task`의 완료여부를 나타내는 `complete`와 하위 목록을 나타내는 `list`를 저장 합니다.
> 2. `listen`은 `Sub Task`에서 이벤트가 발생하면 호출되며 자신을 구독하고 있는 다른 `observer`에게 상태를 전파합니다. 
> 3. `toggle`은 자신의 완료 여부를 변경하며 `notify`를 사용하여 데이터의 변경을 `observer`에게 전파 합니다. 
> 4. `add`는 새로운 `Task`를 생성하는 책임을 가집니다. `Task`가 생성되면 자신의 `list`에 추가하고 해당 `Task`를 구독 합니다. 
> 5. `remove`는 `Task`를 전달받아 자신이 가지고 있는 `list`에서 해당 `Task`를 제거하고 구독을 취소 합니다. 
> 6. `list`는 자신이 보유하고 있는 자녀 목록을 재귀적으로 순회하며 하위의 `Sub Task`목록을 반환 합니다. 

<br>
<br>

<h3>index.html</h3>
{% highlight html %}
<style>
    * {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
    }
    
    aside {
      float: left;
      width: 30%;
      padding: 10px;
      border: 1px solid black
    }
    
    main {
      float: left;
      width: 70%;
      padding: 10px;
      border: 1px solid black
    }
</style>

<aside>
    <ul id="folders"></ul>
    <input id="new-folder">
</aside>

<main>
    <ul id="folder"></ul>
    <input id="new-task">
</main>
{% endhighlight %}
`View`를 구성하기 전에 먼저 화면의 `Interface`를 작성 합니다. 

> 1. [aside](https://www.w3schools.com/tags/tag_aside.asp)태그는 `folder`목록을 표현할 영역 입니다.
> 2. [main](https://www.w3schools.com/tags/tag_main.asp)태그는 선택된 폴더의 `Task`를 표현할 영역 입니다. 

<br>
<br>

<h3>View</h3>
```javascript
const View = class {
  constructor (controller) {
    this.controller = controller
  }

  render (data) {throw 1}
}
```
`Model`을 정의한 후에는 `View`를 정의해야 합니다. `View`를 구성해야만 `Controller`에게 어떤 것들을 요청해야하는지 드러나기 때문 입니다. 
`MVC Pattern`의 `View`는 `Controller`에게 `Model`을 전달받아 화면을 구성하는 일을 전담하기 때문에 많은 책임을 갖게 되며 `Controller`처럼 코드가 거대해 집니다. 

> 1. `constructor`에서는 `User Interaction`이 발생하면 알려야할 `Controller`를 전달받고 저장 합니다.  
> 2. `render`는 `Controller`가 호출하게 될 `추상메소드`입니다. 


<br>
<br>

<h3>IndexView</h3>
```javascript
const IndexView = class extends View {
  constructor (controller) {
    super(controller)
    this.ul = document.getElementById('folders')
    document.getElementById('new-folder').onkeyup = e => {
      e.stopImmediatePropagation()
      if (e.keyCode !== 13) {
        return
      }
      const target = e.target
      this.controller.addFolder(target.value)
      target.value = ''
    }
  }

  render ({list}) {
    this.ul.innerHTML = ''
    list.forEach(({task}) => {
      const li = document.createElement('li')
      li.innerText = task.title
      this.ul.appendChild(li)
      li.onclick = () => this.controller.select(task)
    })
  }
}
```
화면 왼쪽의 `folder`목록을 구성할 `IndexView`를 작성 합니다. 

> 1. `constructor`에서는 `Controller`를 저장 하고 이벤트를 등록 합니다.  
> 2. `render`는 전달된 `list`를 순회하며 `li`태그를 만들어 화면을 구성하고 이벤트를 등록 합니다.  

<br>
<br>

<h3>FolderView</h3>
````javascript
const FolderView = class extends View {
  constructor (controller) {
    super(controller)
    this.ul = document.getElementById('folder')
    document.getElementById('new-task').onkeyup = e => {
      e.stopImmediatePropagation()
      if (e.keyCode !== 13) {
        return
      }
      const target = e.target
      this.controller.addTask(target.value)
      target.value = ''
    }
  }

  render ({task, list}) {
    this.ul.innerHTML = `<h2>${task.title}</h2>`
    this._render(this.ul, task, list)
  }

  _render (ul, parent, list) {
    list.forEach(({task, list}) => {
      const li = document.createElement('li')

      const title = li.appendChild(document.createElement('span'))
      title.innerText = task.title
      title.onclick = e => {
        e.stopImmediatePropagation()
        this.controller.toggle(task)
      }

      if (task.isComplete) {
        title.style.textDecoration = 'line-through'
      }
      const remove = li.appendChild(document.createElement('span'))
      remove.innerText = 'X'
      remove.onclick = () => this.controller.removeTask(parent, task)

      const input = li.appendChild(document.createElement('input'))
      input.onclick = e => e.stopImmediatePropagation()
      input.onkeyup = e => {
        if (e.keyCode !== 13) {
          return
        }
        const target = e.target
        this.controller.appendTask(task, target.value)
        target.value = ''
      }

      if (list.length) {
        this._render(li.appendChild(document.createElement('ul')), task, list)
      }

      ul.appendChild(li)
    })
  }
}
````
화면 우측의 `Task`목록을 구성할 `FolderView`를 작성 합니다.  
화면을 구성하는 코드이기에 길고 복잡할 수 있지만 천천히 살펴 봅니다. 

> 1. `constructor`에서는 `Controller`를 저장 하고 이벤트를 등록 합니다.
> 2. `render`에서는 인자로 전달된 `task`의 `title`을 `h2`태그를 이용하여 구성 합니다. 
> 3. `_render`는 `ul`태그와 `Parent Task`와 `list`를 전달받아 재귀적으로 `Task`목록을 표현 합니다. 
>   - `title`을 생성하고 `complete`여부에 따라 완료 여부를 표현하고 클릭할 때마다 `Controller`에게 알립니다. 
>   - `remove`를 생성하고 클릭할 때마다 `Controller`에게 알립니다. 
>   - `input`태그를 생성하고 `enter key`가 입력되면 `Controller`에게 알립니다.

<br>

<div class="alert alert-dismissible alert-warning">
  <h4>Don't do that !!</h4>
  <p>
    View를 작성하다보면 <strong>Controller</strong>에게 요청하지 않고 <strong>View</strong>에서 로직을 처리하는 경우가 있습니다. 
    그렇게 되면 <strong>MVC패턴의 구조</strong>가 무너지기 시작하고 나중에 어디에서 문제가 발생했는지 예측하기 힘들게 됩니다. 
  </p>
</div>

<br>
<br>

<h3>Controller</h3>
```javascript
const Controller = class extends Observer {
  constructor (router) {
    super()
    this.router = router
  }

  action () {throw 1}
}
```
`Controller`는 다른 `Controller`를 알 수 없습니다. 한가지 확실하게 알 수 있는 것은 `Controller`는 `Router`를 알고 있다는 것입니다. `Controller`는 자신이 수행해야할 역할이 아닌 경우 `Router`에게 보고합니다. 

> 1. `constructor`에서는 `Router`를 전달받아 저장 합니다. 
> 2. `action`메소드는 `Router`가 `Controller`를 호출할때 사용되며 구상객체가 반드 구현해야 하는 `추상메소드`입니다. 

<br>
<br>

<h3>IndexController</h3>
```javascript
const IndexController = class extends Controller {
  constructor (router) {
    super(router)
    this.model = Task.root || (Task.root = new Task('root'))
    this.model.addListener(this)
    this.view = new IndexView(this)
  }

  action () {
    this.view.render(this.model.list())
  }

  listen () {
    this.action()
  }

  addFolder (title) {
    this.model.add(title)
  }

  select (task) {
    this.router.route('folder', task)
  }
}
```
화면 왼쪽의 `folder`목록을 담당할 `IndexController`입니다. 

> 1. `constructor`에서는 `Router`를 전달받아 저장 하고 자기가 소비할 `Model`과 `View`를 생성하거나 섭외 합니다.
> 2. `action`은 `Router`가 호출하며 `View`에게 `Model`의 데이터를 전달하며 화면을 다시 구성하도록 요청 합니다.
> 3. `listen`은 `Task`에서 변경이 발생하면 호출되며 `action`를 실행 하여 화면을 다시 구성 합니다.
> 4. `addFolder`는 사용자가 새로운 폴더를 생성하려할때 호출되며 `Model`에게 새로운 `Folder`를 추가해달라고 요청합니다.
> 5. `select`는 사용자가 폴더를 선택했을때 실행되며 `Task`목록은 자신의 역할이 아니므로 `Router`에게 요청 합니다.

<br>
<br>

<h3>FolderController</h3>
```javascript
const FolderController = class extends Controller {
  constructor (router) {
    super(router)
    this.view = new FolderView(this)
  }

  action (model) {
    if (this.model) {
      this.model.removeListener(this)
    }

    this.model = model
    this.model.addListener(this)
    this.view.render(this.model.list())
  }

  listen () {
    this.view.render(this.model.list())
  }

  addTask (title) {
    if (!this.model) {
      return
    }
    this.model.add(title)
  }

  toggle (task) {
    task.toggle()
  }

  removeTask (parent, task) {
    parent.remove(task)
  }

  appendTask (parent, title) {
    parent.add(title)
  }
}
```
화면 오른쪽의 `Task`목록을 담당할 `FolderController`입니다. 

> 1. `constructor`에서는 `Router`를 전달받고 자신이 소비할 `View`를 생성 합니다.
> 2. `action`은 `폴더목록`이 선택되었을때 `Router`에 의해 호출되며 `Controller`가 소비할 `Model`이 같이 전달 됩니다. 
> 3. `listen`은 전달받은 `Model`의 상태가 변경되면 호출되며 `View`에게 화면을 재구성할 것을 요청 합니다.  
> 4. `addTask`는 사용자가 새로운 `Task`를 요청 했을때 호출되며 `Model`에게 `Task`추가를 요청 합니다. 
> 5. `toggle`은 사용자가 `Task`를 클릭할때 호출되며 `Model`에게 상태 변경을 요청 합니다. 
> 6. `removeTask`는 사용자가 `X`를 클릭했을때 호출되며 `Model`에게 `Task`삭제를 요청 합니다.
> 7. `appendTask`는 사용자가 `Sub Task`를 생성했을때 호출되며 `Model`에게 `Sub Task`생성을 요청 합니다. 

<br>
<br>

<h3>Router</h3>
```javascript
const Router = class extends Map {
  constructor () {
    super()
  }

  route (key, ...args) {
    this.get(key).action(...args)
  }
}
```
`App`의 역할을 수행하는 `Router`이며 `ES6`의 `Map`을 상속받아 구현합니다. 필요에 의해 `Controller`를 생성/섭외하며 각 `Controller`의 `action`메소드를 호출하여 `Controller`에게 할일을 전달 합니다.  

> 1. `route`는 전달된 `key`값을 통해 필요한 `Controller`를 섭외하고 해당 `Controller`에게 할일을 전달 합니다. 


<br>
<br>

<h3>Run</h3>
```javascript
const router = new Router()

router.set('index', new IndexController(router))
      .set('folder', new FolderController(router))
      .route('index')
```
이제 실행하는 코드를 작성해 봅니다. 
> 1. 진입점이 되는 `Router`를 생성합니다.
> 2. `Controller`를 생성하여 `Router`에 설정합니다. 

<br>
<br>

<h3>And then</h3>
`TODO`프로그램을 실행해 보면 의도했던대로 동작하는 것을 확인할 수 있습니다. 

`작성한 파일 목록`을 확인해 봅니다. 
> 1. Observer
> 2. Router
> 3. Model
> 4. View
> 5. Controller
> 6. Task
> 7. IndexVIew
> 8. FolderView
> 9. IndexController
> 10. FolderController

작성한 파일목록을 보면 굉장히 많은 코드를 작성한 것 같지만 파일별로 작성한 코드량을 확인해 보면 그렇지 않습니다.  

우리는 `TODO`라는 큰 프로그램을 10가지 관심사로 분리하여 작성할 수 있었습니다. 그리고 각 역할에 맞는 코드를 작성하고 조합했을 뿐인데도 `TODO`리스트를 완성할 수 있었습니다. 
`MVC Pattern`을 사용하는 이유는 단순히 코드를 짧고 간결하게 작성하는 것에 있지 않고 `관심사별로 코드를 나누고 관리`함으로써 프로그램의 `변화`에 쉽게 대응할 수 있게 되는 점에 있습니다. 


> [CodeSpitz 76 MVC 패턴](https://www.youtube.com/watch?v=cZUBuiPaogw&t=1041s)  
> [예제코드](https://github.com/imcts/imcts.github.io/tree/master/project/codespitz/mvc)

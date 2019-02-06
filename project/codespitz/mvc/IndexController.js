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

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

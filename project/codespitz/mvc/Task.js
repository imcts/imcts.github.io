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
    this._props.complete = !this._props.complete
    this.notify()
  }

  add (title) {
    const task = new Task(title)
    this._props.list.push(task)
    this.addListener(task)
    this.notify()
  }

  remove (task) {
    const list = this._props.list
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
      list: this._props.list.map(task => task.list())
    }
  }

  get title () {
    return this._props.title
  }

  get isComplete () {
    return this._props.complete
  }
}

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

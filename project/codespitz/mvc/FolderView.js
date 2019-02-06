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

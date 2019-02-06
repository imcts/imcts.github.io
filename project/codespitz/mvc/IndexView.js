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

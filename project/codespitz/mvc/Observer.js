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

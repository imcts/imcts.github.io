const Model = class extends Set {
  constructor (props) {
    super()
    this._props = Object.assign(Object.create(null), props)
  }

  // For Subject
  addListener (v) {
    super.add(v)
  }

  removeListener (v) {
    super.delete(v)
  }

  notify () {
    this.forEach(v => v.listen(this))
  }

  // For Observer
  listen () {throw 1}
  has () {throw 1}
  delete () {throw 1}
  add () {throw 1}
}

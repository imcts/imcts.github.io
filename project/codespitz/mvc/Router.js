const Router = class extends Map {
  constructor () {
    super()
  }

  route (key, ...args) {
    this.get(key).action(...args)
  }
}

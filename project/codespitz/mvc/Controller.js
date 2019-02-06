const Controller = class extends Observer {
  constructor (router) {
    super()
    this.router = router
  }

  action () {throw 1}
}

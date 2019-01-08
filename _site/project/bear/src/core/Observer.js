import $ from 'jquery'

const Observer = class {
  constructor () {
    this._$this = $(this)
  }

  subscribe (event, handler) {
    this._$this.on(event, handler)
  }

  dispatch (event) {
    this._$this.trigger(event)
  }
}

export default Observer

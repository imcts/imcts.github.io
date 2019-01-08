import Observer from './Observer'

const Model = class extends Observer{
  constructor (data) {
    super()
    this._model = Object.assign({}, data)
    this._event = this._getChangeEvent()
  }

  _getChangeEvent () {
    return {}
  }

  _get (key) {
    return this._model[key]
  }

  _set (key, value) {
    this._model[key] = value
    const event = this._event[key]
    if (event) {
      this.dispatch(event)
    }
  }
}

export default Model

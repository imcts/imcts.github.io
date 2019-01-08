import $ from 'jquery'
import Model from './Model'
import Observer from './Observer'
import { INVALID } from '../constant/message'

const View = class extends Observer {
  constructor (element, model) {
    if (!element) {
      throw new TypeError(INVALID.ELEMENT)
    }
    if (!(model instanceof Model)) {
      throw new TypeError(INVALID.MODEL)
    }
    super()
    this._$element = $(element)
    this._model = model
    this._refs = {}

    const template = this._getTemplate()
    if (template) {
      this._$element.html(template)
    }
    this._bindElement()
    this._bindEvent()
  }

  _getTemplate () {
    return ''
  }

  _bindElement () {
    Array.from(this.find('[class^=_]')).forEach(element => {
      const className = element.className.split(' ').shift()
      if (className) {
        const selector = className.substr(1)
                                  .split('_')
                                  .reduce((accumulator, str, index) => accumulator += index === 0 ? str : str[0].toUpperCase() + str.substr(1), '')
        this._refs[selector] = $(element)
      }
    })
  }

  find (selector) {
    return this._$element.find(selector)
  }

  _bindEvent () {
    Object.entries(this._getEvent()).forEach(([key, handler]) => {
      const configs = key.split(' ')
      const selector = configs.shift()
      const event = configs.pop()
      const childSelector = configs.join(' ')

      if (selector && event && handler) {
        let $element
        if (selector === 'window') {
          $element = $(window)
        } else {
          $element = this._refs[selector] || this.find(selector)
        }

        if ($element.length) {
          if (typeof handler !== 'function') {
            handler = this[handler]
          }

          handler = handler.bind(this)
          $element.on(event, childSelector, handler)
        }
      }
    })
  }

  _getEvent () {
    return {}
  }

  _listenToModel (event, handler) {
    this._model.subscribe(event, handler.bind(this))
  }
}

export default View

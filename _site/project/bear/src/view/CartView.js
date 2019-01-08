import View from '../core/View'
import { HIDE_CLASS } from '../constant/class'
import CartList from './component/list/CartList'
import { MENU_EVENT } from '../constant/menu'

const CartView = class extends View {
  constructor (element, model) {
    super(element, model)
    this._initChildren()
    this._subscribe()
  }

  _initChildren () {
    this._cartList = new CartList('#cart', this._model)
  }

  _subscribe () {
    this._cartList.subscribe(MENU_EVENT.SHOW_LIST_VIEW, () => this.dispatch(MENU_EVENT.SHOW_LIST_VIEW))
  }

  show () {
    this._$element.removeClass(HIDE_CLASS)
  }

  hide () {
    this._$element.addClass(HIDE_CLASS)
  }
}

export default CartView

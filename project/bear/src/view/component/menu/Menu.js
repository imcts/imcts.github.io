import View from '../../../core/View'
import { MENU_EVENT } from '../../../constant/menu'
import { ACTIVE_CLASS, HIDE_CLASS } from '../../../constant/class'
import { LIST_EVENT } from '../../../constant/list'
import { CART_EVENT } from '../../../constant/cart'

const Menu = class extends View {
  constructor (element, model) {
    super(element, model)
    this._subscribe()
  }

  _subscribe () {
    this._listenToModel(LIST_EVENT.BEAR_COUNT_CHANGED, this._changeCounter)
    this._listenToModel(CART_EVENT.CART_CLEARED, this._changeCounter)
  }

  _getEvent () {
    return {
      'listIcon click': this.showListView,
      'cartIcon click': this.showCartView
    }
  }

  showListView (e) {
    const {cartIcon, listIcon} = this._refs
    if (e) {
      e.preventDefault()
    }
    if (listIcon.hasClass(ACTIVE_CLASS)) {
      return
    }
    listIcon.addClass(ACTIVE_CLASS)
    cartIcon.removeClass(ACTIVE_CLASS)
    this.dispatch(MENU_EVENT.SHOW_LIST_VIEW)
  }

  showCartView (e) {
    const {cartIcon, listIcon} = this._refs
    if (e) {
      e.preventDefault()
    }
    if (cartIcon.hasClass(ACTIVE_CLASS)) {
      return
    }
    listIcon.removeClass(ACTIVE_CLASS)
    cartIcon.addClass(ACTIVE_CLASS)
    this.dispatch(MENU_EVENT.SHOW_CART_VIEW)
  }

  _changeCounter () {
    const count = this._model.getSelectedBearsCounter()
    const {cartCount} = this._refs
    if (count) {
      cartCount.removeClass(HIDE_CLASS).html(count)
    } else {
      cartCount.addClass(HIDE_CLASS)
    }
  }
}

export default Menu

import Dom from '../dom/Dom'
import View from '../core/View'
import ListView from './ListView'
import CartView from './CartView'
import Menu from './component/menu/Menu'
import { MENU_EVENT } from '../constant/menu'

const AppView = class extends View {
  constructor (element, model) {
    super(element, model)
    this._initChildren()
    this._subscribe()
  }

  _initChildren () {
    this._menu = new Menu('#menu', this._model)
    this._listView = new ListView('#bear_list', this._model)
    this._cartView = new CartView('#cart_list', this._model)
  }

  _subscribe () {
    this._menu.subscribe(MENU_EVENT.SHOW_LIST_VIEW, this._showListView.bind(this))
    this._menu.subscribe(MENU_EVENT.SHOW_CART_VIEW, this._showCartView.bind(this))
    this._cartView.subscribe(MENU_EVENT.SHOW_LIST_VIEW, () => {
      this._menu.showListView()
      this._showListView()
    })
  }

  _showListView () {
    this._cartView.hide()
    this._listView.show()
    Dom.scrollTo()
  }

  _showCartView () {
    this._listView.hide()
    this._cartView.show()
    Dom.scrollTo()
  }
}

export default AppView

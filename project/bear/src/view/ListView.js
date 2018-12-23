import View from '../core/View'
import TagList from './component/tag/TagList'
import BearList from './component/list/BearList'
import { HIDE_CLASS } from '../constant/class'

const ListView = class extends View {
  constructor (element, model) {
    super(element, model)
    this._initChildren()
  }

  _initChildren () {
    new TagList('#tag', this._model)
    new BearList('#bear', this._model)
  }

  show () {
    this._$element.removeClass(HIDE_CLASS)
  }

  hide () {
    this._$element.addClass(HIDE_CLASS)
  }
}

export default ListView

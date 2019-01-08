import $ from 'jquery'
import View from '../../../core/View'
import { ACTIVE_CLASS } from '../../../constant/class'

const TagList = class extends View {
  constructor (element, model) {
    super(element, model)
  }

  _getTemplate () {
    return this._model.tags.reduce((accumulator, tag) => {
      const $li = $('<li class="tag_list"></li>')
      const button = $(`<button class="_tag tag">${tag.name}</button>`)[0]
      button.tag = tag
      accumulator.append($li.append(button))
      return accumulator
    }, $('<ul></ul>'))
  }

  _getEvent () {
    return {
      '.tag click': this._onClickTag
    }
  }

  _onClickTag (e) {
    const target = e.target
    const {tag} = target
    if (!tag) {
      return
    }
    $(target).toggleClass(ACTIVE_CLASS)
    this._model.selectTag(tag)
  }
}

export default TagList

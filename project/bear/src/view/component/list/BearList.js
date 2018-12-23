import $ from 'jquery'
import Number from '../../../format/Number'
import View from '../../../core/View'
import { HIDE_CLASS } from '../../../constant/class'
import { LIST_EVENT } from '../../../constant/list'
import { TAG_EVENT } from '../../../constant/tag'
import { CART_EVENT } from '../../../constant/cart'

const BearList = class extends View {
  constructor (element, model) {
    super(element, model)
    this._subscribe()
  }

  _subscribe () {
    this._listenToModel(LIST_EVENT.BEAR_COUNT_CHANGED, this._render)
    this._listenToModel(LIST_EVENT.LIST_INDEX_CHANGED, this._render)
    this._listenToModel(TAG_EVENT.TAG_CHANGED, this._render)
    this._listenToModel(CART_EVENT.CART_CLEARED, this._render)
  }

  _getTemplate () {
    let $list = this._model.bears.reduce((accumulator, bear) => {
      const tags = bear.tags
      const lastIndex = tags.length - 1
      const tagHtml = tags.reduce((accumulator, tag, index) => {
        accumulator += tag.name
        if (index !== lastIndex) {
          accumulator += ', '
        }
        return accumulator
      }, '')
      const hasCart = bear.cart !== 0
      const cartHtml = hasCart ? `수량<span class="bear_cnt">${Number.koreanCurrency(bear.cart)}</span>`: ''
      const price = Number.koreanCurrency(bear.price)
      const stock = Number.koreanCurrency(bear.stock)
      const removeButtonClass = hasCart ? '' : HIDE_CLASS
      const $li = $(
        `<li class="bear">
          <div class="thumb">
            <img class="bear_thumb" src="${bear.image}" alt="맥주이미지">
          </div>
          <div class="bear_name">${bear.name}</div>
          <div class="bear_tag">${tagHtml}</div>
          <div class="bear_price">${price}<span class="bear_currency">원</span></div>
          <div class="bear_remain">
           재고<span class="bear_cnt">${stock}</span>
           ${cartHtml}
          </div>
          <div class="bear_btn_wrap">
            <button class="_bear_add bear_add">담기</button>
            <button class="_bear_remove bear_remove ${removeButtonClass}">빼기</button>
          </div>
        </li>`)
      const addButton = $li.find('._bear_add')[0]
      const removeButton = $li.find('._bear_remove')[0]
      addButton.bear = bear
      removeButton.bear = bear
      if (bear.stock === 0) {
        addButton.setAttribute('disabled', true)
      }
      accumulator.append($li)
      return accumulator
    }, $('<ul class="_bear_list"></ul>'))

    if (!this._refs.bearListWrap) {
      const wrap = $('<div class="_bear_list_wrap"></div>')
      wrap.append($list)
      wrap.append(`
        <div id="more" class="${this._model.hasNextList() ? '' : HIDE_CLASS}">
          <button class="_more_bears more_bear"><span class="more_txt">더보기 +</span></button>
        </div>`
      )
      return wrap
    }
    this.find('#more')[this._model.hasNextList() ? 'removeClass' : 'addClass'](HIDE_CLASS)
    return $list
  }

  _getEvent () {
    return {
      'bearListWrap ._bear_add click': this._onClickAdd,
      'bearListWrap ._bear_remove click': this._onClickRemove,
      'moreBears click': this._onClickMoreList
    }
  }

  _onClickAdd (e) {
    const target = e.target
    let bear = target.bear
    if (!bear) {
      return
    }
    this._model.appendBear(bear)
  }

  _onClickRemove (e) {
    const target = e.target
    let bear = target.bear
    if (!bear) {
      return
    }
    this._model.removeBear(bear)
  }

  _onClickMoreList (e) {
    this._model.setNextList()
  }

  _render () {
    this._refs.bearList.html(this._getTemplate())
  }
}

export default BearList

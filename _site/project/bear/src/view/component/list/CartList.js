import $ from 'jquery'
import Number from '../../../format/Number'
import View from '../../../core/View'
import { MENU_EVENT } from '../../../constant/menu'
import { LIST_EVENT } from '../../../constant/list'
import { CART_EVENT } from '../../../constant/cart'

const CartList = class extends View {
  constructor (element, model) {
    super(element, model)
    this._subscribe()
  }

  _subscribe () {
    this._listenToModel(LIST_EVENT.BEAR_COUNT_CHANGED, this._render)
    this._listenToModel(CART_EVENT.CART_CLEARED, this._render)
  }

  _getTemplate () {
    let html
    if (this._model.hasSelectedBears()) {
      html = this._getListTemplate()
    } else {
      html = this._getEmptyTemplate()
    }

    if (!this._refs.cartWrap) {
      const wrap = $('<div class="_cart_list_wrap"></div>')
      wrap.append(html)
      return wrap
    }
    return html
  }

  _getEmptyTemplate () {
    return `
    <ul class="_cart_list cart_list">
      <li id="empty">
        <div class="empty_thumb"></div>
        <div class="empty_title">카트가 비었습니다.</div>
        <div class="empty_content">목록에서 원하는 맥주를<br>카트 담아보세요.</div>
        <div class="empty_move"><button class="_empty_move empty_move_btn">목록으로 가기</button></div>
      </li>
    </ul>`
  }

  _getListTemplate () {
    const {count, money} = this._model.getPaymentInfo()
    let $list = this._model.selectedBears.reduce((accumulator, bear) => {
      const tags = bear.tags
      const lastIndex = tags.length - 1
      const tagHtml = tags.reduce((accumulator, tag, index) => {
        accumulator += tag.name
        if (index !== lastIndex) {
          accumulator += ', '
        }
        return accumulator
      }, '')
      const price = Number.koreanCurrency(bear.price)
      const cart = Number.koreanCurrency(bear.cart)
      const $li = $(`
        <li class="bear">
          <div class="thumb">
            <img class="bear_thumb" src="${bear.image}" alt="맥주이미지">
          </div>
          <div class="bear_name">${bear.name}</div>
          <div class="bear_tag">${tagHtml}</div>
          <div class="bear_price">${price}<span class="bear_currency">원</span></div>
          <div class="bear_remain">수량<span class="bear_cnt">${cart}</span></div>
          <div class="bear_btn_wrap">
            <button class="_bear_cancel bear_cancel">취소</button>
          </div>
        </li>
      `)
      const cancelButton = $li.find('._bear_cancel')[0]
      cancelButton.bear = bear
      accumulator.append($li)
      return accumulator
    }, $('<ul class="_cart_list cart_list"></ul>'))
    $list.append(`<li class="pay_count">총 구매수량 <span class="pay_number">${Number.koreanCurrency(count)}</span> 개</li>`)
    $list.append(`<li class="pay_content">총 결제금액 <span class="pay_number">${Number.koreanCurrency(money)}</span> 원</li>`)
    $list.append('<li class="pay_button_wrap"><button class="_pay_button pay_button">구매하기</button></li>')
    return $list
  }

  _getEvent () {
    return {
      'cartListWrap ._empty_move click': this._showListView,
      'cartListWrap ._bear_cancel click': this._onClickCancel,
      'cartListWrap ._pay_button click': this._onClickPayment
    }
  }

  _showListView () {
    this.dispatch(MENU_EVENT.SHOW_LIST_VIEW)
  }

  _onClickCancel (e) {
    const target = e.target
    let bear = target.bear
    if (!bear) {
      return
    }
    this._model.removeBear(e.target.bear)
  }

  _onClickPayment () {
    this._model.payBears()
  }

  _render () {
    this._refs.cartListWrap.html(this._getTemplate())
  }
}

export default CartList

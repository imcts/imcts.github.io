import Model from '../core/Model'
import { TAG_EVENT } from '../constant/tag'
import { LIST_EVENT } from '../constant/list'
import { CART_EVENT } from '../constant/cart'

const MAX_CART_COUNT = 99
const LIST_COUNT = 5

const AppModel = class extends Model {
  constructor (initialState) {
    super({
      tags: [],
      bears: [],
      selectedTags: [],
      selectedBears: [],
      listIndex: LIST_COUNT,
      ...initialState
    })
  }

  selectTag (tag) {
    const selectedTags = this._get('selectedTags')
    if (selectedTags.includes(tag)) {
      selectedTags.splice(selectedTags.findIndex(selectedTag => selectedTag === tag), 1)
    } else {
      selectedTags.push(tag)
    }
    this.dispatch(TAG_EVENT.TAG_CHANGED)
  }

  appendBear (bear) {
    const bears = this._get('bears')
    if (!bears.includes(bear)) {
      return
    }
    if (bear.stock === 0) {
      return
    }
    bear.stock -= 1
    bear.cart += 1

    const selectedBears = this._get('selectedBears')
    if (!selectedBears.includes(bear)) {
      selectedBears.push(bear)
    }
    this.dispatch(LIST_EVENT.BEAR_COUNT_CHANGED)
  }

  removeBear (bear) {
    const bears = this._get('bears')
    if (!bears.includes(bear)) {
      return
    }
    if (bear.cart === 0) {
      return
    }
    bear.stock += 1
    bear.cart -= 1

    const selectedBears = this._get('selectedBears')
    if (bear.cart === 0 && selectedBears.includes(bear)) {
      selectedBears.splice(selectedBears.findIndex(selectedBear => selectedBear === bear), 1)
    }
    this.dispatch(LIST_EVENT.BEAR_COUNT_CHANGED)
  }

  getSelectedBearsCounter () {
    const count = this._get('selectedBears').length
    if (count >= MAX_CART_COUNT) {
      return MAX_CART_COUNT + '+'
    }
    return count
  }

  hasNextList () {
    const start = this._get('listIndex')
    const end = start + LIST_COUNT
    return !!this._get('bears').slice(start, end).length
  }

  setNextList () {
    this._set('listIndex', this._get('listIndex') + LIST_COUNT)
    this.dispatch(LIST_EVENT.LIST_INDEX_CHANGED)
  }

  hasSelectedBears () {
    return !!this._get('selectedBears').length
  }

  getPaymentInfo () {
    let count = 0
    let money = 0
    this._get('selectedBears').forEach(({price, cart}) => {
      count += cart
      money += price * cart
    })
    return {
      count,
      money
    }
  }

  payBears () {
    const {count, money} = this.getPaymentInfo()
    console.log(`
      총 결제 수량: ${count}개
      총 결제 금액: ${money}원
      결제 완료 되었습니다.
    `)
    const selectedBears = this._get('selectedBears')
    const bears = this._get('bears')
    selectedBears.forEach(bear => {
      if (bears.includes(bear)) {
        bear.cart = 0
      }
    })
    selectedBears.length = 0
    this.dispatch(CART_EVENT.CART_CLEARED)
  }

  get tags () {
    return this._get('tags')
  }

  get bears () {
    const selectedTags = this._get('selectedTags')
    const getTagMatchedCount = (accumulator, tag) => {
      if (selectedTags.some(selectedTag => selectedTag.key === tag.key)) {
        accumulator += 1
      }
      return accumulator
    }
    return this._get('bears').slice(0, this._get('listIndex')).sort((source, target) => {
      const sourceMatchedCount = source.tags.reduce(getTagMatchedCount, 0)
      const targetMatchedCount = target.tags.reduce(getTagMatchedCount, 0)
      return targetMatchedCount - sourceMatchedCount
    })
  }

  get selectedBears () {
    return this._get('selectedBears')
  }
}

export default AppModel

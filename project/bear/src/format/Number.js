const Number = class {
  static koreanCurrency (price = '') {
    return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
}

export default Number

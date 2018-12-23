const Dom = class {
  static scrollTo (scroll = 0) {
    if (!window) {
      return
    }
    window.document.body.scrollTop = scroll
  }
}

export default Dom

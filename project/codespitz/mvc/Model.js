const Model = (() => {
  const PRIVATE = new WeakMap()

  return class extends Observer {
    constructor (props) {
      super()
      PRIVATE.set(this, Object.assign(Object.create(null), props))
    }

    get (key) {
      return PRIVATE.get(this)[key]
    }

    set (key, value) {
      const props = PRIVATE.get(this)
      if (props[key] !== value) {
        props[key] = value
      }
    }
  }
})()

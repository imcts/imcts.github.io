export const getTags = () => {
  return Promise.resolve([{
    key: 1,
    name: '라거'
  }, {
    key: 2,
    name: '에일'
  }, {
    key: 3,
    name: '람빅'
  }, {
    key: 4,
    name: '국산맥주'
  }, {
    key: 5,
    name: '수입맥주'
  }, {
    key: 6,
    name: '생맥주'
  }, {
    key: 7,
    name: '혼합맥주'
  }])
}

export const getBears = () => {
  return Promise.resolve([{
    id: 1,
    name: '맥주1',
    image: '/img/bear.png',
    tags: [{
      key: 1,
      name: '라거'
    }, {
      key: 5,
      name: '수입맥주'
    }, {
      key: 6,
      name: '생맥주'
    }, {
      key: 7,
      name: '혼합맥주'
    }],
    price: 10000,
    stock: 8,
    cart: 0
  }, {
    id: 2,
    name: '맥주2',
    image: '/img/bear.png',
    tags: [{
      key: 1,
      name: '라거'
    }, {
      key: 2,
      name: '에일'
    }, {
      key: 3,
      name: '람빅'
    }],
    price: 15000,
    stock: 0,
    cart: 0
  }, {
    id: 3,
    name: '맥주3',
    image: '/img/bear.png',
    tags: [{
      key: 1,
      name: '라거'
    }],
    price: 8000,
    stock: 10,
    cart: 0
  }, {
    id: 4,
    name: '맥주4',
    image: '/img/bear.png',
    tags: [{
      key: 1,
      name: '라거'
    }],
    price: 20000,
    stock: 1,
    cart: 0
  }, {
    id: 5,
    name: '맥주5',
    image: '/img/bear.png',
    tags: [{
      key: 1,
      name: '라거'
    }, {
      key: 3,
      name: '람빅'
    }, {
      key: 4,
      name: '국산맥주'
    }, {
      key: 5,
      name: '수입맥주'
    }, {
      key: 6,
      name: '생맥주'
    }, {
      key: 7,
      name: '혼합맥주'
    }],
    price: 5000,
    stock: 15,
    cart: 0
  }, {
    id:6,
    name: '맥주6',
    image: '/img/bear.png',
    tags: [{
      key: 1,
      name: '라거'
    }, {
      key: 6,
      name: '생맥주'
    }],
    price: 70000,
    stock: 80,
    cart: 0
  }, {
    id: 7,
    name: '맥주7',
    image: '/img/bear.png',
    tags: [{
      key: 1,
      name: '라거'
    }],
    price: 20000,
    stock: 20,
    cart: 0
  }, {
    id: 8,
    name: '맥주8',
    image: '/img/bear.png',
    tags: [{
      key: 1,
      name: '라거'
    }],
    price: 15000,
    stock: 2,
    cart: 0
  }, {
    id: 9,
    name: '맥주9',
    image: '/img/bear.png',
    tags: [{
      key: 1,
      name: '라거'
    }],
    price: 10000,
    stock: 5,
    cart: 0
  }, {
    id: 10,
    name: '맥주10',
    image: '/img/bear.png',
    tags: [{
      key: 1,
      name: '라거'
    }],
    price: 15000,
    stock: 1,
    cart: 0
  }, {
    id: 11,
    name: '맥주11',
    image: '/img/bear.png',
    tags: [{
      key: 1,
      name: '라거'
    }, {
      key: 6,
      name: '생맥주'
    }],
    price: 50000,
    stock: 80,
    cart: 0
  }])
}

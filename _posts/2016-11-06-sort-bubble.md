---

layout: post
title: Algorithm - Bubble Sort 
date: 2016-11-06 20:00:00
image: '/assets/img/'
description: 'zz'
main-class: 'algorithm'
tags: 
- algorithm
- sort

introduction: '- JAVASCRIPT Bubble Sort  -'

---

**[Bubble Sort View](https://visualgo.net/sorting)**


```js
class Arr {
    constructor() {
        this._list = new Array(100).fill(0).map(v => Math.random() * 100 + 1);
    }
 
    bubbleSort() {
        let len       = this.list.length,
            cnt       = len,
            loopCount = 0;
 
        for(let i = 0; i < len; i++, cnt--)
            for(let j = 0; j < cnt; j++, loopCount++) 
                if(this.list[j] > this.list[j + 1])
                    this.bitSwap(j, j + 1);
 
   //cnt를 사용하지 않고 루프를 돌릴 경우 약 5000회 이상의 반복문을 추가하게 된다. 
        console.log(this.list, loopCount);
    }
 
    swapTwo(i, j) {
        this.list[j] = [this.list[i], this.list[i] = this.list[j]][0];
    }
 
    swapOne(i, j) {
        [this.list[i], this.list[j]] = [this.list[j], this.list[i]];
    }
 
    bitSwap(i, j) {
        this.list[i] ^= this.list[j];
        this.list[j] ^= this.list[i];
        this.list[i] ^= this.list[j];
    }
 
    set list(list) {this._list = list;}
    get list() {return this._list;}
}
 
 
new Arr().bubbleSort();
```



배열을 순회하며, 다음번의 값이 나보다 크면 교환하는 방식으로 합니다 

포문에서 - cnt 를 해 주는 이유는 순회한 횟수 만큼은 더는 뒤로 돌 필요가 없기 때문이며 (이미 뒤쪽은 정렬이 끝난상태라 앞쪽만 계속 정렬시킨다) 

저 - cnt 를 해주느냐와 안해주느냐의 차이는 실제 약 100회 이상의 루프 감소효과가 발생했습니다.

  
---
layout: post
title: Algorithm - Insert Sort 
categories: [Algorithm]
tags: [insert, sort]
comments: true
share: true
---


**[Insert Sort View](https://visualgo.net/sorting)**


```js
class Arr {
    constructor() {
        this._list = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
        //this._list = new Array(100).fill(0).map(v => Math.floor(Math.random() * 100) + 1);
    }
 
    selectSort() {
        let len        = this.list.length,
            cnt       = 0,
            loopCount = 0,
            timer = this.timer();
 
 
        for(let i = 0; i < len; i++, cnt++) 
            for(let j = i; j >= 0; j--, loopCount++) 
                if(this.list[j - 1] > this.list[j]) 
                    this.swapOne(j - 1, j);
 
 
        console.log(this.list, loopCount + ' : count', timer() + ' : million Seccond');
    }
 
    timer() {
        let start = new Date().getTime();
 
        return () => {
 
            return new Date().getTime() - start;
        };
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
 
 
new Arr().selectSort();
```




인서트의 경우에는 한번 전위로 순회하며 다시 역순회 합니다. 

현재 값을 기준으로 나보다 작은 녀석을 만날때까지 돌다가, 나보다 작은 값을 만나면 그 값의 전값과 나의 위치를 바꾸어 줍니다.
---
layout: post
title: Algorithm - Quick Sort 
categories: [Algorithm]
tags: [quick, sort]
comments: true
share: true
---


**[Quick Sort View](https://visualgo.net/sorting)**


```js
class Arr {
    constructor() {
        this._list = [6, 10, 1, 9, 4, 8, 2, 7, 3];
        //this._list = new Array(10000).fill(0).map(v => Math.floor(Math.random() * 100) + 1);
    }
 
    quickSort(arr) {
        if(!arr)
            arr = this.list;
 
        if(arr.length == 0)
            return [];
        
        let less    = [],
            greater = [],
            pivot   = arr[0];
            //항상 배열의 첫번째 값을 기준점으로 잡습니다. 
            //그리고 나보다 작은 배열은 왼쪽으로 나보다 큰 배열은 우측으로 보냅니다 ! 이게 핵심 입니다.
            //그리고 왼쪽에 작은배열 [1, 2, 3, 4] + 기준점 (6) + [7, 8, 9, 10]; 을 합치고 마지막으로 보내는게 핵심 로직 입니다. 
            //
            //맨 아래까지 쪼개내려가면, [1, 4, 2, 3] 6 [10, 9, 8, 7] 이랬던 애들이 
            //[] + 2 + [3] => [] + 1 + [2, 3] => [1, 2, 3] + 4 + [] => [1, 2, 3, 4]
            //[7] + 8 + [] => [7, 8] + 9 + [] => [7, 8, 9] + 10 + [] => [7, 8, 9, 10]
            //
            //[1, 2, 3, 4] + 6 + [7, 8, 9, 10] 으로 만나게 될 테니까요 ! 
 
 
        for(let i = 1, v; v = arr[i]; i++)
            v < pivot ? less.push(v) : greater.push(v);
 
        return this.quickSort(less).concat(pivot, this.quickSort(greater));
    }
 
    merge(left, right, start) {
        for(let i = left.length + right.length; i--; start++) 
            this.list[start] = right[0] ? left[0] <= right[0] ? left.shift() : right.shift() : left.shift();
    }
    
    timer() {
        let start = new Date().getTime();
        return () =>  new Date().getTime() - start;
    }
 
 
    set list(list) {this._list = list;}
    get list() {return this._list;}
}
 
console.log(new Arr().quickSort());
```

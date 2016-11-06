---
layout: post
title: Algorithm - Merge Sort 
categories: [Algorithm]
tags: [merge, sort]
comments: true
share: true
---


**[Merge Sort View](https://visualgo.net/sorting)**


```js
class Arr {
    constructor() {
        this._list = [6, 10, 1, 9, 4, 8, 2, 7, 3];
        //this._list = new Array(10000).fill(0).map(v => Math.floor(Math.random() * 100) + 1);
    }
 
    mergeSort() {
        let timer     = this.timer(),
            listLen = this.list.length,
            loopLen = listLen / 2;
 
 
        //step 은 배열을 자르는 기준이 되기 때문에 이 로직의 핵심이에요.
        //step은 1부터 시작합니다. 
        //첫번째 포문은 배열의 길이만큼 도는데, step이 배열보다 커지지 않을때까지만 돌게 되요. 스텝은 현재 스텝길이의 * 2씩 증가. 
        //예를 들어 1 -> 2 -> 4 -> 8... 순으로 증가하는거죠.
        for(let step = 1; step < listLen; step *= 2)  
            //머지 함수에는 left와 right배열을 전달하는걸 주 목적으로 합니다. 
            //두번째 루프에는 0부터 len / 2 까지 순회하게 되는데 i += step이므로 step이 1일경우 
            //배열의 길이가 9라면, 배열을 매번 2개씩 절삭하므로 총 5번의 루프가 필요하게 되요.
            //즉 i < 4.5 가 되기때문에 총 5번 순회하는거지요 :) 
            //
            //start 값은 배열의 시작 위치부터 몇개씩 절삭시킬것인가에 대한 값이에요. 해당 값은 
            //step == 1
            //0 -> 2 -> 4 -> 6 -> 8... 
            //0 -> 0 + 1 * 2 -> 2 + 1 * 2 -> 4 + 1 * 2 ->...
            //
            //step == 2
            //0 -> 4 -> 8...
            //0 -> 0 + 2 * 2 -> 4 + 2 * 2 ->...
            //step == 4
            //0 -> 8 -> 16...
            //0 -> 0 + 4 * 2 -> 8 + 4 * 2 ->...
            for(let i = 0, start = 0, end = step; i < loopLen; i += step, start += step * 2, end = start + step) 
                this.merge(
                    this.getList(start, end), 
                    this.getList(end, start + step * 2), 
                    start
                );
            
        console.log(this.list,  timer() + ' : million Seccond');
    }
 
    getList(start, end) {
        return this.list.slice(start, end);
    }
 
    merge(left, right, start) {
 
        //홀수배열인 경우에 left[0]방은 무조건 있어요. 하지만 right[0]은 없을수도 있지요? 
        //그러니까 right[r] 을 확인하고 있으면 둘을 비교해서 작은 값을 result에 집어넣습니다.
        //없으면 그냥 왼쪽거만 남은거기땜에 그냥 왼쪽거에서 shift 하면 되요. :)
        //
        //결국엔 this.list에 몇번째부터 잘랐는지만 알면되는 start인자값을 통해서 n번부터 n번째에 값을 하나씩 최소값을 넣어주는거죠. 
        //start값은0 -> 1 -> 2.. 순으로 증가하게 될 테니까. 
        //
        //결국 지금 뽑아내는 값은 최소값만 뽑혀나오게 되는거니까요 ! 
        //배열의 몇번째방부터 몇번째방까지 순차적으로 최소값만 찔러넣어주게 되는거지요 :)
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
 
 
new Arr().mergeSort();

```

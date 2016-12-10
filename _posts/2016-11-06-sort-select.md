---

layout: post
title: Algorithm - Select Sort 
date: 2016-11-06 20:00:00
image: '/assets/img/'
description: 'zz'
main-class: 'algorithm'
tags: 
- algorithm
- sort

introduction: '- JAVASCRIPT Select Sort  -'

---

**[Select Sort View](https://visualgo.net/sorting)**


```js
class Arr {
    constructor() {
        this._list = new Array(100).fill(0).map(v => Math.floor(Math.random() * 100) + 1);
    }
 
    selectSort() {
        let len        = this.list.length,
            cnt       = 0,
            loopCount = 0,
            timer = this.timer();
 
        for(let i = 0, index, tmpList, min; i < len; i++, cnt++) {
            tmpList = this.list.slice(cnt); //배열의 순회한곳 이후부터 복사한다.
            min     = tmpList.reduce((v1, v2) => v1 < v2 ? v1 : v2); //그중 최소값을 구한다. //여기서 한번 루프
            index   = tmpList.findIndex(v => v == min); //해당 배열의 인덱스값을 찾는다. // 여기서 한번 루프를 돈다. 비효율.
 
            this.swapOne(cnt, cnt + index);
        }
 
        //loop Time을 비교하면 이러하다 !
 
 
 
        //따라서 이 방법이 더 효율적일 것 같다. 
        for(let i = 0, min, index = 0; i < len; i++, cnt++) {
            
            min = this.list[index];
 
            for(let j = cnt; j < len; j++, loopCount++) 
                if(min > this.list[j]) {
                    min   = this.list[j];
                    index = j;
                }
            
 
            this.swapOne(cnt, index);
        }
 
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



셀렉트 정렬방식은 모든 배열을 한바퀴 순회하여 제일 작은 숫자를 찾아내고, 

그 숫자를 배열의 0, 1,.... 순으로 스왑하며 정렬합니다.

  
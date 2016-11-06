---
layout: post
title: Algorithm - Shell Sort 
categories: [Algorithm]
tags: [shell, sort]
comments: true
share: true
---


**[Shell Sort View](https://visualgo.net/sorting)**


```js
class Arr {
    constructor() {
        this._list = [61, 85, 19, 88, 68, 8, 70, 29, 8];
        //this._list = new Array(100).fill(0).map(v => Math.floor(Math.random() * 100) + 1);
        this._gaps = [];
    }
 
    shellSort() {
        let len        = this.list.length,
            loopCount = 0,
            timer = this.timer();
 
        this.getGaps();
 
        for(let g = 0, gap; gap = this.gaps[g]; g++)
            for(let i = gap; i < len; i++) 
                for(let j = i; j >= 0; j--)
                    if(this.list[j - gap] > this.list[j]) 
                        this.bitSwap(j - gap, j);
 
        console.log(this.list, loopCount + ' : count', timer() + ' : million Seccond');
    }
     
    //동적으로 갭을 만듭니다 !
    getGaps() {
        let len = this.list.length,
            gap = 1;
 
 
        if(!len)
            return;
 
        //gap의 시작값을 구하는 반복문
        while(gap < len / 3) 
            gap = 3 * gap + 1;
 
        this.gaps.push(gap);
 
        //gap의 다음 수를 구하는 반복문.
        while(gap >= 1) {
            gap = (gap - 1) / 3;
 
            if(gap != 0) //마지막 값은 0이 나올 수 있으므로 +ㅅ +/
                this.gaps.push(gap);
        }
 
        console.log(this.gaps, ' : gaps!');
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
        if(this.list[i] == this.list[j])
            return;
 
        this.list[i] ^= this.list[j];
        this.list[j] ^= this.list[i];
        this.list[i] ^= this.list[j];
    }
 
    set gaps(list) {this._gaps = list;}
    get gaps() {return this._gaps;}
    set list(list) {this._list = list;}
    get list() {return this._list;}
}
 
 
new Arr().shellSort();
```


insert sort 방법은 하나씩 순회하며 비교하지만 shell sort의 경우에는 Gap 수를 구하여 확장 합니다.   

즉 전체 배열을 순회하면서, 맨뒤에서부터 삽입 정렬을 수행하는데, 그 대상이 -1번째방이 아니라, - gap의 숫자와 비교하게 되는 거죠.  
     

      --- 여기서부터 아래는 gaps[3, 2, 1] 의 방식으로 소팅하는 방법 입니다.


      [61, 85, 19, 88, 68, 8, 70, 29] 
      0번째 무시. 1번째 무시. 2번째 무시. 
      3번째는 88번이있고, 88번은 61보다 작으므로 무시. 
      4번째 루프때 68이 타겟이고, 85가 더 크니까 교환. 

      [61, 68, 19, 88, 85, 8, 70, 29] 
      5번째 루프때 8은 18보다 작으니까 교환 

      [61, 68, 8, 88, 85, 19, 70, 29] 
      70은 88보다 작으니까 교환 

      [61, 68, 8, 70, 85, 19, 88, 29] 
      29는 85보다 작으므로 교환 

      [61, 68, 8, 70, 29, 19, 88, 85] 
      29는 68보다 작으므로 교환

      첫번째 루프 완료시. 
      [61, 29, 8, 70, 68, 19, 88, 85] 



      ------- 


      [61, 29, 8, 70, 68, 19, 88, 85] 
      19는 70보다 작으므로 교환
      [61, 29, 8, 19, 68, 70, 88, 85] 
      다시 19는 29보다 작으므로 교환 
      [61, 19, 8, 29, 68, 70, 88, 85] 
      8은 61보다 작으므로 교환 
      [8, 19, 61, 29, 68, 70, 88, 85] 
      

      -------

      [8, 19, 61, 29, 68, 70, 88, 85]
      61보다 29가 작으므로 교환

      [8, 19, 29, 61, 68, 70, 88, 85]

      더이상 소팅할게 없으므로 종료 !

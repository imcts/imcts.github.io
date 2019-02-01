---

layout: post
title: Algorithm - Search Sort 
date: 2016-11-06 20:00:00
img: algorithm.png
---

#### 순차 검색 

```js
class Search {
    constructor() {
        this.list = new Array(100).fill(0).map(() => Math.round(Math.random() * 100) + 1);
    }
    
    seqSearch(value) {
        let r = {
            index: -1,
            value: -1
        };
 
        for(let i = 0, n; n = this.list[i]; i++)
            if(value === n) {
                r.index = i;
                r.value = n;
            }
 
        console.log(r, this.list);
    }    
 
    selfSortSeqSearch(value) { //자체 정렬 데이터 기법을 적용한 seq 함수. 
        let r = {
            index: -1,
            value: -1
        };
 
        for(let i = 0, n; n = this.list[i]; i++)
            if(value === n) {
                r.index = i;
                r.value = n;
 
                if(i > 0) //검색 되면 한칸씩 계속 앞으로 밀려 나가게 된다. 검색의 우선순위가 높아질 수록 최상단에 위치하게 된다.  
                    this.swap(i, i - 1);
 
 
                console.log(r, this.list);
                return;
            }
 
        console.log(r, this.list);
    }
 
    upgradeSelfSortSeqSearch(value) { // 자체 정렬 데이터 기법을 조금더 업그레이드 한 seq 함수이다. 
        let r = {
            index: -1,
            value: -1
        };
 
        for(let i = 0, len = this.list.length, n; n = this.list[i]; i++)
            if((value === n) && (i > len * 0.2)) {  //만약 검색된 결과값이 배열의 20% 이외에 있다면, 최상단으로 앞당긴다. 
                r.index = i;
                r.value = n;
                this.swap(i, i - 1);
                
                console.log(r, this.list);
 
                return;
            } else if(value === n) {
                r.index = i;
                r.value = n;
 
                console.log(r, this.list);
 
                return;
            }
 
 
            console.log(r, this.list);
    }
 
    swap(i, j) {
        [this.list[i], this.list[j]] = [this.list[j], this.list[i]];
    }
 
    get list() {return this._list;}
    set list(list) {this._list = list;}
}
 
 
new Search().selfSortSeqSearch(5);
```

검색 알고리즘은 어쩔 수 없이 전체를 한번 훑는게 전제조건이 됩니다. (sequence search)

1. 배열의 처음부터 끝까지 돌다가 내가 원하는 값을 찾았을때 리턴 하는 방식. seqSearch
2. 동작 방식은 같으나, 검색 결과가 존재하면 해당 index를 한칸씩 앞으로 당깁니다. selfSortSeqSearch
3. 마찬가지로 동작방식은 같으나 검색 결과가 배열의 20%이외에 존재하면 첫번째로 밀어줍니다. upgradeSelfSortSeqSearch


#### 이진검색

```js
class Sort {
    constructor(list) {
        this._list = list;
        this._gaps = [];
    }
 
    shellSort() {
        let len = this.list.length;
 
        this.getGaps();
 
        for(let g = 0, gap; gap = this.gaps[g]; g++)
            for(let i = gap; i < len; i++)
                for(let j = i; j >= 0; j--) 
                    if(this.list[j - gap] > this.list[j]) 
                        this.swapOne(j - gap, j);
 
        return this.list;
    }
 
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
    }
 
    swapOne(i, j) {
        [this.list[i], this.list[j]] = [this.list[j], this.list[i]];
    }
 
    set gaps(list) {this._gaps = list;}
    get gaps() {return this._gaps;}
    set list(list) {this._list = list;}
    get list() {return this._list;}
}
 
 
class Search {
    constructor(list) {
        this.list = list;
    }
    
    seqSearch(value) {
        let timer = this.timer(),
                r = {
                    index: -1,
                    value: -1
                };
 
        for(let i = 0, n; n = this.list[i]; i++)
            if(value === n) {
                r.index = i;
                r.value = n;
 
                console.log(r, this.list, timer(), ' : finish time!');
 
                return;
            }
    }    
 
    binarySearch(value) { // 이진 검색은 반드시 정렬된 데이터를 가지고만 움직일 수 있다. 이것이 전제 조건. 
        let timer = this.timer(), 
            list  = new Sort(this.list).shellSort(), 
            upper = this.list.length - 1,
            lower = 0, 
            mid   = null; 
 
        while(lower <= upper) {
            mid = Math.floor((upper + lower) / 2);
 
            if(this.list[mid] < value) 
                lower = mid + 1; 
            else if(this.list[mid] > value)
                upper = mid - 1;
            else 
                return console.log(`${this.list[mid]} : ${mid}, ${this.list}, ${timer()} : finish time`); 
        }
 
        console.log(`not found, ${this.list}, ${timer()} : finish time`); 
    }
 
    timer() {
        let start = performance.now();
        return () => performance.now() - start;
    }
 
    get list() {return this._list;}
    set list(list) {this._list = list;}
}
 
 
//seq search 
new Search(new Array(100).fill(0).map(v => Math.floor(Math.random() * 100) + 1)).seqSearch(5);
 
//shell + binary search
new Search(new Array(100).fill(0).map(v => Math.floor(Math.random() * 100) + 1)).binarySearch(5);
```

이진 검색의 전재조건은 반드시 정렬된 (오름차순 또는 내림차순의) 데이터가 필요하다는 점입니다. 


[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

위와 같은 배열이 존재한다고 할때. 

mid = 4; 이면 되고

찾으려고 하는 값이 7이라고 할때 

value = 7; 이면 됩니다.

this.list[mid] = 4; 이므로 

lower 값을 + 1 해줍니다.

그러면 lower = 5번째방부터 

upper = 배열의 끝방..

이런식으로 반복해서 검색하면 절반씩 잘라 나가기 때문에, 천만번의 검색을 하는 조건일때 25번이면 찾을 수 있다고 합니다.  

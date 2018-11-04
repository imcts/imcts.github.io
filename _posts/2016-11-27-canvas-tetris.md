---

layout: post
title: HTML5 CANVAS TETRIS
date: 2016-11-27 20:00:00
image: '/assets/img/'
description: 'HTML5 CANVAS TEXT ALL'
main-class: 'project'
tags: 
- tetris
- canvas

introduction: '- HTML5 CANVAS TETRIS -'

---
<style>
    button {
        width: 100px;
        height: 30px;
        color: white;
        font-size: 12px;
        font-weight: bold;
    }
    
    .lock {
        background-color: red;    
    }
    
    .unlock {
        background-color: blue;    
    }
</style>

<button class="scroll-btn lock">스크롤 잠그기</button>
<button class="scroll-btn unlock">스크롤 해제</button>
<iframe width="1024" height="730" style="margin-top: -32px" src="/project/html/canvas/tetris" frameborder="0" allowfullscreen></iframe>

<script>
    var buttons = document.querySelectorAll('.scroll-btn')
    buttons[0].addEventListener('click', function () {
        document.body.style.overflow = 'hidden';
    })
    
    buttons[1].addEventListener('click', function () {
        document.body.style.overflow = '';
    })
    
    
    
</script>

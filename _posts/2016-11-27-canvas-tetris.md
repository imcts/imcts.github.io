---
layout: post
title: HTML5 CANVAS TETRIS
date: 2016-11-27 20:00:00
img: project.jpg
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

<button id="lock" class="scroll-btn lock">스크롤 잠그기</button>
<button id="unlock" class="scroll-btn unlock">스크롤 해제</button>
<iframe width="815px" height="730" style="max-width: 100%; margin-top: 0px" src="/project/html/canvas/tetris/index.html" frameborder="0" allowfullscreen></iframe>

<script type="text/javascript">
    document.getElementById('lock').onclick = function () {
        document.body.style.overflow = 'hidden';
    };
    
    document.getElementById('unlock').onclick = function () {
        document.body.style.overflow = '';
    };
</script>

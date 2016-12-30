'use strict';


var now = new Date();

var obj = {
    speed: 40,
    canvasTwoInit: false,
    isDraw: true,
    isAsync: false,
    isCanvasTwoText: true,
    canvasOne: {
        canvas:    document.getElementById('canvas-1'),
        radius:    120,
        degree:    0,
        score:     Math.round(Math.random() * 1000000),
        scoreText: 0,
        color:     '#FF7043',
        lineWidth: 30
    },

    canvasTwo: {
        canvas:        document.getElementById('canvas-2'),
        radius:        100,
        score:         Math.round(Math.random() * 1000000),
        scoreText:     0,
        hour:          now.getHours(),
        minute:        now.getMinutes(),
        second:        now.getSeconds(),
        hourDegree:    360 / 12 * now.getHours() > 12 ? now.getHours() - 12 : now.getHours(),
        minuteDegree:  360 / 60 * now.getMinutes(),
        secondDegree:  360 / 60 * now.getSeconds(),
        hourRadius:    100,
        minuteRadius:  115,
        secondRadius:  130,
        secondReverse: false,
        hourColor:     '#BF360C',
        minuteColor:   '#F4511E',
        secondColor:   '#FF8A65',
        lineWidth:     12,
        textCount:     0
    }
};



function setComma(score) {
    return score.toString().replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function drawArc(canvas, radius, degree, lineWidth, color, isReverse) {
    var context = canvas.getContext('2d'),
        startX  = canvas.width / 2,
        startY  = canvas.height / 2;

    context.save();

    context.strokeStyle = color;
    context.lineWidth = lineWidth;

    //reset transform vector style for unit matrix
    context.transform(1, 0, 0, 1, 0, 0);

    //translate
    context.translate(startX, startY);
    context.rotate(-(Math.PI / 180 * 90));
    context.translate(-startX, -startY);

    //draw
    context.beginPath();
    context.arc(startX, startY, radius, 0, Math.PI / 180 * degree, isReverse);
    context.stroke();
    context.closePath();

    context.restore();
}

function drawScore(canvas, text) {
    var context = canvas.getContext('2d'),
        startX  = canvas.width / 2,
        startY  = canvas.height / 2;

    context.strokeStyle = '#333';
    context.font = '30px AppleSDGothicNeo, "맑은 고딕", Malgun Gothic, "나눔 고딕", Nanum Gothic, sans-serif';
    context.textAlign = 'center';

    context.shadowColor = '#333';
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 1;

    context.fillText(text, startX, startY + 10);
}


function update() {
    var fps             = 60,
        graphSpeed      = 360 / obj.speed,
        now             = new Date(),
        hour            = now.getHours() > 12 ? now.getHours() - 12 : now.getHours(),
        minute          = now.getMinutes(),
        second          = now.getSeconds(),
        hourDegree      = 360 / 12,
        minuteDegree    = 360 / 60,
        addSecondDegree = minuteDegree / fps,
        addMinuteDegree = minuteDegree / fps / 60,
        addHourDegree   = hourDegree / fps / 60 / 60,
        canvasOne       = obj.canvasOne,
        canvasTwo       = obj.canvasTwo;

    //update canvasOne
    if(obj.isDraw) {
        if(canvasOne.degree < 360) {
            canvasOne.degree += graphSpeed;
            canvasOne.scoreText += Math.round(canvasOne.score / (360 / graphSpeed));
        } else {
            canvasOne.scoreText = setComma(canvasOne.score);

            //canvasOne draw is done.
            obj.isDraw = false;
        }
    }


    if(obj.isCanvasTwoText) {

        if(canvasTwo.textCount < 360) {
            canvasTwo.textCount += graphSpeed;
            canvasTwo.scoreText += Math.round(canvasTwo.score / (360 / graphSpeed));
        } else {
            canvasTwo.scoreText = setComma(canvasTwo.score);

            obj.isCanvasTwoText = false;
        }
    }


    //update canvasTwo hour
    if(canvasTwo.hour == hour) {
        canvasTwo.hourDegree += addHourDegree;
    } else {
        canvasTwo.hourDegree = hourDegree * hour;
    }


    //update canvasTwo minute
    if(canvasTwo.minute == minute) {
        canvasTwo.minuteDegree += addMinuteDegree;
    } else {
        canvasTwo.minuteDegree = minuteDegree * minute;
    }

    //initial minute degree setting:
    if(!obj.canvasTwoInit) {
        obj.isAsync = true;
        obj.canvasTwoInit = true;

        canvasTwo.minuteDegree = (minuteDegree * minute) + (second * 60 * addMinuteDegree);
        canvasTwo.hourDegree = (hourDegree * hour) + ((minute + (second / 60)) * 60 * 60 * addHourDegree);
    }

    //update canvasTwo second and second reverse
    if(canvasTwo.second == second) {
        canvasTwo.secondDegree += addSecondDegree;
    } else {
        canvasTwo.secondDegree = minuteDegree * second;

        //reverse timing degree setting
        if(second == 0) {
            if(canvasTwo.secondReverse) {
                canvasTwo.secondDegree = 0;
            } else {
                canvasTwo.secondDegree = minuteDegree * 60;
            }

            canvasTwo.secondReverse = !canvasTwo.secondReverse;

            if(obj.isAsync)
                getCount();
        }
    }

    //update time
    canvasTwo.hour   = hour;
    canvasTwo.minute = minute;
    canvasTwo.second = second;
}

function render() {
    var canvasOne = obj.canvasOne,
        canvasTwo = obj.canvasTwo;

    //draw canvasOne
    drawArc(initCanvas(canvasOne.canvas), canvasOne.radius, canvasOne.degree, canvasOne.lineWidth, canvasOne.color);
    drawScore(canvasOne.canvas, setComma(canvasOne.scoreText));

    //draw canvasTwo
    drawArc(initCanvas(canvasTwo.canvas), canvasTwo.hourRadius, canvasTwo.hourDegree, canvasTwo.lineWidth, canvasTwo.hourColor, canvasTwo.hourReverse);
    drawArc(canvasTwo.canvas, canvasTwo.minuteRadius, canvasTwo.minuteDegree, canvasTwo.lineWidth, canvasTwo.minuteColor, canvasTwo.minuteReverse);
    drawArc(canvasTwo.canvas, canvasTwo.secondRadius, canvasTwo.secondDegree, canvasTwo.lineWidth, canvasTwo.secondColor, canvasTwo.secondReverse);
    drawScore(canvasTwo.canvas, setComma(canvasTwo.scoreText));
}

function getCount() {
    var canvasTwo = obj.canvasTwo;

    canvasTwo.score = Math.round(Math.random() * 1000000);

    canvasTwo.textCount = 0;
    canvasTwo.scoreText = 0;

    obj.isCanvasTwoText = true;
}

function initCanvas(canvas) {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    return canvas;
}

function animate() {
    //data update
    update();

    //do render
    render();

    //again animation
    window.requestAnimationFrame(animate);
}

function init() {

    //set requestAnimationFrame
    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback){ window.setTimeout(callback, 1000 / 60); };

    //run animation
    window.requestAnimationFrame(animate);



}

window.onload = () => {
    init();
};


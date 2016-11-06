require([
	'../js/util.js'
], (
	util
) => {
	
	'use strict';

	if(!util.isCanvas())
		return;

	const canvas  = util.getCanvas('canvas');
	const context = canvas.getContext('2d');

	const drawRec = (x, y, width, height) => {
		context.beginPath();
		context.strokeRect(x, y, width, height);
		context.closePath();
	};

	const drawArc = (x, y, radius, startRadian, endRadian, isSelect = false) => {
		context.beginPath();
		context.arc(x, y, radius, startRadian, endRadian, isSelect);
		context.stroke();
		context.closePath();
	};

	const drawNumbers = (centerX, centerY, radius) => {
		const addRadian = Math.PI / 180 * (360 / 12);

		let radian = 0,
			x,
			y;

		[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2].map(v => {
			x = Math.cos(radian) * radius + centerX;
			y = Math.sin(radian) * radius + centerY;

			radian += addRadian;

			context.textAlign = 'center';
			context.textBaseline = 'middle';
			context.strokeText(v, x, y);
			context.stroke();

		});
	};

	const drawTime = (centerX, centerY, radius) => {
		const secondDegree 	= 360 / 60,
			  minuteDegree = 360 / 60,
			  hourDegree 	= 360 / 12,
			  basicDegree   = -90,
			  radian   	    = Math.PI / 180,
			  hourRadius    = radius * 0.5,
			  minuteRadius  = radius * 0.8,
			  secondRadius  = radius * 0.9 ;

		let endX,
			endY,
			degree,
			hourAddDegree,
			ratio;

		let now = new Date(),
			hour = now.getHours(),
			minute = now.getMinutes(),
			second = now.getSeconds();


		//초침을 그려봅시다 !
		degree = (second * secondDegree) + basicDegree;
		endX = Math.cos(radian * degree) * secondRadius;
		endY = Math.sin(radian * degree) * secondRadius;
		drawLine(centerX, centerY, endX + centerX, endY + centerY, 'red');

		//분침을 구해봅시다.
		degree = (minute * minuteDegree) + basicDegree;
		endX = Math.cos(radian * degree) * minuteRadius;
		endY = Math.sin(radian * degree) * minuteRadius;
		drawLine(centerX, centerY, endX + centerX, endY + centerY, 'black', 2);


		//주의해야할점은 시침의 경우에는 분침이 360도 기준으로 얼만큼 갔느냐에 따라서 비율로서 움직여야 할 필요가 생긴다.
		//따라서 분침의 이동 %를 구해야한다  360 * 100 / 움직인거리 = 비율
		ratio = minute * minuteDegree / 360 * 100;
		hourAddDegree = hourDegree / 100 * ratio;
		degree = (hour * hourDegree) + basicDegree + hourAddDegree;
		endX = Math.cos(radian * degree) * hourRadius;
		endY = Math.sin(radian * degree) * hourRadius;


		//시침을 구해봅시다.
		drawLine(centerX, centerY, endX + centerX, endY + centerY, 'black', 2);
	};

	const drawLine = (startX, startY, endX, endY, color, lineWidth = 1) => {
		context.lineWidth = lineWidth;
		context.strokeStyle = color;

		context.beginPath();
		context.moveTo(startX, startY);
		context.lineTo(endX, endY);
		context.stroke();
		context.closePath();
	};

	const init = () => {
		canvas.width  = canvas.clientWidth;
		canvas.height = canvas.clientHeight;

		let centerX = canvas.width / 2,
			centerY = canvas.height / 2,
			radius = 3,
			startRadian = 0,
			endRadian = Math.PI / 180 * 360,
			numberLength = 20,
			rectSize,
			rectLength = 70;


		//센터의 중심원그리기
		drawArc(centerX, centerY, radius, startRadian, endRadian);

		//시계 테두리 반지름 변경
		radius = 100;

		//시계 테두리 그리기
		drawArc(centerX, centerY, radius, startRadian, endRadian);

		//번호 그리기
		drawNumbers(centerX, centerY, radius + numberLength);

		rectSize = radius * 2 + rectLength;
		rectLength = rectLength / 2 + radius;

		//사각형 그리기
		drawRec(centerX - rectLength, centerY - rectLength, rectSize, rectSize);

		//시 분 초 그리기
		drawTime(centerX, centerY, radius);
	};

	setInterval(() => init(), 1000);
});
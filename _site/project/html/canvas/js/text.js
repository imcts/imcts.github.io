require([
	'../js/util.js'
], (
	util
) => {
	
	'use strict';

	if(!util.isCanvas())
		return;

	let article = util.getElement('parent-article'),
		canvas  = util.getCanvas('canvas-1'),
		context = canvas.getContext('2d');


	let message,
		line,
		fontWeight, 
		fontStyle, 
		fontSize, 
		fontFace,
		textAlign,
		textBaseLine,
		textColor,
		textOpacity,
		shadowX,
		shadowY,
		shadowColor,
		shadowBlur;

	const drawScreen = () => {
		//repaint;
		canvas.width = canvas.width;

		//italic bold 30px sans-serif
		context.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFace}`;	

		//기준선이다. 
		//문자열의 기준선을 설정한다. top일 경우에 문자들이 기준선 아래로 붙게된다. 
		context.textBaseline = textBaseLine;

		//기준선(문자열이 그려지는 시작점 x)
		//을 기준으로 중앙정렬 할 것인지, 왼쪽 정렬 할 것인지 등을 결정한다. 
		//기존에는 캔버스가로값 - 문자열가로사이즈를 구해서 빼거나 하였는데, 정렬이 추가됨으로 이제 그런게 필요 없다. 
		context.textAlign = textAlign;

		//문자열 색상 
		//채우기 색상
		context.fillStyle = context.strokeStyle = textColor;

		//투명도 설
		context.globalAlpha = textOpacity;

		//그림자 색상 
		//그림자의 x값
		//그림자의 y값 
		//그림자의 불러 상태를 결정한다. 
		context.shadowColor = shadowColor;
		context.shadowOffsetX = shadowX;
		context.shadowOffsetY = shadowY;
		context.shadowBlur = shadowBlur;

		let xPosition = canvas.width / 2;
		let yPosition = canvas.height / 2;

		switch(line) {
			case 'fill': 
				context.fillText(message, xPosition, yPosition);
			break;

			case 'stroke': 
				context.strokeText(message, xPosition, yPosition);
			break;

			default: 
				context.strokeText(message, xPosition, yPosition);
				context.fillText(message, xPosition, yPosition);
			break;
		}

		context.globalAlpha = 1;
	};

	const defaultText = () => {
		canvas.width  = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;

		message = 'Hello World';
		line 	= 'fill';

		fontWeight = 'normal';
		fontStyle  = 'normal';
		fontSize   = '50';
		fontFace   = 'serif';

		textBaseLine = 'top';

		textAlign = 'center';

		textColor = 'black';

		textOpacity = 1; 

		shadowX = 0;
		shadowY = 0;
		shadowColor = 'black';
		shadowBlur  = 0;

		drawScreen();
	};

	const addEvents = () => {
		let textBox = util.getElement('text-box');
		textBox.addEventListener('keyup', e => {
			let target = e.target;

			message = target.value || target.placeholder;

			drawScreen();
		}, false);

		let lineSelect = util.getElement('line-select');

		lineSelect.addEventListener('change', e => {
			let target = e.target;

			line = target.value;

			drawScreen();
		}, false);

		let fontSelect = util.getElement('font-select');

		fontSelect.addEventListener('change', e => {
			let target = e.target;

			fontStyle = target.value;

			drawScreen();
		}, false);

		let fontSizeRange = util.getElement('font-size');

		fontSizeRange.addEventListener('change', e => {
			let target = e.target;

			fontSize = target.value;

			drawScreen();
		}, false);

		let weightSelect = util.getElement('font-weight');

		weightSelect.addEventListener('change', e => {
			let target = e.target;

			fontWeight = target.value;

			drawScreen();
		}, false);

		let baseLineSelect = util.getElement('text-base-line');

		baseLineSelect.addEventListener('change', e => {
			let target = e.target;

			textBaseLine = target.value;

			drawScreen();
		}, false);

		let textAlignSelect = util.getElement('text-align');

		textAlignSelect.addEventListener('change', e => {
			let target = e.target;

			textAlign = target.value;

			drawScreen();
		}, false);

		let textColorInput = util.getElement('text-color');

		textColorInput.addEventListener('change', e => {
			let target = e.target;

			textColor = target.value;

			drawScreen();
		}, false);

		let textOpacityRange = util.getElement('text-opacity');

		textOpacityRange.addEventListener('change', e => {
			let target = e.target;

			textOpacity = target.value;

			drawScreen();
		}, false);

		let textShadowXInput = util.getElement('text-shadow-x');

		textShadowXInput.addEventListener('change', e => {
			let target = e.target;

			shadowX = target.value;

			drawScreen();
		}, false);

		let textShadowYInput = util.getElement('text-shadow-y');

		textShadowYInput.addEventListener('change', e => {
			let target = e.target;

			shadowY = target.value;

			drawScreen();
		}, false);
		
		let textShadowBlurInput = util.getElement('text-shadow-blur');

		textShadowBlurInput.addEventListener('change', e => {
			let target = e.target;

			shadowBlur = target.value;

			drawScreen();
		}, false);
		
		let textShadowColorInput = util.getElement('text-shadow-color');

		textShadowColorInput.addEventListener('change', e => {
			let target = e.target;

			shadowColor = target.value;

			drawScreen();
		}, false);

		let parentWidthRange = util.getElement('parent-width');

		parentWidthRange.addEventListener('change', e => {
			let target = e.target;

			article.style.width = `${target.value}px`;

			drawScreen();
		}, false);

		let parentHeightRange = util.getElement('parent-height');

		parentHeightRange.addEventListener('change', e => {
			let target = e.target;

			article.style.height = `${target.value}px`;

			drawScreen();
		}, false);

		let canvasWidthRange = util.getElement('canvas-width');

		canvasWidthRange.addEventListener('change', e => {
			let target = e.target;

			canvas.width = target.value;

			drawScreen();
		}, false);

		let canvasHeightRange = util.getElement('canvas-height');

		canvasHeightRange.addEventListener('change', e => {
			let target = e.target;

			canvas.height = target.value;

			drawScreen();
		}, false);

	};


	const init = () => {
		defaultText();
		addEvents();
	};

	init();
});
require([
	'../js/util.js'
], (
	util
) => {
	
	'use strict';

	if(!util.isCanvas())
		return;

	const drawRectangle = () => {
		let canvas  = util.getCanvas('canvas-1'),
			context = canvas.getContext('2d');

		canvas.width  = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;
		
		//background
		context.fillStyle = '#eff7b6';
		context.fillRect(0, 0, canvas.width, canvas.height);

		//fill Rectangle
		context.fillStyle = 'red';
		context.fillRect(10, 10, 100, 100);

		//stroke Rectangle
		context.strokeStyle = 'blue';
		context.strokeRect(130, 10, 100, 100);

		//투명한 박스를 만들어낸다. 
		context.clearRect(250, 10, 100, 100);

		//여러 박스를 겹쳐보자.
		context.fillStyle = 'yellow';
		context.fillRect(370, 10, 100, 100);

		context.strokeStyle = 'black';
		context.strokeRect(380, 20, 80, 80);

		context.fillStyle = 'red';
		context.fillRect(390, 30, 60, 60);
	};

	const drawLine = () => {
		let canvas  = util.getCanvas('canvas-2'),
			context = canvas.getContext('2d');

		canvas.width  = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;

		context.textBaseline = 'top';
		context.fillText('이처럼 y값을 0으로 지정하면, lineWidth=10 이더라도 절반의 위치부터 시작하기 때문에 잘린다.', 110, 0);

		context.strokeStyle = 'yellow';
		context.lineWidth = 10;
		context.lineCap = 'square';

		//기본 선을 그리는 방법
		context.beginPath();
		context.moveTo(20, 0); 
		context.lineTo(100, 0);
		context.stroke();
		context.closePath();

		context.lineWidth = 10;
		context.strokeStyle = 'red';
		context.lineCap = 'butt';

		context.beginPath();
		context.moveTo(40, 20);
		context.lineTo(100, 20);
		context.stroke();	
		context.closePath();

		//조금 더 복잡한 선을 그리는 방법 
		context.strokeStyle = 'blue';
		context.lineWidth = 5; 
		context.lineJoin = 'miter'; //기본값으로 사용된다. 그냥 각이 진걸 그리게 한다. 

		context.beginPath();
		context.moveTo(20, 40);
		context.lineTo(50, 40);
		context.lineTo(50, 70);
		context.stroke();
		context.closePath();

		context.strokeStyle = 'red';
		context.lineWidth = 5; 
		context.lineJoin = 'bevel'; //경사라는 뜻으로 선과 선을 이어주는 경사면을 그려준다. 
		context.lineCap = 'round';
		
		context.beginPath();
		context.moveTo(100, 40);
		context.lineTo(130, 40);
		context.lineTo(130, 70);
		context.stroke();
		context.closePath();

		context.strokeStyle = 'brown';
		context.lineWidth = 5; 
		context.lineJoin = 'round'; //선과 선이 만나는 곳을 라운드지게 그려준다.
		context.lineCap = 'butt';

		context.beginPath();
		context.moveTo(180, 40);
		context.lineTo(210, 40);
		context.lineTo(210, 70);
		context.stroke();
		context.closePath();
	};

	const drawCicle = () => {
		let canvas  = util.getCanvas('canvas-3'),
			context = canvas.getContext('2d');

		canvas.width  = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;

		context.strokeStyle = 'red';
		context.lineWidth = 5;

		context.beginPath();
		//radian 값으로 전달한다. 파이 == 180도일때의 라디언 값. 
		//반지름 * 파이 == 반호의 길이 
		//
		//1radian == 180 / 3.14...; (57.3degree);
		//1degree == 3.14 / 180 * 1; r * 파이 == l ==> 파이(radian) == 호의길이 / 반지름
		//degree => radian     =>   radian = 3.14 / 180 * degree; 
		//radian => degree     =>   radian * 57.3 ( 180 / Math.PI )


		//JavaScript syntax:	context.arc(x,y,r,sAngle,eAngle,counterclockwise); 시계방향으로 돌릴것인가. 
		//x 포인트, y포인트 중점, 반지름, 시작 라디언값, 끝낼 라디언값, 
		//			360도
		//  180도			0도
		//			90도
		//			
		//마지막값이 true일때에는, 해당 부분만 제외하고 그린다. 기본값이 false. 이며 false일때에는 해당 부분만 그린다.			
		context.arc(50, 50, 30, Math.PI / 180 * 0, Math.PI / 180 * 90, false);
		context.stroke();
		context.closePath();


		context.strokeStyle = 'blue';
		context.lineWidth = 5;

		context.beginPath();
		context.arc(150, 50, 30, Math.PI / 180 * 0, Math.PI / 180 * 90, true);
		context.stroke();
		context.closePath();



		//JavaScript syntax:	context.arcTo(x1,y1,x2,y2,r);  점과 점사이에 해당 반지름 만큼의 반호를 그려준다.
		context.beginPath();
		context.moveTo(200, 10);
		context.arcTo(300, 10, 300, 100, 100);
		context.stroke();
		context.closePath();
	};

	const bezier = () => {
		let canvas  = document.getElementById('canvas-4'),
			context = canvas.getContext('2d');

		canvas.width  = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;

		//베지어곡선은 2차와 3차가 존재한다.


		context.lineWidth = 5;
		context.strokeStyle = 'red';

		context.beginPath();

		context.moveTo(0, 0);
		//시작점은 moveTo ,  		    끝나는 좌표 
		//
		//
		//		(cx, cy) <-- 여기가 베지어 곡선이 그려질 좌표 
		context.quadraticCurveTo(0, 100, 100, 0);
		context.stroke();
		context.closePath();


		context.strokeStyle = 'black';


		context.beginPath();
		context.moveTo(150, 0);
		context.bezierCurveTo(0, 35, 300, 70, 150, 100);
		context.stroke();
		context.closePath();
	};

	const clip = () => {
		let canvas  = document.getElementById('canvas-5'),
			context = canvas.getContext('2d');

		canvas.width  = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;

		context.fillStyle = 'black';
		context.fillRect(0, 0, canvas.width, canvas.height);

		//여기에서의 핵심은 save() 함수이다. 
		//clip을 하기 전에 원본 상태를 저장해 두어야만 다시 여기로 restore 할 수 있게 된다. 
		context.save();

		
		
		//50 * 50 영역만큼 사각형을 만들고 그곳을 클립한다. 
		context.rect(0, 0, 50, 50);
		context.clip();		

		context.lineWidth = 5;
		context.strokeStyle = 'blue';

		//원을 그린다. 
		context.beginPath();
		context.arc(50, 50, 25, Math.PI / 180 * 0, Math.PI / 180 * 360, false);
		context.stroke();
		context.closePath();


		//clip을 한 뒤에 restore()를 해 주어야 영역을 해제 할 수 있다. 
		context.restore();

		//다시 전체 영역을 선택한다. 
		context.rect(0, 0, canvas.width, canvas.height);
		context.clip();

		//빨간색 원을 그려보자 !
		context.lineWidth = 5;
		context.strokeStyle = 'red';
		context.beginPath();
		context.arc(100, 100, 50, 0, Math.PI / 180 * 360, false);
		context.stroke();
		context.closePath();
	};

	const composite = () => {
		let canvas  = document.getElementById('canvas-6'),
			context = canvas.getContext('2d');

		canvas.width  = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;

		context.fillStyle = 'black';
		context.fillRect(10, 10, 70, 70);


		context.fillStyle = 'red';
		context.fillRect(0, 0, 25, 25);

		context.globalCompositeOperation = 'source-over';
		context.fillStyle = 'blue';
		context.fillRect(50, 0, 25, 25);

		context.globalCompositeOperation = 'destination-over';

		context.fillStyle = 'yellow';
		context.fillRect(0, 50, 25, 25);


		context.globalCompositeOperation = 'source-atop';
		context.globalAlpha = 0.5;

		context.fillStyle = 'green';
		context.fillRect(50, 50, 25, 25);



		context.globalAlpha = 1;
		context.globalCompositeOperation = 'source-over';

		context.fillStyle = 'blue';
		context.fillRect(90, 0, 40, 40);

		context.fillStyle = 'red';
		context.arc(120, 30, 20, 0, Math.PI / 180 * 360);
		context.fill();


		context.fillStyle = 'blue';
		context.fillRect(150, 0, 40, 40);

		context.globalCompositeOperation = 'source-atop';

		context.fillStyle = 'red';
		context.arc(180, 30, 20, 0, Math.PI / 180 * 360);
		context.fill();
	};

	const rotate = () => {
		let canvas  = document.getElementById('canvas-7'),
			context = canvas.getContext('2d');

		canvas.width  = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;

		context.fillRect(0, 0, canvas.width, canvas.height);

		const rotateRect = (x, y, width, height, degree = 0, color = 'red', scaleWidth = 1, scaleHeight = 1, halfWidth = width / 2, halfHeight = height / 2) => {
			context.setTransform(1, 0, 0, 1, 0, 0); //행렬 계산을 하기 때문에 단위 행렬로 설정하여 초기화한다. 

			context.fillStyle = color;
			context.translate(halfWidth + x, halfHeight / 2 + y);
			//확대도 마찬가지로 사용하지만, 반드시 중점 이동 후 확대하도록 한다. 
			context.scale(scaleWidth, scaleHeight);
			context.rotate(Math.PI / 180 * degree); 
			context.fillRect(-halfWidth, -halfHeight, width, height);
		};


		rotateRect(50, 50, 50, 50, 30);
		rotateRect(150, 50, 50, 50, 60, 'yellow');
		rotateRect(250, 50, 50, 50, 80, 'green');
		rotateRect(350, 50, 50, 50, 120, 'blue', 2, 2);
	};

	const gradient = () => {
		let canvas  = document.getElementById('canvas-8'),
			context = canvas.getContext('2d');

		canvas.width  = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;

		context.fillRect(0, 0, canvas.width, canvas.height);


		//그레디언트는 x1, y1, x2, y2를 입력하는데, 이는 순서대로 좌측상단의 좌표와 좌측하단의 좌표이다. 
		//하지만, 수평 그레디언트이기 때문에, 시작과 끝의 y값이 0이다. 그 이야기는 반대로 이야기하면 
		//x의 값이 0일때에는 수직 그레디언트가 가능하다는 이야기이다. 
		let gr = context.createLinearGradient(0, 0, 100, 0);

		for(let i = 1, r = 0, g = 0, b = 0, index = i / 3, sum = index; i <= 3; i++, sum += index) {
			for(r = 0; r <= 255; r++) 
				gr.addColorStop(sum, `rgb(${r}, ${g}, ${b})`);
			
			for(g = 0; g <= 255; g++)
				gr.addColorStop(sum, `rgb(${r}, ${g}, ${b})`);

			for(b = 0; b <= 255; b++)
				gr.addColorStop(sum, `rgb(${r}, ${g}, ${b})`);				
		}


		context.fillStyle = gr;

		context.beginPath();
		context.moveTo(10, 0);
		context.lineTo(50, 0);
		context.lineTo(100, 50);
		context.lineTo(50, 100);
		context.lineTo(0, 100);
		context.lineTo(0, 0);

		context.stroke();
		context.fill();
		context.closePath();

		let gr2 = context.createLinearGradient(100, 0, 150, 50);
		gr2.addColorStop(0, 'rgb(255, 0, 0)');
		gr2.addColorStop(0.5, 'rgb(0, 255, 0)');
		gr2.addColorStop(1, 'rgb(0, 0, 255)');

		context.fillStyle = gr2;

		context.fillRect(100, 0, 50, 50);

		let gr3 = context.createRadialGradient(250, 50, 0, 250, 50, 100);
		gr3.addColorStop(0, 'rgb(255, 0, 0)');
		gr3.addColorStop(0.5, 'rgb(0, 255, 0)');
		gr3.addColorStop(1, 'rgb(0, 0, 255)');

		context.fillStyle = gr3;
		context.arc(250, 50, 50, 0, Math.PI / 180 * 360);
		context.fill();
	};

	const pattern = () => {
		let canvas  = document.getElementById('canvas-9'),
			context = canvas.getContext('2d');

		canvas.width  = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;

		let img = new Image();
		img.src = '../image/1.png';

		img.onload = () => {
			let noRepeat = context.createPattern(img, 'no-repeat'),
				repeatX  = context.createPattern(img, 'repeat-x'),
				repeatY  = context.createPattern(img, 'repeat-y');

			context.fillStyle = noRepeat;
			context.fillRect(0, 0, 50, 50);

			context.fillStyle = repeatX;
			context.fillRect(100, 0, 50, 50);

			context.fillStyle = repeatY;
			context.fillRect(200, 0, 50, 50);
		};
	};

	const shadow = () => {
		let canvas  = document.getElementById('canvas-10'),
			context = canvas.getContext('2d');

		canvas.width  = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;

		context.fillStyle = 'red';

		context.shadowOffsetX = 4;
		context.shadowOffsetY = 4;
		context.shadowColor   = 'black';
		context.shadowBlur    = 4;
		context.fillRect(10, 10, 100, 100);


		context.shadowOffsetX = -4;
		context.shadowOffsetY = -4;
		context.shadowColor   = 'black';
		context.shadowBlur    = 10;
		context.fillRect(150, 10, 100, 100);


		context.shadowOffsetX = 4;
		context.shadowOffsetY = 4;
		context.shadowColor   = 'black';
		context.shadowBlur    = 4;
		context.arc(350, 50, 50, 0, Math.PI / 180 * 360);
		context.fill();
	};

	const init = () => {
		drawRectangle();
		drawLine();
		drawCicle();
		bezier();
		clip();
		composite();
		rotate();
		gradient();
		pattern();
		shadow();
	};

	init();
});
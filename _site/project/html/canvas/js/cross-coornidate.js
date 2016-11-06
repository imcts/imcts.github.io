require([
    '../js/util.js'
], (
    util
) => {
    const canvas = util.getCanvas('canvas');
    const context = canvas.getContext('2d');

    const drawHorizontalLine = () => {
        const MARGIN = 50;

        context.strokeStyle = 'red';
        context.lineWidth   = 1;

        context.beginPath();
        context.moveTo(MARGIN, canvas.height - MARGIN);
        context.lineTo(MARGIN, MARGIN);
        context.closePath();
        context.stroke();




        context.beginPath();
        context.moveTo(MARGIN, canvas.height - MARGIN);
        context.lineTo(canvas.width - MARGIN, canvas.height - MARGIN);
        context.closePath();
        context.stroke();


    };

    const drawCrossLine = () => {
        context.strokeStyle = '#d3d3d3';
        context.lineWidth = 0.2;

        for(let x = 0, y = canvas.height, len = canvas.width; x < len; x += 10) {
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, y);
            context.closePath();
            context.stroke();
        }

        for(let x = canvas.width, y = 0, len = canvas.height; y < len; y += 10) {
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(x, y);
            context.closePath();
            context.stroke();
        }
    };

    const init = () => {
        canvas.width  = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        drawCrossLine();
        drawHorizontalLine();
    };


    init();

});
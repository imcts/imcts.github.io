require([
    '../js/util.js'
], (
    util
) => {

    'use strict';

    //canvas
    const canvas  = util.getCanvas(),
          context = canvas.getContext('2d');

    //configuration
    const BOX_WIDTH_COUNT    = 10,
          BOX_HEIGHT_COUNT   = 21,
          BOX_SIZE           = 24,
          START_X            = BOX_SIZE * 10,
          START_Y            = 0,
          NEXT_BLOCK_START_X = BOX_SIZE * 22,
          NEXT_BLOCK_START_Y = BOX_SIZE;

    const KEY = {};

    //BLOCK
    const BLOCKS = {
        'T': {
            'center-color':    '#fef52a',
            'left-color':      '#fcc81c',
            'right-color':     '#f6f6ba',
            'next-position-x': [NEXT_BLOCK_START_X + BOX_SIZE, NEXT_BLOCK_START_X + BOX_SIZE * 2, NEXT_BLOCK_START_X + BOX_SIZE * 3, NEXT_BLOCK_START_X + BOX_SIZE * 2],
            'next-position-y': [NEXT_BLOCK_START_Y + BOX_SIZE, NEXT_BLOCK_START_Y + BOX_SIZE, NEXT_BLOCK_START_Y + BOX_SIZE, NEXT_BLOCK_START_Y + BOX_SIZE * 2],
            'start-draw-x':    [0, 0, 0, 1],
            'start-draw-y':    [4, 5, 6, 5],
            'isBlock':         true,
            'twins':           {
                '1': {
                    'rows': [0, -1, -2, 0],
                    'cols': [-1, 0, 1, 1]
                },

                '2': {
                    'rows': [2, 1, 0, 0],
                    'cols': [1, 0, -1, 1]
                },

                '3': {
                    'rows': [-1, 0, 1, -1],
                    'cols': [1, 0, -1, -1]
                },

                '4': {
                    'rows': [-1, 0, 1, 1],
                    'cols': [-1, 0, 1, -1]
                }
            }
        },

        'J': {
            'center-color':    '#ff6d00',
            'left-color':      '#dd6100',
            'right-color':     '#fe9b35',
            'next-position-x': [NEXT_BLOCK_START_X + BOX_SIZE, NEXT_BLOCK_START_X + BOX_SIZE, NEXT_BLOCK_START_X + BOX_SIZE * 2, NEXT_BLOCK_START_X + BOX_SIZE * 3],
            'next-position-y': [NEXT_BLOCK_START_Y + BOX_SIZE, NEXT_BLOCK_START_Y + BOX_SIZE * 2, NEXT_BLOCK_START_Y + BOX_SIZE * 2, NEXT_BLOCK_START_Y + BOX_SIZE * 2],
            'start-draw-x':    [0, 1, 1, 1],
            'start-draw-y':    [4, 4, 5, 6],
            'isBlock':         true,
            'twins':           {
                '1': {
                    'rows': [0, 1, 0, -1],
                    'cols': [-1, 0, 1, 2]
                },

                '2': {
                    'rows': [2, 1, 0, -1],
                    'cols': [0, 1, 0, -1]
                },

                '3': {
                    'rows': [-1, -2, -1, 0],
                    'cols': [1, 0, -1, -2]
                },

                '4': {
                    'rows': [-1, 0, 1, 2],
                    'cols': [0, -1, 0, 1]
                }
            }
        },

        'L': {
            'center-color':    '#ab4eff',
            'left-color':      '#8042e3',
            'right-color':     '#bd7bff',
            'next-position-x': [NEXT_BLOCK_START_X + BOX_SIZE, NEXT_BLOCK_START_X + BOX_SIZE, NEXT_BLOCK_START_X + BOX_SIZE * 2, NEXT_BLOCK_START_X + BOX_SIZE * 3],
            'next-position-y': [NEXT_BLOCK_START_Y + BOX_SIZE, NEXT_BLOCK_START_Y + BOX_SIZE * 2, NEXT_BLOCK_START_Y + BOX_SIZE * 2, NEXT_BLOCK_START_Y + BOX_SIZE * 2],
            'start-draw-x':    [1, 1, 1, 0],
            'start-draw-y':    [4, 5, 6, 6],
            'isBlock':         true,
            'twins':           {
                '1': {
                    'rows': [1, 0, -1, -2],
                    'cols': [-1, 0, 1, 0]
                },

                '2': {
                    'rows': [1, 0, -1, 0],
                    'cols': [2, 1, 0, -1]
                },

                '3': {
                    'rows': [-2, -1, 0, 1],
                    'cols': [0, -1, -2, -1]
                },

                '4': {
                    'rows': [0, 1, 2, 1],
                    'cols': [-1, 0, 1, 2]
                }
            }
        },

        'I': {
            'center-color':    '#ff3401',
            'left-color':      '#ce2a04',
            'right-color':     '#f76b78',
            'next-position-x': [NEXT_BLOCK_START_X + BOX_SIZE * 0.5, NEXT_BLOCK_START_X + BOX_SIZE * 1.5, NEXT_BLOCK_START_X + BOX_SIZE * 2.5, NEXT_BLOCK_START_X + BOX_SIZE * 3.5],
            'next-position-y': [NEXT_BLOCK_START_Y + BOX_SIZE * 1.5, NEXT_BLOCK_START_Y + BOX_SIZE * 1.5, NEXT_BLOCK_START_Y + BOX_SIZE * 1.5, NEXT_BLOCK_START_Y + BOX_SIZE * 1.5],
            'start-draw-x':    [0, 1, 2, 3],
            'start-draw-y':    [4, 4, 4, 4],
            'isBlock':         true,
            'twins':           {
                '1': {
                    'rows': [-1, 0, 1, 2],
                    'cols': [1, 0, -1, -2]
                },

                '2': {
                    'rows': [1, 0, -1, -2],
                    'cols': [-1, 0, 1, 2]
                },

                '3': {
                    'rows': [-1, 0, 1, 2],
                    'cols': [1, 0, -1, -2]
                },

                '4': {
                    'rows': [1, 0, -1, -2],
                    'cols': [-1, 0, 1, 2]
                }
            }
        },

        'S': {
            'center-color':    'tomato',
            'left-color':      '#e2583f',
            'right-color':     '#ee7984',
            'next-position-x': [NEXT_BLOCK_START_X + BOX_SIZE, NEXT_BLOCK_START_X + BOX_SIZE * 2, NEXT_BLOCK_START_X + BOX_SIZE * 2, NEXT_BLOCK_START_X + BOX_SIZE * 3],
            'next-position-y': [NEXT_BLOCK_START_Y + BOX_SIZE * 2, NEXT_BLOCK_START_Y + BOX_SIZE * 2, NEXT_BLOCK_START_Y + BOX_SIZE, NEXT_BLOCK_START_Y + BOX_SIZE],
            'start-draw-x':    [1, 1, 0, 0],
            'start-draw-y':    [4, 5, 5, 6],
            'isBlock':         true,
            'twins':           {
                '1': {
                    'rows': [-1, 0, -1, 0],
                    'cols': [-1, 0, 1, 2]
                },

                '2': {
                    'rows': [1, 0, 1, 0],
                    'cols': [1, 0, -1, -2]
                },

                '3': {
                    'rows': [-1, 0, -1, 0],
                    'cols': [-1, 0, 1, 2]
                },

                '4': {
                    'rows': [1, 0, 1, 0],
                    'cols': [1, 0, -1, -2]
                }
            }
        },

        'Z': {
            'center-color':    '#02ec33',
            'left-color':      '#09ba24',
            'right-color':     '#45f185',
            'next-position-x': [NEXT_BLOCK_START_X + BOX_SIZE, NEXT_BLOCK_START_X + BOX_SIZE * 2, NEXT_BLOCK_START_X + BOX_SIZE * 2, NEXT_BLOCK_START_X + BOX_SIZE * 3],
            'next-position-y': [NEXT_BLOCK_START_Y + BOX_SIZE, NEXT_BLOCK_START_Y + BOX_SIZE, NEXT_BLOCK_START_Y + BOX_SIZE * 2, NEXT_BLOCK_START_Y + BOX_SIZE * 2],
            'start-draw-x':    [0, 0, 1, 1],
            'start-draw-y':    [3, 4, 4, 5],
            'isBlock':         true,
            'twins':           {
                '1': {
                    'rows': [-2, -1, 0, 1],
                    'cols': [0, 1, 0, 1]
                },

                '2': {
                    'rows': [2, 1, 0, -1],
                    'cols': [0, -1, 0, -1]
                },

                '3': {
                    'rows': [-2, -1, 0, 1],
                    'cols': [0, 1, 0, 1]
                },

                '4': {
                    'rows': [2, 1, 0, -1],
                    'cols': [0, -1, 0, -1]
                }
            }
        },

        'O': {
            'center-color':    '#0142fe',
            'left-color':      '#092fce',
            'right-color':     '#0c81ff',
            'next-position-x': [NEXT_BLOCK_START_X + BOX_SIZE * 1.5, NEXT_BLOCK_START_X + BOX_SIZE * 2.5, NEXT_BLOCK_START_X + BOX_SIZE * 1.5, NEXT_BLOCK_START_X + BOX_SIZE * 2.5],
            'next-position-y': [NEXT_BLOCK_START_Y + BOX_SIZE, NEXT_BLOCK_START_Y + BOX_SIZE, NEXT_BLOCK_START_Y + BOX_SIZE * 2, NEXT_BLOCK_START_Y + BOX_SIZE * 2],
            'start-draw-x':    [0, 0, 1, 1],
            'start-draw-y':    [4, 5, 4, 5],
            'isBlock':         true,
            'twins':           {
                '1': {
                    'rows': [0, 0, 0, 0],
                    'cols': [0, 0, 0, 0]
                },

                '2': {
                    'rows': [0, 0, 0, 0],
                    'cols': [0, 0, 0, 0]
                },

                '3': {
                    'rows': [0, 0, 0, 0],
                    'cols': [0, 0, 0, 0]
                },

                '4': {
                    'rows': [0, 0, 0, 0],
                    'cols': [0, 0, 0, 0]
                }
            }
        }
    };

    const SCORE_VALUE = 100;

    const SCORE_TEXT_X = BOX_SIZE * 5,
          SCORE_TEXT_Y = BOX_SIZE * 3;

    let SCORE = 0;

    const USER_TEXT_X = BOX_SIZE * 5,
          USER_TEXT_Y = BOX_SIZE;

    let USER_NAME = null;

    const GRAPH_X = BOX_SIZE * 5,
          GRAPH_Y = BOX_SIZE * 9;

    //next block
    let CURRENT_BLOCK_POSITION = null,
        CURRENT_BLOCK_STATUS   = null,
        CURRENT_BLOCK_KEY      = null,
        KEEP_BLOCK_POSITION    = null,
        KEEP_BLOCK_KEY         = null,
        NEXT_BLOCK             = null,
        NEXT_BLOCK_KEY         = null,
        isKeepChange           = true;

    //time
    let CHANGE_TIME  = 10000,
        TIME         = 700,
        time         = TIME,
        timer        = null,
        changeTimer  = null,
        isTimeAgain  = true;

    //MAP
    let MAP = Array(...Array(BOX_HEIGHT_COUNT)).map(() => Array(...Array(BOX_WIDTH_COUNT)).fill({isBlock: false}));

    //draw block
    const drawBlock = (block, x, y) => {

        //shadow make and background color set
        context.save();
        context.lineWidth   = 2;
        context.shadowColor   = block['left-color'];
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur    = 7;

        context.fillStyle = block['left-color'];
        context.fillRect(x, y, BOX_SIZE, BOX_SIZE);

        //triangle draw
        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = context.fillStyle = block['right-color'];
        context.moveTo(x, y);
        context.lineTo(x + BOX_SIZE, y);
        context.lineTo(x + BOX_SIZE, y + BOX_SIZE);
        context.lineTo(x, y);
        context.stroke();
        context.fill();

        //center rect draw
        context.fillStyle = block['center-color'];
        context.fillRect(x + 3, y + 3, BOX_SIZE - 6, BOX_SIZE - 6);
        context.closePath();
        context.restore();
    };

    //set block
    const setBlock = () => {
        let x       = 1,
            y       = 1;

        canvas.width = canvas.width;

        //draw full map
        drawCrossLine();

        //draw map border
        drawMap();

        //draw next block
        drawNextBlock();

        //draw score
        drawScore();

        //draw time graph
        drawGraph();

        //draw user name
        drawUserName();

        if(KEEP_BLOCK_POSITION)
            drawKeepBlock();

        for(let i = 0, row; row = MAP[i]; i++) {
            y = START_Y + BOX_SIZE * i;

            for(let j = 0, block; block = row[j]; j++) {

                if(block.isBlock) {
                    x = START_X + BOX_SIZE * j;

                    drawBlock(block, x, y);

                }

            }
        }
    };

    //draw cross line gray
    const drawCrossLine = () => {
        context.strokeStyle = '#d3d3d3';
        context.lineWidth = 1;

        for(let x = 0, y = canvas.height, len = canvas.width; x < len; x += BOX_SIZE) {
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, y);
            context.closePath();
            context.stroke();
        }

        for(let x = canvas.width, y = 0.5, len = canvas.height; y < len; y += BOX_SIZE) {
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(x, y);
            context.closePath();
            context.stroke();
        }
    };

    //is current block contains
    const isNotCurrent = (row, col) => {
        for(let i = 0; i < 4; i++)
            if((CURRENT_BLOCK_POSITION[i]['row'] === row) && (CURRENT_BLOCK_POSITION[i]['col'] === col)) //이동할 곳이 원래 내가 있던 위치일경우
                return false;

        return true; //이동할 곳이 원래 내가 있던 위치가 아닐경우
    };

    //calc swift block
    const swiftMovement = () => {
        const moveResult = [];

        const changeStatus = CURRENT_BLOCK_STATUS === 4 ? 1 : CURRENT_BLOCK_STATUS + 1;

        const status = BLOCKS[CURRENT_BLOCK_KEY]['twins'][changeStatus];

        for(let i = 0, row, col; i < 4; i++) {
            row = CURRENT_BLOCK_POSITION[i]['row'] + status['rows'][i];
            col = CURRENT_BLOCK_POSITION[i]['col'] + status['cols'][i];

            if(row < 0)
                return;

            if(col < 0)
                return;

            if(col >= BOX_WIDTH_COUNT)
                return;

            if(row >= BOX_HEIGHT_COUNT)
                return;

            //isMove
            if(isNotCurrent(row, col) && MAP[row][col].isBlock)
                return;

            moveResult.push({ row, col });
        }

        //clear current block
        for(let i = 0, row, col; i < 4; i++)
            MAP[CURRENT_BLOCK_POSITION[i]['row']][CURRENT_BLOCK_POSITION[i]['col']] = { isBlock: false };

        //set current block
        for(let i = 0, row, col; i < 4; i++)
            MAP[moveResult[i]['row']][moveResult[i]['col']] = BLOCKS[CURRENT_BLOCK_KEY];

        CURRENT_BLOCK_POSITION = moveResult;
        CURRENT_BLOCK_STATUS   = changeStatus;

        setBlock();
    };

    //calc remove block
    const calcRemoveBlock = () => {
        const removeList = [];

        for(let i = 0, row, isRemove; row = MAP[i]; i++, isRemove = true) {

            for(let j = 0, block; block = row[j]; j++) {

                if(!block.isBlock) {
                    isRemove = false;
                    break;
                }

            }

            if(isRemove)
                removeList.push(i);
        }


        for(let i = 0, row; row = removeList[i]; i++) {
            MAP.splice(row, 1);
            MAP.unshift(Array(BOX_WIDTH_COUNT).fill({isBlocj: false}));
        }

        SCORE += SCORE_VALUE * removeList.length;

        isKeepChange = true;
    };

    //calc rows movement
    const calcRow = value => {
        let moveResult = [ ...CURRENT_BLOCK_POSITION ];

        for(let i = 0, row, col; i < 4; i++) {
            row = CURRENT_BLOCK_POSITION[i]['row'] + value;
            col = CURRENT_BLOCK_POSITION[i]['col'];

            moveResult[i] = { row, col };

            if(row >= BOX_HEIGHT_COUNT || (isNotCurrent(row, col) && MAP[row][col].isBlock)) {
                calcRemoveBlock();

                getStartBlock();

                makeNextBlock();

                setBlock();

                return;
            }
        }

        //clear current block
        for(let i = 0, row, col; i < 4; i++)
            MAP[CURRENT_BLOCK_POSITION[i]['row']][CURRENT_BLOCK_POSITION[i]['col']] = { isBlock: false };

        //set current block
        for(let i = 0, row, col; i < 4; i++)
            MAP[moveResult[i]['row']][moveResult[i]['col']] = BLOCKS[CURRENT_BLOCK_KEY];

        CURRENT_BLOCK_POSITION = moveResult;

        setBlock();
    };

    //calc cols movement
    const calcCol = value => {
        let moveResult = [ ...CURRENT_BLOCK_POSITION ];

        for(let i = 0, row, col; i < 4; i++) {
            row = CURRENT_BLOCK_POSITION[i]['row'];
            col = CURRENT_BLOCK_POSITION[i]['col'] + value;

            if(col < 0 || col >= BOX_WIDTH_COUNT)
                return;

            if(isNotCurrent(row, col) && MAP[row][col].isBlock)
                return;

            moveResult[i] = { row, col };
        }

        //clear current block
        for(let i = 0, row, col; i < 4; i++)
            MAP[CURRENT_BLOCK_POSITION[i]['row']][CURRENT_BLOCK_POSITION[i]['col']] = { isBlock: false };

        //set current block
        for(let i = 0, row, col; i < 4; i++)
            MAP[moveResult[i]['row']][moveResult[i]['col']] = BLOCKS[CURRENT_BLOCK_KEY];

        CURRENT_BLOCK_POSITION = moveResult;

        setBlock();
    };

    //calc space bar
    const calcSpace = () => {
        const moveResult = [];

        for(let i = 1, isBreak = false, row, col; isBreak == false; i++) {

            moveResult.length = 0;

            for(let j = 0; j < 4; j++) {
                row = CURRENT_BLOCK_POSITION[j]['row'] + i;
                col = CURRENT_BLOCK_POSITION[j]['col'];

                moveResult.push({ row: row - 1, col });

                if((row >= BOX_HEIGHT_COUNT) || (!isBreak && isNotCurrent(row, col) && MAP[row][col].isBlock))
                    isBreak    = true;
            }
        }

        //clear current block
        for(let i = 0, row, col; i < 4; i++)
            MAP[CURRENT_BLOCK_POSITION[i]['row']][CURRENT_BLOCK_POSITION[i]['col']] = { isBlock: false };

        //set current block
        for(let i = 0, row, col; i < 4; i++)
            MAP[moveResult[i]['row']][moveResult[i]['col']] = BLOCKS[CURRENT_BLOCK_KEY];

        CURRENT_BLOCK_POSITION = moveResult;

        calcRemoveBlock();

        getStartBlock();

        makeNextBlock();

        setBlock();
    };

    //key down callback
    const doMoves = {
        ['ArrowUp']: swiftMovement,

        ['ArrowDown']() {
            if(KEY['ArrowLeft'])
                calcCol(-1);
            else if(KEY['ArrowRight'])
                calcCol(1);

            calcRow(1);
        },

        ['ArrowLeft']() {
            if(KEY['ArrowDown'])
                calcRow(1);

            calcCol(-1);
        },

        ['ArrowRight']() {
            if(KEY['ArrowDown'])
                calcRow(1);

            calcCol(1);
        },

        [' ']: calcSpace,

        ['Shift']() {
            getChangeBlock();
        }
    };

    //KEY EVENTS
    const keyDown = e => {
        const key = e.key;

        KEY[key] = true;

        if(doMoves[key]) doMoves[key]();
    };

    //free event
    const clearEvent = () => {
        window.removeEventListener('keydown', keyDown, true); //key down call back function
        window.removeEventListener('keyup', e => KEY[e.key] = false, true);
    };

    //event bind
    const setEvent = () => {
        window.addEventListener('keydown', keyDown, true); //key down call back function
        window.addEventListener('keyup', e => KEY[e.key] = false, true);
    };

    const setBtnEvent = () => {
        //start btn
        document.getElementById('js_gameStartBtn').addEventListener('click', e => {
            const container  = document.getElementById('js_dimmedSection'),
                  startModal = document.getElementById('js_startModal'),
                  input      = document.getElementById('js_userName');

            USER_NAME = input.value || 'USER';

            container.style.display = startModal.style.display = 'none';

            start();
        }, false);

        document.getElementById('js_restartBtn').addEventListener('click', e => {
            const container  = document.getElementById('js_dimmedSection'),
                  endModal = document.getElementById('js_endModal');

            container.style.display = endModal.style.display = 'none';

            CURRENT_BLOCK_POSITION = null;
            CURRENT_BLOCK_STATUS   = null;
            CURRENT_BLOCK_KEY      = null;
            NEXT_BLOCK             = null;
            NEXT_BLOCK_KEY         = null;

            CHANGE_TIME  = 15000;
            TIME         = 700;
            time         = TIME;
            timer        = null;
            changeTimer  = null;
            isTimeAgain  = true;

            KEEP_BLOCK_POSITION = null;
            KEEP_BLOCK_KEY      = null;

            MAP = Array(...Array(BOX_HEIGHT_COUNT)).map(() => Array(...Array(BOX_WIDTH_COUNT)).fill({isBlock: false}));

            SCORE = 0;

            start();
        }, false);
    };

    //get block key
    const makeKey = () => Object.keys(BLOCKS)[Math.floor(Math.random() * Object.keys(BLOCKS).length)];

    //draw keep block
    const drawKeepBlock = () => {
        const block = Object.assign({}, BLOCKS[KEEP_BLOCK_KEY]);

        for(let i = 0; i < 4; i++)
            drawBlock(block, block['next-position-x'][i], block['next-position-y'][i] + BOX_SIZE * 6);
    };

    //make next block
    const makeNextBlock = () => {
        NEXT_BLOCK_KEY = makeKey();
        NEXT_BLOCK = Object.assign({}, BLOCKS[NEXT_BLOCK_KEY]);
    };

    //draw next block
    const drawNextBlock = () => {
        for(let i = 0; i < 4; i++)
            drawBlock(NEXT_BLOCK, NEXT_BLOCK['next-position-x'][i], NEXT_BLOCK['next-position-y'][i]);
    };

    const gameStop = () => {
        const container  = document.getElementById('js_dimmedSection'),
              endModal = document.getElementById('js_endModal'),
              name     = document.getElementById('js_endModalName'),
              point    = document.getElementById('js_endModalPoint');

        isTimeAgain = false;

        //stop timer
        stopTimer();

        //stop change timer
        stopChangeTimer();

        //clear Event
        clearEvent();

        name.innerHTML = `${USER_NAME} 님`;
        point.innerHTML = `${SCORE} 점`;
        container.style.display = 'table';
        endModal.style.display  = 'inline-block';
    };

    const getChangeBlock = () => {
        let TEMP_POSITION = null,
            TEMP_KEY      = null;

        if(!isKeepChange)
            return;

        if(KEEP_BLOCK_POSITION) {
            stopTimer();

            for(let i = 0, row, col; i < 4; i++)
                MAP[CURRENT_BLOCK_POSITION[i]['row']][CURRENT_BLOCK_POSITION[i]['col']] = { isBlock: false };

            TEMP_POSITION = CURRENT_BLOCK_POSITION;
            TEMP_KEY      = CURRENT_BLOCK_KEY;

            CURRENT_BLOCK_KEY      = KEEP_BLOCK_KEY;
            CURRENT_BLOCK_POSITION = [];
            CURRENT_BLOCK_STATUS   = 1;

            const block = BLOCKS[CURRENT_BLOCK_KEY];

            for(let i = 0, row, col; i < 4; i++) {
                row = block['start-draw-x'][i];
                col = block['start-draw-y'][i];

                if(MAP[row][col].isBlock)
                    gameStop();
                else
                    MAP[row][col] = block;

                CURRENT_BLOCK_POSITION.push({ row, col });
            }

            KEEP_BLOCK_POSITION = TEMP_POSITION;
            KEEP_BLOCK_KEY      = TEMP_KEY;

            setBlock();

            startTimer();

        } else {
            for(let i = 0, row, col; i < 4; i++)
                MAP[CURRENT_BLOCK_POSITION[i]['row']][CURRENT_BLOCK_POSITION[i]['col']] = { isBlock: false };

            KEEP_BLOCK_POSITION = CURRENT_BLOCK_POSITION;
            KEEP_BLOCK_KEY      = CURRENT_BLOCK_KEY;

            getStartBlock();

            makeNextBlock();

            setBlock();
        }

        isKeepChange = false;
    };

    //start block
    const getStartBlock = () => {
        CURRENT_BLOCK_KEY      = NEXT_BLOCK_KEY || makeKey();
        CURRENT_BLOCK_POSITION = [];
        CURRENT_BLOCK_STATUS   = 1;

        stopTimer();

        const block = NEXT_BLOCK || BLOCKS[CURRENT_BLOCK_KEY];

        for(let i = 0, row, col; i < 4; i++) {
            row = block['start-draw-x'][i];
            col = block['start-draw-y'][i];

            if(MAP[row][col].isBlock)
                gameStop();
            else
                MAP[row][col] = block;

            CURRENT_BLOCK_POSITION.push({ row, col });
        }

        startTimer();
    };

    //draw map border
    const drawMap = () => {
        context.beginPath();
        context.lineWidth = 3;
        context.strokeStyle = context.shadowColor = '#5d86b4';
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur    = 7;

        //map border draw
        context.moveTo(START_X, START_Y);
        context.lineTo(START_X, BOX_SIZE * BOX_HEIGHT_COUNT);
        context.lineTo(START_X + BOX_SIZE * BOX_WIDTH_COUNT, BOX_SIZE * BOX_HEIGHT_COUNT);
        context.lineTo(START_X + BOX_SIZE * BOX_WIDTH_COUNT, START_Y);

        //current block border draw
        context.strokeRect(NEXT_BLOCK_START_X, NEXT_BLOCK_START_Y, BOX_SIZE * 5, BOX_SIZE * 4);

        //keep block border draw
        context.strokeRect(NEXT_BLOCK_START_X, NEXT_BLOCK_START_Y + BOX_SIZE * 6, BOX_SIZE * 5, BOX_SIZE * 4);

        context.stroke();
        context.closePath();
    };

    //draw user name
    const drawUserName = () => {
        context.strokeStyle = '#333';
        context.font = '25px serif';
        context.textAlign = 'center';

        context.shadowColor = '#333';
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur = 7;

        context.fillText(`- ${USER_NAME} -`, USER_TEXT_X, USER_TEXT_Y);
    };

    //draw score
    const drawScore = () => {
        context.strokeStyle = '#333';
        context.font = '25px serif';
        context.textAlign = 'center';

        context.shadowColor = '#333';
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur = 7;

        context.fillText('SCORE', SCORE_TEXT_X, SCORE_TEXT_Y);


        context.fillText(SCORE, SCORE_TEXT_X, SCORE_TEXT_Y + BOX_SIZE * 1.5, BOX_SIZE * 8);
    };

    const drawGraph = () => {
        let speedMaxLevel = 14,
            currentLevel  = speedMaxLevel - time / 50 + 1,
            percent       = 360 / 14,
            radian        = Math.PI / 180 * (percent * currentLevel);

        context.save();
        context.beginPath();
        context.strokeStyle = '#8d8d8d';
        context.arc(GRAPH_X, GRAPH_Y, 50, 0, Math.PI / 180 * 360); //radian draw
        context.stroke();
        context.closePath();
        context.restore();


        context.save();
        context.beginPath();
        //단위행렬로 초기화 벡터 계산식
        context.transform(1, 0, 0, 1, 0, 0);
        context.strokeStyle = '#fec000';
        context.lineWidth = 15;
        context.translate(GRAPH_X, GRAPH_Y); //기준점 설정
        context.rotate(Math.PI / 180 * -90); //캔버스 회전
        context.translate(-GRAPH_X, -GRAPH_Y); //기준점 원복
        context.arc(GRAPH_X, GRAPH_Y, 50, 0, radian); //radian draw
        context.stroke();

        context.translate(GRAPH_X, GRAPH_Y); //기준점 설정
        context.rotate(Math.PI / 180 * 90); //캔버스 회전
        context.translate(-GRAPH_X, -GRAPH_Y); //기준점 원복

        context.closePath();


        context.strokeStyle = '#333';
        context.font = '15px serif';
        context.textAlign = 'center';

        context.shadowColor = '#333';
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.shadowBlur = 7;

        context.fillText(`SPEED`, GRAPH_X, GRAPH_Y + 5);
    };

    //common timer
    const startChangeTimer = () => {
        //change timer
        time = TIME;
        changeTimer = setInterval(() => time = time <= 50 ? 50 : time - 50, CHANGE_TIME);
    };

    //stop change timer
    const stopChangeTimer = () => {
        if(changeTimer) {
            clearInterval(changeTimer);
            changeTimer = null;
        }
    };

    //stop timer
    const stopTimer = () => {
        if(timer) {
            clearInterval(timer);
            timer = null;
        }
    };

    //start timer
    const startTimer = () => isTimeAgain && (timer = setInterval(() => calcRow(1), time));

    //start
    const start = () => {
        //set first block
        getStartBlock();

        //set next block
        makeNextBlock();

        //set blocks
        setBlock();

        //set event bind
        setEvent();

        //change timer
        startChangeTimer();
    };

    //initialize
    const init = () => {
        canvas.width  = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        //draw cross line
        drawCrossLine();

        //draw map
        drawMap();

        //set btn event bind
        setBtnEvent();

        //draw score
        drawScore();

        //draw time graph
        drawGraph();
    };

    init();
});
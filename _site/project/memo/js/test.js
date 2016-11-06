 	var paramLeft, paramTop=50, number;
	var browserSize;
	var target;
	var lastTarget;
	var memoDefaultSize = 200;
	var minimumSize = 200;
	var isClick=false;
	var textAreaMinimumWidthSize = 196;
	var textAreaMinimumHeightSize = 150;
	var timer = null;
	
	var color = [
	    '#fff68f',
	    '#d5e286',
	    '#82ccb5',
	    '#6acbde',
	    '#6bbce9',
	    '#877bb9',
	    '#9a76b4',
	    '#ea91bd',
	    '#ea91bd',
	    '#fabc89'
	    ];

	
	window.onresize = function(){
        browserSize = [document.body.scrollWidth,document.body.scrollHeight];
        if(browserSize[0] < 300)
            $('.main-top-bar').css('width',300);
        else
            $('.main-top-bar').css('width','100%');
    }

    $(window).ready(function(){
        window.onresize();

        $(window).mouseup(function(){
            $(window).unbind('mousemove');
            $('body').css('cursor','auto');
            isClick=false;
        });
        
        // $.ajax({
        //     url: '/memoCountCheck',
        //     type: 'POST',
        //     dataType: 'json',
        //     cache: false,
        //     success: function(data) {
        //    	 	if(data.data == 0){
        //    	 		defaultMemoCreate();
        //    	 	}else{
        //    	 		getList();
        //    	 	}
        //     }
        // });
    
        refresh();
    });
    
    function getList(){
    	$.ajax({
            url: '/getList',
            type: 'POST',
            dataType: 'json',
            cache: false,
            success: function(data) {
           	 	console.log(data);//초기 아이디값 받아와서 해야하고.
           	 	console.log("리스트 얻어옴");
           	 	var result ='<div class="main-top-bar">';
           	 	result+='<span class="top-title">My Border</span>';
           	 	result+='<span id="top-state">save all</span></div>';
           	 	
           	 	for(var i =0; i<data.length; i++){
	           	 	result+='<div id="'+data[i].key+'" class="memo create-moving" style="background-color: '+data[i].css.color+'; left:'+data[i].css.left+'px; top: '+data[i].css.top+'px;';
	           	 	result+='width: '+data[i].css.width+'px; height: '+data[i].css.height+'px;" >';
	           	 	result+='<div class="top" style="background-color: '+data[i].css.color+'"></div>';
	           	 	result+='<div class="add-memo"><img class="add-button-click" src="image/plus.png"></div>';
	           	 	result+='<div class="delete-memo"><img class="delete-button-click" src="image/close.png"></div>';
	           	 	result+='<div class="area-body" ><textarea style="width: '+(parseInt(data[i].css.width)-4)+'px; height: '+(parseInt(data[i].css.height)-50)+'px;" class="text-area">'+data[i].content+'</textarea></div>';
	           	 	result+='<span class="bottom-body"><a>done</a></span>';
	           	 	result+='<img class="right-down" src="image/right-buttom.png"></div>';
           	 	}
           	 	$('body').html(result);
           	 	unbind();
       	 		refresh();
       	 		$('body').children().removeClass('create-moving');
            }
        });
    }

    function defaultMemoCreate(){
    	var key = new Date().getTime() + Math.round(Math.random()*1000);
    	var params={
        		left : 0,
        		top : 50, 
        		width : memoDefaultSize,
        		height : memoDefaultSize,
        		color : color[0],
        		key :  key
        	};
        	
        	$.ajax({
                url: '/createMemo',
                type: 'POST',
                dataType: 'json',
                cache: false,
                data : params,
                success: function(data) {
               	 	console.log(data);//초기 아이디값 받아와서 해야하고.
               	 	$('body div:last-child').attr('id',key);
               	 	refresh();
               	 	$('body').children().removeClass('create-moving');
                }
            });
    }

    function refresh(){
        $('.right-down').mousedown(resizebleDown).hover(resizebleHover).mouseleave(resizebleLeave);
        $('.top').mousedown(movingDown);
        $('.add-button-click').mousedown(createMemo).hover(function(){$('body').css('cursor','pointer');$(this).attr('src','image/plusBorder.png');})
        .mouseleave(function(){$('body').css('cursor','auto');$(this).attr('src','image/plus.png');});
        $('.delete-button-click').mousedown(deleteMemo).hover(function(){$('body').css('cursor','pointer');$(this).attr('src','image/closeBorder.png');})
        .mouseleave(function(){$('body').css('cursor','auto');$(this).attr('src','image/close.png');});
        $('.bottom-body > a').mousedown(updateMemo).attr('href','#').keydown(function(event){if(event.keyCode==13){updateMemo();}});
        $('.bottom-body').mousedown(function(e){target = this.parentElement; changeZindex(); e.preventDefault();});
        $('.text-area').mousedown(function(){target = this.parentElement.parentElement; changeZindex();});
    }

    function unbind(){
        $('.right-down').unbind('mousedown').unbind('hover').unbind('mouseleave');
        $('.top').unbind('mousedown');
        $('.add-button-click').unbind('mousedown').unbind('hover').unbind('mouseleave');
        $('.delete-button-click').unbind('mousedown').unbind('hover').unbind('mouseleave');
        $('.bottom-body').unbind('mousedown');
        $('.text-area').unbind('mousedown');
    }

    function createMemo(){
        $('body').children().removeClass('create-moving');
        target = this.parentElement.parentElement;
        number = Math.round(Math.random()*(color.length-1));
        var key = new Date().getTime() + Math.round(Math.random()*1000);
        var result = '<div id ="'+key+'"class="memo create-moving" style="background-color: '+color[number]+'; left:'+target.offsetLeft+'px; top: '+target.offsetTop+'px">';
        result+='<div class="top" style="background-color: '+color[number]+'"></div>';
        result+='<div class="add-memo"><img class="add-button-click" src="image/plus.png"></div>';
        result+='<div class="delete-memo"><img class="delete-button-click" src="image/close.png"></div>';
        result+='<div class="area-body"><textarea class="text-area"></textarea></div>';
        result+='<span class="bottom-body"><a>done</a></span>';
        result+='<img class="right-down" src="image/right-buttom.png"></div>';

        $('body').append(result);
        createPosition();
        unbind();
        refresh();
        
        // console.log(paramLeft);
        // console.log(paramTop);
        
        var params={
        	key : key,
    		left : paramLeft,
    		top : paramTop, 
    		width : memoDefaultSize,
    		height : memoDefaultSize,
    		color : color[number]
    	};
    	
    	// $.ajax({
     //        url: '/createMemo',
     //        type: 'POST',
     //        dataType: 'json',
     //        cache: false,
     //        data : params,
     //        success: function(data) {
     //       	 	console.log("메모생성");
     //        }
     //    });
        
    }
    

    function createPosition(){
        if(target.offsetLeft < memoDefaultSize && browserSize[0] - (target.offsetLeft + target.offsetWidth) > memoDefaultSize){
        	paramLeft = target.offsetLeft + target.offsetWidth;
            paramTop = target.offsetTop;
            setTimeout(function(){
                lastTarget = $('body div:last-child');
                lastTarget.css('left',paramLeft);
                setTimeout(function(){lastTarget.removeClass('create-moving');},800);
            },100);
        }else if(browserSize[0] - (target.offsetLeft + target.offsetWidth) < memoDefaultSize && target.offsetLeft > memoDefaultSize){
        	paramLeft = target.offsetLeft - memoDefaultSize;
            paramTop = target.offsetTop;
            setTimeout(function(){
                lastTarget = $('body div:last-child');
                lastTarget.css('left',paramLeft);
                setTimeout(function(){lastTarget.removeClass('create-moving');},800);
            },100);
        }else if(browserSize[0] - (target.offsetLeft + target.offsetWidth) > memoDefaultSize && target.offsetLeft >= memoDefaultSize){
        	paramLeft = target.offsetLeft + target.offsetWidth;
            paramTop = target.offsetTop;
            setTimeout(function(){
                lastTarget = $('body div:last-child');
                lastTarget.css('left',paramLeft);
                setTimeout(function(){lastTarget.removeClass('create-moving');},800);
            },100);
        }else{
        	paramLeft = target.offsetLeft + 15;
        	paramTop = target.offsetTop+15;
            setTimeout(function(){
                lastTarget = $('body div:last-child');
                lastTarget.css('left',paramLeft);
                lastTarget.css('top',paramTop);
                setTimeout(function(){lastTarget.removeClass('create-moving');},800);
            },100);
        }
    }

    function deleteMemo(){
    	var countIndex = 0;
    	
            $('body').children().length==2 ? countIndex=1 : $(this.parentElement.parentElement).remove();
            
            
            if(countIndex==1)
            	return false;
            
            var params = {
            	key : this.parentElement.parentElement.id
            };
            
            // $.ajax({
            //     url: '/deleteMemo',
            //     type: 'POST',
            //     dataType: 'json',
            //     cache: false,
            //     data : params,
            //     success: function(data) {
            //    	 	console.log('삭제완료');
            //     }
            // });
    }

    function changeZindex(){
            $(target).remove();
            $('body').append(target);
            unbind();
            refresh();
    }

    function movingDown(e){
            isClick=true;
            target  = this.parentElement;

            changeZindex();

            var left = parseInt($(target).css('left').split('px')[0]);
            var top = parseInt($(target).css('top').split('px')[0]);

            var clickX = e.clientX - left;
            var clickY = e.clientY - top;

            $(window).mousemove(function(e){
                $('body').css('cursor','move');
                $(target).css('left',(e.clientX-clickX)+'px').css('top',(e.clientY-clickY)+'px');
                target.offsetLeft < 0 ? $(target).css('left','0px') : null;
                target.offsetTop < 50 ? $(target).css('top','50px') : null;
                if(target.offsetWidth + target.offsetLeft > browserSize[0])
                    $(target).css('left',browserSize[0] - target.offsetWidth);
                if(target.offsetTop + target.offsetHeight > browserSize[1])
                    $(target).css('top',browserSize[1] - target.offsetHeight);
                
                if(timer){
                	clearTimeout(timer);
                	timer = null;
                }
                
                timer = setTimeout(updateMoveResizeble, 300);
            });
            e.preventDefault();
    }
    
    function updateMoveResizeble(){
    	var params = {
            	key : target.id,
            	left : target.offsetLeft,
            	top : target.offsetTop,
            	width : target.offsetWidth,
            	height : target.offsetHeight
            };
            
            // $.ajax({
            //     url: '/updateMove',
            //     type: 'POST',
            //     dataType: 'json',
            //     cache: false,
            //     data : params,
            //     success: function(data) {
            //    	 	console.log('수정완료');
            //     }
            // });
    }

    function resizebleDown(e){
            isClick=true;
            target  = this.parentElement;

            changeZindex();

            var textarea = $(target).children()[3].children[0];
            var left = target.offsetLeft;
            var top = target.offsetTop;

            var clickX = target.offsetWidth + left - e.clientX;
            var clickY = target.offsetHeight + top - e.clientY;

            $(window).mousemove(function(e){
                if(target.offsetWidth >= minimumSize){
                    $(target).css('width',e.clientX - left + clickX);
                    $(textarea).css('width',target.offsetWidth - 4);
                    if(target.offsetWidth < minimumSize){
                        $(target).css('width',minimumSize);
                        $(textarea).css('width',textAreaMinimumWidthSize);
                    }
                    if(target.offsetWidth + target.offsetLeft > browserSize[0]){
                        $(target).css('width',browserSize[0] - target.offsetLeft -1);
                        $(textarea).css('width',browserSize[0] - target.offsetLeft -5);
                    }

                }

                if(target.offsetHeight >= minimumSize){
                    $(target).css('height',e.clientY - top + clickY);
                    $(textarea).css('height',target.offsetHeight - 46);
                    if(target.offsetHeight < minimumSize){
                        $(target).css('height',minimumSize);
                        $(textarea).css('height',textAreaMinimumHeightSize);
                    }
                    if(target.offsetHeight + target.offsetTop > browserSize[1]){
                        $(target).css('height',browserSize[1] - target.offsetTop);
                        $(textarea).css('height',browserSize[1] - target.offsetTop-46);
                    }
                }
                
                if(timer){
                	clearTimeout(timer);
                	timer = null;
                }
                
                timer = setTimeout(updateMoveResizeble, 300);
            });

            e.preventDefault();
    };

    function resizebleHover(){
        $('body').css('cursor','nw-resize');
    }

    function resizebleLeave(){
        isClick == true ? null : $('body').css('cursor','auto');
    }

    function updateMemo(){
		target=this.parentElement.parentElement;
    	
    	var params = {
            	key : target.id,
            	content : $($(target).children()[3].children[0]).val()
            };
            
            // $.ajax({
            //     url: '/updateMemo',
            //     type: 'POST',
            //     dataType: 'json',
            //     cache: false,
            //     data : params,
            //     success: function(data) {
            //    	 	console.log('수정완료');
            //     }
            // });
    }


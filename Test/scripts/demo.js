//屏蔽ios下上下弹性
$(window).on('scroll.elasticity', function (e) {
    e.preventDefault();
}).on('touchmove.elasticity', function (e) {
    e.preventDefault();
});
var Config = {
    nW : $(window).width(),
    nH : $(window).height(),
    makePost : $(".makePost"),
    players: $(".players")
};
imgindex= 0;
fileList=[
    baseUrl+'images/loading/loading.jpg',
    baseUrl+'images/loading/icon_fall1.png',
    baseUrl+'images/player_guangzhou.png',
    baseUrl+'images/player_cq.png',
    baseUrl+'images/player_guizhou.png',
    baseUrl+'images/player_henan.png',
    baseUrl+'images/bg.jpg',
	baseUrl+'images/start.jpg',
    baseUrl+'images/player_luneng.png',
    baseUrl+'images/player_shanghai.png',
    baseUrl+'images/player_suning.png',
    baseUrl+'images/player_yanbian.png',
    baseUrl+'images/team_title.png',
    baseUrl+'images/btns.png',
    baseUrl+'images/img_wrap.png',
    baseUrl+'images/img_wrap2.png'
];
function loadImage(imgIndex){
    var img = new Image();
    img.src = fileList[imgIndex];
    var percent = parseInt(imgIndex/fileList.length *100);
    img.onload = function () {
        imgIndex++;
        $(".percent").html(percent+"%");
        if(imgIndex < fileList.length){
            loadImage(imgIndex);
        }else{
            $(".percent").html("100%");
            setTimeout(function(){
                audio.play();
                $(".preload").fadeOut();
                $("#video_canvas_box").fadeIn();
            },1400)
        }
    }
}


window.onload=function(){
    
    loadImage(imgindex);
    showMain();

    $(".team-title div").on("touchend", function () {
        chooseTeam=$(this).data("index");
        showCanvas(chooseTeam);
        $("#canvasMask").attr("class",'').addClass("teammask"+chooseTeam);
        setTimeout(function(){
           Config.makePost.fadeIn();
            Config.players.fadeOut();
        },500);
        
    });

    // 返回 上一步重新选择
    $(".back-btn").on("touchend", function () {
        Config.players.show();
        Config.makePost.hide();
        stage.removeChild(bg);
        stage.removeChild(imgthis);
        $(".move-tishi").hide();
    });

    $(".again-btn").on("touchend", function () {
        setTimeout(function(){
            $("#show,.btn2,.move-tishi").hide();
            $("#canvasMask,#stageCanvas,.btn1,.upload-btn,.button,.graybg").show();
            bg.alpha=0;
            stage.removeChild(imgthis);
        },300);
        $("#show").attr("src",'');
    });


    $(".goOn2").on("touchend", function () {

        $("#video_canvas_box").remove();
        Config.players.show();
        ele.style.display="block";//bgmusic
    });

    $(".share-btn").on("touchend", function () {
        $(".share-wrap").fadeIn();
    });

    $(".share-wrap").on("touchend", function () {
        $(this).fadeOut();
    });
};


function showMain(){
    $(".yanbian")[0].addEventListener("webkitAnimationEnd", function () {
        $(".players p").removeClass("step");
        $(".team-title span").removeClass("step")
    })
}

var bgdata=[
    {
        src:[baseUrl+"images/post/1.png?121",baseUrl+"images/post/2.png?121"]
    }, {
        src:[baseUrl+"images/post/3.png?121",baseUrl+"images/post/4.png?121"]
    }, {
        src:[baseUrl+"images/post/5.png?121",baseUrl+"images/post/6.png?121"]
    }, {
        src:[baseUrl+"images/post/7.png?121",baseUrl+"images/post/8.png?121"]
    }, {
        src:[baseUrl+"images/post/9.png?121",baseUrl+"images/post/10.png?121"]
    }, {
        src:[baseUrl+"images/post/11.png?121",baseUrl+"images/post/12.png?121"]
    }, {
        src:[baseUrl+"images/post/13.png?121",baseUrl+"images/post/14.png?121"]
    }, {
        src:[baseUrl+"images/post/15.png?121",baseUrl+"images/post/16.png?121"]
    }
];
var isNotupload = true;
var yasuo = new Compress('canvas');
/*上传图片的初始位置 放大倍数及旋转角度*/
var elePos = {x: 0, y: 0, s: 1, a: 0, w: 100, h: 100};
/*创建canvas画布*/

var stage = new createjs.Stage("stageCanvas"); //创建画布
var bg;
function showCanvas(teamindex){
    var n = Math.floor(Math.random()*7) > 3 ? 1 : 0;
    bg = new createjs.Bitmap(bgdata[teamindex].src[n]); //创建背景图
    bg.scaleX =1.25,bg.scaleY =1.25,bg.regX = 0, bg.regY = 0, bg.x = 0, bg.y = 0; //设置背景图位置
    bg.alpha=0;
    stage.addChild(bg); //放置背景图到canvas画布
    stage.update();

    createjs.Ticker.setFPS(5);
    createjs.Ticker.addEventListener("tick", tick);
    function tick(event) {
        stage.update(event);
    }
    console.log("bg.width"+bg.width);
}

//2.上传操作
var imgthis;
var oFReader = new FileReader(),
    rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
document.getElementById('inputimg').onchange = function() {
    isNotupload = false;
    if (document.getElementById('inputimg').files.length === 0) {
        isNotupload = true;
        return;
    }t

    var oFile = document.getElementById('inputimg').files[0];
    if (!rFilter.test(oFile.type)) {
        isNotupload = true;
        alert("图片格式不对！");
        return;
    }
    oFReader.readAsDataURL(oFile);
    $(".shibie").show().fadeIn();
	 $(".hand").hide();
};

oFReader.onload = function(oFREvent) {
    stage.removeChild(imgthis);
    var pic = oFREvent.target.result;
    document.getElementById('compressedimg').src = pic;
    //压缩
    setTimeout(function() {
        var data = yasuo.reduce('compressedimg', 0.1);
        document.getElementById('compressedimg').src = data;

        imgthis = new createjs.Bitmap(data);
        imgthis.scaleX = 0.7, imgthis.scaleY = 0.7, imgthis.rotation = 0, imgthis.x = 0, imgthis.y = 100;
        stage.addChild(imgthis);
        // stage.swapChildren(bg, imgthis);
        stage.update();

        $(".shibie").fadeOut();
        $(".move-tishi").fadeIn();
    }, 200)
};

//6.手势操作
//手势
var scale = 1,
    angle = 0,
    gestureArea = document.getElementById('gesture-area'), //手势区域
    mp = false;
var qq = new AlloyFinger(gestureArea, {
    multipointStart: function () {
        if(!mp){
            scale = imgthis.scaleX;
        }
    },
    rotate: function (evt) {
        if(!mp){
            angle += evt.angle;
            elePos.a = angle;
            imgthis.rotation = elePos.a;
            stage.update();
        }
    },
    pinch: function (evt) {
        if(!mp){
            elePos.s = scale * evt.scale;
            imgthis.scaleX = elePos.s;
            imgthis.scaleY = elePos.s;
            stage.update();
        }
    },
    pressMove: function (evt) {
        if(!mp){
            elePos.x += evt.deltaX;
            elePos.y += evt.deltaY;
            imgthis.x = elePos.x;
            imgthis.y = elePos.y;
            evt.preventDefault();
            stage.update();
        }
    }
});
//7.生成图片
var cpiimg = false;
$(".complete-btn").click(function() {
    if (isNotupload) {
        alert('先上传个图片呗~');
        return
    }
    $(".shibie").show().fadeIn();
    $(".shibie-cont").html("正在合成中。。。");

    bg.alpha=1;
    stage.swapChildren(bg, imgthis);
    stage.update();

    var getCanvas = document.getElementById('stageCanvas');
    var imgData = getCanvas.toDataURL("image/jpeg");
	if(cpiimg) {return;}
	cpiimg = true;
	$.ajax({
		type: 'POST',
		url: posterUrl,
		dataType: 'json',
		data:{"base64Code":imgData},			   
		error: function(data){
			alert('网络错误,请稍后重试');
			window.location.href = indexUrl;
			return false;
		},
		success:function(data){
			cpiimg = false;
			if(data.status == 1) {
				 document.getElementById('show').src = imgData;
				  setTimeout(function() {
						$(".btn1,.shibie,#canvasMask,#stageCanvas,.upload-btn,#inputimg,.graybg").fadeOut();
						$(".btn2").show().fadeIn();
						//var data = yasuo.reduce('show', 0.9);
						document.getElementById('show').src = data.path;
						$("#show").show();
					}, 200);
				 window.shareData.tfTitle = "官宣！"+teamName[chooseTeam]+"重金签下新援！"; 
				 window.shareData.tContent = window.shareData.tfTitle;
				 window.shareData.share_url = shareUrl + data.pid;
				 //alert(window.shareData.tfTitle); alert(window.shareData.share_url);
				 share_data();
			} else if(data.status == 0) {
				alert(data.msg);
				window.location.href = indexUrl;
			} else {
				alert('网络错误,请稍后重试');
				window.location.href = indexUrl;
			}
		}
	});   
});



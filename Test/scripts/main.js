// $(function(){

    var main = new function(){

        // 横屏监测 DeviceOrientation 
        this.isSupportOrientation = (typeof window.orientation == "number" && typeof window.onorientationchange == "object");
        this.answer = ['0','0','0','0','0'];
        this.num = null;
        this.isUpload = false;
        this.isNotupload = false;
        this.bg = null;
        this.jobPic = ['../images/00.png'];
        this.stage = null;
        this.imgthis = null;
        this.oreader = new FileReader();
        // this.scale = 1;
        // this.deg = 0;
        // thsi.gesture = document.getElementById('gesture');
        
        this.elePos = {x: 0, y: 0, s: 1, a: 0, w: 100, h: 100};
        this.width = 0;
        this.height = 0;

        this.oFile = null;
        this.orientation = null;



    }

    main.supportOrientation = function(){
        var orientation = window.orientation;
        switch (orientation) {
            case 90:
            case -90:
                orientation = "block"; //landscape
                break;
            default:
                orientation = "none";  //portrait
        }
        document.getElementById("orientLayer").style.display = orientation;
    }

    main.notSupportOrientation = function(){
        var orientation = (window.innerWidth > window.innerHeight) ? "block" : "none";
        document.getElementById("orientLayer").style.display = orientation;
    }

    main.updateOrientation = function(){
        if (this.isSupportOrientation) {
            main.supportOrientation()
        } else {
            main.notSupportOrientation()
        }
    }

    main.initOrientation = function(){
        main.updateOrientation();
        if (this.isSupportOrientation) {
            window.addEventListener("orientationchange", main.updateOrientation, false);
        } else {
            window.setInterval(main.updateOrientation, 5000);
        }
    }



    main.initOrientation();
    window.onresize = function(){
    	main.initOrientation();
    }


    main.initPage = function(){
        $('#app').fullpage({
            sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#f90'],
            continuousVertical: false,
            controlArrows: false,
            loopHorizontal: false,
            afterLoad: function (anchorLink, index) {
                if (index == 2) {
                    $.fn.fullpage.setAllowScrolling(false, 'up');
                    $.fn.fullpage.setAllowScrolling(false, 'down');
                } 
            }
        });
    }
    main.initPage()

    main.pick = function(){
        var _this = this;

        $('.slide ul').on('click',function(e){

            var e = e || window.event;
            var target = e.target || e.srcElement;
            var index = $(this).data('id');

            if (target.nodeName.toLowerCase() == 'p') {

                var res = $(target).data('res');
                _this.answer[index-1] = res;
            }

            if ( _this.answer.indexOf('0') == -1) {
                $('.submit').fadeIn()
            }

            console.log(_this.answer)

        })
    }
    main.pick()

    main.viewResult = function(){
        $.fn.fullpage.moveTo(3);  
    }

    main.getResult = function(arr){

        var newArr = [];
        

        for (var i = 0; i < arr.length; i++) {

            var temp = arr[i];
            var num = 0;

            for(var j = 0; j < arr.length; j++){
                if (arr[j] == temp) {
                    num ++ ;
                    arr[j] = -1;
                }

            }

            if (temp != -1) {
                newArr.push(temp+':'+num)
            }
        }
        
        main.arr2obj(newArr)

    }

    main.arr2obj = function(arr){

        var num = {};
        for (var v in arr){
            var split = arr[v].split(':');

            num[split[0]] = parseInt(split[1]);
        }

        if (num.A >= 3 || num.A == num.B && num.A == 2 ) {
            console.log('认知')
        }

        if (num.B >= 3 || num.B == num.C && num.B == 2 ) {
            console.log('灵巧')
        }

        if (num.C >= 3 || num.C == num.A && num.A == 2 ) {
            console.log('创意')
        }


    }


    main.submit = function(){

        var _this = this;
        $('.submit').on('click',function(){
            main.viewResult()
            main.getResult(_this.answer)
            main.initStage()
        })
    }
	main.submit()

    

    main.initStage = function(){

        var _this = this;

        this.stage = new createjs.Stage("stageCanvas"); 
        this.bg = new createjs.Bitmap('../images/00.png'); 

        // this.stage = new PIXI.Container();
        // this.stage = new PIXI.Application(500, 500, {backgroundColor : 0x1099bb});
        // this.bg = new PIXI.Sprite.fromImage('../images/00.png')

        this.bg.scaleX = 1,
        this.bg.scaleY = 1;
        
        this.bg.x = 0;
        this.bg.y = 0; 

        this.bg.regX = 0;
        this.bg.regY = 0;
        // this.bg.alpha = 0;

        this.stage.addChild(this.bg);
        this.stage.update();

        createjs.Ticker.setFPS(5);
        createjs.Ticker.addEventListener("tick", tick);
        function tick(event) {
            _this.stage.update(event);
        }


    }
    // main.initStage()

    main.upload = function(){

        var _this = this;
        var rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

        document.getElementById('upload_btn').onchange = function(evt){
            _this.isNotupload = false;
            if (this.files.length == 0) {
                this.isUpload = true;
                return;
            }

            // var oFile = this.files[0];
            _this.oFile = this.files[0];

            if (!rFilter.test(_this.oFile.type)) {
                _this.isNotupload = true;
                alert('图片格式不正确，请重新上传！')
                return;
            }

            EXIF.getData(_this.oFile,function(){
                EXIF.getAllTags(this);
                // _this.orientation = EXIF.getTag(this, 'Orientation'); 
                _this.orientation = 6; 
            })

            _this.oreader.readAsDataURL(_this.oFile);

        }

        // var oreader = new FileReader();

        _this.oreader.onload = function(ev){

            var pic = ev.target.result;
            var image = new Image();
            image.src = pic;
            image.onload = function(){

                var expectWidth = this.naturalWidth;
                var expectHeight = this.naturalHeight;

                if (this.expectWidth > this.expectHeight && this.expectWidth > 800) {
                    expectWidth = 800;
                    expectHeight = expectWidth * this.expectHeight / this.naturalWidth;
                }else if (this.expectHeight > this.expectWidth && this.expectHeight > 1200) {
                    expectHeight = 1200;
                    expectWidth = expectHeight * this.expectWidth / this.expectHeight;
                }

                var canvas = document.createElement('canvas')
                var ctx = canvas.getContext('2d')
                canvas.width = expectWidth;
                canvas.height = expectHeight;
                ctx.drawImage(this, 0, 0, expectWidth, expectHeight);

                var base64 = null;

                if (navigator.userAgent.match(/iphone/i)) {


                    if(_this.orientation != "" && _this.orientation != 1){
                        alert('旋转处理');
                        switch(_this.orientation){
                            case 6://需要顺时针（向左）90度旋转
                                alert('需要顺时针（向左）90度旋转');
                                _this.rotateImg(this,'left',canvas);
                                break;
                            case 8://需要逆时针（向右）90度旋转
                                alert('需要顺时针（向右）90度旋转');
                                _this.rotateImg(this,'right',canvas);
                                break;
                            case 3://需要180度旋转
                                alert('需要180度旋转');
                                _this.rotateImg(this,'right',canvas);//转两次
                                _this.rotateImg(this,'right',canvas);
                                break;
                            default :
                                alert('没有处理')
                        }   

                        base64 = canvas.toDataURL("image/jpeg", 0.8);

                    }
                }


            };

            setTimeout(function(){

                _this.imgthis = new createjs.Bitmap(pic);

                _this.imgthis.scaleX = 0.2;
                _this.imgthis.scaleY = 0.2;
                _this.imgthis.rotation = 0;
                _this.imgthis.x = 0;
                _this.imgthis.y = 0;
                _this.imgthis.regX = 0;
                _this.imgthis.regY = 0;

                _this.stage.addChild(_this.imgthis);
                _this.stage.update();

                $('.upload_btn').hide()

                // main.generate()
            },500)

        }


    }
    main.upload()

    main.rotateImg = function(img,direction,canvas){

        //最小与最大旋转方向，图片旋转4次后回到原方向  
        var min_step = 0;  
        var max_step = 3;  
        //var img = document.getElementById(pid);  
        if (img == null)return;  
        //img的高度和宽度不能在img元素隐藏后获取，否则会出错  
        var height = img.height;  
        var width = img.width;  

        console.log(width,height)
        //var step = img.getAttribute('step');  
        var step = 2;  
        if (step == null) {  
            step = min_step;  
        }  
        if (direction == 'right') {  
            step++;  
            //旋转到原位置，即超过最大值  
            step > max_step && (step = min_step);  
        } else {  
            step--;  
            step < min_step && (step = max_step);  
        }  

        console.log('step:'+step)

        //旋转角度以弧度值为参数  
        var degree = step * 90 * Math.PI / 180;  
        var ctx = canvas.getContext('2d');  
        switch (step) {  
            case 0:  
                canvas.width = width;  
                canvas.height = height;  
                ctx.drawImage(img, 0, 0);  
                break;  
            case 1:  
                canvas.width = height;  
                canvas.height = width; 
                ctx.rotate(degree);  
                ctx.drawImage(img, 0, 0, canvas.width, -canvas.height); 
                break;  
            case 2:  
                canvas.width = width;  
                canvas.height = height;  
                ctx.rotate(degree);  
                ctx.drawImage(img, -width, -height);  
                break;  
            case 3:  
                canvas.width = height;  
                canvas.height = width;  
                ctx.rotate(degree);  
                ctx.drawImage(img, -width, 0);  
                break;  
        }  
    }



    main.generate = function(){
        // console.log(this)
        this.stage.swapChildren(this.bg, this.imgthis);
        this.stage.update();

        var getCanvas = document.getElementById('stageCanvas');

        var imgData = getCanvas.toDataURL("image/jpeg");

        // console.log(imgData)
    }



    // main.imgToCanvas = function(src,cb){
    //     var canvas = document.createElement('canvas')
    //     var ctx = canvas.getContext('2d')
    //     var img = new Image()
    //     img.src = src;
    //     img.onload = function(){
    //         canvas.width = img.width;
    //         canvas.height = img.height;
    //         ctx.drawImage(img, 0, 0)
    //         cb(canvas)
    //     }

    // }

    // main.imgToBlob = function(src,cb){
    //     main.imgToCanvas(src,function(canvas){

    //     })
    // }

    // main.imgToBase64  = function(img){
    //     var canvas = document.createElement('canvas');
    //     var ctx = canvas.getContext('2d');
    //     canvas.width = img.width;
    //     canvas.height = img.height;

    //     ctx.drawImage(img, 0, 0, img.width, img.height)

    //     var dataURL = canvas.toDataURL('image/png')

    //     return dataURL;

    // }

    // function bgData(){
    //     var img = document.createElement('img');
    //     img.src = '../images/00.png';
    //     img.onload = function(){
    //         // main.imgToBase64(img)
    //         // photoEditor.addSprite(img, 'image');
    //     }
    // }

    
	

// });

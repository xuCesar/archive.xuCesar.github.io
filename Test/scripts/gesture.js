

// ;(function (AlloyPaper) {


var scale = 1;
var angle = 0;
var oGesture = document.getElementById('gesture');

// var Stage = AlloyPaper.Stage, Bitmap = AlloyPaper.Bitmap,Loader=AlloyPaper.Loader;
// var stage = new Stage("#stageCanvas");
// stage.autoUpdate=false;

// var ld = new Loader();
// ld.loadRes([
//     { id: "bg1", src: "../images/00.png" },
//     { id: "bg2", src: "../images/00.png" }
// ]);

// ld.complete(function(){
// 	var bmp = new Bitmap(ld.get("bg1"));
//     bmp.originX = 0.5;
//     bmp.originY = 0.5;
//     bmp.x = stage.width / 2;
//     bmp.y =0;
//     stage.add(bmp);

//     stage.update();

//     var initScale = 1;
//     new AlloyFinger(bmp, {
//         multipointStart: function () {
//             initScale = bmp.scaleX;
//         },
//         rotate: function (evt) {
//             bmp.rotation += evt.angle;
//             stage.update();
//         },
//         pinch: function (evt) {
//             bmp.scaleX = bmp.scaleY = initScale * evt.scale;
//             stage.update();
//         },
//         pressMove: function (evt) {
//             bmp.x += evt.deltaX;
//             bmp.y += evt.deltaY;
//             evt.preventDefault();
//             stage.update();
//         }

//     });
// })



// console.log(stage)


var gesture = new AlloyFinger(oGesture,{

	multipointStart: function () {
        scale = main.imgthis.scaleX;
    },
    pressMove: function (e) {

        main.elePos.x += e.deltaX;
        main.elePos.y += e.deltaY;
        // main.width += e.deltaX;
        // main.height += e.deltaY;
        main.imgthis.x = main.elePos.x;
        main.imgthis.y = main.elePos.y;
        e.preventDefault();
        main.stage.update();

    },
    pinch: function (e) {
        // gesture.scaleX = gesture.scaleY = scale * e.scale;

        main.elePos.s = scale * e.scale;
        main.imgthis.scaleX = main.elePos.s;
        main.imgthis.scaleY = main.elePos.s;
        main.stage.update();

        // console.log(main.imgthis)
    },
    rotate: function(e){

    	angle += e.angle;

    	// console.log(angle)
        main.elePos.a = angle;
        main.imgthis.rotation = main.elePos.a;

        e.preventDefault();
        main.stage.update();

    }

    // multipointStart: function () {
    //     initScale = el.scaleX;
    // },
    // rotate: function (evt) {
    //     el.rotateZ += evt.angle;
    // },
    // pinch: function (evt) {
    //     el.scaleX = el.scaleY = initScale * evt.scale;
    // },
    // multipointEnd: function () {
    //     To.stopAll();
    //     if (gesture.scaleX < 1) {

    //         new To(gesture, "scaleX", 1, 500, ease);
    //         new To(gesture, "scaleY", 1, 500, ease);
    //     }
    //     if (gesture.scaleX > 2) {

    //         new To(gesture, "scaleX", 2, 500, ease);
    //         new To(gesture, "scaleY", 2, 500, ease);
    //     }
    //     var rotation = gesture.rotateZ % 360;

    //     if (rotation < 0)rotation = 360 + rotation;
    //     gesture.rotateZ=rotation;

    //     if (rotation > 0 && rotation < 45) {
    //         new To(gesture, "rotateZ", 0, 500, ease);
    //     } else if (rotation >= 315) {
    //         new To(gesture, "rotateZ", 360, 500, ease);
    //     } else if (rotation >= 45 && rotation < 135) {
    //         new To(gesture, "rotateZ", 90, 500, ease);
    //     } else if (rotation >= 135 && rotation < 225) {
    //         new To(gesture, "rotateZ", 180, 500, ease);
    //     } else if (rotation >= 225 && rotation < 315) {
    //         new To(gesture, "rotateZ", 270, 500, ease);
    //     }
    //     main.stage.update();
    // },

});

// console.log(gesture)

// })(AlloyPaper)
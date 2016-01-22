//下面开始写动画函数了 
// 接下来就是激动人心的 动画效果 基础模块
function openAndClose(changeNums,times,long,targets){  // 这个就是  需要 设置不同参数 比较复杂的那种 [[],[],[]]
    // cahngeNums = [[x0,x1],[y0,y1]]    
    var positionB;

    var scaleB,
        tweenToRight;
    
    var xp,yp;

    //getPos();
    init(); 
    animate();



    function init(){ 
        positionB = {x:changeNums[0][0],y:changeNums[1][0],c:changeNums[2][0]};
        scaleB = new TWEEN.Tween(positionB)
                    .to({x:changeNums[0][1],y:changeNums[1][1],c:changeNums[2][1]},long)  // 不知道为什么 动画效果受到时间的影响太多 太多                                            
                    .easing(TWEEN.Easing.Quartic.InOut)
                    .yoyo(true)
                    .repeat(times+1)
                    .onUpdate(updateA);
        scaleB.start();  
    }

    function animate(time){
        requestAnimationFrame(animate);
        TWEEN.update(time);
    }

    function updateA(){
        for(var i = 0,len = targets.length;i<len;i++){
            targets[i].style.width = 2*positionB.x + "px";
            targets[i].style.height = 2*positionB.y + "px";
            targets[i].style.left = 240 - (positionB.x)  + "px";
            targets[i].style.top = 240 - (positionB.y)  + "px";
        }
        
        //关于 border的 变化的 操作 
        positionB.c = positionB.y / 240;
        //console.log(positionB.c);
        getDoubleBorderCircle("rgb(255,255,255)",180,7.5,targets[0].getContext("2d"),240,240,positionB.c);
        // getDoubleBorderCircle(rgbv,r,lineWidth,context,xPos,yPos,a1){ 

        if(positionB.y == 1){
            //opeanAndClose();
            scaleB.stop(); 
            alert("end it")   
        }
    }
}

function easyOpenAndClose(changeNums,times,long,targets){ // 这个是没有 外边框的即时重新绘制的那种 就是简单的眨眼动作 
    // changeNum = [[x0,x1],[y0,y1]] 
    var positionB;
    var scaleB;

    init(); 
    animate();

    function init(){ 
        //console.log(xp,yp,"this is in B")
        positionB = {x:changeNums[0][0],y:changeNums[1][0]};
        console.log(positionB,changeNums)
        
        scaleB = new TWEEN.Tween(positionB)
                    .to({x:changeNums[0][1],y:changeNums[1][1]},long)  // 不知道为什么 动画效果受到时间的影响太多 太多                                            
                    .easing(TWEEN.Easing.Quartic.InOut)
                    .yoyo(true)
                    .repeat(1)
                    .onUpdate(updateA);
        scaleB.start();  
    }

    function animate(time){
        requestAnimationFrame(animate);
        TWEEN.update(time);
    }

    function updateA(){
        //关于 center的 变化的 操作
        for(var i = 0 , len = targets.length;i < len;i++){
            targets[i].style.width = positionB.x*2 + "px";
            targets[i].style.height = positionB.y*2 + "px";
            targets[i].style.left = 240 - (positionB.x)  + "px";
            targets[i].style.top = 240 - (positionB.y)  + "px";
        }

    }
}

function singleMove(changeNums,targets,long){ // 这里指的是 单个target或 多个target，但是具有相同的[[xo,x1],[y0,y1]]的这种 要不然实在是没有必要都写进同一个吧 
    //console.log(changeNums,"this is changeNums")    

    var position;
    var target;
    var tweenToLeft,tweenToRight;
    var xValue = changeNums[0],
        yValue = changeNums[1];
    //  console.log(xValue,yValue)

    init();
    animateA();

    function init(){ 
        position = {x:changeNums[0][0],y:changeNums[1][0]};
        tweenToLeft = new TWEEN.Tween(position)
                    .to({x:changeNums[0][1],y:changeNums[1][1]},long)  // 不知道为什么 动画效果受到时间的影响太多 太多     
                    .easing(TWEEN.Easing.Quartic.In)
                    .onUpdate(update);
        tweenToLeft.start();    
    } 

    function animateA(time){
        requestAnimationFrame(animateA);
        TWEEN.update(time);
    }

    function update(){
        for(var i = 0,len = targets.length;i<len;i++){
            targets[i].style.width = 600 + "px";
            targets[i].style.height = 600 + "px";
            targets[i].style.left = position.x + "px";
            targets[i].style.top = position.y + "px";
        }
        
        //getFollowBorderCircle("rgb(255,255,255)",150,6,ctxBorder,300,300,1-(position.x / 150));

        if(position.x == xValue){
            tweenToLeft.stop();
        }
    }
    //  接下来 是 写 如何 在 现有基础上面的 闭眼 开眼  考虑解耦 不直接去写 闭眼 开眼 放弃chain(another这样的写法) 全部解除 然后 
}

function lotsMove(changeNums,target,long){  // cahnges = [{target:node1,changeArray:[[x0,x1],[y0,y1]]},{},.....{}]
    // 这个先别写这么 别开太多坑
    // 结果还是去吧坑填了 
    console.log(changeNums,"this is changeNums") ;
    var position;
    var target;
    var tweenToLeft,tweenToRight;
    var xValue = changeNums[0],
        yValue = changeNums[1];
    //console.log(xValue,yValue)

    init();
    animateA();

    function init(){ 
        position = {x:changeNums[0][0],y:changeNums[1][0]};
        tweenToLeft = new TWEEN.Tween(position)
                    .to({x:changeNums[0][1],y:changeNums[1][1]},long)  // 不知道为什么 动画效果受到时间的影响太多 太多     
                    .easing(TWEEN.Easing.Quartic.InOut)
                    .onUpdate(update);
        tweenToLeft.start();    
    } 

    function animateA(time){
        requestAnimationFrame(animateA);
        TWEEN.update(time);
    }

    function update(){
        
            target.style.width = 480 + "px";
            target.style.height = 480 + "px";
            target.style.left = position.x + "px";
            target.style.top = position.y + "px";
            console.log(position.x,position.y,"my next position")
        
        
        //getFollowBorderCircle("rgb(255,255,255)",150,6,ctxBorder,300,300,1-(position.x / 150));
        getFollowBorderCircle("rgb(255,255,255)",150,6,ctxBorder,position.x,position.y)
        if(position.x == changeNums[0][1]){
            tweenToLeft.stop();
            //alert("i am in position")
        }
    } 
}


function lotsMoveQuestion(changeNums,target,long){  // cahnges = [{target:node1,changeArray:[[x0,x1],[y0,y1]]},{},.....{}]
    // 这个先别写这么 别开太多坑
    // 结果还是去吧坑填了 
    console.log(changeNums,"this is changeNums") ;
    var position;
    var target;
    var tweenToLeft,tweenToRight;
    var xValue = changeNums[0],
        yValue = changeNums[1];
    //console.log(xValue,yValue)

    init();
    animateA();

    function init(){ 
        position = {x:changeNums[0][0],y:changeNums[1][0]};
        tweenToLeft = new TWEEN.Tween(position)
                    .to({x:changeNums[0][1],y:changeNums[1][1]},long)  // 不知道为什么 动画效果受到时间的影响太多 太多     
                    .easing(TWEEN.Easing.Quartic.InOut)
                    .onUpdate(update);
        tweenToLeft.start();    
    } 

    function animateA(time){
        requestAnimationFrame(animateA);
        TWEEN.update(time);
    }

    function update(){
        
            target.style.width = 480 + "px";
            target.style.height = 480 + "px";
            target.style.left = position.x + "px";
            target.style.top = position.y + "px";
            console.log(position.x,position.y,"my next position")
        
        
        //getFollowBorderCircle("rgb(255,255,255)",150,6,ctxBorder,300,300,1-(position.x / 150));
       drawQuestionBorder("rgb(255,255,255)",180,6,ctxBorder,position.x,position.y)
        if(position.x == changeNums[0][1]){
            tweenToLeft.stop();
            //alert("i am in position")
        }
    } 
}


function blink(times,long){   // 毕竟这个眨眼是不用考虑是 只有谁 在眨 而且 我觉得这个眨眼其实没有单独写出来的意思 
    console.log("没有直接去写blink 而是去写");

    
}


// 一个基础的函数  主要根据参数 来 控制 变大或者 变小 但是挤压却可以拆解为x轴变大，y轴变大 ，或者等比例变大，亦或是不等比例变大，所以说，变化参数的抽象能力很重要
// changeNums 的数据结构这么设计就好了 [[x1,x2],[y1,y2]] 好像只能这么设计？ 万能接口？ 这样真的好么？有谁这么设计接口？  要是不变化却这么写 岂不是闷声吃大亏
function moreOrLess(changeNums,targets,times,long){  // 传入参数分别是 x,y的坐标的变化的数组 | 目标数组 | 持续几次 | 单次动画的时长 
    // 首先就是这些参数 究竟该 怎么去 写 ？
    // 怎么说先写一个 耦合度比较高的东西吧 先假设我得targets就是中间的 两个 等等 好像不用假设 可以写循环
    var position;
    var scaleA,
        tweenToRight;

    init();
    animate();

    function init(){ 
        position = {rX:changeNums[0][0],rY:changeNums[1][0]};
        scaleA = new TWEEN.Tween(position)
                    .to({rX:changeNums[0][1],rY:changeNums[1][1]},long)  // 不知道为什么 动画效果受到时间的影响太多 太多           
                    .yoyo(true)                                                 
                    .easing(TWEEN.Easing.Quartic.InOut)
                    .onUpdate(updateA)
                    .repeat(times);
        scaleA.start();  
    }

    function animate(time){
        requestAnimationFrame(animate);
        TWEEN.update(time);
    }

    function updateA(){
        //关于 center的 变化的 操作
        for(var i = 0,len = targets.length;i<len;i++){
            targets[i].style.width = 2*position.rX + "px";
            targets[i].style.height = 2*position.rY + "px";
            targets[i].style.left = 240 - ( position.rX )  + "px";
            targets[i].style.top = 240 - (position.rY )  + "px";
            console.log(targets[i].style.width,targets[i].style.height,targets[i].style.left,targets[i].style.top)
        }
        if(position.ry == changeNums[1][1]){
            scaleA.stop();
        }               
    }
}


function upAndDown(changeNums,targets,times,long){
    var position;
    var moveA;
    var times = 0;
        //tweenToRight;

    init();
    animate();

    function init(){ 
        position = {rX:changeNums[0][0],rY:changeNums[1][0]};
        moveA = new TWEEN.Tween(position)
                    .to({rX:changeNums[0][1],rY:changeNums[1][1]},long)  // 不知道为什么 动画效果受到时间的影响太多 太多           
                    .yoyo(true)                                                 
                    .easing(TWEEN.Easing.Quartic.InOut)
                    .onUpdate(updateA)
                    .repeat(times+3);
        moveA.start();  
    }

    function animate(time){
        requestAnimationFrame(animate);
        TWEEN.update(time);
    }

    function updateA(){
        //关于 center的 变化的 操作
        for(var i = 0,len = targets.length;i<len;i++){
           // targets[i].style.width = 2*position.rX + "px";
           // targets[i].style.height = 2*position.rY*0.3 + "px";
            //targets[i].style.left = 300 - ( position.rX )  + "px";
            targets[i].style.top = (position.rY)  + "px";
        }
        console.log(position.rY,changeNums[1][1])
        if(position.rY == changeNums[1][1]){
            //moveA.stop();
            if(times == 0){ 
                drawSmileBorder() //就是说 把 这个转化 为 半拉的那个 这里需要优化下 边框的 宽度 strokeStyle ; ctxCenter 的 fillStyle 这两个都要和前面的接轨
                times = 1 ;
            }
        }    
        

        // 底下的 
        function drawSmileBorder(){  //假设x为 我们所要的参数 建立数学模型 我认为 x用来表示 表示 

            //alert("test")
            ctxBorder.clearRect(0,0,480,480);
            ctxCenter.clearRect(0,0,480,480);
            ctxCenter.lineWidth = 6.5;
            ctxCenter.beginPath();
            ctxCenter.lineJoin = "round";
            ctxCenter.arc(240,240,180,0,Math.PI,true);
            //ctxCenter.lineTo(240-Math.sqrt(100*100-50*50),290);
            //ctxCenter.lineTo(240,240);
            //ctxCenter.lineTo(240+Math.sqrt(100*100-50*50),290);
            ctxCenter.bezierCurveTo(60,330,140,222,240,230);
            ctxCenter.bezierCurveTo(340,222,420,330,420,240);


            ctxCenter.strokeStyle = "rgba(255,255,255,0.9)";
            ctxCenter.fillStyle ="rgba(255,255,255,0.9)";



            ctxCenter.stroke();
              //ctxCenter.fill();
            ctxCenter.closePath();


            ctxCenter.beginPath();

            var radialgradient = ctxCenter.createRadialGradient(240,240,0,240,240,90);
            radialgradient.addColorStop(0,"rgba(255,0,0,0.8)");
            radialgradient.addColorStop(0.7,"rgba(255,0,0,0.6)");
            radialgradient.addColorStop(1.0,"rgba(255,0,0,0.01)");
            ctxCenter.shadowBlur=24;
            ctxCenter.shadowColor="red";

            ctxCenter.lineJoin = "round";
            ctxCenter.arc(240,240,100,0,Math.PI,true);
            ctxCenter.quadraticCurveTo(195,225,240,223);
            ctxCenter.quadraticCurveTo(285,225,320,240)

            ctxCenter.strokeStyle = "rgba(255,0,0,0.3)";
            ctxCenter.lineWidth = 5;
           // ctxCenter.stroke();


            ctxCenter.fillStyle = radialgradient;
            ctxCenter.fill();
            ctxCenter.closePath();
            
        }           
    }
}

function disappear(changeNums,targets,times,long){  // 传入参数分别是 x,y的坐标的变化的数组 | 目标数组 | 持续几次 | 单次动画的时长 
    // 首先就是这些参数 究竟该 怎么去 写 ？
    // 怎么说先写一个 耦合度比较高的东西吧 先假设我得targets就是中间的 两个 等等 好像不用假设 可以写循环
    var position;
    var scaleA;
        //tweenToRight;

    init();
    animate();

    function init(){ 
        position = {rX:changeNums[0][0],rY:changeNums[1][0]};
        scaleA = new TWEEN.Tween(position)
                    .to({rX:changeNums[0][1],rY:changeNums[1][1]},long)  // 不知道为什么 动画效果受到时间的影响太多 太多           
                    //.yoyo(true)                                                 
                    .easing(TWEEN.Easing.Quartic.InOut)
                    .onUpdate(updateA)
                    .repeat(0);
        scaleA.start();  
    }

    function animate(time){
        requestAnimationFrame(animate);
        TWEEN.update(time);
    }

    function updateA(){
        //关于 center的 变化的 操作
        for(var i = 0,len = targets.length;i<len;i++){
            targets[i].style.width = 2*position.rX + "px";
            targets[i].style.height = 2*position.rY*0.3 + "px";
            targets[i].style.left = 240 - ( position.rX )  + "px";
            targets[i].style.top = 240 - (position.rY )*0.3  + "px";
        }
        if(position.ry == 240){
            scaleA.stop();
        }               
    }
}

// 这底下是最基础的 简单的 函数 可以被重复调用  
//  
//  绘制 “双边”外轮廓 
function getDoubleBorderCircle(rgbv,r,lineWidth,context,xPos,yPos,a1){ 
    //传入参数分别是 颜色 边框圆弧的r 线宽 都熟 横坐标 纵坐标  a1 b1 a2 b2 分别是a代表x轴的缩放 b代表y轴的缩放 
    //那么就是得按照画椭圆的写法 横轴 纵轴的长度 r*a1 r*a2  

    function drawBorderByLinewidth(a){
        var x = a?a:1;
        context.clearRect(0,0,600,600);
        context.beginPath();
        context.restore();
        context.lineWidth = lineWidth*x;
        context.strokeStyle = "rgba(255,255,255,0.49)";
        context.shadowBlur=14; 
        context.shadowColor="white";
        context.arc(xPos,yPos,r,0,Math.PI*2,false);
        context.stroke();
        context.closePath();
    }

    if (arguments.length < 7){ //那就是参数没有传递够 说明只需要一层 那就正好 
        drawBorderByLinewidth(1);
    }
    else{
        //drawBorderByLinewidth(1.4);
        // shit是 里面那个被更严重压缩了 
        //螺旋线绘制椭圆  drawBorderByLinewidth(1);
        context.clearRect(0,0,600,600);
        drawBorderByLinewidth(1);
        context.beginPath();
        context.restore();
        var a = r;
        var b = r * a1;
        var step = (a > b) ? 1 / a : 1 / b;
        context.strokeStyle = "rgba(255,255,255,0.3)";
        context.lineWidth = lineWidth*0.7;
        context.shadowBlur=80;
        context.shadowColor="#00C6ED";

        context.moveTo(xPos + a, yPos); //从椭圆的左端点开始绘制

        for (var i = 0; i < 1 * 2*Math.PI; i += step){
            //参数方程为x = a * cos(i), y = b * sin(i)，
            //参数为i，表示度数（弧度）
            context.lineTo(xPos + a * Math.cos(i), yPos + b * Math.sin(i));
        }
        context.closePath();
        context.stroke();
    }
}

function get1(a){ 
    //传入参数分别是 颜色 边框圆弧的r 线宽 都熟 横坐标 纵坐标  a1 b1 a2 b2 分别是a代表x轴的缩放 b代表y轴的缩放 
    //那么就是得按照画椭圆的写法 横轴 纵轴的长度 r*a1 r*a2  
   

        //drawBorderByLinewidth(1.4);
        // shit是 里面那个被更严重压缩了 
        //螺旋线绘制椭圆  drawBorderByLinewidth(1);
        //
        console.log(a);
        ctxCenter.clearRect(0,0,600,600);


       var  arr = [] ; //单三个小球的位置就这么存了
       for(var j = 0 ;j < 3 ;j++){
           var t = a+j*(105);
           t = (t > 320) ? (t-320) : t;
          arr.push(t); 
       }

        //var arr = [a,a+80,a+160];

        for(var i =0 ;i<3;i++){
            var x = calculateX (arr[i]);
            console.log(x)
            ctxCenter.beginPath();
            ctxCenter.restore();
            ctxCenter.arc(x,240,25,0,Math.PI*2,true);
            ctxCenter.fillStyle="rgba(255,255,255,0.7)";
            ctxCenter.fill();
            ctxCenter.closePath();
            //ctxCenter.stroke();
        };
        


        function calculateX(e){

            if(e <= 80 ){  // 第一圆的球 

                //var r = -(e/80 )*10 + 30 ;  // 半径
                //var r = 20;
                return (e +240 ); 
                //console.log(r,xPos,1);
            }else if(e > 80 && e <= 160){
               //var r = ((e-80) / 80 )*10+20;
                //var r = 20;
               return( 320 - (e-80));
                //console.log(r,xPos,2);
            }else if(e > 160 && e <240){
                //var r = ((e - 160) / 80)*10 +20;
                //var r = 20;
                return (240 -  (e - 160) );
                //console.log(r,xPos,3);
            }else if(e >= 240 && e < 320){
                //var r = ((e - 240) / 80)*10 +20;
                //var r = 20;
                return (240 -  (e - 240) );
                //console.log(r,xPos,4);
            }

        }
}

function drawBorder(){
    console.log(1);
    ctxBorder.beginPath();
    ctxBorder.clearRect(240,240,480,480);
    ctxBorder.arc(240,240,180,0.5*Math.PI,1*Math.PI,true);

    ctxBorder.strokeStyle = "rgba(255,255,255,0.85)";
    //ctxBorder.quadraticCurveTo(70,410,240,420);

    ctxBorder.lineTo(85,385);
    ctxBorder.lineTo(240,420)
    ctxBorder.lineWidth = 7.5;
    ctxCenter.lineJoin = "round";
    ctxBorder.stroke();
    ctxBorder.closePath();

    //getDoubleBorderCircle("rgb(255,255,255)",180,7.5,ctxBorder,240,240,1)
}

// 
function getCenterFill(rgbV1,r,context,xPos,yPos){ //给一个什么参数，颜色值呗 亦或是可以考虑那个  
    // drawBackground("(0,198,237)",ctx,300,300); 
    var rgbv = "rgba"+"("+rgbV1.replace(/\(/g,"").replace(/\)/g,"")+","+0.5+")";
     
    //console.log(context)
    var radialgradient = context.createRadialGradient(xPos,yPos,0,xPos,yPos,r);
    radialgradient.addColorStop(0,"rgba(255,255,255,0.8)");
    radialgradient.addColorStop(0.7,"rgba(255,255,255,0.5)");
    radialgradient.addColorStop(1.0,"rgba(255,255,255,0)");
     //以上的 白色渐变渐变线 是我一点点调出来的 只能说勉强做出来效果看看  要是修改的话 就得从这里修改了  
 
    context.clearRect(0,0,600,600);   
    context.beginPath();
     
    context.restore();
    context.fillStyle = radialgradient;
    context.lineWidth = 10;
    context.strokeStyle = "rgba(0,198,237,0.03)"
    context.shadowBlur=24;
    context.shadowColor="white";
    context.arc(xPos,yPos,r,0,Math.PI*2,false);
     //console.log(rgbv);
    context.fill();
    //context.stroke();
    context.closePath();
}

//这个就是跟随用的动画的外边框用的      
//function getFollowBorderCircle(rgbv,r,lineWidth,context,xPos,yPos,a1){ 
    // 还得修改 这次要实现的是时实的跟新 
function getFollowBorderCircle(rgbv,r,lineWidth,context,x1,y1){ // 

    //传入参数分别是 颜色 边框圆弧的r 线宽 都熟 横坐标 纵坐标  a1 b1 a2 b2 分别是a代表x轴的缩放 b代表y轴的缩放 
    //那么就是得按照画椭圆的写法 横轴 纵轴的长度 r*a1 r*a2  
    var a1 = 1-((Math.sqrt(x1*x1+y1*y1))*0.25/r);
    
    function drawBorderByLinewidth(a){
        var x = a?a:1;
        context.clearRect(0,0,600,600);
        context.beginPath();
        context.restore();
        context.lineWidth = lineWidth*x;
        context.strokeStyle = "rgba(255,255,255,0.29)";
        context.shadowBlur=24; 
        context.shadowColor="white";
        context.arc(240,240,r,0,Math.PI*2,false);
        context.stroke();
        context.closePath();
    }

    if (arguments.length < 6){ //那就是参数没有传递够 说明只需要一层 那就正好 
        drawBorderByLinewidth(1);
    }
    else{
        //drawBorderByLinewidth(1.4);
        // shit是 里面那个被更严重压缩了 
        //  alert("cc")
        //螺旋线绘制椭圆  drawBorderByLinewidth(1);
        context.clearRect(0,0,600,600);
        drawBorderByLinewidth(1.8);
        
        context.beginPath();
        context.restore();
        var b = r;
        var a = r * a1;
        var step = (a > b) ? 1 / a : 1 / b;
        context.strokeStyle = "rgba(255,255,255,0.9)";
        context.lineWidth = lineWidth*0.7;
        context.shadowBlur=80;
        context.shadowColor="#00C6ED";

        //context.moveTo(300, 300+b); //从椭圆的左端点开始绘制

        // 问题就来了 这里面的 角度的转化  如何实现的 要看看怎么把 参数写 出去 就是说 基本思路 就是 ，得知道 这个劣弧start的 角度 ，然后是end的角度 接下里 
        // 就是  
        // 用if判断喽
        if(x1>0 ){ // 向右
            context.moveTo(240, 240+b)
            for (var i = 0.5*Math.PI; i < 1.5*Math.PI; i += step){
                //参数方程为x = a * cos(i), y = b * sin(i)，
                //参数为i，表示度数（弧度）
                context.lineTo(240 + a * Math.cos(i), 240 + b * Math.sin(i));
            }
            //context.closePath();
            context.arc(240,240,r,1.5*Math.PI,0.5*Math.PI,false);
            
            context.stroke();
        }else { // 向左
            for (var i = 1.5*Math.PI; i < 2.5*Math.PI; i += step){
                //参数方程为x = a * cos(i), y = b * sin(i)，
                //参数为i，表示度数（弧度）
                context.lineTo(240 + a * Math.cos(i), 240 + b * Math.sin(i));
            }
            //context.closePath();
            context.arc(240,240,r,2.5*Math.PI,1.5*Math.PI,false);
            
            context.stroke();
        }

        
    }
}

function drawQuestionBorder(rgbv,r,lineWidth,context,x1,y1){
    var a1 = 1-((Math.sqrt(x1*x1+y1*y1))*0.25/r);

    function drawBorderByLinewidth(a){
        var x = a?a:1;
        context.clearRect(0,0,600,600);
        context.beginPath();
        context.restore();
        context.lineWidth = lineWidth*x;
        context.strokeStyle = "rgba(255,255,255,0.59)";
        context.shadowBlur=24; 
        context.shadowColor="white";
        context.arc(240,240,r,0,Math.PI*2,false);
        context.stroke();
        context.closePath();
    }

    if (arguments.length < 6){ //那就是参数没有传递够 说明只需要一层 那就正好 
        drawBorderByLinewidth(1);
    }
    else{
        //drawBorderByLinewidth(1.4);
        // shit是 里面那个被更严重压缩了 
        //  alert("cc")
        //螺旋线绘制椭圆  drawBorderByLinewidth(1);
        context.clearRect(0,0,600,600);
        drawBorderByLinewidth(1.8);
        
        context.beginPath();
        context.restore();
        var b = r;
        var a = r * a1;
        var step = (a > b) ? 1 / a : 1 / b;
        context.strokeStyle = "rgba(255,255,255,0.9)";
        context.lineWidth = lineWidth*1.3;
        context.shadowBlur=80;
        context.shadowColor="#00C6ED";

        context.moveTo(240, 240+b)
        for (var i = 0.5*Math.PI; i < 1.5*Math.PI; i += step){
            //参数方程为x = a * cos(i), y = b * sin(i)，
            //参数为i，表示度数（弧度）
            context.lineTo(240 + a * Math.cos(i), 240 + b * Math.sin(i));
        }
        for (var i = 1.5*Math.PI; i < 2.5*Math.PI; i += step){
            //参数方程为x = a * cos(i), y = b * sin(i)，
            //参数为i，表示度数（弧度）
            context.lineTo(240 + a * Math.cos(i), 240 + b * Math.sin(i));
        }
        context.stroke();

        //context.moveTo(300, 300+b); //从椭圆的左端点开始绘制

        // 问题就来了 这里面的 角度的转化  如何实现的 要看看怎么把 参数写 出去 就是说 基本思路 就是 ，得知道 这个劣弧start的 角度 ，然后是end的角度 接下里 
        // 就是  
        // 用if判断喽
        /*
        if(x1>0 ){ // 向右
            context.moveTo(240, 240+b)
            for (var i = 0.5*Math.PI; i < 1.5*Math.PI; i += step){
                //参数方程为x = a * cos(i), y = b * sin(i)，
                //参数为i，表示度数（弧度）
                context.lineTo(240 + a * Math.cos(i), 240 + b * Math.sin(i));
            }
            //context.closePath();
            context.arc(240,240,r,1.5*Math.PI,0.5*Math.PI,false);
            
            context.stroke();
        }else { // 向左
            for (var i = 1.5*Math.PI; i < 2.5*Math.PI; i += step){
                //参数方程为x = a * cos(i), y = b * sin(i)，
                //参数为i，表示度数（弧度）
                context.lineTo(240 + a * Math.cos(i), 240 + b * Math.sin(i));
            }
            //context.closePath();
            context.arc(240,240,r,2.5*Math.PI,1.5*Math.PI,false);
            
            context.stroke();
        }

        */
    }
}

   
function drawBorderReceive(x,target){
    console.log("1")
   // target.clearRect(0,0,480,480);
    target.beginPath();
    target.strokeStyle = "rgba(255,255,255,0.8)";
    ctxBorder.lineWidth = 7.5;
    target.lineJoin = "round";
    target.arc(240,240,180,0,1.5*Math.PI,false);
    //target.quadraticCurveTo(320,160,420,240);
    //二次的贝塞尔曲线实在是 太 丑 了
    target.bezierCurveTo(275,65,420-x-20,60+x-20,420-x,60+x);
    // 现在在 精细 调整 控制点曲线 
    target.bezierCurveTo(420+20-x,60+20+x,420,200,420,240);
    target.stroke();
    target.closePath();
    
}

function drawMsgBall(x){


    ctxBorder.clearRect(0,0,480,480)

    if( x >= 370){  // 那就是说没有接触了 
        getDoubleBorderCircle("rgb(255,255,255)",180,7.5,ctxBorder,240,240,1);
        ctxBorder.beginPath();
        ctxBorder.arc(x+10,470-x,15,0,Math.PI*2,true);
        ctxBorder.fillStyle = "red";
        ctxBorder.fill();
        ctxBorder.closePath();



    }else if(x<370){  // 现在接触了 需要做一些动作的优化 
        drawBorderReceive( ( (360-x) + 60 ),ctxBorder)

        ctxBorder.beginPath();
        ctxBorder.arc(x+10,470-x,15,0,Math.PI*2,true);
        ctxBorder.fillStyle = "rgb(255,0,0)";

        ctxBorder.fill();
        ctxBorder.closePath();

       
    }
}


function drawEndMsgBall(x){
    getDoubleBorderCircle("rgb(255,255,255)",180,7.5,ctxBorder,240,240,1);
    ctxBorder.beginPath();
    ctxBorder.shadowBlur=0; 
    ctxBorder.shadowColor="white";
    ctxBorder.arc(x+100,Math.sqrt(x+10)+90,15,0,Math.PI*2,true);
    ctxBorder.fillStyle = "red";
    ctxBorder.fill();
    ctxBorder.closePath();

}
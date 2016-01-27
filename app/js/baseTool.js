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
function drawCenterBlink(a1,r){  // 这个yVal指的是 y轴被缩小的 然后还得调用 椭圆公示 
    // 分步骤 第一步搞定 中间的圆不变
   
    //getCenterFill("(255,255,255)",r,ctxCenter,240,240); // 画一个 中间的
    console.log(a1)
    // 然后 根据传入的参数 搞定 
    var b = r;
    var a = r * a1;
    var step = (a > b) ? 1 / a : 1 / b;


    //drawBorderByLinewidth(1.8);
   // 
    ctxCenter.beginPath();
    //ctxCenter.clearRect(0,0,480,480);
    //console.log("i am clearing","  ")
    var b = r;
    var a = r * a1;
    var step = (a > b) ? 1 / a : 1 / b;
    ctxCenter.strokeStyle = "rgba(255,2,2,0.69)";
    ctxCenter.lineWidth = 8;
    //ctxCenter.shadowBlur=80;
    //ctxCenter.shadowColor="#00C6ED";

    ctxCenter.moveTo(240+b, 240); 

    for (var i = 0.5*Math.PI; i < 1.5*Math.PI; i += step){
        //参数方程为x = a * cos(i), y = b * sin(i)，
        //参数为i，表示度数（弧度）
        ctxCenter.lineTo(240 + b * Math.sin(i), 240 +   a * Math.cos(i));
    }
    for (var i = 1.5*Math.PI; i < 2.5*Math.PI; i += step){
        //参数方程为x = a * cos(i), y = b * sin(i)，
        //参数为i，表示度数（弧度）
        ctxCenter.lineTo(240 + b * Math.sin(i), 240 + a* Math.cos(i));
    }

    //ctxCenter.fill();
    ctxCenter.stroke();
    ctxCenter.closePath();
    ctxCenter.clip();

    getCenterFill("(255,255,255)",r,ctxCenter,240,240); // 画一个 中间的
    //var rgbv = "rgba"+"("+rgbV1.replace(/\(/g,"").replace(/\)/g,"")+","+0.5+")";
    //ctxCenter.restore();
    ctxCenter.clearRect(0,0,480,480);
    ctxCenter.closePath();
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
        //console.log(position.rY,changeNums[1][1])
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

            ctxCenter.fillStyle = radialgradient;
            ctxCenter.fill();
            ctxCenter.closePath();
            
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
    console.log(changeNums,"this is changeNums")    

    var position;
    var target;
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
            targets[i].style.width = 480 + "px";
            targets[i].style.height = 480 + "px";
            targets[i].style.left =  position.x + "px";
            targets[i].style.top = position.y + "px";
        }
        //getFollowBorderCircle("rgb(255,255,255)",150,6,ctxBorder,300,300,1-(position.x / 150));

        if(position.x == changeNums[0][1]){
            console.log("i am sopt")
            tweenToLeft.stop();
            getCenterFillNo("(255,255,255)",100,ctxCenter,240,240); // 画一个 中间的
            getDoubleBorderCircleNo("rgb(255,255,255)",180,6,ctxBorder,240,240,0); // 画一个 border的 两层 这个
        }
    }
    //  接下来 是 写 如何 在 现有基础上面的 闭眼 开眼  考虑解耦 不直接去写 闭眼 开眼 放弃chain(another这样的写法) 全部解除 然后 
}
function lotsMove(changeNums,target,long){  // cahnges = [{target:node1,changeArray:[[x0,x1],[y0,y1]]},{},.....{}]
    // 这个先别写这么 别开太多坑
    // 结果还是去吧坑填了 
    //console.log(changeNums,"this is changeNums") ;
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
        getFollowBorderCircle("rgb(255,255,255)",180,6,ctxBorder,position.x,position.y)
        if(position.x == changeNums[0][1]){
            console.log("i am stop ")
            tweenToLeft.stop();
            //alert("i am in position")
        }
    } 
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
           // console.log(targets[i].style.width,targets[i].style.height,targets[i].style.left,targets[i].style.top)
        }
        if(position.ry == changeNums[1][1]){
            scaleA.stop();
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
        //context.clearRect(0,0,600,600);
        drawBorderByLinewidth(1);


        context.beginPath();
        //test start
        //context.rect(240,240,40,40);
        context.stroke();
        //test end

        //context.restore();
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
        //context.fill();
        context.closePath();
        context.stroke();
    }
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


// 所有没有加 渐变效果的 函数都在这里

// 这个函数 就是说 尝试一下 "吞"  这个动作 ，就是说眼球直接被切割 ，这次放在 ctxborder 来 实现 
function getNewDoubleBorderCircle(rgbv,r,lineWidth,context,xPos,yPos,a1){ 
    //传入参数分别是 颜色 边框圆弧的r 线宽 都熟 横坐标 纵坐标  a1 b1 a2 b2 分别是a代表x轴的缩放 b代表y轴的缩放 
    //那么就是得按照画椭圆的写法 横轴 纵轴的长度 r*a1 r*a2  

        //drawBorderByLinewidth(1.4);
        // shit是 里面那个被更严重压缩了 
        //螺旋线绘制椭圆  drawBorderByLinewidth(1);
        context.clearRect(0,0,480,480);
        context.save();
        context.beginPath();
        //test start

        var a = r-2;
        var b = (r-2) * a1;
        var step = (a > b) ? 1 / a : 1 / b;
        context.strokeStyle = "rgba(255,255,255,0.6)";
        context.lineWidth = 10;
        context.moveTo(xPos + a, yPos); //从椭圆的左端点开始绘制

        for (var i = 0; i < 1 * 2*Math.PI; i += step){
            //参数方程为x = a * cos(i), y = b * sin(i)，
            //参数为i，表示度数（弧度）
            context.lineTo(xPos + a * Math.cos(i), yPos + b * Math.sin(i));
        }
        context.stroke();
        context.clip();
        context.clearRect(0,0,480,480);
        // 中间的眼球开始了 简直不能更要命 
        context.beginPath();
        context.arc(240,240,100,0,Math.PI*2);
        context.fillStyle = "rgb(255,255,255)";
        context.fill();

        context.restore();    
}

function getNewDoubleBorderCircleWithMove(rgbv,r,lineWidth,context,xPos,yPos,a1){ 
    //传入参数分别是 颜色 边框圆弧的r 线宽 都熟 横坐标 纵坐标  a1 b1 a2 b2 分别是a代表x轴的缩放 b代表y轴的缩放 
    //那么就是得按照画椭圆的写法 横轴 纵轴的长度 r*a1 r*a2  

        //drawBorderByLinewidth(1.4);
        // shit是 里面那个被更严重压缩了 
        //螺旋线绘制椭圆  drawBorderByLinewidth(1);
        context.clearRect(0,0,480,480);
        context.save();
        context.beginPath();
        //test start

        var a = r;
        var b = r * a1;
        var step = (a > b) ? 1 / a : 1 / b;
        context.strokeStyle = "rgba(255,255,255,0.7)";
        context.lineWidth = lineWidth*1.2;
        context.moveTo(xPos + a, yPos); //从椭圆的左端点开始绘制

        for (var i = 0; i < 1 * 2*Math.PI; i += step){
            //参数方程为x = a * cos(i), y = b * sin(i)，
            //参数为i，表示度数（弧度）
            context.lineTo(xPos + a * Math.cos(i), yPos + b * Math.sin(i));
        }
        context.stroke();

        context.clip();

        context.clearRect(0,0,480,480);
        // 中间的眼球开始了 简直不能更要命 
        context.beginPath();
        context.arc(240,240,80,0,Math.PI*2);
        context.fillStyle = "rgb(255,255,255)";
        context.fill();
        context.closePath();
        // 眼球结束 
        // 清楚画板的 
        context.restore();    
}


function getDoubleBorderCircleNo(rgbv,r,lineWidth,context,xPos,yPos,a1){ 
    //传入参数分别是 颜色 边框圆弧的r 线宽 都熟 横坐标 纵坐标  a1 b1 a2 b2 分别是a代表x轴的缩放 b代表y轴的缩放 
    //那么就是得按照画椭圆的写法 横轴 纵轴的长度 r*a1 r*a2  

    function drawBorderByLinewidth(a){
        var x = a?a:1;
        context.clearRect(0,0,600,600);
        context.beginPath();
        context.restore();
        context.lineWidth = lineWidth*x;
        context.strokeStyle = "rgba(255,255,255,0.49)";
        //context.shadowBlur=14; 
        //context.shadowColor="white";
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
        //context.clearRect(0,0,600,600);
        drawBorderByLinewidth(1);

        context.beginPath();
        var a = r;
        var b = r * a1;
        var step = (a > b) ? 1 / a : 1 / b;
        context.strokeStyle = "rgba(255,255,255,0.55)";
        context.lineWidth = lineWidth*0.7;
        //context.shadowBlur=80;
        //context.shadowColor="#00C6ED";
        context.moveTo(xPos + a, yPos); //从椭圆的左端点开始绘制

        for (var i = 0; i < 1 * 2*Math.PI; i += step){
            //参数方程为x = a * cos(i), y = b * sin(i)，
            //参数为i，表示度数（弧度）
            context.lineTo(xPos + a * Math.cos(i), yPos + b * Math.sin(i));
        }
        context.closePath();
        context.beginPath()

        //  因为设计那边 给的是 一个 
        var radialgradient = context.createRadialGradient(240,240,0,240,240,180);
        radialgradient.addColorStop(0,"rgba(0,0,0,0.0)");
        radialgradient.addColorStop(0.8,"rgba(255,255,255,0.000)");
        radialgradient.addColorStop(0.9,"rgba(255,255,255,0.01)");
        radialgradient.addColorStop(1.0,"rgba(255,255,255,0.26)");
        
        context.arc(240,240,170,0,2*Math.PI,true);
        context.strokeStyle = radialgradient;
        context.lineWidth = 20;
        //context.stroke();

        //context.fillStyle = radialgradient;
        //context.stroke();
        context.closePath();
    }
}

function getCenterFillNo(rgbV1,r,context,xPos,yPos){ //给一个什么参数，颜色值呗 亦或是可以考虑那个  
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
    context.fillStyle = "rgba(255,255,255,0.9)";
    context.lineWidth = 10;
    context.strokeStyle = "rgba(0,198,237,0.03)";
    context.arc(xPos,yPos,r,0,Math.PI*2,false);
    context.fill();

    //context.stroke();
    context.closePath();
}


function newOpenAndClose(changeNums,times,long,targets){  // 这个就是  需要 设置不同参数 比较复杂的那种 [[],[],[]]
    // cahngeNums = [[x0,x1],[y0,y1]]    
    var positionB;

    var scaleB,
        tweenToRight;
        
    var xp,yp;

    //getPos();
    init(); 
    animate();
     
    function init(){ 
        positionB = {x:changeNums[0][0],y:changeNums[1][0],c:changeNums[2][0],l:-1000};
        scaleB = new TWEEN.Tween(positionB)
                    .to({x:changeNums[0][1],y:changeNums[1][1],c:changeNums[2][1],l:1},long)  // 不知道为什么 动画效果受到时间的影响太多 太多                                            
                    .easing(TWEEN.Easing.Quartic.InOut)
                    .yoyo(true)
                    .repeat(1+times)
                    .onUpdate(updateA);
        scaleB.start();  
    }

    function animate(time){
        requestAnimationFrame(animate);
        TWEEN.update(time);
    }

    function updateA(){
        positionB.c = positionB.y / 240;
        getNewDoubleBorderCircle("rgb(255,255,255)",180,7.5,targets[0].getContext("2d"),240,240,positionB.c);
        // 我认为 单单这一句 就可以 做最基础的blink的最基础的动作 
        //同时绘制  顶部的小有趣
            // 现在基本上就是参数确定不下来 这个是个坑 。。。
            // 现在好像能把坑填了 主要就是x代表,需要下潜的高度， position.c*180就是现在 能够 搞定 

        drawSmallInter(45,positionB.c*180,positionB.l);

        if(positionB.y == changeNums[1][0]){
            scaleB.stop();
            //getDoubleBorderCircleNo("rgb(255,255,255)",180,5,ctxBorder,240,240,0);

            setTimeout(function(){
                //doTest([-1000,1000],0,500);
                //initX();
                //scaleX.start(); 
                myBlink.trigger("_baseBlinkOpeanAndClose");
                //animateX(time);

            },100)

        }
    }

    function initX(){ 
        positionX = {k:-1000};
        scaleX = new TWEEN.Tween(positionB)
                    .to({k:1000},1300)  // 不知道为什么 动画效果受到时间的影响太多 太多                                            
                    .easing(TWEEN.Easing.Quartic.InOut)
                    .yoyo(true)
                    .repeat(10)
                    .onUpdate(updateX);
        scaleX.start();
    }

    function animateX(time){
        requestAnimationFrame(animate);
        TWEEN.update(time);
    }

    function updateX(){
        //positionB.c = positionB.y / 240;
        //getNewDoubleBorderCircle("rgb(255,255,255)",180,7.5,targets[0].getContext("2d"),240,240,positionB.c);
        // 我认为 单单这一句 就可以 做最基础的blink的最基础的动作 
        //同时绘制  顶部的小有趣
            // 现在基本上就是参数确定不下来 这个是个坑 。。。
            // 现在好像能把坑填了 主要就是x代表,需要下潜的高度， position.c*180就是现在 能够 搞定 

        //drawSmallInter((positionB.c/2)*45,positionB.c*180,positionB.l);
        console.log(positionX.k,"kkkk")
        drawSmallInter(45,180,positionX.k);
        if(positionX.k == 1000){
            scaleX.stop();
            //getDoubleBorderCircleNo("rgb(255,255,255)",180,5,ctxBorder,240,240,0);
            console.log("i am ending")
            //doTest([-100,100],0,300);
            //alert("i am doing")

        }
    }

}

function doTest(changeNums,times,long){
    console.log("hello i am dosmothing")

    var positionB;
    var scaleB,
        tweenToRight;
    var xp,yp;

   // console.log(changeNums[0],changeNums[1],long,"ddd")

    init(); 
    animate();
     
    function init(){ 
        positionB = {k:changeNums[0]};

        scaleB = new TWEEN.Tween(positionB)
                    .to({k:changeNums[1]},long)  // 不知道为什么 动画效果受到时间的影响太多 太多                                            
                    .easing(TWEEN.Easing.Quartic.Out)
                    .yoyo(true)
                    .repeat(4)
                    .onUpdate(updateA);
        scaleB.start();
        console.log("7");  
    }

    function animate(time){
        requestAnimationFrame(animate);
        TWEEN.update(time);
    }

    function updateA(){

        // 我认为 单单这一句 就可以 做最基础的blink的最基础的动作 
        //同时绘制  顶部的小有趣
            // 现在基本上就是参数确定不下来 这个是个坑 。。。
            // 现在好像能把坑填了 主要就是x代表,需要下潜的高度， position.c*180就是现在 能够 搞定 
        //var z = 45*positionB.c/2    
        //var k = -1;
        //console.log(positionB)
        drawSmallInter(45,180,positionB.k);
        console.log(1)
        if(positionB.k == changeNums[1]){
            scaleB.stop();
            console.log("i am ending");
            getCenterFillNo("(255,255,255)",100,ctxCenter,240,240); // 画一个 中间的
            getDoubleBorderCircleNo("rgb(255,255,255)",180,6,ctxBorder,240,240,0); // 画一个 border的 两层 这个
        }
    }
}


function drawSmallInter(deep,yHeight,k){  // 姑且先写一个deep表示里面的究竟有多深，参数控制范围在（20-60最佳，yHeight就是通过计算得到的 压缩的椭圆高度 
    // 你说我在哪里写上比较好  ctxCenter 还是ctxBorder
    // 先在center上面写吧 
    // 好吧 这个还要计算 真心是需要计算 计算什么？ 传进来的 参数有，每次y轴的高度 按照距离  计算出起始位置纵坐标（ 240-y + 20） ，
        // 然后是 xleng=Math。sqart(180*180-(260-y)*(260-y)) ;起始a1（240-xleng，260-y），中间位置 （240,240-y）,第二位置 （240+xleng，260-y）  
    var xleng=Math.sqrt(200*200-(200-deep)*(200-deep));
    //console.log(yHeight,"this is yHeight")

    // 从刚才写一次来看，现在的问题就在于，自己不会没有软件工程的想法，写的东西太差劲 
    // 总算有点眉目了 现在就是开始认真的写 把参数设置好 

    // 首先是 写 几个 （x1,y1） (x2,y2) (x3,y3) (x4,y4) (x1,y1) 就是这样的一段循环
    var x1 = 240-xleng,
        y1 = 240-yHeight+deep,
        x2 = 240,
        y2,
        x3 = 240+xleng,
        y3 = 240-yHeight+deep,
        x4 = 240,
        y4;

    if(k > 0){
        y2 = 240-yHeight-deep;
        y4 = 240-yHeight+deep/10;  
    }
    else if(k <= 0){
        y2 = 240-yHeight-2*deep;
        y4 = 240-yHeight+20//deep;
    }    
    //console.log(y4)
    ctxCenter.clearRect(0,0,480,480);
    //getCenterFillNo("(255,255,255)",100,ctxCenter,240,240);
    ctxCenter.beginPath();
    ctxCenter.lineTo(x1,y1);
    ctxCenter.quadraticCurveTo(x2,y2,x3,y3);
    ctxCenter.quadraticCurveTo(x4,y4,x1,y1);

    //这个就是说 这个就是 渐变的模糊填充 

    console.log(y2)
    var ppp = (180-y2 )> 0 ? (180-y2 ):0;
    var radialgradient =ctxCenter.createRadialGradient(240,240,0,240,240,ppp);
    radialgradient.addColorStop(0,"rgba(0,0,0,0.0)");
    radialgradient.addColorStop(0.8,"rgba(255,255,255,0.01)");
    radialgradient.addColorStop(0.90,"rgba(255,255,255,0.09)");
    radialgradient.addColorStop(1.0,"rgba(255,255,255,0.29)");

    ctxCenter.fillStyle = radialgradient;
    //
    ctxCenter.lineWidth = 1;
    ctxCenter.strokeStyle = "rgba(255,255,255,0.03)";
    ctxCenter.stroke();

    //ctxCenter.shadowBlur=18;
    //ctxCenter.shadowColor="rgb(48,243,255)";
    ctxCenter.fill();
    ctxCenter.closePath();
    
    // look
    /*
    ctxCenter.beginPath();
    ctxCenter.arc(x1,y1,10,0,Math.PI*2);
    ctxCenter.fillStyle = "red";
    ctxCenter.fill();
    ctxCenter.closePath();

    ctxCenter.beginPath();
    ctxCenter.arc(x2,y2,10,0,Math.PI*2);
    ctxCenter.fillStyle = "red";
    ctxCenter.fill();
    ctxCenter.closePath();

    ctxCenter.beginPath();
    ctxCenter.arc(x3,y3,10,0,Math.PI*2);
    ctxCenter.fillStyle = "red";
    ctxCenter.fill();
    ctxCenter.closePath();

    ctxCenter.beginPath();
    ctxCenter.arc(x4,y4,10,0,Math.PI*2);
    ctxCenter.fillStyle = "red";
    ctxCenter.fill();
    ctxCenter.closePath();
    */
    // end look
    
    ctxCenter.closePath();
}




//这个就是跟随用的动画的外边框用的      
//function getFollowBorderCircle(rgbv,r,lineWidth,context,xPos,yPos,a1){ 
    // 还得修改 这次要实现的是时实的跟新 
function getFollowBorderCircle(rgbv,r,lineWidth,context,x1,y1){ // 
    /* 怎么说 这里是 x>0  x<0 这里的问题 , 

    //传入参数分别是 颜色 边框圆弧的r 线宽 都熟 横坐标 纵坐标  a1 b1 a2 b2 分别是a代表x轴的缩放 b代表y轴的缩放 
    //那么就是得按照画椭圆的写法 横轴 纵轴的长度 r*a1 r*a2  
   */ 
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
   
function get1(a){ 
    //传入参数分别是 颜色 边框圆弧的r 线宽 都熟 横坐标 纵坐标  a1 b1 a2 b2 分别是a代表x轴的缩放 b代表y轴的缩放 
    //那么就是得按照画椭圆的写法 横轴 纵轴的长度 r*a1 r*a2  
        //console.log(a);
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
           // console.log(x)
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
    //console.log(1);
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

function lotsMoveQuestion(changeNums,target,long){  // cahnges = [{target:node1,changeArray:[[x0,x1],[y0,y1]]},{},.....{}]

    var position;
    var target;
    var tweenToLeft,tweenToRight;
    var xValue = changeNums[0],
        yValue = changeNums[1];

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

        drawQuestionBorder("rgb(255,255,255)",180,6,ctxBorder,position.x,position.y)
        if(position.x == changeNums[0][1]){
            tweenToLeft.stop();

            questionAndNormal.trigger("_question");  // zhu
            // 以下的是使用 考虑 在 question表情后面使用 一个 normal 让自己归位，

            /*
            var actMessage = ["normal", "x:555;y:51;r:839;b:335"];
            var myAction = doAction(actMessage);
            myAction.start();
            */
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
        context.lineWidth = lineWidth*x*0.8;
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
        context.strokeStyle = "rgba(255,255,255,0.69)";
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

    }
}






;(function(){
    //写一个作用域 全部框起来 
var uid = 1; // 其实我不知道为啥 不设计从0开始 
var Jas = function(){
    this.map = {};
    this.rmap = {};
};  
// Jas写进一个 obj,俩个属性 .map .rmap
var indexOf = Array.prototype.indexOf || function(obj){

    for (var i=0, len=this.length; i<len; ++i){
        if (this[i] === obj) return i; 
    }

    return -1;
};
// 补写

var fire = function(callback, thisObj){
    setTimeout(function(){
        callback.call(thisObj);
    }, 0);
};
// 建立一个回调函数机制 thisObj为上下文 ，使用callBack  但是是建立在当前线程已经结束的情况下 

// 直接重写原型？这样真的大丈夫？  
Jas.prototype = {

    // 应该是类似于 jquery 里面的 when方法 
    when: function(resources, callback, thisObj){ 

        var map = this.map, 
            rmap = this.rmap;
            
        if (typeof resources === 'string'){    
            resources = [resources];  // 为啥要把 string写成数组 
        }

        var id = (uid++).toString(16); // using hex

        map[id] = {   // 
            waiting: resources.slice(0), // clone Array 复制一遍数组，但是属于浅复制，waiting应该代表的是排队的事件
            callback: callback,
            thisObj: thisObj || window
        };
        
        for(var i=0, len=resources.length; i<len; ++i){
            var res = resources[i],
                list = rmap[res] || (rmap[res] = []);  // 可是这个list是指在when里面的啊
            list.push(id);
        };
          
        return this;
    },

    trigger: function( resources){  //
        
        if(!resources ){
            return this;
        }
        
        var map = this.map, 
            rmap = this.rmap;
        
        if (typeof resources === 'string'){
            resources = [resources];
        }
        
        for (var i=0, len = resources.length; i<len; ++i){
            
            var res = resources[i];
            if(typeof rmap[res] === 'undefined'){
                continue;
            };
            
            this._release(res, rmap[res]); // notify each callback waiting for this resource
            delete rmap[res]; // release this resource
        }
        return this;
    },

    _release: function(res, list){
        var map = this.map, rmap = this.rmap;
        for (var i=0, len=list.length; i<len; ++i){
            
            var uid = list[i], 
                mapItem = map[uid],
                waiting = mapItem.waiting,
                pos = indexOf.call(waiting, res);
            waiting.splice(pos, 1); //remove
            
            if (waiting.length === 0){ //no more depends
                fire(mapItem.callback, mapItem.thisObj); //fire the callback asynchronously
                delete map[uid];
            }
        }
    }
};
window.Jas = Jas; // Jas is JavaScript Asynchronous (callings) Synchronizer  
})();
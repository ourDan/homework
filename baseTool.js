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
            targets[i].style.left = 300 - (positionB.x)  + "px";
            targets[i].style.top = 300 - (positionB.y)  + "px";
        }
        
        //关于 border的 变化的 操作 
        positionB.c = positionB.y / 300;
        //console.log(positionB.c);
        getDoubleBorderCircle("rgb(255,255,255)",150,6,targets[0].getContext("2d"),300,300,positionB.c);
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
        //targetCenter = document.getElementById("picCenter");
        //targetBorder = document.getElementById("picBorder");
        
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
            targets[i].style.left = 300 - (positionB.x)  + "px";
            targets[i].style.top = 300 - (positionB.y)  + "px";
        }
        if(positionB.c == 1){
            scaleB.stop(); 
        }
    }
}

function singleMove(changeNums,targets,long){ // 这里指的是 单个target或 多个target，但是具有相同的[[xo,x1],[y0,y1]]的这种 要不然实在是没有必要都写进同一个吧 
    console.log(changeNums,"this is changeNums")    

    var position;
    var target;
    var tweenToLeft,tweenToRight;
    var xValue = changeNums[0],
        yValue = changeNums[1];
    console.log(xValue,yValue)

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
        
            target.style.width = 600 + "px";
            target.style.height = 600 + "px";
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
            targets[i].style.height = 2*osition.rY + "px";
            targets[i].style.left = 300 - ( position.rX /2)  + "px";
            targets[i].style.top = 300 - (position.rY /2)  + "px";
        }
        if(position.ry == 300){
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
            targets[i].style.left = 300 - ( position.rX )  + "px";
            targets[i].style.top = 300 - (position.rY )*0.3  + "px";
        }
        if(position.ry == 300){
            scaleA.stop();
        }               
    }

}

/*
function disappear(xPos,yPos,startNum,endNum){
    var position;
    var targetCenter,
        targetBorder;
    var scaleA,
        tweenToRight;
    var xp,yp;

    getPos();
    init();
    animate();
    
    function getPos(){
        xp = xPos? xPos : 300;
        yp = yPos? yPos : 300;
    }

    function init(){ 
        position = {x:300,y:startNum,xPos,yPos};
        targetCenter = document.getElementById("picCenter");
        targetBorder = document.getElementById("picBorder");
        scaleA = new TWEEN.Tween(position)
                    .to({x:300,y:endNum},1600)  // 不知道为什么 动画效果受到时间的影响太多 太多           
                    //.delay(1000)
                    .yoyo()                                                 
                    .easing(TWEEN.Easing.Quartic.InOut)
                    .onUpdate(updateA);
        scaleA.start();  
    }

    function animate(time){
        requestAnimationFrame(animate);
        TWEEN.update(time);
    }

    function updateA(){
        //关于 center的 变化的 操作
        targetCenter.style.width = position.x + "px";
        targetCenter.style.height = position.y + "px";
        targetCenter.style.left = 300 - (position.x/2)  + "px";
        targetCenter.style.top = 300 - (position.y/2)  + "px";

        //关于 border的 变化的 操作 
        targetBorder.style.width = position.x*2 + "px";
        targetBorder.style.height = position.y*2 + "px";
        
        targetBorder.style.left = 300 - (position.x)  + "px";
        targetBorder.style.top = 300 - (position.y)  + "px";            
    }
}
*/


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
        context.strokeStyle = "rgba(255,255,255,0.79)";
        context.shadowBlur=24; 
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
        context.strokeStyle = "rgba(255,255,255,0.9)";
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

// 
function getCenterFill(rgbV1,r,context,xPos,yPos){ //给一个什么参数，颜色值呗 亦或是可以考虑那个  
    // drawBackground("(0,198,237)",ctx,300,300); 
    var rgbv = "rgba"+"("+rgbV1.replace(/\(/g,"").replace(/\)/g,"")+","+0.5+")";
     
    console.log(context)
    var radialgradient = context.createRadialGradient(xPos,yPos,0,xPos,yPos,r);
    radialgradient.addColorStop(0,"rgba(255,255,255,1)");
     radialgradient.addColorStop(0.2,"rgba(255,255,255,0.99)");
     radialgradient.addColorStop(0.4,"rgba(255,255,255,0.6)");
     radialgradient.addColorStop(0.7,"rgba(255,255,255,0.2)");
     radialgradient.addColorStop(1.0,"rgba(255,255,255,0)");
     //以上的时间渐变线是我一点点调出来的 只能说勉强做出来效果看看  虽然这个基本封装 

     //drawBackground("(0,198,237)",ctx,xPos,yPos);  
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
     context.stroke();
     context.closePath();
}

//这个就是跟随用的动画的外边框用的      
//function getFollowBorderCircle(rgbv,r,lineWidth,context,xPos,yPos,a1){ 
    // 还得修改 这次要实现的是时实的跟新 
function getFollowBorderCircle(rgbv,r,lineWidth,context,x1,y1){ // a1这个参数需要好好搞一搞 实在是 有些 
   /* function getScaleFromXY(x,y){
        var a = Math.atan(x/y) < 0 ? Math.atan(x/y) + Math.PI :Math.atan(x/y) ;
        return a
    }*/
    //alert("ii")
    /* 怎么说 这里是 x>0  x<0 这里的问题 , 



    /* 那个  先把 精准跟随的事情放到后面 先出一个粗略的 
    function getScaleFromXY(x,y){
        // 这四个筛选的目的就是说为了 搞定  这个角度的问题 现在 是 因为 Math.atan() 只能返回 -PI/2 ~ PI/2 之间 
        if(x > 0 && y > 0 ){ // 说明返回的是第一象限
            return Math.atan(y/x)+Math.PI/2;
        }
        else if( x < 0 && y > 0){ // 说明在第二象限
            return -Math.atan(y/x)+Math.PI
        }
        else if( x < 0 && y > 0){
            return Math.atan(y/x)+Math.PI*1.5
        }
        else if( x > 0 && y < 0){
            return -Math.atan(y/x)
        }

    }
    var scaleNum = getScaleFromXY(x1,y1)  // 现在的问题在 这里会 返回 -P/2 - p /2 的值 ，但是 
    */
    //console.log(scaleNum,"scaleNum")
    //传入参数分别是 颜色 边框圆弧的r 线宽 都熟 横坐标 纵坐标  a1 b1 a2 b2 分别是a代表x轴的缩放 b代表y轴的缩放 
    //那么就是得按照画椭圆的写法 横轴 纵轴的长度 r*a1 r*a2  
    var a1 = 1-((Math.sqrt(x1*x1+y1*y1))*0.5/r) ;
    
    //var a1 = 0.8;
    //console.log(a1,"a1")
    //console.log(context)
    //context.translate(300+(window.screen.width-600)/2,300)
    //context.rotate(scaleNum);
    
    function drawBorderByLinewidth(a){
        var x = a?a:1;
        context.clearRect(0,0,600,600);
        context.beginPath();
        context.restore();
        context.lineWidth = lineWidth*x;
        context.strokeStyle = "rgba(255,255,255,0.19)";
        context.shadowBlur=24; 
        context.shadowColor="white";
        context.arc(300,300,r,0,Math.PI*2,false);
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
        drawBorderByLinewidth(1);
        
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
            context.moveTo(300, 300+b)
            for (var i = 0.5*Math.PI; i < 1.5*Math.PI; i += step){
                //参数方程为x = a * cos(i), y = b * sin(i)，
                //参数为i，表示度数（弧度）
                context.lineTo(300 + a * Math.cos(i), 300 + b * Math.sin(i));
            }
            //context.closePath();
            context.arc(300,300,r,1.5*Math.PI,0.5*Math.PI,false);
            

            context.stroke();
        }else { // 向左
            for (var i = 1.5*Math.PI; i < 2.5*Math.PI; i += step){
                //参数方程为x = a * cos(i), y = b * sin(i)，
                //参数为i，表示度数（弧度）
                context.lineTo(300 + a * Math.cos(i), 300 + b * Math.sin(i));
            }
            //context.closePath();
            context.arc(300,300,r,2.5*Math.PI,1.5*Math.PI,false);
            

            context.stroke();
        }

        
    }
   
}
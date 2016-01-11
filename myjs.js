window.onload = function(){
    //alert("test");

    //先说一下这个 整体是个什么样的思路 首先写两个基础函数 funDrawBorder && functionDrawCenter
    //扑街 我得去多写一个div去承载背景,要么是pic 要么是 
    
    //接下来先把宽高都设置了
    var ctxBorderDom = document.getElementById("picBorder");
    var ctxCenterDom = document.getElementById("picCenter");
    ctxBorderDom.width = 600;   
    ctxBorderDom.height = 600;
    ctxCenterDom.width = 600;
    ctxCenterDom.height = 600;

    var ctxBorder = ctxBorderDom.getContext("2d"); 
    var ctxCenter = ctxCenterDom.getContext("2d");  

    // 接下来就是激动人心的 动画效果--
    
    // 1 跟随.mov 
    //  这个怎么做到实时跟新的 现在是能够给出一个 具体的数据去坐目的 如果是说 这个需要即时的数据变化 ？难道加延时？这个先别思考了 留下来再看看吧
    function followToBorder(loR){
        // 怎么说 我觉得吧 这个运动函数 需要运动的 有 第一 变化 中间的位置 （这一步勉强移过去 下一步就是要加各种各样的参数 
        // 怎么说 这里面 我也不知道 要怎么给 参数接口 只能说 先留下=来 看一看 
        var moveXValue,
            moveYValue;

        if(Array.isArray(loR)){  //是个数组,那就是说明 说明啥 说明给了两个坐标 艹 
            moveXValue = loR[0];
            moveYValue = loR[1]; 
            // 就是说 数据已经被 给出来 我只需要 去 调用
        }
        else if(typeof loR == 'string'){ //要么是左 要么是 右 
            switch(loR){
                case "left":
                    moveXValue = -50;
                    moveYValue = 0;
                    break;
                case "right":
                    moveXValue = 50;
                    moveYValue = 0;
                    break;
                }
        }
        else{
            moveYValue = -Math.random()*200+200;
            moveYValue = -Math.random()*200+200;    
        }
        
        getCenterFill("(255,255,255)",150,ctxCenter,300,300); // 画一个 中间的
        //getDoubleBorderCircle("rgb(255,255,255)",100,6,ctxBorder,300,300) // 画一个 border的 两层 这个
        getFollowBorderCircle("rgb(255,255,255)",100,6,ctxBorder,300,300,1);

        move(moveXValue,moveYValue);
        // 看见了吧 这个就是周末 应该研究出来的js异步/同步加载的工具库的作用 现在知道使用场景了 是不是要好好去做 了 
        // 直接去控制 还是不可取的  应该是 一点点的去 加载 
        setTimeout(function(){
             NewopenAndClose();
        },650)
    }
    //第2个唤醒 就是 相关于 唤醒.mov
    function getUp(){
        //唤醒动画分为两个部分 首先是 压缩椭圆的 一个 部分 
        getCenterFill("(255,255,255)",150,ctxCenter,300,300); // 画一个 中间的
        getDoubleBorderCircle("rgb(255,255,255)",100,6,ctxBorder,300,300,0) // 画一个 border的 两层 这个
        //

        scaleAnimation(300,300,15,300);
        setTimeout(function(){
            openAndClose(300,300,2,720);
        },1200);

        // 接下来 是眨眼动画 
    }
    // 第三个就是 睡眠.mov 其实就是 唤醒的反过程 这里注意两点 第一个 一开始 如何 逐步构建一个合适大小 第二步 就是再就是搞定 
    function sleep(){
        // 这个是得要 自己去把中间的函数绘制了
        getCenterFill("(255,255,255)",150,ctxCenter,300,300);
        openAndClose(300,300,2,850);

        setTimeout(function(){
            //alert("amall")该进行 反向缩小的函数的
            disappear(300,300,300,0);
        },3400)
    }
    // 第四个就是  惊讶.mov 
    function surprise(){
        // 这个就是 主要眨眼一次 内圈先扩再缩小 然后就是 眨眼  
        getCenterFill("(255,255,255)",150,ctxCenter,300,300);
        //moreOrLess(300,300,300,500,[ctxCenterDom],1,900);
        moreOrLess([[300,500],[300,500]],[ctxCenterDom],0,900)
        //openAndClose(300,300,0,600);
        setTimeout(function(){
            //scaleAnimation(300,300,300,400)
            moreOrLess(300,300,300,500,[ctxCenterDom],1,900);

            setTimeout(function(){
                openAndClose(300,300,0,350)
            },2000)

        },1600);

    }

    //下面开始调用 动画函数了
    //唤醒 动画
    //getUp();
    
    // 左右给个动作跟随   
    //followToBorder("right");
    
    // 睡眠动画
    //sleep(); 
    
    // 惊讶动画 
    surprise();

    // 其实 我打算 把 函数写为 基本绘制图像 比如 画外边缘 画里面的 圆心 画背景 画其他的 东西 ；
    //                         基本动作的抽象 比如 扩大 缩小 比如 闪烁 
    //                         再就是封装上层的 比如就会出现 眨眼 的基本结构 就会被分为 分段还是分什么功能 什么的了 


    //下面开始写动画函数了 
    function openAndClose(xPos,yPos,startNumX,startNumY,endNumX,endNumY,times,long,targets){

        var positionB;
        var targetCenter,
            targetBorder;
        var scaleB,
            tweenToRight;
        var xp,yp;

        getDoubleBorderCircle("rgb(255,255,255)",100,3,ctxBorder,xPos,yPos,1)

        getPos();
        init(); 
        animate();

        function getPos(){
            xp = xPos? xPos : 300;
            yp = yPos? yPos : 300;
        }

        function init(){ 
            console.log(xp,yp,"this is in B")
                 
            positionB = {x:300,y:300,c:0};

            targetCenter = document.getElementById("picCenter");
            targetBorder = document.getElementById("picBorder");
            //wait = new TWEEN.Tween(position)

            scaleB = new TWEEN.Tween(positionB)

                        .to({x:300,y:25,c:1},long)  // 不知道为什么 动画效果受到时间的影响太多 太多                                            
                        .easing(TWEEN.Easing.Quartic.InOut)
                        .yoyo(true)
                        .repeat(times+1)
                        .onUpdate(updateA);
            scaleB.start();  

        }

        function animate(time){
            //console.log(time);
            requestAnimationFrame(animate);
            //console.log(TWEEN);
            TWEEN.update(time);
        }

        function updateA(){
            //console.log(this);
            //console.log(300 - (positionB.x/2)+(300 - positionB.x)*2); 
            //console.log(positionB.x + "px")
            //关于 center的 变化的 操作
            

            targetCenter.style.width = positionB.x + "px";
            targetCenter.style.height = positionB.y + "px";
            targetCenter.style.left = 300 - (positionB.x/2)  + "px";
            targetCenter.style.top = 300 - (positionB.y/2)  + "px";

            //关于 border的 变化的 操作 
            targetBorder.style.width = positionB.x*2 + "px";
            targetBorder.style.height = positionB.y*2 + "px";
            
            targetBorder.style.left = 300 - (positionB.x)  + "px";
            targetBorder.style.top = 300 - (positionB.y)  + "px";
            
            positionB.c = positionB.y / 300;
            //console.log(positionB.c);
            getDoubleBorderCircle("rgb(255,255,255)",100,6,ctxBorder,300,300,positionB.c);

            if(positionB.y == 1){
                //opeanAndClose();
                scaleB.stop();    
            }
        }
    }

    function NewopenAndClose(xPos,yPos){

        //说实话 这个 才是 难点  
        // 我得重新写 边框的圆环 毕竟 这个双层的圆环是个技术难点
        // 
        var positionB;
        var targetCenter,
            targetBorder;
        var scaleB,
            tweenToRight;
        var xp,yp;

        //getDoubleBorderCircle("rgb(255,255,255)",100,3,ctxBorder,300,300,1)

        getPos();
        init(); 
        animate();

        function getPos(){
            xp = xPos? xPos : 300;
            yp = yPos? yPos : 300;
        }

        function init(){ 
            console.log(xp,yp,"this is in B")
                 
            positionB = {x:300,y:300,c:0};

            targetCenter = document.getElementById("picCenter");
            targetBorder = document.getElementById("picBorder");
            //wait = new TWEEN.Tween(position)

            scaleB = new TWEEN.Tween(positionB)

                        .to({x:300,y:25,c:1},400)  // 不知道为什么 动画效果受到时间的影响太多 太多                                            
                        .easing(TWEEN.Easing.Quartic.InOut)
                        .yoyo(true)
                        .repeat(1)
                        .onUpdate(updateA);
            scaleB.start();  

        }

        function animate(time){
            //console.log(time);
            requestAnimationFrame(animate);
            //console.log(TWEEN);
            TWEEN.update(time);
        }

        function updateA(){
            console.log(this);
            console.log(300 - (positionB.x/2)+(300 - positionB.x)*2); 
            console.log(positionB.x + "px")
            //关于 center的 变化的 操作
            targetCenter.style.width = positionB.x + "px";
            targetCenter.style.height = positionB.y + "px";
            targetCenter.style.left = 300 - (positionB.x/2) + 50 + "px";
            targetCenter.style.top = 300 - (positionB.y/2)  + "px";

            //关于 border的 变化的 操作 
            targetBorder.style.width = positionB.x*2 + "px";
            targetBorder.style.height = positionB.y*2 + "px";
            
            targetBorder.style.left = 300 - (positionB.x)  + "px";
            targetBorder.style.top = 300 - (positionB.y)  + "px";
            
            positionB.c = positionB.y / 300;
            //console.log(positionB.c);
            //getDoubleBorderCircle("rgb(255,255,255)",100,6,ctxBorder,300,300,positionB.c);

            if(positionB.y == 1){
                //opeanAndClose();
                scaleB.stop();    
            }
        }
    }

    function move(xValue,yValue){
        var position;
        var target;
        var tweenToLeft,tweenToRight;
        var xp,yp;
        console.log(xValue,yValue)

        init();
        animateA();

        function init(){ 
            //console.log("i am d")
            position = {x:0,y:0};
            target = document.getElementById("picCenter");

            tweenToLeft = new TWEEN.Tween(position)
                        .to({x:xValue,y:yValue},600)  // 不知道为什么 动画效果受到时间的影响太多 太多     
                        .easing(TWEEN.Easing.Quartic.In)
                        .onUpdate(update);

            tweenToCenter =  new TWEEN.Tween({x:xp,y:yp})  
                        .to({x:300,y:300},1300)  // 不知道为什么 动画效果受到时间的影响太多 太多     
                        .delay(1000)
                        .easing(TWEEN.Easing.Bounce.InOut)
                        .onUpdate(update);
                        
            tweenToLeft.start();     
        }

        function animateA(time){
            requestAnimationFrame(animateA);
            TWEEN.update(time);
        }

        function update(){
            target.style.width = 300 + "px";
            target.style.height = 300 + "px";
            target.style.left = position.x + 150   + "px";
            target.style.top = position.y + 150 + "px";

            getFollowBorderCircle("rgb(255,255,255)",100,6,ctxBorder,300,300,1-(position.x / 150));

            if(position.x == xValue){
                tweenToLeft.stop();
                //alert(" i need next ")
                //接下里就是 关于 
                //openAndClose(); 直接用openAndClose是不管用的 应因为这个数据状态没有 接上  简直 这个 如何传递 canvas的状态 这个真的很重要 一点儿也不含糊
            }
        }
        //  接下来 是 写 如何 在 现有基础上面的 闭眼 开眼 
    }



    // 一个基础的函数  主要根据参数 来 控制 变大或者 变小 但是挤压却可以拆解为x轴变大，y轴变大 ，或者等比例变大，亦或是不等比例变大，所以说，变化参数的抽象能力很重要
    // changeNums 的数据结构这么设计就好了 [[x1,x2],[y1,y2]] 好像只能这么设计？ 万能接口？ 这样真的好么？有谁这么设计接口？  要是不变化却这么写 岂不是闷声吃大亏
    function moreOrLess(changeNums,targets,times,long){  // 传入参数分别是 x,y的坐标（）| 开始到结束的数值 | 目标数组 | 持续几次 | 单次动画的时长 
        // 首先就是这些参数 究竟该 怎么去 写 ？
        // 怎么说先写一个 耦合度比较高的东西吧 先假设我得targets就是中间的 两个 等等 好像不用假设 可以写循环
        var position;
        var scaleA,
            tweenToRight;
        var xPos = 300,
            yPos = 300;

        init();
        animate();

        function init(){ 


            position = {rX:changeNums[0][0],rY:changeNums[1][0]};
            scaleA = new TWEEN.Tween(position)
                        .to({rX:changeNums[0][1],rY:changeNums[1][1]},long)  // 不知道为什么 动画效果受到时间的影响太多 太多           
                        .yoyo(true)                                                 
                        .easing(TWEEN.Easing.Quartic.InOut)
                        .onUpdate(updateA)
                        .repeat(times+1);
            scaleA.start();  
        }

        function animate(time){
            requestAnimationFrame(animate);
            TWEEN.update(time);
        }

        function updateA(){
             //关于 center的 变化的 操作
            for(var i = 0,len = targets.length;i<len;i++){
                targets[i].style.width = position.rX + "px";
                targets[i].style.height = position.rY + "px";
                targets[i].style.left = 300 - ( position.rX /2)  + "px";
                targets[i].style.top = 300 - (position.rY /2)  + "px";
            }
            if(position.y == 300){
                 scaleA.stop();
                 //openAndClose();
            }               
        }

    }
  /*  function scaleAnimation(xPos,yPos,startNum,endNum){
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
            position = {x:200,y:startNum,xPos,yPos};
            targetCenter = document.getElementById("picCenter");
            targetBorder = document.getElementById("picBorder");
            scaleA = new TWEEN.Tween(position)
                        .to({x:300,y:endNum},1000)  // 不知道为什么 动画效果受到时间的影响太多 太多           
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

            if(position.y == 300){
                scaleA.stop();
                openAndClose();
            }               
        }
    }
  */   

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
    // 这底下是最基础的 简单的 函数 可以被重复调用  
    //  
    //  绘制 “双边”外轮廓 
    function getDoubleBorderCircle(rgbv,r,lineWidth,context,xPos,yPos,a1){ 
    //传入参数分别是 颜色 边框圆弧的r 线宽 都熟 横坐标 纵坐标  a1 b1 a2 b2 分别是a代表x轴的缩放 b代表y轴的缩放 
    //那么就是得按照画椭圆的写法 横轴 纵轴的长度 r*a1 r*a2  
    //
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
    function getFollowBorderCircle(rgbv,r,lineWidth,context,xPos,yPos,a1){ 
    //传入参数分别是 颜色 边框圆弧的r 线宽 都熟 横坐标 纵坐标  a1 b1 a2 b2 分别是a代表x轴的缩放 b代表y轴的缩放 
    //那么就是得按照画椭圆的写法 横轴 纵轴的长度 r*a1 r*a2  
    //
        function drawBorderByLinewidth(a){
            var x = a?a:1;
            context.clearRect(0,0,600,600);
            context.beginPath();
            context.restore();
            context.lineWidth = lineWidth*x;
            context.strokeStyle = "rgba(255,255,255,0.19)";
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

            context.moveTo(xPos , yPos+b); //从椭圆的左端点开始绘制

            for (var i = 0.5*Math.PI; i < 1.5*Math.PI; i += step){
                //参数方程为x = a * cos(i), y = b * sin(i)，
                //参数为i，表示度数（弧度）
                context.lineTo(xPos + a * Math.cos(i), yPos + b * Math.sin(i));
            }
            //context.closePath();
            context.arc(xPos,yPos,r,1.5*Math.PI,0.5*Math.PI,false);
            //context.translate(600,1600)
            //context.rotate(2);
            context.stroke();
        }
    }



   /*

    var position;
    var target;
    var tween,tweenback;

    //
    console.log("1");
    var ctxDom = document.getElementById("pic");
    ctxDom.height = 300;
    ctxDom.width = 300;
    var ctx = document.getElementById("pic").getContext("2d");
    console.log(ctx);


    //这个是按照mdn学习写的径向的渐变；、
    //createLinearGradient(x1,x2,y1,y2)
    //createRadialGradient(x1,y1,r1,x2,y2,r2)
    //
    //
    
    //这个就是封装好最基础的绘制底层的 为调整颜色的光晕（说不定就下次想换颜色了） 传递若干个参数（就是来控制这个光晕的变化的）
    //example drawBaseBack(rgbValue,)  rgbValue = (0,1,3)  
        function drawBackground(rgbValue,context,xPos,yPos){ 
        var opacityNum=[1,0.4,0.0]; //怎么说，就是用来做渐变的曲线的几个节点 但是我肯定没有作对 因为html效果没有变化 这个公式我尽然没算对
       
        function getRgbaValue(rgbV){ // 函数变量名称不能再搞混乱了 
            var rgbaVArr=[];
            for(var i=0;i<3;i++){
                rgbaVArr.push("rgba"+"("+rgbV.replace(/\(/g,"").replace(/\)/g,"")+","+opacityNum[i]+")")  //这个方法做的不好 需要继续优化 看看能不能减少两次正则的调用 直接使用string定位的方法去优化
            };
            return  rgbaVArr
        }
        //var newRgba = rgbValue.replace(/\(/g,"").replace(/\)/g,"")+","+opacityNum[i]
        var rgbValuesArr = getRgbaValue(rgbValue); // 现在应该所有的 rgba 数值都在这个数组 只不过现在接口写死了 只能写三个数

        //接下来是定义 定义那个径向的渐变
        //var i = 0.19;
        //
        var  radialgradient = context.createRadialGradient(xPos,yPos,0,xPos,yPos,200);
        for(var j=0,len=rgbValuesArr.length;j<len;j++){ 
            radialgradient.addColorStop(1-opacityNum[j],rgbValuesArr[j]);
            //i = i +0.4; 这里中间有个圆环实在是呵呵哒 这个问题先这么  先继续构建 先把框架搭起来 这个细节可以吃完饭饭休息的时候搞 
            //但是这里的解决办法并不是很好 是不是解决的线性的函数控制 现在就是1-x  全在线性的控制 ok 此问题已经解决 问题出现在我没有 
        };

        context.beginPath();
        context.fillStyle=radialgradient;//context.shadowColor="#00C6ED";
        context.strokeStyle=radialgradient;
        context.arc(xPos,yPos,200,0,2*Math.PI,false);
        console.log("1");
        //context.stroke();
        context.fill();
        context.closePath();
        //context.save();
        //
        
    }

// 不由得觉得自己是一个大傻逼 真心话 那个 这个明明可以是使用 简单的填充 然后 再给一个white的 阴影 ，这个简直了就 
// 其实 好像再继续下去的话 可以解决这个坑 但是这个坑有什么作用呢?今天在什么地方做了学习 
// 这样吧  先把 任务写出来 能看见 一些 再去继续搞定 嘻嘻

    //这个是中间的圆的渐变填充 先先这么写出来  
    function getCenterFill(rgbV1,r,context,xPos,yPos){ //给一个什么参数，颜色值呗 亦或是可以考虑那个  
        // drawBackground("(0,198,237)",ctx,300,300); 
        var rgbv = "rgba"+"("+rgbV1.replace(/\(/g,"").replace(/\)/g,"")+","+0.5+")";
        
        var radialgradient = context.createRadialGradient(xPos,yPos,0,xPos,yPos,r);
        /*for(var j=0,len=rgbValuesArr.length;j<len;j++){ 
            radialgradient.addColorStop(1-opacityNum[j],rgbValuesArr[j]);
            //i = i +0.4; 这里中间有个圆环实在是呵呵哒 这个问题先这么  先继续构建 先把框架搭起来 这个细节可以吃完饭饭休息的时候搞 
            //但是这里的解决办法并不是很好 是不是解决的线性的函数控制 现在就是1-x  全在线性的控制 ok 此问题已经解决 问题出现在我没有 
        };
        */
   /*   

        radialgradient.addColorStop(0,"rgba(255,255,255,1)");
        radialgradient.addColorStop(0.2,"rgba(255,255,255,0.99)");
        radialgradient.addColorStop(0.4,"rgba(255,255,255,0.8)");
        radialgradient.addColorStop(0.7,"rgba(255,255,255,0.0)");
        radialgradient.addColorStop(1.0,"rgba(255,255,255,0)");
        

        drawBackground("(0,198,237)",ctx,xPos,yPos);  
        context.beginPath();
        
        context.restore();
        context.fillStyle = radialgradient;
        context.lineWidth = 30;
        context.strokeStyle = "rgba(0,198,237,0.5)"
        context.shadowBlur=24;
        context.shadowColor="white";
        context.arc(xPos,yPos,r,0,Math.PI*2,false);
        //console.log(rgbv);
        context.fill();
        //context.stroke();
        context.closePath();

   // }
/*
    // 这个怎么说 


    //drawBackground("(0,198,237)",ctx,300,300); 
    getCenterFill("(255,255,255)",100,ctx,150,150);

   /* function closeAndOpen(scaleNum){
            
            //alert("c")
                
                ParamDoubleScale(context, xPos, yPos, a, b,10,scaleNum);
                setTimeout(function(){
                        //console.log(newscaleNum)
                    ParamDoubleScale(context, xPos, yPos, a, b,10,scaleNum/10);

                    setTimeout(function(){
                            ParamDoubleScale(context, xPos, yPos, a, b,10,scaleNum*10);

                            //setTimeout(function(){
                                //ParamDoubleScale(context, xPos, yPos, a, b,10,scaleNum);
                            //},100)
                        },200)
                    },300);
    };
    */

/*
init();
animate();

function init(){

    position = {x:0,y:0,rotation:0};
    target = document.getElementById("pic");//得到画布元素 
    
    tween = new TWEEN.Tween(position)
                .to({x:800,y:800,rotation:270},400)
                .delay(1000)
                .easing(TWEEN.Easing.Elastic.InOut)
                .onUpdate(update);

    tweenBack = new TWEEN.Tween(position)
                .to({x:00,y:00,rotation:0})
                .easing(TWEEN.Easing.Elastic.InOut)
                .onUpdate(update);

    tween.chain(tweenBack);
    tween.chain(tween); 
    tween.start();
}
/*
function animate(time){
    requestAnimationFrame(animate);
    TWEEN.update(time);
}

function update(){
    target.style.left = position.x + "px";
    target.style.top = position.y + "px";
    target.style.webkitTransform = "rotate(" + Math.floor(position.rotation) + "deg)";
    target.style.MozTransform = "rotate(" + Math.floor(position.rotation) + "deg)";
}
*/
}


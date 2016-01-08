window.onload = function(){

    // 先说一下这个 整体是个什么样的思路 首先写两个基础函数 funDrawBorder && functionDrawCenter
    
    //扑街 我得去终于把背景颜色铺好了
    //接下来先把宽高都设置了
    document.getElementById("picBorder").width = 600;
    document.getElementById("picBorder").height = 600;
    document.getElementById("picCenter").width = 600;
    document.getElementById("picCenter").height = 600;

    var ctxBorder = document.getElementById("picBorder").getContext("2d"); 
    var ctxCenter = document.getElementById("picCenter").getContext("2d");

    //然后就是得开始绘制 先画一个圆心模糊的 
    //getCenterFill("(255,255,255)",150,ctxCenter,300,300);
    //然后就是画一个外框 
    //getBoderCircle("rgb(255,255,255)",200,6,ctxBorder,300,300)
    //
    //
    
    //一个调用 我也不知道是怎么去称呼这个效果 
    //followToBorder()
  
     //这个是中间的圆的渐变填充 先先这么写出来  

    // 接下来就是激动人心的 动画效果--跟随 
    function followToBorder(){
        //怎么说 我觉得吧 这个运动函数 需要运动的 有 第一 变化 中间的位置 （这一步勉强移过去 下一步就是要加各种各样的参数 
        //）
        //第一步 吧圆心先挪过去
        //
        function move(xPos,yPos){
            var position;
            var target;
            var tweenToLeft,tweenToRight;

           
            randomPos()



            init();
            animate();

            
            var xp,yp;

            function randomPos(){
            //    xp = xPos? xPos : -Math.random()*200+100;
            //                 yp = yPos? yPos : -Math.random()*200+100;
              xp = 300;
              yp = 300;
            }


             function init(){ 

               

                console.log(xp,yp)
                     
                position = {x:0,y:0};
                target = document.getElementById("picCenter");
                tweenToLeft = new TWEEN.Tween(position)
                            .to({x:xp,y:yp},3000)  // 不知道为什么 动画效果受到时间的影响太多 太多     
                            //.delay(1000)
                            //.repeat(10)
                            //.yoyo(true)
                            .easing(TWEEN.Easing.Bounce.InOut)
                            .onUpdate(update);

                tweenToCenter =  new TWEEN.Tween({x:xp,y:yp})  
                            .to({x:300,y:300},6300)  // 不知道为什么 动画效果受到时间的影响太多 太多     
                             .delay(1000)
                            .easing(TWEEN.Easing.Bounce.InOut)
                            .onUpdate(update);
                            
                ///tweenToLeft.chain(tweenToCenter);
                //tweenToCenter.chain(tweenToLeft) ; 
                
                 //tweenToLeft.repeat(10)
                tweenToLeft.start();     
            }

            function animate(time){
                //alert(time);
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }

            function update(){
                target.style.width = position.x + "px";
                target.style.height = position.y + "px";


                target.style.left = 150   + "px";
                target.style.top = 150  + "px";
                //alert("ccc")
               // setTimeout(function(){
                   // getCenterFill("(255,255,255)",100,ctxCenter,300,300)
                //},500)
                
            }
        }
        move();
    }

    //下面开始调用 动画函数了
    getUp();

    //下面开始写动画函数了 
    
    //第一个唤醒 就是 相关于 唤醒.mov
    function getUp(){
        //唤醒动画分为两个部分 首先是 压缩椭圆的 一个 部分 
        //ctxBorder
        //ctxCenter
        getCenterFill("(255,255,255)",150,ctxCenter,300,300); // 画一个 中间的

        getDoubleBorderCircle("rgb(255,255,255)",100,6,ctxBorder,300,300) // 画一个 border的 两层 这个
        //
        function scaleAnimation(xPos,yPos){
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
                //console.log(xp,yp)
                     
                position = {x:200,y:15,xPos,yPos};

                targetCenter = document.getElementById("picCenter");
                targetBorder = document.getElementById("picBorder");

                scaleA = new TWEEN.Tween(position)

                            .to({x:300,y:300},1000)  // 不知道为什么 动画效果受到时间的影响太多 太多           
                            //.delay(1000)
                            .yoyo()                                                 
                            .easing(TWEEN.Easing.Quartic.InOut)
                            .onUpdate(updateA);
                scaleA.start();  

            }

            function animate(time){
                //alert(time);
                requestAnimationFrame(animate);
                TWEEN.update(time);
            }

            function updateA(){
                //console.log(this.y);
                //console.log(300 - (position.x/2)+(300 - position.x)*2);
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
                
                //alert("ccc")
                //setTimeout(function(){
                   // getCenterFill("(255,255,255)",100,ctxCenter,300,300)
                //},500)
                if(position.y == 300){
                    scaleA.stop();
                   // alert("c");
                    opeanAndClose();
                }               
            }
        }

        function opeanAndClose(xPos,yPos){

            //说实话 这个 才是 难点  
            // 我得重新写 边框的圆环 毕竟 这个双层的圆环狮个技术难点
            // 
            var positionB;
            var targetCenter,
                targetBorder;
            var scaleB,
                tweenToRight;
            var xp,yp;

            getDoubleBorderCircle("rgb(255,255,255)",100,3,ctxBorder,300,300,1)

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

                            .to({x:300,y:25,c:1},800)  // 不知道为什么 动画效果受到时间的影响太多 太多                                            
                            .easing(TWEEN.Easing.Quartic.InOut)
                            .yoyo(true)
                            .repeat(inifity)
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
                targetCenter.style.left = 300 - (positionB.x/2)  + "px";
                targetCenter.style.top = 300 - (positionB.y/2)  + "px";

                //关于 border的 变化的 操作 
                targetBorder.style.width = positionB.x*2 + "px";
                targetBorder.style.height = positionB.y*2 + "px";
                
                targetBorder.style.left = 300 - (positionB.x)  + "px";
                targetBorder.style.top = 300 - (positionB.y)  + "px";
                
                positionB.c = positionB.y / 300;
                console.log(positionB.c);
                getDoubleBorderCircle("rgb(255,255,255)",100,6,ctxBorder,300,300,positionB.c);

                if(positionB.y == 1){
                    //opeanAndClose();
                    scaleB.stop();    
                }
            }

        }
        


        opeanAndClose()

        
        //scaleAnimation()
        // 接下来 是眨眼动画 
    }

    // 这底下是最基础的 简单的 动画函数 可以被重复调用  
    function getDoubleBorderCircle(rgbv,r,lineWidth,context,xPos,yPos,a1){ 
    //传入参数分别是 颜色 边框圆弧的r 线宽 都熟 横坐标 纵坐标  a1 b1 a2 b2 分别是a代表x轴的缩放 b代表y轴的缩放 
    //那么就是得按照画椭圆的写法 横轴 纵轴的长度 r*a1 r*a2  
        if (arguments.length < 7){ //那就是参数没有传递够 说明只需要一层 那就正好 
            context.clearRect(0,0,600,600);
            context.beginPath();
            context.restore();
            context.lineWidth = lineWidth;
            context.strokeStyle = "rgba(255,255,255,0.79)";
            context.shadowBlur=24;

            context.shadowColor="white";
            context.arc(xPos,yPos,r,0,Math.PI*2,false);
            //console.log(rgbv);
            //context.fill();
            context.stroke();
            context.closePath();
        }
        else{
            // shit是 里面那个被更严重压缩了 
            //alert("cc")
            context.clearRect(0,0,600,600);

            //context.clearRect(0,0,600,600);
            ////这个圆环 要 使用 那个
            context.beginPath();
            context.restore();
            context.lineWidth = lineWidth*1.4;
            context.strokeStyle = "rgba(255,255,255,0.2)";
            context.shadowBlur=14;

            context.shadowColor="white";

            context.arc(xPos,yPos,r,0,Math.PI*2,false);
             //console.log(rgbv);
            //context.fill();
            context.stroke();
            context.closePath();


            //螺旋线
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

           for (var i = 0; i < 2 * Math.PI; i += step)
           {
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

    //这个就是画外边框用的 
    function getBorderCircle(rgbv,r,lineWidth,context,xPos,yPos){ 
    //传入参数分别是 颜色 边框圆弧的r 线宽 都熟 横坐标 纵坐标  

        context.clearRect(0,0,600,600);
        context.beginPath();
        context.restore();
        context.lineWidth = lineWidth;
        context.strokeStyle = "rgba(255,255,255,0.7)";
        context.shadowBlur=14;

        context.shadowColor="white";
        context.arc(xPos,yPos,r,0,Math.PI*2,false);
         //console.log(rgbv);
        //context.fill();
        context.stroke();
        context.closePath();


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
    
    // 这个就是封装好最基础的绘制底层的 为调整颜色的光晕（说不定就下次想换颜色了） 传递若干个参数（就是来控制这个光晕的变化的）
    // example drawBaseBack(rgbValue,)  rgbValue = (0,1,3)  
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
   /*     radialgradient.addColorStop(0,"rgba(255,255,255,1)");
        radialgradient.addColorStop(0.2,"rgba(255,255,255,0.99)");
        //radialgradient.addColorStop(0.4,"rgba(255,255,255,0.8)");
        radialgradient.addColorStop(0.7,"rgba(255,255,255,0.0)");
        //radialgradient.addColorStop(1.0,"rgba(255,255,255,0)");
        

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


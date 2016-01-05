# homework
demo for 那个视频
这个还很简陋
//  这个 
window.onload = function(){

    //
    console.log("1");
    var ctxDom = document.getElementById("pic");
    ctxDom.height = 900;
    ctxDom.width = 900;
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
        radialgradient.addColorStop(0,"rgba(255,255,255,1)");
        radialgradient.addColorStop(0.2,"rgba(255,255,255,0.99)");
        //radialgradient.addColorStop(0.4,"rgba(255,255,255,0.8)");
        radialgradient.addColorStop(0.7,"rgba(255,255,255,0.0)");
        //radialgradient.addColorStop(1.0,"rgba(255,255,255,0)");
        

        drawBackground("(0,198,237)",ctx,300,300);  
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
        context.strok();
        context.closePath();

    }

    // 这个怎么说 


    //drawBackground("(0,198,237)",ctx,300,300); 
    getCenterFill("(255,255,255)",100,ctx,300,300);

    function closeAndOpen(scaleNum){
            
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

    function ParamDoubleScale(context, x, y, a, b,drawlineW,scaleNum){
        //max是等于1除以长轴值a和b中的较大者
        //i每次循环增加1/max，表示度数的增加
        //这样可以使得每次循环所绘制的路径（弧线）接近1像素
        //console.log("da")
        context.restore();
        var step = (a > b) ? 1 / a : 1 / b;
        context.clearRect(0,0,1000,1000)
        context.beginPath();
        context.lineWidth = drawlineW;
        context.fillStyle = "white"
        context.translate(0,(1-scaleNum)*300);
        context.scale(1,scaleNum);
        context.shadowBlur=80;
        context.shadowColor="#00C6ED";
        context.arc(x,y,a/2.5,0,Math.PI*2,true);
        context.closePath();
        context.fill();

        // 中间那个圆
        context.beginPath();
        //context.lineWidth = drawlineW;
        context.strokeStyle = "white"
        context.shadowBlur=80;
        context.shadowColor="#00C6ED";

        context.moveTo(x + a, y); //从椭圆的左端点开始绘制

        for (var i = 0; i < 2 * Math.PI; i += step)
        {
           //参数方程为x = a * cos(i), y = b * sin(i)，
           //参数为i，表示度数（弧度）
           context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
        }
        context.closePath();
        context.stroke();

        // 一下是为了增效出一个影音
        var step = (a > b) ? 1 / a : 1 / b;
        //context.clearRect(0,0,1000,1000)
        context.beginPath();
        context.lineWidth = drawlineW;
        context.strokeStyle = "white"
        context.shadowBlur=80;
        context.shadowColor="#00C6ED";

        context.moveTo(x + a, y); //从椭圆的左端点开始绘制
        for (var i = 0; i < 2 * Math.PI; i += step){
           //参数方程为x = a * cos(i), y = b * sin(i)，
           //参数为i，表示度数（弧度）
           context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
        }
        context.closePath();
        context.stroke();
    };
/*

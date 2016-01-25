
    //alert("test");

    //先说一下这个 整体是个什么样的思路 首先写两个基础函数 funDrawBorder && functionDrawCenter
    //扑街 我得去多写一个div去承载背景,要么是pic 要么是 
     
    //接下来先把宽高都设置了--------------------------------
    ctxBorderDom = document.getElementById("picBorder");
    ctxCenterDom = document.getElementById("picCenter");
    ctxBorderDom.width = 480;   
    ctxBorderDom.height = 480;
    ctxCenterDom.width = 480;
    ctxCenterDom.height = 480;

    ctxBorder = ctxBorderDom.getContext("2d"); 
    ctxCenter = ctxCenterDom.getContext("2d");
     
    // ----------------------------------------------
    //还是要把 动画内部切换加载的func

    function receiveMessage(long){

        getCenterFill("rgb(255,255,255)",100,ctxCenter,240,240);  // 
        var position;
        var scaleA;
        var scaleB;
        init();
        animate();



        function init(){ 
            position = {c:440};
            scaleA = new TWEEN.Tween(position)
                        .to({c:320},long)  // 不知道为什么 动画效果受到时间的影响太多 太多           
                        //.yoyo(true)                                                 
                        .easing(TWEEN.Easing.Quartic.Out)
                        .onUpdate(updateA)
                        //.repeat(times);
            scaleA.start();  
        }

        function animate(time){
            requestAnimationFrame(animate);
            TWEEN.update(time);
        }

        function updateA(){
            //关于 center的 变化的 操作
            console.log(2)
            drawMsgBall(position.c);
            if(position.c == 320){
                scaleA.stop();
                

                initX();
                //animateX();
                animateX(time)
            }

        }


        function initX(){ 
            position = {c:320};
            scaleX = new TWEEN.Tween(position)
                        .to({c:400},long)  // 不知道为什么 动画效果受到时间的影响太多 太多           
                        //.yoyo(true)                                                 
                        .easing(TWEEN.Easing.Quartic.Out)
                        .onUpdate(updateX)
                        //.repeat(times);
            scaleX.start();  
        }

        function animateX(time){
            requestAnimationFrame(animateX);
            TWEEN.update(time);
        }
        function updateX(){
            //关于 center的 变化的 操作
            console.log(2)
            //drawMsgBall(position.c);
            drawEndMsgBall(position.c);
            if(position.c > 365){
                scaleX.stop();
                getCenterFill("rgb(255,255,255)",100,ctxCenter,240,240);  // 
                getDoubleBorderCircle("rgb(255,255,255)",180,7.5,ctxBorder,240,240,1);
            }

        }

    }
    //receiveMessage(800)

    function question(){
        getCenterFill("rgb(255,255,255)",100,ctxCenter,240,240);  // 
        getDoubleBorderCircle("rgb(255,255,255)",180,7.5,ctxBorder,240,240,1);

        var dtd = $.Deferred();
        var wait = function(dtd){
            var taskOne = function(){
                //openAndClose([[300,300],[300,5],[0.1,0.2]],2,300,[ctxBorderDom,ctxCenterDom])
                //singleMove([[0,moveXValue],[0,moveYValue]],[ctxCenterDom],300)
                //lotsMove([[0,moveXValue],[0,moveYValue]],ctxCenterDom,900);
                easyOpenAndClose([[240,300],[240,300]],2,300,[ctxCenterDom]);
                setTimeout(function(){
                    dtd.resolve();  
                },600) // 难道只能用这个函数 为什么我的动画进程 那就是说 说什么 只有在 动画完成的时候 ，还得 分别去 加载 针对动画类型的函数 难道不是一条线？
            };
            taskOne();
        }
        
        dtd.promise(wait);
        wait.done(function(){
                //disappear([[300,0],[300,0]],[ctxCenterDom,ctxBorderDom],0,450);
                //getCenterFill("rgb(255,255,255)",100,ctxCenter,240,240);
                //NewopenAndClose();openAndClose(changeNums,times,long,targets)
                //ctxCenter.clearRect(0,0,480,480)//
                console.log(100)
                //getCenterFill("rgb(255,255,255)",100,ctxCenter,240,240);
                //drawQuestionBorder("rgb(255,255,255)",180,6,ctxBorder,240,240)
                lotsMoveQuestion([[0,55],[0,-55]],ctxCenterDom,800)
                })
            .fail(function(){
                    //getup();
                })    
        wait(dtd);   
    }
    //question()
    //------接下来的是 已经组合成 动画.mov 的那种的内容-----------------------
    // 1 跟随.mov 
    //  这个怎么做到实时跟新的 现在是能够给出一个 具体的数据去坐目的 如果是说 这个需要即时的数据变化 ？难道加延时？这个先别思考了 留下来再看看吧
    
    function followToBorder(loR){ 
        // 参数 这个参数 是指[xpos,ypox] || "left"/"right" 其实准确点说 不如 [xpos,ypos]要是给个"left"/"right"无非就是
        // 怎么说 我觉得吧 这个运动函数 需 要运动的 有 第一 变化 中间的位置 （这一步勉强移过去 下一步就是要加各种各样的参数 
        // 怎么说 这里面 我也不知道 要怎么给 参数接口 只能说 先留下=来 看一看 
        var moveXValue = loR[0] ? loR[0] : -Math.random()*100+100; //没有写数组就随机出位置
        var moveYValue = loR[1] ? loR[1] : -Math.random()*100+100;
        // 就是说 数据已经被 给出来 我只需要 去 调用
        console.log(moveXValue,moveYValue);    

        getCenterFill("rgb(255,255,255)",100,ctxCenter,240,240);  // 
        getDoubleBorderCircle("rgb(255,255,255)",180,7.5,ctxBorder,240,240,1);

        var dtd = $.Deferred();
        var wait = function(dtd){
            var taskOne = function(){
                //openAndClose([[300,300],[300,5],[0.1,0.2]],2,300,[ctxBorderDom,ctxCenterDom])
                //singleMove([[0,moveXValue],[0,moveYValue]],[ctxCenterDom],300)
                lotsMove([[0,moveXValue],[0,moveYValue]],ctxCenterDom,900);
                setTimeout(function(){
                    dtd.resolve();  
                },1200) // 难道只能用这个函数 为什么我的动画进程 那就是说 说什么 只有在 动画完成的时候 ，还得 分别去 加载 针对动画类型的函数 难道不是一条线？
            };
            taskOne();
        }
        
        dtd.promise(wait);
        wait.done(function(){
                //disappear([[300,0],[300,0]],[ctxCenterDom,ctxBorderDom],0,450);
                //NewopenAndClose();openAndClose(changeNums,times,long,targets)
                })
            .fail(function(){
                    //getup();
                })    
        wait(dtd);   
    }

    //第2个唤醒 就是 相关于 唤醒.mov
    function getUp(){
        //唤醒动画分为两个部分 首先是 压缩椭圆的 一个 部分 
        getCenterFill("(255,255,255)",100,ctxCenter,240,240); // 画一个 中间的
        getDoubleBorderCircle("rgb(255,255,255)",180,6,ctxBorder,240,240,0) // 画一个 border的 两层 这个
        //
        //scaleAnimation(300,300,15,300);
 
        //  
        var dtd = $.Deferred();
        var wait = function(dtd){
            var taskOne = function(){
                moreOrLess([[240,340],[240,340]],[ctxCenterDom],1,300)

                setTimeout(function(){
                    dtd.resolve();
                },1000) // 难道只能用这个函数 为什么我的动画进程 那就是说 说什么 只有在 动画完成的时候 ，还得 分别去 加载 针对动画类型的函数 难道不是一条线？

            };
            taskOne();
        }
        
        dtd.promise(wait);
        wait.done(function(){
                //openAndClose([[240,240],[240,45],[0.1,0.2]],2,220,[ctxBorderDom,ctxCenterDom]);
                easyOpenAndClose([[240,140],[240,140]],2,300,[ctxBorderDom,ctxCenterDom]);
                })
            .fail(function(){
                    //getup();
                })    
        wait(dtd); 
        
    }

    // 第三个就是 睡眠.mov 其实就是 唤醒的反过程 这里注意两点 第一个 一开始 如何 逐步构建一个合适大小 第二步 就是再就是搞定 
    function sleep(){
        // 这个是得要 自己去把中间的函数绘制了
        getCenterFill("(255,255,255)",100,ctxCenter,240,240);
        var dtd = $.Deferred();
        var wait = function(dtd){
            var taskOne = function(){
                openAndClose([[240,240],[240,5],[0.1,0.2]],2,300,[ctxBorderDom,ctxCenterDom])

                setTimeout(function(){
                    dtd.resolve();
                },1200) // 难道只能用这个函数 为什么我的动画进程 那就是说 说什么 只有在 动画完成的时候 ，还得 分别去 加载 针对动画类型的函数 难道不是一条线？

            };
            taskOne();
        }
        
        dtd.promise(wait);
        wait.done(function(){
                disappear([[240,0],[240,0]],[ctxCenterDom,ctxBorderDom],0,450);
               
                })
            .fail(function(){
                    //getup();
                })    
        wait(dtd);   
    }


    // 第四个就是  惊讶.mov 
    function surprise(){  
        getCenterFill("rgb(255,255,255)",100,ctxCenter,240,240);  // 
        getDoubleBorderCircle("rgb(255,255,255)",180,7.5,ctxBorder,240,240,1);

        var dtd = $.Deferred();
        var wait = function(dtd){
            var taskOne = function(){
                easyOpenAndClose([[360,180],[360,180]],0,500,[ctxCenterDom]);
                setTimeout(function(){
                    dtd.resolve();
                    //console.log("i++","end");
                },1300) // 难道只能用这个函数 为什么我的动画进程 那就是说 说什么 只有在 动画完成的时候 ，还得 分别去 加载 针对动画类型的函数 难道不是一条线？
            };
            taskOne();
        };

        dtd.promise(wait);
        wait.done(function(){
               openAndClose([[240,240],[240,25],[0,1]],0,450,[ctxBorderDom,ctxCenterDom]);//[[],[],[]]
                })
            .fail(function(){
                    //getup();
                })    
        wait(dtd);   
    }

    // 接下来就是 simle.mov

    
    function smile(){
        // 这个表情怎么做拆分 首先就是 基本的 幻化为静态的动画的状态 
        //getCenterFill("(255,255,255)",100,ctxCenter,240,240);
        // 写一个函数 用来画笑脸的  
        //      现在的问题就是 如何让笑脸的 动作更加 自然 现在就是写了两个笑脸进来 实在是 略有丢人 略有 丢人 
        //drawSmileBorder();
        getCenterFill("rgb(255,255,255)",100,ctxCenter,240,240);  // 
        getDoubleBorderCircle("rgb(255,255,255)",180,7.5,ctxBorder,240,240,1);
        
        
        var dtd = $.Deferred();  
        var wait = function(dtd){
            var taskOne = function(){
                console.log()
                upAndDown([[0,0],[0,-50]],[ctxCenterDom,ctxBorderDom],3,300);//changeNums,targets,times,long
                setTimeout(function(){
                    dtd.resolve();
                    //console.log("i++","end");
                },1100) // 难道只能用这个函数 为什么我的动画进程 那就是说 说什么 只有在 动画完成的时候 ，还得 分别去 加载 针对动画类型的函数 难道不是一条线？
            };
            taskOne();
        };

        dtd.promise(wait);
        wait.done(function(){
               //openAndClose([[240,240],[240,25],[0,1]],0,450,[ctxBorderDom,ctxCenterDom]);//[[],[],[]]
               getCenterFill("rgb(255,255,255)",100,ctxCenter,240,240);  // 
               getDoubleBorderCircle("rgb(255,255,255)",180,7.5,ctxBorder,240,240,1);
                })
            .fail(function(){
                    //getup();
                })    
        wait(dtd);  
    
    }

   

        function drawThreeCircle(fxp){  // firstCircleXPos  就是第一个 的， 0 < fxp < 320 ;因为这里写的方法是 
            
            ctxCenter.beginPath();
            ctxCenter.closePath();
             
            //console.log("draw");
            //console.log(ctxCenter.clearRect)
            //ctxCenter.restore();
            var fxpArr = [] ; //单三个小球的位置就这么存了
            for(var j = 0 ;j < 3 ;j++){
                var t = fxp+j*(100);
                t = (t > 320) ? (t-320) : t;
                fxpArr.push(t); 
            }



            // 每次运行的时候 要把中间的 函数 写空 
            //ctxCenter.fillStyle = "rgba(25,25,25,0.3)";
           
           /* for (var i = 0; i < 3; i++) {  // 开使画三个圆 
                ctxCenter.clearRect(0,0,480,480);
                if(fxpArr[i] <= 80 ){  // 第一圆的球 

                    var r = -(fxpArr[i]/80 )*10 + 30 ;  // 半径
                    //var r = 20;
                    var xPos = fxpArr[i] +240 ; 
                    //console.log(r,xPos,1);
                }else if(fxpArr[i] > 80 && fxpArr[i] <= 160){
                    var r = ((fxpArr[i]-80) / 80 )*10+20;
                    //var r = 20;
                    var xPos = 320 - (fxpArr[i]-80);
                    //console.log(r,xPos,2);
                }else if(fxpArr[i] > 160 && fxpArr[i] <240){
                    var r = ((fxpArr[i] - 160) / 80)*10 +20;
                    //var r = 20;
                    var xPos =240 -  (fxpArr[i] - 160) ;
                    //console.log(r,xPos,3);
                }else if(fxpArr[i] >= 240 && fxpArr[i] < 320){
                    var r = ((fxpArr[i] - 240) / 80)*10 +20;
                    //var r = 20;
                    var xPos =240 -  (fxpArr[i] - 240) ;
                    //console.log(r,xPos,4);
                }
*/
                // 还不能用 for循环；来写 

/*
                console.log(fxpArr[i],xPos)
                ctxCenter.arc(xPos,240,r,0,2*Math.PI);

                ctxCenter.fill();

                ctxCenter.closePath();
*/
            };          
        

       //------------------------------------------------------------------
 

    //

    function sendMessage(){
        drawBorder();

        //分两步 走 第一步 外轮廓
        var position;
        //
        var scaleA;
            //tweenToRight;
        init();
        animate();

        function init(){ 
            position = {c:0};
            scaleA = new TWEEN.Tween(position)
                        .to({c:360},2600)  // 不知道为什么 动画效果受到时间的影响太多 太多           
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
           
            //console.log(ctxCenter)
            //
            //drawThreeCircle(position.c);
            //ctxCenter.clearRect(240,240,480,480); 
            get1(position.c);  // 这个能跑 说明 什么 ，说明啊 就是说 那个问题还好 并非是策略问题 
            /*if(position.ry == 240){
                scaleA.stop();
            } 
            */   
           console.log(position.c)
           if(position.c == 320){
            //console.log("stop")
            scaleA.stop();
           
            //drawThreeCircle(position.c)

           }           
        }
    }


    function showWeather(img,place,numArr){
        // 首先呢 要清空
        ctxBorder.clearRect(0,0,480,480);
        ctxCenter.clearRect(0,0,480,480);

        // 然后呢 动画的添加先在这里略过 
        // 
         

        function addWeatherMsg(img,place,numArr){  //传进来的参数是 img图片的信息，发生的地方，温度数组  可能的形式("fog","深证"，[22,13])  //为什么要直接写 fog，这样的话可以搞定 
            var imgUrl = weatherImgUrl(img) ;  // imgUrl = "./fog_icon.png"  字符串形式的
           
            // 这里面先把 天气icon 添加进去
            var spaceShip = new Image();
            spaceShip.src = imgUrl;
            console.log(spaceShip);       
            spaceShip.addEventListener("load",eventSheetLoaded,false);
            function eventSheetLoaded(){
                ctxBorder.drawImage(spaceShip,0,0);
            }

            //然后就是 说 增加 文字信息 增加文字信息都是在 ctxBorder上面进行的 
            ctxCenter.beginPath();
            var placeStr = place + "";
            ctxCenter.font = "30px serif";
            ctxCenter.fillStyle = "white";
            ctxCenter.fillText(placeStr,310,220)
            ctxCenter.closePath();

            //然后就是 说 增加 天气 信息 
            ctxCenter.beginPath();
            var templateStr1 = numArr[0] + "" + "°" ;
            //console.log(templateStr1)
            ctxCenter.font = "80px serif";
            ctxCenter.fillStyle = "white";
            ctxCenter.fillText(templateStr1,180,330)
            ctxCenter.closePath();

            ctxCenter.beginPath();
            var templateStr2 = "~" ;
            //console.log(templateStr1)
            ctxCenter.font = "70px serif";
            ctxCenter.fillStyle = "white";
            ctxCenter.fillText(templateStr2,250,370)
            ctxCenter.closePath();

            ctxCenter.beginPath();
            var templateStr3 = numArr[1] + "" + "°" ;
            //console.log(templateStr1)
            ctxCenter.font = "50px serif";
            ctxCenter.fillStyle = "white";
            ctxCenter.fillText(templateStr3,290,330)
            ctxCenter.closePath();

        }

        function weatherImgUrl(imgMsg){
            var urlMsg = "./img/" + imgMsg + "_icon.png";  // 无非就是 加了_icon.png 后缀
            return urlMsg;
        }

        addWeatherMsg(img,place,numArr)
        
    }

    showWeather("fog","beijng",[0,22])

    //sendMessage()


    //下面开始调用 动画函数了
    //唤醒 动画
    //getUp();
    
    // 左右给个动作跟随   
    //followToBorder([-40,-50]);
    
    // 睡眠动画
    //sleep(); 
    
    // 惊讶动画 
    //surprise();
    
    //
    //smile();
    
    // 开始制作接受 分发 运行 
    // 今天要完成的测试功能 就是 能够根据命令写动作 
    //首先是websocket通信方面 kj
  /* var socket = io.connect("http://192.168.1.48:9527/xiaoweiui");

    socket.on("connect",function(){
        console.log("socket is connected");
    });

    socket.on("message",function(message){
        //就是说 接受到了 信息 msg = {"name":"type(可能存在的各种值)","参数":"每个参数之间都是，分割"}
        //var messageObj = read(message);
        //假如说 那个 正在跑一个 然后传命令过来突然让我停了 我也头疼现在怎么写
        //根据传进来的参数再 可是我现在只有action  ；如果有了weather ；我在哪里判断会好一些 
        //var actionsObj = prepareDoAction(messageObj); //就是说 就是说什么呢 这里面先创建每个动作的对象 对象在动作结束后 自己写个回调去注销 
        prepareDoCmd(message);
        //actionsObj.start();
    }) ;
    //var msg = {"name":"type(可能存在的各种值)","参数":"每个参数之间都是，分割"};
    */
    // ------------------------ 以下部分为测试阶段 自己模拟了 msg ,自己直接写触发 
    /*
    var msg =  {"name":"action","args":["picture","loading.png;fxxk;fxxk"]};

    setTimeout(function(){
        // 测试用例调整 
        prepareDoCmd(msg)
        //  var messageObj = readCmd(msg);
        //  console.log(messageObj);
        //  var actionsObj = prepareDoCmd(messageObj); 
        //  console.log(actionsObj);
        //  actionsObj.start();
    },140);
    */
    // ----------------测试阶段的启动用 代码就先这样 -------------------------------
    // 

    // 重要注释 这个是全部变量 但是很关键 这个里面存储了 重要的位置信息 专门写給follow
    var startNum = [0,0];
         
    // 根据刚才 
    function  prepareDoCmd(msgObj){
        //       {"name":"action","args":["picture","picName.png;fxxk;fxxk"]};
        switch (msgObj["name"]){
            case "action":
                var actionObject = doAction(msgObj["args"]);  // 传入参数 应该是 msgObj["args"] ==== ["picture","picName.png;fxxk;fxxk"]
                //console.log(doAction(msgObj["args"]));
                //console.log(actionObject)
                //console.log(actionObject.callBackOne,actionObject.callBackTwo);
                var myStep = new actionCreater(actionObject.callBackOne,actionObject.callBackTwo);

                myStep.start();
                break;
            case "weather":    
                showWeather(msgObj["args"]);
                break;
            // 以后这里可以输出很多 这时候先这样吧  
        }
    }

    // 这个函数就是 分解 通信过来的参数  最后输出形式如 {actionName: "surprise", actionArgsArr: ["参数1";"参数2"]}
    function readCmd(msg){  // msg["follow",]
        //console.log(typeof msg)
        var newCmd = {
            "cmdName":msg[0],
            "cmdArgsArr":msg[1].split(";")
        }
        return newCmd
    }

    function doAction(action){   // action == ["picture","picName.png;fxxk;fxxk"]
        //console.log(action,"my action")
        var actionObj = readCmd(action);    // actionObj = {"cmdName":"picture","cmdArgsArr":["picName","fxxk","fxxk"]}
        //console.log(actionObj)
        var newActObj ;
        //console.log(msgObj["actionName"]);

        switch(actionObj["cmdName"]){  //去判断 动作类 的 哪一个动作在运行 
            case "surprise": //就是说 说这个是 surprise动作 
                // 对于surprise动作 根本就是 两个参数 
                var callback1 = function(){
                    return easyOpenAndClose([[300,180],[300,180]],0,500,[ctxCenterDom]);
                }

                var callback2 = function(){
                    return openAndClose([[300,300],[300,25],[0,1]],0,450,[ctxBorderDom,ctxCenterDom]);
                }
                //newActObj = new actionCreater(callback1,callback2) // 根据动作的参数 可以修改 
                break;
            case "sleep":
                var callback1 = function(){
                    return openAndClose([[300,300],[300,5],[0.1,0.2]],2,300,[ctxBorderDom,ctxCenterDom]);
                }
                var callback2 = function(){
                    return disappear([[300,0],[300,0]],[ctxCenterDom,ctxBorderDom],0,450);
                }

                break;  
            case "follow":
                // msgObj = {"actionName":"follow","actionArgs":"[]"}
                var myArgs = calculatXYPos(msgObj["actionArgsArr"]);
                var callback1 = function(){
                    //return singleMove([[startNum[0],myArgs[0]],[startNum[1],myArgs[1]]],[ctxCenterDom],300)
                    
                    }
                startNum[0] = myArgs[0];
                startNum[1] = myArgs[1];
                var callback2 = function(){
                //return alert("nextAnimation?")
                }
                break; 
            case "picture":
                //console.log( actionObj["cmdArgsArr"])
                var myPic =  actionObj["cmdArgsArr"][0];
                var callback1 = function(){
                    return showPic(myPic); 
                };
                var callback2 = function(){

                }
                //showPic(myPic);  
                break;   
        
        }
        newActObj = newActObj ? newActObj : new actionCreater(callback1,callback2);
        return  newActObj; 
    }

    // 
    function showPic(picName){
        // 那就是说咯 可以这样先解析chuurl
        
        var picUrl = "./img/"+picName;
        
        var spaceShip = new Image();

        spaceShip.src = picUrl;
        console.log(spaceShip);       

        spaceShip.addEventListener("load",eventSheetLoaded,false);

        function eventSheetLoaded(){
            ctxCenter.clearRect(0,0,480,480);
            ctxBorder.clearRect(0,0,480,480);
            ctxBorder.drawImage(spaceShip,0,0);
        }
        /*
       var target = picName.split(".")[0];
       document.getElementById("picBack").setAttribute("class",target);
       */
    }

    // 这个怎么设计我也没想好 但是 肯定

    function calculatXYPos(arr){ //用来计算坐标的函数 arr=["x:10","y:20","r:100","b:200"];
        var endPosArr = [];
        for(var i = 0 ,len = arr.length;i < len ;i++){
            endPosArr.push(arr[i].split(":")[1]-0);  // -0是因为以前都是字符串 这次得变成数组
        }
        if(endPosArr[0] == 0 && endPosArr[2] == 0 &&  endPosArr[1] == 0 && endPosArr[3] == 0){
            var xPos = 0;
            var yPos = 0;
        }else{
           // var xPos = -( ((-640 + endPosArr[0]+endPosArr[2])/2 )/1280 )*300+150;//-(window.screen.width-600)/2;
            //var yPos = -( ((-360 + endPosArr[1]+endPosArr[3])/2  )/720 )*300+150;//window.screen.height;
            var xPos = (- ( ( (endPosArr[0]+endPosArr[2])/2 )/1280 )*240 + 150)/2; // 相反的x值 注意 这【*240】的问题 这个就是 说 这个公式 就是为了计算出来 把1280p 迁移 到480p上
            var yPos =  (( ( (endPosArr[1]+endPosArr[3])/2 )/720 )*240 - 150)/2;
        }

        return   [xPos,yPos];
    }

    //用来建立 动作对象的 原型继承的 
    function actionCreater(fun1,fun2){
        this.callBackOne = fun1;
        this.callBackTwo = fun2;
    }

    actionCreater.prototype.start = function(){ //  这么写是适合通用的功能 但是像那一种 比如  需要重写特例 
        getCenterFill("rgb(255,255,255)",150,ctxCenter,300,300); 
        getDoubleBorderCircle("rgb(255,255,255)",135,6,ctxBorder,300,300,1)
        this.dtd = $.Deferred();
        var callBackOne1 = this.callBackOne;
        var callBackTwo2 = this.callBackTwo;
        
        
    }
    actionCreater.prototype.end = function(){
        this.dtd.reject();
    }
    actionCreater.prototype.stop = function(){
        // 这里就是 涉及 到 requestAnimationFrame 的重新写 
    }

    // 下面要建立整个阶段的 loader机制
    // 有这么几个需求点 能够打断 ； 能够处理参数 ；解耦，现在的耦合做的太高了，简直不能
    


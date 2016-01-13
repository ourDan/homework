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
     
    // ----------------------------------------------
    
    //还是要把 动画内部切换加载的func
    function changeMoive(){

    }

    // 1 跟随.mov 
    //  这个怎么做到实时跟新的 现在是能够给出一个 具体的数据去坐目的 如果是说 这个需要即时的数据变化 ？难道加延时？这个先别思考了 留下来再看看吧
    function followToBorder(loR){ //参数 这个参数 是指[xpos,ypox] || "left"/"right" 其实准确点说 不如 [xpos,ypos]要是给个"left"/"right"无非就是
        // 怎么说 我觉得吧 这个运动函数 需 要运动的 有 第一 变化 中间的位置 （这一步勉强移过去 下一步就是要加各种各样的参数 
        // 怎么说 这里面 我也不知道 要怎么给 参数接口 只能说 先留下=来 看一看 
        
        var moveXValue = loR[0] ? loR[0] : -Math.random()*200+200; //没有写数组就随机出位置
        var moveYValue = loR[1] ? loR[1] : -Math.random()*200+200;
        // 就是说 数据已经被 给出来 我只需要 去 调用
        
        getCenterFill("(255,255,255)",150,ctxCenter,300,300); // 画一个 中间的
        getFollowBorderCircle("rgb(255,255,255)",100,6,ctxBorder,300,300,1); 

        var dtd = $.Deferred();
        var wait = function(dtd){
            var taskOne = function(){
                //openAndClose([[300,300],[300,5],[0.1,0.2]],2,300,[ctxBorderDom,ctxCenterDom])
                singleMove([moveXValue,moveYValue],[ctxCenterDom],300)
                setTimeout(function(){
                    dtd.resolve();
                    //console.log("i++","end");
                },1200) // 难道只能用这个函数 为什么我的动画进程 那就是说 说什么 只有在 动画完成的时候 ，还得 分别去 加载 针对动画类型的函数 难道不是一条线？

            };
            taskOne();
        }
        
        dtd.promise(wait);
        wait.done(function(){
                //disappear([[300,0],[300,0]],[ctxCenterDom,ctxBorderDom],0,450);
                NewopenAndClose();
                })
            .fail(function(){
                    //getup();
                })    
        wait(dtd);   
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
        var dtd = $.Deferred();
        var wait = function(dtd){
            var taskOne = function(){
                openAndClose([[300,300],[300,5],[0.1,0.2]],2,300,[ctxBorderDom,ctxCenterDom])

                setTimeout(function(){
                    dtd.resolve();
                },1200) // 难道只能用这个函数 为什么我的动画进程 那就是说 说什么 只有在 动画完成的时候 ，还得 分别去 加载 针对动画类型的函数 难道不是一条线？

            };
            taskOne();
        }
        
        dtd.promise(wait);
        wait.done(function(){
                disappear([[300,0],[300,0]],[ctxCenterDom,ctxBorderDom],0,450);
               
                })
            .fail(function(){
                    //getup();
                })    
        wait(dtd);   
    }


    // 第四个就是  惊讶.mov 
    function surprise(){  
        getCenterFill("rgb(255,255,255)",150,ctxCenter,300,300); 
        getDoubleBorderCircle("rgb(255,255,255)",150,6,ctxBorder,300,300,1)
        var dtd = $.Deferred();
        var wait = function(dtd){
            var taskOne = function(){
                easyOpenAndClose([[300,180],[300,180]],0,500,[ctxCenterDom]);
                setTimeout(function(){
                    dtd.resolve();
                    //console.log("i++","end");
                },1300) // 难道只能用这个函数 为什么我的动画进程 那就是说 说什么 只有在 动画完成的时候 ，还得 分别去 加载 针对动画类型的函数 难道不是一条线？
            };
            taskOne();
        };

        dtd.promise(wait);
        wait.done(function(){
                openAndClose([[300,300],[300,25],[0,1]],0,450,[ctxBorderDom,ctxCenterDom]);//[[],[],[]]
                })
            .fail(function(){
                    //getup();
                })    
        wait(dtd);   
    }
    //------------------------------------------------------------------

    //然后就是该考虑下如何解决 这个加载机制的问题
    // 第一次还是建立在jQuery的基础上 
    

    //下面开始调用 动画函数了
    //唤醒 动画
    //getUp();
    
    // 左右给个动作跟随   
    //followToBorder([40,0]);
    
    // 睡眠动画
    //sleep(); 
    
    // 惊讶动画 
    //surprise();
    
    
    // 开始制作接受 分发 运行 
    // 今天要完成的测试功能 就是 能够根据命令写动作 
    //首先是websocket通信方面 kj
    var socket = io.connect("http://192.168.1.48:9527/xiaoweiui");

    socket.on("connect",function(){
        console.log("socket is connected");
    });

    socket.on("message",function(message){
        // 就是说 接受到了 信息 msg = {"name":"type(可能存在的各种值)","参数":"每个参数之间都是，分割"}
        var messageObj = read(message);
        //假如说 那个 正在跑一个 然后传命令过来突然让我停了 我也头疼现在怎么写
        //根据传进来的参数再 可是我现在只有action  ；如果有了weather ；我在哪里判断会好一些 
        var actionsObj = prepareDoAction(messageObj); //就是说 就是说什么呢 这里面先创建每个动作的对象 对象在动作结束后 自己写个回调去注销 

        actionsObj.start();
    }) ;

    // 这个函数就是 分解 通信过来的参数 
    function readAnd(msg){
        if(msg["name"] == "action"){  //就是说 传入的就是个 action动作 接下来就得是 分解
            var newAction = {
                "actionName":msg["args"][0],
                "actionArgsArr":msg["args"][1].spilt(","); 
            }
            return newAction
        }
        else if(msg["name"] == "weather"){  //针对传入的 message什么的
            console.log("i am not write action ready");
            //return xxxAction
        }
    }
         
    // 根据刚才 读取的 去 写动作  这个就是具体的动作
    function  prepareDoAction(msgObj){
        // 这个怎么设计我也没想好 但是 肯定
        var newActObj = {};
        switch(msgObj["actionArgsArr"][0]){  //去判断 动作类 的 哪一个动作在运行 
            case "surprise": //就是说 说这个是 surprise动作 
                // 对于surprise动作 根本就是 两个参数 
                var callback1 = function(){
                    return easyOpenAndClose([[300,180],[300,180]],0,500,[ctxCenterDom]);
                }
                var callback2 = function(){
                    return openAndClose([[300,300],[300,25],[0,1]],0,450,[ctxBorderDom,ctxCenterDom]);
                }
                newActObj = new actionCreater(callback1,callback2 ) // 根据动作的参数 可以修改 
                
                break;
        return  newActObj;       
                
        }
    }




    //用来建立 动作对象的 原型继承的 
    function actionCreater(fun1,fun2){
        this.callBackOne = fun1;
        this.callBackTwo = fun2;
    };

    actionCreater.start = function(){ //  这么写是适合通用的功能 但是像那一种 比如  需要重写特例 
        getCenterFill("rgb(255,255,255)",150,ctxCenter,300,300); 
        getDoubleBorderCircle("rgb(255,255,255)",150,6,ctxBorder,300,300,1)
        this.dtd = $.Deferred();
        var wait = function(dtd){
            var taskOne = function(){
                //easyOpenAndClose([[300,180],[300,180]],0,500,[ctxCenterDom]);
                this.callBackOne();
                setTimeout(function(){
                    dtd.resolve();
                    //console.log("i++","end");
                },1300) // 难道只能用这个函数 为什么我的动画进程 那就是说 说什么 只有在 动画完成的时候 ，还得 分别去 加载 针对动画类型的函数 难道不是一条线？
            };
            taskOne();
        };

        //dtd.promise(wait);
        wait.done(function(){
                //openAndClose([[300,300],[300,25],[0,1]],0,450,[ctxBorderDom,ctxCenterDom]);//[[],[],[]]
                this.callBackTwo()
                })
            .fail(function(){
                    //getup();
                })    
        wait(this.dtd);   
    }
    actionCreater.end = function(){
        this.dtd.reject();
    }
    actionCreater.stop = function(){
        // 这里就是 涉及 到 requestAnimationFrame 的重新写 
    }

}



//myjs

window.onload = function(){
	//alert("start")
	var startTime = new Date; //记录一开始的时间 
	var fireCount = 0;  // 记录状态的对象
	var context =  document.getElementById("pic").getContext('2d'), // 得到画布并使用2d方法先；
		xPos = 500,
		yPos = 300,
		a,b; // 椭圆的参数值，x，y圆心，a,b表示横轴纵轴尺寸   怎么说这个是网上找的画椭圆的方法1，效率一般后面可以考虑重新参考椭圆方程和园的方程
	document.getElementById("pic").width=1000;
	document.getElementById("pic").height=800;							


	var timer = setInterval(function(){  // 直接使用线程事件方法 
		//console.log(new Date - startTime);

		// 整体思路就是 一直在改变参数 a,b  应该也在可以累加中间的圆心; 
		if (new Date - startTime  > 300 && new Date - startTime  <310  ){ // 因为setInterval的误差性，时间线卡的不好  稍微等待一下应该开始画圆了
			a = 150;
			b =	40; // 初始值\
			c = 1;
			ParamEllipse(context, xPos, yPos, a, b,c); //绘制了初始的圆 现在的问题就是那个阴影做的太糟糕了 
			return;
		}
		else if(new Date - startTime  > 340  && a > b ){ // 就是说 从340ms开始,开始增大的
			ParamEllipse(context, xPos, yPos, a, b,c);
			b = b + 2 ; 
			if (c<8){
				c = c + 0.3;
			}
		}
		else if( new Date - startTime > 700 && a === b && new Date - startTime <  1100 && a<200 ){
			a = a + 2;
			b = b + 2;
			ParamEllipse(context, xPos, yPos, a, b,c);
			//console.log(a)
		}
		else if( new Date - startTime > 1100 && a > 150 ){
			//alert("i need add ")
			a = a - 2;
			b = b - 2;
			ParamDouble(context, xPos, yPos, a, b,c);
			console.log(new Date - startTime);
		}
		else if(new Date - startTime > 1300){
			function makeChange(){
				var k = 0 ;

				var gfg = setInterval(function(){

						closeAndOpen(1);
						k++;

						if(k==2){
							var time = Math.random()*2200+500;
							//alert(time);
							clearInterval(gfg);
							setTimeout(function(){
								makeChange();
							},time)

							
						}

					},400);
				clearInterval(timer);
			}
	
			makeChange()
	
			//var x = 100;
			//function change(p){
			//setTimeout(function(){
			closeAndOpen(1);
			//x = Math.random()*300+100;
			//change(x);
			//},100)
			//}
			//change(x);	
		}
	},0);

	function ParamEllipse(context, x, y, a, b,drawlineW){
	   //max是等于1除以长轴值a和b中的较大者
	   //i每次循环增加1/max，表示度数的增加
	   //这样可以使得每次循环所绘制的路径（弧线）接近1像素
	   var step = (a > b) ? 1 / a : 1 / b;
	   context.clearRect(0,0,1000,1000)
	   context.beginPath();
	   context.lineWidth = drawlineW;
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
	   // 一下是为了能够增效出阴影的效果在话一遍  实在不讨巧
	   context.beginPath();
	   context.lineWidth = drawlineW;
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
	};

	function ParamDouble(context, x, y, a, b,drawlineW){
		//max是等于1除以长轴值a和b中的较大者
		//i每次循环增加1/max，表示度数的增加
		//这样可以使得每次循环所绘制的路径（弧线）接近1像素
		var step = (a > b) ? 1 / a : 1 / b;
		context.clearRect(0,0,1000,1000)
		context.beginPath();
		context.lineWidth = drawlineW;
		context.fillStyle = "white"

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

		for (var i = 0; i < 2 * Math.PI; i += step)
		{
		   //参数方程为x = a * cos(i), y = b * sin(i)，
		   //参数为i，表示度数（弧度）
		   context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
		}
		context.closePath();
		context.stroke();
	};


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
}


//这次recode是需要重新写时间线 要保证在前1000ms的时候，开始出眼睛，扩大，然后下一个1000ms就是4个调用眨眼，调用那两个关于压缩变化函数 
// 这次的变化 ，还有一个最大的变化就是 使用缩放 压缩height，为了保持一致，或者这么说，可以让扁轴的压缩的线条尺寸
/*
window.onload = function(){
	var startTime = new Date; //记录一开始的时间 
	var fireCount = 0;  // 记录状态的对象
	var context =  document.getElementById("pic").getContext('2d'), // 得到画布并使用2d方法先；
		xPos = 500,
		yPos = 300,
		
		a = 150,
		
		scaleNum; // 椭圆的参数值，x，y圆心，a,b表示横轴纵轴尺寸   怎么说这个是网上找的画椭圆的方法1，效率一般后面可以考虑重新参考椭圆方程和园的方程
	document.getElementById("pic").width=1000;
	document.getElementById("pic").height=800;	

	//clearInterval(timer);

	var timer = setInterval(function(){  // 还得用这个线程事件方法，只不过是算还时间线的事，还得调用不同 
		//console.log(new Date - startTime);

		// 整体思路就是 一直在改变参数 a,b  应该也在可以累加中间的圆心; 
		var xScale ;
		if (new Date - startTime  > 300 && new Date - startTime  <310  ){ // 因为setInterval的误差性，时间线卡的不好  稍微等待一下应该开始画圆了
			xScale = 0.1;
			ParamEllipseScale(context, xPos, yPos, a, b,10,xScale); //绘制了初始的圆 现在的问题就是那个阴影做的太糟糕了 
			//drawBorderCircle(context, xPos, yPos,a,scaleNum);
				
		}
		else if(new Date - startTime  > 340  && new Date - startTime < 700 ){ // 就是说 从340ms开始,开始增大的
			//if( xScale < 1 ){
				//xScale ++;
				//drawBorderCircle(context, xPos, yPos,a,xScale);

			//}


			ParamEllipseScale(context,xPos,yPos,a,b,10,xScale*10);


			return 
		}
		else if( new Date - startTime > 700 && a === b && new Date - startTime <  900 && a<200 ){
			a = a + 2;
			b = b + 2;
			//ParamEllipse(context, xPos, yPos, a, b,c);
			//console.log(a)
			return
		}
		else if( new Date - startTime > 1100 && a > 150 ){
			//alert("i need add ")
			a = a - 2;
			b = b - 2;
			//ParamDouble(context, xPos, yPos, a, b,c);
			console.log(new Date - startTime);
			return 
		}
		else if(new Date - startTime > 1000 && new Date - startTime < 2000 ){
				var i =0;
				var gfg = setInterval(function(){
					closeAndOpen(1);
				},400);
			clearInterval(timer);	
		}
	},0);

	a= 150;
	b = 150;
	// ParamEllipseScale(context, xPos, yPos, a, b,10,0.1);\
	function closeAndOpen(scaleNum){
		
	 	//alert("c")
	 	
	 		ParamDoubleScale(context, xPos, yPos, a, b,10,scaleNum);
	 		setTimeout(function(){
	 				//console.log(newscaleNum)
	 			ParamDoubleScale(context, xPos, yPos, a, b,10,scaleNum/10);

	 			setTimeout(function(){
	 					ParamDoubleScale(context, xPos, yPos, a, b,10,scaleNum*10);
	 				},200)
	 			},200);
};
	


	 
	function ParamEllipse(context, x, y, a, b,drawlineW){
	   //max是等于1除以长轴值a和b中的较大者
	   //i每次循环增加1/max，表示度数的增加
	   //这样可以使得每次循环所绘制的路径（弧线）接近1像素

	   var step = (a > b) ? 1 / a : 1 / b;
	   context.clearRect(0,0,1000,1000)
	   context.beginPath();
	   context.lineWidth = drawlineW;
	   context.strokeStyle = "white";



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
	   // 一下是为了能够增效出阴影的效果在话一遍  实在不讨巧
	   context.beginPath();
	   context.lineWidth = drawlineW;
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
	};

	function ParamEllipseScale(context, x, y, a, b,drawlineW,scaleNum){

	   //max是等于1除以长轴值a和b中的较大者
	   //i每次循环增加1/max，表示度数的增加
	   //这样可以使得每次循环所绘制的路径（弧线）接近1像素
	   context.restore();
	   var step = (a > b) ? 1 / a : 1 / b;
	   context.clearRect(0,0,1000,1000);
	   context.beginPath();
	   context.lineWidth = drawlineW;
	   context.strokeStyle = "white";

	   context.translate(0,(1-scaleNum)*300);
	   
	   context.scale(1,scaleNum);
	   context.shadowBlur=80;
	   context.shadowColor="#00C6ED";

	   context.moveTo(x + a, y); //从椭圆的左端点开始绘制

	   for (var i = 0; i < 2 * Math.PI; i += step)
	   {
	      //参数方程为x = a * cos(i), y = b * sin(i)，
	      //参数为i，表示度数（弧度）
	      context.lineTo(x + a   * Math.cos(i), y + b * Math.sin(i));
	   }
	   context.closePath();
	   context.stroke();
	   // 一下是为了能够增效出阴影的效果在话一遍  实在不讨巧
	   context.beginPath();
	   context.lineWidth = drawlineW;
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
	};

	function fxxk(context, xPos, yPos, a, b,c){
		
			//console.log(11)
			if( b == 150 ){
				b =50;
				setTimeout(function(){
					ParamDouble(context, xPos, yPos, a, b,c);

					setTimeout(function(){
						fxxk(context, xPos, yPos, a, b,c);
					},50)
				},500)
			}else {
				b = 150;
				setTimeout(function(){
					ParamDouble(context, xPos, yPos, a, b,c);

					setTimeout(function(){
						fxxk(context, xPos, yPos, a, b,c);
					},50)
				},30)
			}	
	}

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

	function drawBorderCircle(context, xPos, yPos,r,scaleNum){
		//var scaleNum = scaleNum?scaleNum:1;
	
	   	   	context.beginPath();
	   	   	context.translate(0,(1-scaleNum)*300)
			//context.restore();
	   	   	context.restore();
	   		context.scale(1,scaleNum);
	   	   	context.lineWidth = 10;
	   	   	context.strokeStyle = "white";
	   	   	

	   	   	context.shadowBlur=80;
	   	   	context.shadowColor="#00C6ED";
	   	   	
	   	   	context.arc(xPos,yPos,r,0,2*Math.PI);
	   	   	context.closePath();
	   	/*
	   	var a = r,
	   		b = r;
	   	var step = (a > b) ? 1 / a : 1 / b;
		//context.clearRect(0,0,1000,1000)
		context.beginPath();
		context.lineWidth = 10;
		context.strokeStyle = "white"
		


		

		context.moveTo(xPos + a, yPos); //从椭圆的左端点开始绘制

		for (var i = 0; i < 2 * Math.PI; i += step)
		{
		   //参数方程为x = a * cos(i), y = b * sin(i)，
		   //参数为i，表示度数（弧度）
		   context.lineTo(xPos + a * Math.cos(i), yPos + b * Math.sin(i));
		}
		

		
		context.stroke();

	}

}
*/
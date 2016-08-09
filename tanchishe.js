// JavaScript source code
/////////////全局变量///////////

//蛇的移动方向
var direction = null;

//蛇的位子
var position = null;

//吃的食物数量
var score = 0;

//最高得分
var highScore=0;

//速度
var speed=10;

//////////////////////////////////////初始化///////////////////////////////////

//初始食物
var initializeFood = function (name) {
    if (name == null) {
        var food = name;
        food.style.position = "absolute";
        food.style.left = "300px";
        food.style.top = "200px";
        food.style.width = "10px";
        food.style.height = "10px";
        food.style.background = "#ff0000";
    }
}
//初始化蛇的每节 (一开始绝对定位 ,都在覆盖在一个div上了)
var toQueue = function (attr) {
    for (var i = 0; i < attr.length; i++) {
        attr[i].style.left = (parseInt(getStyle(attr[i], "left")) - i * 10) + "px";
    }

}



//////////////////////////////////////////运动/////////////////////////////////////////////

//向前运动
function move(snakes) {
    //当前蛇的位子 的left和top组成的数组
    var oldPosition = getPosition(snakes);

    var l = oldPosition[0].leftValue;
    var t = oldPosition[0].topValue;
    //判断是否撞墙
    if (l == 1000 || l == -10 || t == -10 || t == 500) {
        
        return false;
    }
	//判断是否撞自己的身体
	
	for(var i=1;i<oldPosition.length;i++){
		if(l==oldPosition[i].leftValue&&t==oldPosition[i].topValue){
			return false;
		}	
	}
	
    //根据选取的方向移动蛇头
    switch (direction) {
        case "left": snakes[0].style.left = l + speed + "px";
            break;
        case "right": snakes[0].style.left = l - speed + "px";
            break;
        case "top": snakes[0].style.top = t - speed + "px";
            break;
        case "bottom": snakes[0].style.top = t + speed + "px";
            break;
        default: snakes[0].style.left = l + speed + "px";
    }
    //蛇尾跟着蛇头移动
    for (var i = 1; i < oldPosition.length; i++) {
        snakes[i].style.left = oldPosition[i - 1].leftValue + "px";
        snakes[i].style.top = oldPosition[i - 1].topValue + "px"
    }
    return true;
}
//转弯
function turnTo(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
	if(e && e.keyCode == 13){
		start.onclick();	
	}
	if(e && e.keyCode == 109&&speed>10){
		speed-=10;
	}
	if(e && e.keyCode == 107&&speed<40)
	{
		speed+=5;
	}
    if (e.keyCode > 40 || e.keyCode < 37) return;
    else if (e && e.keyCode == 37 && direction != "left") {
        direction = "right";
    }
    else if (e && e.keyCode == 38 && direction != "bottom") {
        direction = "top";
    }
    else if (e && e.keyCode == 39 && direction != "right") {
        direction = "left";
    }
    else if (e && e.keyCode == 40 && direction != "top") {
        direction = "bottom";
    }
}


///////////////////////////////////吃东西,蛇身变长//////////////////////////////////

function snakeGrow(fatherNode) {
    var lastSnake = document.createElement("div");
    lastSnake.className = "snake";
	//根据方向在尾部添加一个div
    switch (direction) {
        case "top":
            lastSnake.style.left = position[position.length - 1].leftValue + "px";
            lastSnake.style.top = position[position.length - 1].topValue + 10 + "px";
        case "left":
            lastSnake.style.left = position[position.length - 1].leftValue -10+ "px";
            lastSnake.style.top = position[position.length - 1].topValue  + "px";
        case "bottom":
            lastSnake.style.left = position[position.length - 1].leftValue + "px";
            lastSnake.style.top = position[position.length - 1].topValue - 10 + "px";
        case "right":
            lastSnake.style.left = position[position.length - 1].leftValue +10+ "px";
            lastSnake.style.top = position[position.length - 1].topValue + "px";

        default: lastSnake.style.left = position[position.length - 1].leftValue - 10 + "px";
            lastSnake.style.top = position[position.length - 1].topValue + "px";

    }

    fatherNode.appendChild(lastSnake);
}


/////////////////////////////////食物生成////////////////////////////////

function creatFood(food) {
    
    var fol = parseInt(getStyle(food, "left"));//获取当前食物的坐标
    var fot = parseInt(getStyle(food, "top"));
    var fnl = 0;
    var fnt = 0;
    //蛇头碰到食物
    if (position[0].leftValue == fol && position[0].topValue == fot) {
        var b = true;
        while (b) {
            //试随机出来的新位置是否与蛇重合
            fnl = Math.floor(Math.random() * 100) * 10;//新食物位子的left坐标
            fnt = Math.floor(Math.random() * 50) * 10;//top
            for (var i = 1; i < (position.length ) ; i++) {
                //如果创建的新事物位子和蛇身重合,跳出for循环
                b = false;
                if (fnl == position[i].leftValue && fnt == position[i].topValue) {
                    b = true;
                    break;
                }
               
            }
        }
        //创建新的食物位子
        food.style.left = fnl + "px";//将测试通过的新地点付给食物
        food.style.top = fnt + "px";
        score +=1;
		var oY=document.getElementsByTagName("p")[0];
		oY.innerHTML="Your score :"+score;
        return true;
    }
    return false;
}

/////////////////////////////////死亡//////////////////////////////////







///////////////////////////////////通用////////////////////////////////////////////

//
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    }
    else {
        return getComputedStyle(obj, false)[attr];
    }
}


//获取当前每个蛇节点的位子
//snakes:div蛇
function getPosition(snakes) {
    var locals = [];
    for (var i = 0; i < snakes.length; i++) {
        var leftValue = parseInt(getStyle(snakes[i], "left"));
        var topValue = parseInt(getStyle(snakes[i], "top"));
        var obj = { "leftValue": leftValue, "topValue": topValue };
        locals.push(obj);
    }
    position = locals;
    return locals;
}

// JavaScript source code
/////////////ȫ�ֱ���///////////

//�ߵ��ƶ�����
var direction = null;

//�ߵ�λ��
var position = null;

//�Ե�ʳ������
var score = 0;

//��ߵ÷�
var highScore=0;

//�ٶ�
var speed=10;

//////////////////////////////////////��ʼ��///////////////////////////////////

//��ʼʳ��
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
//��ʼ���ߵ�ÿ�� (һ��ʼ���Զ�λ ,���ڸ�����һ��div����)
var toQueue = function (attr) {
    for (var i = 0; i < attr.length; i++) {
        attr[i].style.left = (parseInt(getStyle(attr[i], "left")) - i * 10) + "px";
    }

}



//////////////////////////////////////////�˶�/////////////////////////////////////////////

//��ǰ�˶�
function move(snakes) {
    //��ǰ�ߵ�λ�� ��left��top��ɵ�����
    var oldPosition = getPosition(snakes);

    var l = oldPosition[0].leftValue;
    var t = oldPosition[0].topValue;
    //�ж��Ƿ�ײǽ
    if (l == 1000 || l == -10 || t == -10 || t == 500) {
        
        return false;
    }
	//�ж��Ƿ�ײ�Լ�������
	
	for(var i=1;i<oldPosition.length;i++){
		if(l==oldPosition[i].leftValue&&t==oldPosition[i].topValue){
			return false;
		}	
	}
	
    //����ѡȡ�ķ����ƶ���ͷ
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
    //��β������ͷ�ƶ�
    for (var i = 1; i < oldPosition.length; i++) {
        snakes[i].style.left = oldPosition[i - 1].leftValue + "px";
        snakes[i].style.top = oldPosition[i - 1].topValue + "px"
    }
    return true;
}
//ת��
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


///////////////////////////////////�Զ���,����䳤//////////////////////////////////

function snakeGrow(fatherNode) {
    var lastSnake = document.createElement("div");
    lastSnake.className = "snake";
	//���ݷ�����β�����һ��div
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


/////////////////////////////////ʳ������////////////////////////////////

function creatFood(food) {
    
    var fol = parseInt(getStyle(food, "left"));//��ȡ��ǰʳ�������
    var fot = parseInt(getStyle(food, "top"));
    var fnl = 0;
    var fnt = 0;
    //��ͷ����ʳ��
    if (position[0].leftValue == fol && position[0].topValue == fot) {
        var b = true;
        while (b) {
            //�������������λ���Ƿ������غ�
            fnl = Math.floor(Math.random() * 100) * 10;//��ʳ��λ�ӵ�left����
            fnt = Math.floor(Math.random() * 50) * 10;//top
            for (var i = 1; i < (position.length ) ; i++) {
                //���������������λ�Ӻ������غ�,����forѭ��
                b = false;
                if (fnl == position[i].leftValue && fnt == position[i].topValue) {
                    b = true;
                    break;
                }
               
            }
        }
        //�����µ�ʳ��λ��
        food.style.left = fnl + "px";//������ͨ�����µص㸶��ʳ��
        food.style.top = fnt + "px";
        score +=1;
		var oY=document.getElementsByTagName("p")[0];
		oY.innerHTML="Your score :"+score;
        return true;
    }
    return false;
}

/////////////////////////////////����//////////////////////////////////







///////////////////////////////////ͨ��////////////////////////////////////////////

//
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    }
    else {
        return getComputedStyle(obj, false)[attr];
    }
}


//��ȡ��ǰÿ���߽ڵ��λ��
//snakes:div��
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

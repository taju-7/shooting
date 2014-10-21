var canvas = document.getElementById("canvas");
var canvas2 = document.getElementById("canvas2");
var canvas3 = document.getElementById("canvas3");
var ctx = canvas.getContext("2d");
var ctx2 = canvas2.getContext("2d");
var ctx3 = canvas3.getContext("2d");
var player = document.getElementById("player");
var stage = document.getElementById("stage");
var bullet = document.getElementById("bullet");
var enemy = document.getElementById("enemy");
var bullet2 = document.getElementById("enemy_bul")
var life = document.getElementById("life");
var power = document.getElementById("power");
var m = 0;
var n = 0;
var l = 0;
var s = 0;
var w = 0.5;
var bul = [];
var bul2 = [];
var ene = [];
var lif = [];
var hit = 0;
pressedKeys = [];
var bn = 0
var start = null;
var level = undefined;
var lives = 3;
var bomb = 2;
var score = 0;
var graze = 0;
var count = 0;
var eneCounter = 0;
var setStart = 0;
var setBool = true;
var countS =0;
var clearflag = false;
var cc = 0;

var p = {
	"x" : canvas.width * 0.5,
	"y" : canvas.height-50,
	"vx" : 0,
	"vy" : 0,
	"bool" : true
};

var sta = {
	"y" : -1800 
}

onload = function() {
	if(setBool&&setStart==0)
	for (var i = 0; i < 20; i++){
		ene_count(i);
//		console.log(ene[i]);
		setBool = false;
		clearflag = false;
	}

	var timer = setInterval(update, 30);

	function update() {
		canvas.style.left = window.innerWidth*0.5 - 200+"px";
		canvas2.style.left = window.innerWidth*0.5 +200+"px";
		canvas.style.display = "block";
		sta.y += 10;
		if(sta.y == 0){
			sta.y = -1800;
		}
		ctx.drawImage(stage,0,sta.y);

	if(level == undefined){
		ctx.textAlign = "center";
		ctx.font = "20px Arial";
		ctx.fillStyle = 'red';
		ctx.fillText("Shooting Game",canvas.width*0.5, 200);
		ctx.font = "15px Arial";
		ctx.fillText("Level Select",canvas.width*0.5, 300);

		ctx.fillStyle = "#00F";
		ctx.fillRect(60,375 + 50*s,canvas.width * 0.7,40);

		ctx.fillStyle = "#0F0"
		ctx.fillText("EASY",canvas.width*0.5, 400);
		ctx.fillText("NORMAL",canvas.width*0.5, 450);
		ctx.fillText("HARD",canvas.width*0.5, 500);

	}else{
		canvas2.style.display ="block";
		canvas2.style.left = window.innerWidth*0.5 +200+"px";
		ctx.save();
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx2.clearRect(0,0,canvas.width,canvas.height)
	   	ctx2.fillStyle = "white";
    	ctx2.font = "bold 15px sans-serif"
	//	console.dir(ctx2.font);
		ctx2.fillText("score",20,40);
		ctx2.fillText(score,100,40);
		ctx2.fillText("graze",20,70);
		ctx2.fillText(graze,100,70);
		ctx2.fillText("life",20,100);
		for (var i = 0; i < lives; i++){
			ctx2.drawImage(life, 70+20*i,84)
		}
		p.x += p.vx;
		p.y += p.vy;
		sta.y += 10;
		if(sta.y == 0){
			sta.y = -1800;
		}
		ctx.drawImage(stage,0,sta.y);
		setPlayer(p);
//console.log(p.x-player.width*w ,p.x+player.width*w)
		if(count%3 == 0)
		ctx.drawImage(player,p.x-player.width*0.5,p.y);

	/*	if(level == 7){
			ctx.beginPath()
			ctx.strokeStyle="#f00";
	//		console.log(p.x - player.width * w,player.width*2*w)
			ctx.strokeRect(p.x - player.width * w,p.y,player.width*2*w,player.height*0.5)
		}
		*/
console.log(eneCounter)
//----------------------1セット目--------------------//
	if(setStart==0){
		for(var k = 0; k < 20; k++){
			if(ene[k] != null){
				ene[k].x += ene[k].vx;
				ene[k].y += 3;
				if(ene[k].x > canvas.width - enemy.width || ene[k].x < 0){
					ene[k].vx *= -1;
					if(ene[k].x < 0){
						ene[k].x = 0;
					}else {
						ene[k].x = canvas.width - 5 - enemy.width ;
					}
				}
				if ( Math.floor(Math.random()*level) % level == 0 )　{
					l++
					eneBul_count(ene[k].x, ene[k].y);
				}
				ctx.drawImage(enemy,ene[k].x,ene[k].y);
				if(ene[k].y>600){
					ene[k] = null;
					eneCounter++
				}
			}
		}
	}
//------------------1セット目ここまで------------------//
//-------------------2セット目----------------//
	if(eneCounter == 20){
		setStart = 1;
		setBool = true;
}
	if(setBool&&setStart==1){
		for(var i = 0; i < 20; i++)
			ene_count2(i);
		setBool = false
	}
	if(setStart == 1){
		countS++
		for(var k = 20; k < 40; k++){
			if(ene[k] != null){
				ene[k].x += ene[k].vx;
				ene[k].y += ene[k].vy;
				console.log(countS)
				if(countS > 3 && countS<150){
					ene[k].vy = 0;
				}else{
					ene[k].vy += 20;
				}
				if ( Math.floor(Math.random()*level) % level == 0 )　{
					l++
					eneBul_count(ene[k].x, ene[k].y);
				}
				ctx.drawImage(enemy,ene[k].x,ene[k].y);
				if(ene[k].y>600){
					ene[k] = null;
					eneCounter++
				}
			}
		}
	}

//---------------2セット目ここまで-----------//
//------------------3セット目---------------//
/*	if(eneCounter == 40){
		setStart = 2;
		setBool = true;
}
	if(setBool&&setStart==2){
		for(var i = 1; i < 20; i++)
			ene_count3(i);
		setBool = false
	}
	if(setStart == 1){
		for(var k = 40; k < 60; k++){
			if(ene[k] != null){
				ene[k].x += ene[k].vx;
				ene[k].y += ene[k].vy;
				if(ene[40] != null && ene[40].y > 200){
					ene[k].vy = 0;
				}
				if ( Math.floor(Math.random()*level) % level == 0 )　{
					l++
					eneBul_count(ene[k].x, ene[k].y);
				}
				ctx.drawImage(enemy,ene[k].x,ene[k].y);
				if(ene[k].y>600){
					ene[k] = null;
					eneCounter++
				}
			}
		}
	}*/
//-----------------3セット目ここまで-------------//
		for (var d = 0; d < l; d++){
			if(bul2[d] != undefined){
			bul2[d].y += bul2[d].vy;
			bul2[d].x += bul2[d].vx;
	//		console.log(ene[i].x,ene[i].y);
			ctx.drawImage(bullet2, bul2[d].x-bullet2.width*0.5, bul2[d].y-bullet2.height*0.5);
//			console.log("attack");
			grazef(d);
				if (bul2[d].x > p.x - player.width * w && bul2[d].x < p.x + player.width * w && p.bool){
					if (bul2[d].y > p.y && bul2[d].y < p.y + player.height * 0.4){
		//				console.log(bul2[d].x, p.x,p.x-player.width*w,p.x+player.width*w);
						lives--;
						p.x = 200;
						p.y = 550;
						p.bool = false;
						if(lives == -1){
							gameover(clearflag);
							//alert("GAMEOVER……");
							level = undefined;
						}
					}
				}
				if(bul2[d].y>600){
					bul2[d] = undefined;
				}
			}
		}
		if(p.bool == false){
			count++
			if(count==60){
				p.bool = true;
				count = 0
			}
		}
		for (var i = 0; i < n; i++)/*while(bul[i] == none)*/{
			bul[i].y -= 30;
	//		if(ene[i]!=undefined)
				ctx.drawImage(bullet,bul[i].x,bul[i].y);
			if (bul[i].y < 0){
				delete bul[i].y;
			}
			for (var j =0; j < 100; j++){
				if(ene[j] != undefined){
					if(bul[i].x > ene[j].x - enemy.width * 0.7 && bul[i].x < ene[j].x + enemy.width * 0.7){
						if(bul[i].y > ene[j].y - enemy.height * 0.7 && bul[i].y < ene[j].y + enemy.height * 0.7){
							if(j == 12,21){
								var e = new create();
								e.x = ene[j].x;
								e.y = ene[j].y;
								lif.push(e);
							}
							ene[j] = undefined;
							score += 100;
							eneCounter++
							delete bul[i].y;
		//					console.log("hit");
							hit++
						}
					}

				}
			}
			if(lif[0] != null){
				lif[0].y += 0.1;
		//		console.log(lif[0].x,lif[0].y)
				ctx.drawImage(life,lif[0].x, lif[0].y);
				if(lif[0].x-life.width*0.5 < p.x+player.width*0.5 && lif[0].x+life.width*0.5 > p.x-player.width*0.5){
					if(lif[0].y-life.height*0.5 < p.y && lif[0].y+life.height*0.5 > p.y+player.height*0.5){
						lif[0] = null;
						lives++;
						score += 1000;
					}
				}
			}
		}
//		if (eneCounter > 100){

		//	alert("Congratuation!!!");
//			gameover(clearflag);
//			level = undefined;
//		}
		for(var j = 0; j < 100; j++){
			if(ene[j]!=undefined){
				if(ene[j].x-enemy.width*0.5 < p.x+player.width*0.5 && ene[j].x+enemy.width*0.5 > p.x-player.width*0.5 && p.bool){
					if(ene[j].y-enemy.height*0.5 < p.y && ene[j].y+enemy.height*0.5 > p.y+player.height*0.5){
						lives--;
						p.x = 200;
						p.y = 550;
						p.bool = false;
						if(lives == -1){
							gameover(clearflag);
							//alert("GAMEOVER……");
							level = undefined;
						}
					}
				}
			}
		}
		if(eneCounter >= 40){
			console.log(cc)
			clearflag = true;
			cc++
			if(cc == 60){
				score += 10000;
				gameover(clearflag);
			}
		}
		movePlayer();
	//	console.log(p.y+player.height*0.5,p.y-player.height*0.5)
		ctx.restore();
	}
}
	function b_count() {
		bn++
		if(bn%4 == 0){
			var b = new create();
			b.x = p.x - bullet.width*0.5;
			b.y = p.y;
			n++;
			bul.push(b);
		}
	}

	function ene_count(i) {
		var e = new create();
		e.x = i*15;
		e.y = i%4 * 40 - 200;
		e.vx = 5;
		m++;
		ene.push(e);
	}
	function ene_count2(i) {
		var e = new create();
		e.x = 60+80*(i%4);
			if(0 <= i && 4 > i)
				e.y = 0;
			if(4 <= i && 8 > i)
				e.y = -40;
			if(8 <= i && 12 > i)
				e.y = -80;
			if(12 <= i && 16 > i)
				e.y = -120;
			if(16 <= i)
				e.y = -160;
		e.vx = 0;
		e.vy = 10;
		ene.push(e);
	}
	function ene_count3(i) {
		var e = new create();
		e.x = 60+80*(i%4);
			if(0 <= i && 4 > i)
				e.y = 0;
			if(4 <= i && 8 > i)
				e.y = -40;
			if(8 <= i && 12 > i)
				e.y = -80;
			if(12 <= i && 16 > i)
				e.y = -120;
			if(16 <= i)
				e.y = -160;
		e.vx = 10;
		e.vy = 10;
		ene.push(e);
	}


	function eneBul_count(x,y) {
		var eB = new create();
		eB.x = x+enemy.width*0.5;
		eB.y = y;
	//	console.log(eB.x,eB.y)
		eB.vy = 10;
		eB.vx = 10*(p.x-x-16)/(550-y)
		l++;
	//	console.log(p.x,p.y)
		bul2.push(eB);
	}
/*
	function eneBul_shot() {
		for (var i = 0; i < 10; )

	}
*/
	function grazef(d) {
		if (bul2[d].x > p.x - player.width * 1.5 && bul2[d].x < p.x + player.width * 1.5){
			if (bul2[d].y > p.y && bul2[d].y < p.y + player.height * 0.4){
				if(bul2[d].bool){
					score += 50;
					graze++;
					bul2[d].bool = false;
				} 
			}
		}
	}

	function create() {
		this.x = 0;
		this.y = 0;
		this.vx = 0;
		this.vy = 0;
		this.bx = 0;
		this.by = 0;
		this.bool = true;
	}

	function setPlayer() {
		if(p.x - player.width*0.5 < 0)
			p.x = player.width*0.5;
		if(p.x + player.width* 0.5 > canvas.width)
			p.x = canvas.width - player.width*0.5;
		if(p.y < 0)
			p.y = 0;
		if(p.y > canvas.height - player.height)
			p.y = canvas.height - player.height;
		return p;
	}

	movePlayer = function(){
	    //up
	    if(pressedKeys[0]){
		    p.y -= 10;
	    }
	    //down
	    if(pressedKeys[1]){
		    p.y += 10;
	    }
	    //left
	    if(pressedKeys[2]){
		    p.x -= 10;
	    }
	    //right
	    if(pressedKeys[3]){
		    p.x += 10;
	    }
	    if(pressedKeys[4]){
		    b_count();
	    }
    }




	window.addEventListener("keydown", onKeyDown, false);
	function onKeyDown (e){
		start = 1;
//		console.log(e.keyCode);
		switch(e.keyCode){
			case 37://左
			pressedKeys[2] = true;
			break;
			case 38://上
			pressedKeys[0] = true;
			if(level == undefined){ 
				if(s == 0)
					s = 3
				s--;
			}
			break;
			case 39://右
			pressedKeys[3] = true;
			break;
			case 40://下
			pressedKeys[1] = true;
			if(level == undefined){
				s++; 
				if(s == 3)
					s = 0
			}
			break;
			case 90:
			case 32:
			case 13:
			pressedKeys[4] = true;
			if(level == undefined){
				switch(s){
				case 0:
				level = 50;
				w = 0.4
				break;
				case 1:
				level = 30;
				w = 0.2;
				break;
				case 2:
				level = 7;
				w = 0.1;
				break;
				}
			}
			break;
		}
	}
	window.addEventListener("keyup", onKeyUp, false);
	function onKeyUp (e){
		switch(e.keyCode){
			case 37://左
			pressedKeys[2] = false;
			break;
			case 38://上
			pressedKeys[0] = false;
			break;
			case 39://右
			pressedKeys[3] = false;
			break;
			case 40://下
			pressedKeys[1] = false;
			break;
			case 90:
			case 32:
			case 13:
			pressedKeys[4] = false;
			break;
		}
	}


	function gameover(flag){
		canvas3.style.left = window.innerWidth*0.5 -200+"px";
		canvas3.style.display = "block";
		ctx3.textAlign = "center";
		if(flag == false){
			ctx3.fillStyle = "red";
			ctx3.font = "bold 30px sans-serif"
		//	console.dir(ctx2.font);
			ctx3.fillText("GAMEOVER",canvas.width*0.5,300);
		}else if(flag == true){
			ctx3.fillStyle = "yellow";
			ctx3.font = "bold 30px sans-serif"
		//	console.dir(ctx2.font);
			ctx3.fillText("GAMECLEAR",canvas.width*0.5,300);
			ctx3.fillStyle = "white";
			ctx3.font = "bold 15px sans-serif"
			ctx3.fillText("CLEAR BONUS +10000point",canvas.width*0.5,450);
		}
		ctx3.fillStyle = "white";
		ctx3.font = "bold 30px sans-serif"
		ctx3.fillText("SCORE",canvas.width*0.5,350);
		ctx3.fillText(score,canvas.width*0.5,400);

		ctx3.font = "bold 15px sans-serif"
		ctx3.fillText("Please Press ENTER key.",canvas.width*0.5,500)

		clearInterval(timer);
		level = undefined;
		window.addEventListener("keydown",
			function (e){
				if(e.keyCode == 13){
					window.location.reload();
				}
		},false)
	}
}


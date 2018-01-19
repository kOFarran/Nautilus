(function() {
  var obstacles = []; 
  var canvas;
  var context;
  var width;
  var height;
  var score = 0;

  
  
  
  var target ={
    x : getRandomNumber(50, 625),
    y : getRandomNumber(50, 459),
    size : 40,
    xChange : getRandomNumber(50, 625), 
    yChange : getRandomNumber(50, 459)
    
  };

   
  var obstacle ={
   x : getRandomNumber(600, 1000),
   y : getRandomNumber(400, 450), 
   size : 75,
   xChange : getRandomNumber(-10, -1), 
   yChange : getRandomNumber(-10, -1),
    
  };

    obstacles.push(obstacle)
   
  
  var obstacle2 ={
   x : getRandomNumber(600, 1000),
   y : getRandomNumber(200, 250), 
   size : 75,
   xChange : getRandomNumber(-10, -1), 
   yChange : getRandomNumber(-10, -1),
    
  };

    obstacles.push(obstacle2)
  var obstacle3 ={
   x : getRandomNumber(600, 1000),
   y : getRandomNumber(600, 650), 
   size : 75,
   xChange : getRandomNumber(-20, -10), 
   yChange : getRandomNumber(-10, -1),
    
  };

    obstacles.push(obstacle3)
  var player = {
    x : 450,
    y : 350,
    size : 30
  };
  
  var subImage=new Image();
	subImage.onload=function(){
		ImageReady=true;
	};
	subImage.src="sub2.png";

  var targetImage=new Image();
	targetImage.onload=function(){
		ImageReady=true;
	};
	targetImage.src="Ring-Sonic-Generations.png";
	
  var obstacleImage=new Image();
	obstacleImage.onload=function(){
		ImageReady=true;
	};
	obstacleImage.src="Shark1flp.png";
	  
  
  var moveUp = false;
  var moveDown = false;
  var moveRight = false;
  var moveLeft = false;
    
  
  
  
  document.getElementById("sublvl2").addEventListener('load', init, false);

  function init(){
      canvas = document.querySelector('#lvl2canvas');
      context = canvas.getContext('2d');
      interval_id = window.setInterval(draw, 33);
      width = canvas.width;
      height = canvas.height;
      window.addEventListener('keydown', activate, false);
      window.addEventListener('keyup', deactivate, false);
      window.addEventListener('submit', enable, false);
      input_score = document.getElementById('input_score1');
    }
  function draw(){
    context.clearRect(0, 0, width, height)
    drawPlayer();
    
    drawTarget();
    target.xChange = getRandomNumber(30, width-30);
    target.yChange =getRandomNumber(30, height-30);
    
    drawObstacle();
    drawObstacle2();
    drawObstacle3();
    drawScore();
    //if the player hits any of the walls, stop
    if ((player.x, player.y, player.size, player.size)>= width ||
      player.y + player.size >= height ||
      player.x <= width - width ||
      player.y <= height - height ||
      player.x + player.size > width
    ) {
      stop();
    }

    
    if (collision(target)){
      target.x = target.xChange;
      target.y = target.yChange;
      score+=20;
      
    }
    if (collision(obstacle)){
      stop();
        }
    if (collision(obstacle2)){
      stop();
        }
        
    if (collision(obstacle3)){
      stop();
        }

  //This deals with making the obstacles bounce off the walls  
    for (var i = 0; i < obstacles.length; i += 1) {
	obstacles[i].x = obstacles[i].x + obstacles[i].xChange;
	obstacles[i].y = obstacles[i].y + obstacles[i].yChange;
	if (obstacles[i].x <= 0) {
	    obstacles[i].xChange = -obstacles[i].xChange;
      obstacleImage.src="Shark1.png";
	}
	else if(obstacles[i].x + obstacles[i].size >= width){
	  obstacles[i].xChange = -obstacles[i].xChange;
    obstacleImage.src="Shark1flp.png";
	}
	else if (obstacles[i].y + obstacles[i].size <=0){
	  obstacles[i].yChange = -obstacles[i].yChange
	}
	else if (obstacles[i].y + obstacles[i].size >= height){
	  obstacles[i].yChange = -obstacles[i].yChange
	}
    }
    
    
    if (moveRight){
      player.x +=35;
    }
    if (moveLeft){
      player.x -=35;
    }
    if(moveUp){
      player.y -=35;
    }
    if(moveDown){
      player.y +=35;
    }
    
     
   
  }
  
  function drawPlayer(){
   context.drawImage(subImage,player.x,player.y, subImage.width*0.5, subImage.height*0.5);
  }
  function drawTarget(){
   context.drawImage(targetImage,target.x,target.y);
  }
  function drawObstacle(){
   context.drawImage(obstacleImage,obstacle.x,obstacle.y, obstacleImage.width*0.2, obstacleImage.height*0.2);
  } 
  function drawObstacle2(){
   context.drawImage(obstacleImage,obstacle2.x,obstacle2.y, obstacleImage.width*0.2, obstacleImage.height*0.2);
  }
  function drawObstacle3(){
   context.drawImage(obstacleImage,obstacle3.x,obstacle3.y, obstacleImage.width*0.2, obstacleImage.height*0.2);
  } 
  function collision(thing) {
        if (player.x + player.size < thing.x ||
            thing.x + thing.size < player.x ||
            player.y > thing.y + thing.size ||
            thing.y > player.y + player.size) {
            return false;
        } else {
            return true;
	    score+20
        }
        
    
    }
  function drawScore() {
    context.font = "32px Arial";
    context.fillStyle = "red";
    context.fillText("Score: "+score, 15, 40);
}
  
  
  
  function activate(event){
    var keyCode = event.keyCode;
    if (keyCode === 37){
      moveLeft = true;
      
    }else if(keyCode === 38){
      moveUp = true;
      
    } else if (keyCode === 39){
      moveRight = true;
      
    } else if(keyCode === 40){
      moveDown = true;
      
    }
    
  }
  
  function deactivate(event){
    var keyCode = event.keyCode;
    if (keyCode === 37){
      moveLeft = false;

    }else if(keyCode === 38){
      moveUp = false;
    } else if (keyCode === 39){
      moveRight = false;
    }else if (keyCode === 40){
      moveDown = false;
    }
  }
  
  function enable() {
    input_score.removeAttribute('disabled')
  } 
    
  function stop(){
    clearInterval(interval_id);
    window.alert("You Died! Hit ENTER to input score!", 500, 300)
    window.removeEventListener('keydown', activate, false);
    window.removeEventListener('keyUp', deactivate, false);
    canvas.style.visibility = 'hidden';
    // input_score.removeAttribute('disabled');
    // input_score.value = score;
    // input_score.setAttribute('disabled', 'disabled');
    //document.getElementById("sublvl2").removeEventListener("load", init, false);
  }
  function getRandomNumber(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
  }
  
  
  
 })();
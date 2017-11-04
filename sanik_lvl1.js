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
   xChange :-10, 
   yChange : 0,
    
  };

    obstacles.push(obstacle)
   
  
  
  var player = {
    x : 450,
    y : 350,
    size : 30
  };
  
  var sanicImage=new Image();
	sanicImage.onload=function(){
		ImageReady=true;
	};
	sanicImage.src="sanic_cumon_step_it_up_ii_by_spadyhearts-d8znpy7.gif";
  var targetImage=new Image();
	targetImage.onload=function(){
		ImageReady=true;
	};
	targetImage.src="Ring-Sonic-Generations.png";
	
  var obstacleImage=new Image();
	obstacleImage.onload=function(){
		ImageReady=true;
	};
	obstacleImage.src="Giant_spike_ball.png";
	  
  
  var moveUp = false;
  var moveDown = false;
  var moveRight = false;
  var moveLeft = false;
    
  
  
  
  document.addEventListener('DOMContentLoaded', init, false);

  function init(){
      canvas = document.querySelector('canvas');
      submit = document.getElementById('submit');
      context = canvas.getContext('2d');
      interval_id = window.setInterval(draw, 33);
      width = canvas.width;
      height = canvas.height;
      window.addEventListener('keydown', activate, false);
      window.addEventListener('keyup', deactivate, false);
      window.addEventListener('submit', enable, false);
      input_score = document.getElementById('input_score1');
      form = document.querySelector('form')
      form.style.visibility='hidden';
    }
  function draw(){
    context.clearRect(0, 0, width, height)
    drawPlayer();
    
    drawTarget();
    target.xChange = getRandomNumber(30, width-30);
    target.yChange =getRandomNumber(30, height-30);
    
    drawObstacle();
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
    //This deals with making the obstacles bounce off the walls    
    for (var i = 0; i < obstacles.length; i += 1) {
	obstacles[i].x = obstacles[i].x + obstacles[i].xChange;
	obstacles[i].y = obstacles[i].y + obstacles[i].yChange;
	if (obstacles[i].x <= 0) {
	    obstacles[i].xChange = -obstacles[i].xChange;
	}
	else if(obstacles[i].x + obstacles[i].size >= width){
	  obstacles[i].xChange = -obstacles[i].xChange;
	}
    }
    
    
    if (moveRight){
      player.x +=25;
    }
    if (moveLeft){
      player.x -=25;
    }
    if(moveUp){
      player.y -=25;
    }
    if(moveDown){
      player.y +=25;
    }
    
     
   
  }
  
  function drawPlayer(){
   context.drawImage(sanicImage,player.x,player.y);
  }
  function drawTarget(){
   context.drawImage(targetImage,target.x,target.y);
  }
  function drawObstacle(){
   context.drawImage(obstacleImage,obstacle.x,obstacle.y);
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
    window.alert("You Died! Hit ENTER to input score", 500, 300);
    window.removeEventListener('keydown', activate, false);
    window.removeEventListener('keyUp', deactivate, false);
    canvas.style.visibility = 'hidden';
    form.style.visibility = 'visible';
    input_score.removeAttribute('disabled')
    input_score.value = score;
    input_score.setAttribute('disabled', 'disabled')  

  }
  
    
  function getRandomNumber(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
  }
  
  
  
 })();
(function() {
  var obstacles = []; 
  var canvas;
  var context;
  var width;
  var height;
  var score = 0;
     
  var subImage=new Image();
	  subImage.onload=function(){
		ImageReady=true;
	};
	subImage.src="sub2.png";

  var player = {
    x : 762,
    y : 342,
    width : subImage.width*0.5,
    height : subImage.height*0.3
  };

  var targetImage=new Image();
	targetImage.onload=function(){
		ImageReady=true;
	};
	targetImage.src="Ring-Sonic-Generations.png";

  var target ={
    x : getRandomNumber(50, width - 50),
    y : getRandomNumber(50, height - 50),
    width : targetImage.width,
    height : targetImage.height,
    xChange : getRandomNumber(50, width - 50), 
    yChange : getRandomNumber(50, height - 50)
    
  };
	
  var obstacleImage=new Image();
	obstacleImage.onload=function(){
		ImageReady=true;
	};
	obstacleImage.src="Shark1flp.png";

  var obstacle ={
   x : getRandomNumber(300, width - 100),
   y : getRandomNumber(250, height - 50), 
   width : obstacleImage.width*0.2,
   height : obstacleImage.height*0.2,
   xChange :-10, 
   yChange : 0
    
  };
	  
  obstacles.push(obstacle);
  
  var moveUp = false;
  var moveDown = false;
  var moveRight = false;
  var moveLeft = false;  
  
  document.getElementById("sublvl1").addEventListener('load', init, false);

  function init(){
      canvas = document.querySelector('#lvl1canvas');
      submit = document.getElementById('submit');
      context = canvas.getContext('2d');
      interval_id = window.setInterval(draw, 33);
      width = context.canvas.clientWidth;//canvas.width;
      height = context.canvas.clientHeight;//canvas.height;
      window.addEventListener('keydown', activate, false);
      window.addEventListener('keyup', deactivate, false);
      window.addEventListener('submit', enable, false);
      input_score = document.getElementById('input_score1');
      //form = document.querySelector('form')
      //form.style.visibility='hidden';
      console.log ("Canvas Size: " + context.canvas.clientWidth + "x" + context.canvas.clientHeight);
      console.log ("Perceived Canvas Size: " + width + "x" + height);
      console.log ("Player's X: " + player.x + " " + "Player's Y: " + player.y + " " + "Player's Length: " + player.length + " " + "Player's Height: " + player.height);
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
    if (player.y + player.height >= height || player.y <= 0 || player.x + player.width >= width || player.x <= 0 ) {
        stop();
        console.log ("Wall Collision");
    }

    
    if (collision(target)){
      target.x = target.xChange;
      target.y = target.yChange;
      score+=20;
      console.log("score!");
      
    }
    if (collision(obstacle)){
      console.log ("Obstacle Collision");
      //stop();	   
        }
    //This deals with making the obstacles bounce off the walls    
    for (var i = 0; i < obstacles.length; i += 1) {
      obstacles[i].x = obstacles[i].x + obstacles[i].xChange;
      obstacles[i].y = obstacles[i].y + obstacles[i].yChange;
	if (obstacles[i].x <= 0) {
	    obstacles[i].xChange = -obstacles[i].xChange;
      obstacleImage.src="Shark1.png";
	}
	else if(obstacles[i].x + obstacles[i].width >= width){
	  obstacles[i].xChange = -obstacles[i].xChange;
    obstacleImage.src="Shark1flp.png";
	}
    }
    
    
    if (moveRight){
      player.x +=25;
      subImage.src="sub2.png";
    }
    if (moveLeft){
      player.x -=25;
      subImage.src="sub2flp.png";
    }
    if(moveUp){
      player.y -=25;
    }
    if(moveDown){
      player.y +=25;
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
  function collision(thing) {
    if (player.x + player.width < thing.x || thing.x + thing.width < player.x || player.y > thing.y + thing.height || thing.y > player.y + player.height) {
        return false;
    } else {
        return true;
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
    //form.style.visibility = 'visible';
    // input_score.removeAttribute('disabled');
    // input_score.value = score;
    // input_score.setAttribute('disabled', 'disabled'); 
    console.log (player.x, player.y);
    //document.getElementById("sublvl1").removeEventListener("load", init, false);

  }
  
    
  function getRandomNumber(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
  }
  
  
  
 })();

// (function() {
//   var obstacles = []; 
//   var canvas;
//   var context;
//   var width;
//   var height;
//   var score = 0;
     
//   var subImage=new Image();
// 	  subImage.onload=function(){
// 		ImageReady=true;
// 	};
// 	subImage.src="sub2.png";

//   var player = {
//     x : 762,
//     y : 342,
//     width : subImage.width*0.5,
//     height : subImage.height*0.5
//   };

//   var targetImage=new Image();
// 	targetImage.onload=function(){
// 		ImageReady=true;
// 	};
// 	targetImage.src="Ring-Sonic-Generations.png";

//   var target ={
//     x : getRandomNumber(50, 625),
//     y : getRandomNumber(50, 459),
//     width : targetImage.width,
//     height : targetImage.height,
//     xChange : getRandomNumber(50, 625), 
//     yChange : getRandomNumber(50, 459)
    
//   };
	
//   var obstacleImage=new Image();
// 	obstacleImage.onload=function(){
// 		ImageReady=true;
// 	};
// 	obstacleImage.src="Shark1flp.png";

//   var obstacle ={
//    x : getRandomNumber(700, 1000),
//    y : getRandomNumber(100, 500), 
//    width : obstacleImage.width*0.2,
//    height : obstacleImage.height*0.2,
//    xChange :-10, 
//    yChange : 0
    
//   };
	  
//   obstacles.push(obstacle);
  
//   var moveUp = false;
//   var moveDown = false;
//   var moveRight = false;
//   var moveLeft = false;
    
  
  
//   document.getElementById("sub2").addEventListener('load', init, false);
//   //document.addEventListener('DOMContentLoaded', init, false);

//   function init(){
//       canvas = document.querySelector('canvas');
//       submit = document.getElementById('submit');
//       context = canvas.getContext('2d');
//       interval_id = window.setInterval(draw, 33);
//       width = context.canvas.clientWidth;//canvas.width;
//       height = context.canvas.clientHeight;//canvas.height;
//       window.addEventListener('keydown', activate, false);
//       window.addEventListener('keyup', deactivate, false);
//       window.addEventListener('submit', enable, false);
//       input_score = document.getElementById('input_score1');
//       form = document.querySelector('form')
//       canvas.style.visibility = 'visible';
//       form.style.visibility='hidden';
//       console.log ("Player's X: " + player.x + " " + "Player's Y: " + player.y + " " + "Player's Length: " + player.length + " " + "Player's Height: " + player.height);
//     }
//   function draw(){
//     context.clearRect(0, 0, width, height)
//     drawPlayer();
//     console.log("PLAYER",player.x, player.y, player.width, player.height);
    
//     drawTarget();
//     target.xChange = getRandomNumber(30, width-30);
//     target.yChange =getRandomNumber(30, height-30);
    
//     drawObstacle();
//     console.log("SHARK",obstacle.x, obstacle.y, obstacle.width, obstacle.height);
//     drawScore();
//     //if the player hits any of the walls, stop
//     if (player.y + player.height >= height || player.y <= 0 || player.x + player.width >= width || player.x <= 0 ) {
//         stop();
//         console.log ("Wall Collision");
//     }

    
//     if (collision(target)){
//       target.x = target.xChange;
//       target.y = target.yChange;
//       score+=20;
//       console.log("score!");
      
//     }
//     if (collision(obstacle)){
//       console.log ("Obstacle Collision");
//       stop();	   
//         }
//     //This deals with making the obstacles bounce off the walls    
//     for (var i = 0; i < obstacles.length; i += 1) {
//       obstacles[i].x = obstacles[i].x + obstacles[i].xChange;
//       obstacles[i].y = obstacles[i].y + obstacles[i].yChange;
// 	if (obstacles[i].x <= 0) {
// 	    obstacles[i].xChange = -obstacles[i].xChange;
//       obstacleImage.src="Shark1.png";
// 	}
// 	else if(obstacles[i].x + obstacles[i].width >= width){
// 	  obstacles[i].xChange = -obstacles[i].xChange;
//     obstacleImage.src="Shark1flp.png";
// 	}
//     }
    
    
//     if (moveRight){
//       player.x +=25;
//       subImage.src="sub2.png";
//     }
//     if (moveLeft){
//       player.x -=25;
//       subImage.src="sub2flp.png";
//     }
//     if(moveUp){
//       player.y -=25;
//     }
//     if(moveDown){
//       player.y +=25;
//     }
    
     
   
//   }
  
//   function drawPlayer(){
//    context.drawImage(subImage,player.x,player.y, subImage.width*0.5, subImage.height*0.5);
//   }
//   function drawTarget(){
//    context.drawImage(targetImage,target.x,target.y);
//   }
//   function drawObstacle(){
//    context.drawImage(obstacleImage,obstacle.x,obstacle.y, obstacleImage.width*0.2, obstacleImage.height*0.2);
//   } 
//   function collision(thing) {
//     if (player.x + player.width < thing.x || thing.x + thing.width < player.x || player.y > thing.y + thing.height || thing.y > player.y + player.height) {
//         return false;
//     } else {
//         return true;
//     }


// }

//   function drawScore() {
//     context.font = "32px Arial";
//     context.fillStyle = "red";
//     context.fillText("Score: "+score, 15, 40);
// }
  
  
//   function activate(event){
//     var keyCode = event.keyCode;
//     if (keyCode === 37){
//       moveLeft = true;
      
//     }else if(keyCode === 38){
//       moveUp = true;
      
//     } else if (keyCode === 39){
//       moveRight = true;
      
//     } else if(keyCode === 40){
//       moveDown = true;
      
//     }
    
//   }
  
//   function deactivate(event){
//     var keyCode = event.keyCode;
//     if (keyCode === 37){
//       moveLeft = false;

//     }else if(keyCode === 38){
//       moveUp = false;
//     } else if (keyCode === 39){
//       moveRight = false;
//     }else if (keyCode === 40){
//       moveDown = false;
//     }
//   }
//   function enable() {
//     input_score.removeAttribute('disabled')
//   }
 
    
//   function stop(){
//     clearInterval(interval_id);
//     if (confirm("You Died! Click Okay to input score or Cancel to restart", 500, 300) == true) {
//     window.removeEventListener('keydown', activate, false);
//     window.removeEventListener('keyUp', deactivate, false);
//     canvas.style.visibility = 'hidden';
//     form.style.visibility = 'visible';
//     input_score.removeAttribute('disabled');
//     input_score.value = score;
//     input_score.setAttribute('disabled', 'disabled');
//     }
//     else{
//       location.reload();
//     }
//     console.log (player.x, player.y);

//   }
  
    
//   function getRandomNumber(min, max) {
//         return Math.round(Math.random() * (max - min)) + min;
//   }
  
  
  
//  })();
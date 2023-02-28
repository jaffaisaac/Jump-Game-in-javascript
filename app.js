let ball =document.querySelector('#ball');
let ballBottom =parseInt(window.getComputedStyle(ball).getPropertyValue('bottom'));
let ballRight=parseInt(window.getComputedStyle(ball).getPropertyValue('right'));
let ballWidth=parseInt(window.getComputedStyle(ball).getPropertyValue('width'));

let ground =document.getElementById('ground');
let groundBottom =parseInt(window.getComputedStyle(ground).getPropertyValue('bottom'));
let groundHeight =parseInt(window.getComputedStyle(ground).getPropertyValue('height'));

let isJumping = false;
let UpTime;
let DownTime;

let displayScore =document.getElementById('score');
let score =0;

function jump(){
    if(isJumping) return;
    UpTime= setInterval(()=>{

        //this2 line below determiin the distance to which the ball is to bounce up
        if(ballBottom >= groundHeight + 250){
            clearInterval(UpTime);
            DownTime =setInterval(()=>{
                if(ballBottom <= groundHeight + 7)
                {
                    clearInterval(DownTime);
                    isJumping= false;
                }
                ballBottom -= 10;
        ball.style.bottom =ballBottom +'px';
            },20)
        }

        ballBottom += 10;
        ball.style.bottom =ballBottom +'px'; //read more
        isJumping =true;
    },20);
}
function GenerateObstacle(){
    let obstacles = document.getElementById('obstacle');
    let CreateObstacle = document.createElement('div');
    CreateObstacle.setAttribute('class','CreateObstacle');
    obstacles.appendChild(CreateObstacle);


    let obstacleRight = 0;
    let obstacleBottom = 100;

    let obstacleWidth = 40;
    let obstacleHeight = Math.floor(Math.random() * 50) +40;
    
    CreateObstacle.style.background =`rgb(${Math.floor(Math.random() *255)},${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)})`;

    function movingObstacle(){
        obstacleRight += 5;
        CreateObstacle.style.right = obstacleRight + 'px';
        CreateObstacle.style.bottom = obstacleBottom + 'px';
        CreateObstacle.style.width = obstacleWidth + 'px';
        CreateObstacle.style.height = obstacleHeight + 'px';

        if(ballRight >= obstacleRight - ballWidth && ballRight <= obstacleRight + ballWidth && ballBottom <= obstacleBottom + obstacleHeight )
        {
            alert(`Game Over, You score is : `+ score);
            clearInterval(obstacleIntervel);
            clearInterval(obstacleTimeOut);
            location.reload();
          
        }

    }
    let obstacleIntervel = setInterval(movingObstacle,20);
    let obstacleTimeOut = setTimeout(GenerateObstacle, 1000);

       
}
        function ShowScores(){
            score++;
            displayScore.innerHTML=score;
        }
        setInterval(ShowScores,100);
GenerateObstacle();
function controll(event){
    if(event.key == 'ArrowUp' || event.key == '')
    {
        jump();
    }
}
document.addEventListener('keydown',controll);
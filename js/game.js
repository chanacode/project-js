var combinedClass,yy,xx;
var iTimes=0;
var returnArr=[];
var count=0,count2=0;
var timerInterval


window.onload = function () 
{
    // var combinedClass,yy,xx;

    const images = [ '../images/a1.png', '../images/a2.png', '../images/a3.png', '../images/a4.png', '../images/a5.png', '../images/a6.png' ];
    const images2 = ['../images/b1.png', '../images/b2.png','../images/b3.png', '../images/b4.png','../images/b5.png', '../images/b6.png'];
    const names1 = [ "a1", "a2", "a3", "a4", "a5", "a6" ];
    const names2 = [ "b1","b2","b3","b4","b5","b6"];


 
    
    for(let i=0; i<images.length; i++)
     {
        const img = document.createElement('img');
        img.src = images[i];
        img.classList.add(names1[i]);
        document.getElementById('imageContainer').appendChild(img);
    }

    for(let i=0; i<images2.length; i++) 
    {
        const img2 = document.createElement('img');
        img2.src = images2[i];
        img2.classList.add(names2[i]);
        document.getElementById('imageContainer2').appendChild(img2);
    }

    
    function levels() 
    {
        const replys = [];
        if (localStorage.getItem('currentLevel') == "level1") {
            replys[0] = 10;//טיימר
            replys[1] = 3;//קלפים למעלה 
            replys[2] = 5;//מספר סיבובים
            replys[3] = 3;//קלפים למטה 
        }
        if (localStorage.getItem('currentLevel') == "level2") {
            replys[0] = 7;
            replys[1] = 2;
            replys[2] = 7;
            replys[3] = 4;
        }
        if (localStorage.getItem('currentLevel') == "level3") {
            replys[0] = 5;
             replys[1] =0;
            replys[2] = 10;
            replys[3] = 7;
        }
        return replys;
    }
    returnArr = levels();


     const imageContainer = document.getElementById('imageContainer');
     let randomIndex = 0;
    const imageContainer2 = document.getElementById('imageContainer2');
    let randomIndex2 = 0;
    let intervalId;

    function startImageCarousel() 
    {
        
        intervalId = setInterval(showNextImage, 100);
    }
    function showNextImage() 
    {
         randomIndex = Math.floor(Math.random() * (images.length-returnArr[1]));
         randomIndex2 = Math.floor(Math.random() * (images2.length-returnArr[1]));
    
        imageContainer.innerHTML = `<img src="${images[randomIndex]}" alt="Image ${randomIndex + 1}">`;
        imageContainer2.innerHTML = `<img src="${images2[randomIndex2]}" alt="Image ${randomIndex2 + 1}">`;
    }

  
     let isCorrect=document.querySelector('#isCorrect');
     let rotation=document.querySelector('#rotation');
     let record=document.querySelector('#record');
     let points=document.querySelector('#points');
     let sum=0;
  
     let highestScore = JSON.parse(localStorage.getItem('highestScore')) || 0;

     function isCorrectChoosen(button)
      {
         while (iTimes < returnArr[2]) 
         {
             points.innerHTML = "Your points: " + sum;
             let buttonId = button.id;
             console.log("Button ID: " + buttonId);
             
             if (buttonId == combinedClass) {
                 sum += 10;
                 count++;
                 isCorrect.innerHTML = "👍🏻👍🏻👍🏻Excellent!!!👍🏻👍🏻👍🏻";
     
                 // Update highest score if current score is greater
                 if (sum > highestScore) 
                 {
                     highestScore = sum;
                     localStorage.setItem('highestScore', JSON.stringify(highestScore));
                     record.innerHTML = "New Record: " + highestScore;
                 }
             } 
             else 
             {
                 count2++;
                 isCorrect.innerHTML = "👎🏻👎🏻👎🏻Ooopppsss...👎🏻👎🏻👎🏻";
             }
     
             iTimes++;
             rotation.innerHTML ="rotation: " +iTimes + '/' + returnArr[2];
             points.innerHTML = "Your points: " + sum;
     
             console.log(buttonId);
             startImageCarousel();
     
             break;
         }
     
         if (iTimes === returnArr[2]) 
         {
             if (count > count2) 
             {
                 window.location.href = "../html/winner.html";
             } 

             else if (count2 > count)
              {
                 window.location.href = "../html/gameOver.html";
             }
         }
     }
     
     record.innerHTML = "Highest Score: " + highestScore;
    
let totalSeconds = 10;
let timerInterval = null;
let timerElement = document.getElementById('timer');

function countdown() 
{
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  timerElement.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  if (totalSeconds <= 0)
   {
    clearInterval(timerInterval);
    timerElement.innerHTML = 'Timer Expired!';
   } 

  else 
  {
    totalSeconds--;
  }
}

function startTimer()
 {
  if (timerInterval) 
  {
    clearInterval(timerInterval);
  }
  totalSeconds = 10;
  timerInterval = setInterval(countdown, 1000);
}

function stopImageCarousel() 
{
  clearInterval(intervalId);
  startTimer();
  const image1 = document.querySelector('#imageContainer img');
  const image2 = document.querySelector('#imageContainer2 img');

  if (randomIndex == images.length - returnArr[1]) randomIndex = images.length - returnArr[1];
  if (randomIndex2 == images.length - returnArr[1]) randomIndex2 = images.length - returnArr[1];

  yy = names1[randomIndex];
  console.log(yy);
  console.log(randomIndex);
  xx = names2[randomIndex2];
  console.log(xx);
  console.log(randomIndex2);

  combinedClass = yy + xx;
  console.log(combinedClass);

  for (let i = 1; i <= returnArr[3]; i++) {
    for (let j = 1; j <= returnArr[3]; j++) {
      let thisClass = `.a${i}b${j}`;
      let images = document.querySelector(thisClass);
      
      if (images != null) 
      {
        images.setAttribute("class", "new");
        images.addEventListener('click', function() {
          isCorrectChoosen(this);
        });
      }
    }
  }

 
  if (!timerInterval)
   {
    timerInterval = setInterval(countdown, 1000);
  }
}

     
      document.getElementById('stopButton').addEventListener('click', stopImageCarousel);
      startImageCarousel();
      
   iTimes=0;

    }      







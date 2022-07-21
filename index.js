const clockContainner = document.getElementById('digital-clock');
const alarmForm = document.getElementById("alarm-form");
const audio = document.getElementById('myAudio');
const stopButton = document.getElementById("alarm-stop-button");

function setTimeHelper(time) {
  var val = "";
  if(time < 10) {
     val = `0${time}`;
  }
  else {
     val = time;
  }
  return val;
}

// set time to inside digital clock
setInterval(function() {
  const d = new Date();
  clockContainner.innerHTML = `
    <span>${setTimeHelper(d.getHours())}</span>:<span>${setTimeHelper(d.getMinutes())}</span>:<span>${setTimeHelper(d.getSeconds())}</span>
  `;
},1000);



function createAlarm(e) {
  e.preventDefault();
  var hourVal = document.getElementById('hour').value;
  var minVal = document.getElementById('minute').value;
  var secondVal = document.getElementById('second').value;
  const AlaramLists = document.getElementById('alarm-list');
  
  var list = document.createElement('li');
  list.innerHTML = `
     <span>${hourVal}:${minVal}:${secondVal}</span>
  `;

  // append to upcoming alarm clock list
  AlaramLists.append(list);

  // start alarm
  var interval = setInterval(function() {
    //  get Date 
    const d = new Date();
    if((hourVal == d.getHours() && minVal == d.getMinutes()) &&  d.getSeconds() >= secondVal) {
      audio.play();
    }

    if(d.getMinutes() > minVal) {
      console.log("cleared");

      // clear interval
      clearInterval(interval);

       // remove list element after alarm has rang 
       AlaramLists.removeChild(AlaramLists.firstElementChild);
    }
    
    // stop and clear interval
    stopButton.addEventListener('click' , function(){
      audio.pause();
      clearInterval(interval);
    });
    
   
  },1000);
}




// create alarm from 
alarmForm.addEventListener('submit', createAlarm);
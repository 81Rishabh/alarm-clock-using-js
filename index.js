const form = document.getElementById("alarm-form");
const dateTime = document.getElementById("dateTime-local");
const Ring = document.getElementById("myAudio");
const d = new Date();


function setAlarm(e) {
  e.preventDefault();

  //   get alarm time
  var alarmDate = new Date(dateTime.value);

  //   get current time
  let currTime = new Date();
  //   get Time to set alarm
  let TimeToAlarm = alarmDate - currTime;

  if (TimeToAlarm >= 0) {
     setTimeout(function() {
        Ring.play();
     } , TimeToAlarm);
  }

 


  //  render set alarms lists to dom
  //  convert numeric time to local time string - 83948344 to 12:32 pm somthing like this
  let alarmTime = alarmDate.toLocaleTimeString();
  let currMinute = new Date(alarmDate).getMinutes();
  let currHour = new Date(alarmDate).getHours();
  let prevMinute = new Date(currTime).getMinutes();
  let prevHour = new Date(currTime).getHours();
  const { hour, minute } = getAlarmTime(
    prevMinute,
    prevHour,
    currHour,
    currMinute
  );
  renderAlarmListToDom(alarmTime, hour, minute);
  const listItems = document.getElementById("alarm-list");
  
  let interval = setInterval(() => {
      var getTimeInMiliSecond = Date.now();
      var date = new Date(getTimeInMiliSecond);
      var getAlaramMinutes = new Date(alarmDate).getMinutes();
      var getMinutes = date.getMinutes();
      
      if(getAlaramMinutes == getMinutes) {
          clearInterval(interval);
          setTimeout(function() {
            removeAlarmListItem(listItems);
        } , TimeToAlarm / 2);
    }
 }, 1000);
}

function removeAlarmListItem(listItems) {
    listItems.removeChild(listItems.firstElementChild);
}


// get Alarm Time in string like (alarm Rings in 1 hr 20 min like this)
function getAlarmTime(prevMinute, prevHour, currHour, currMinute) {

  let minute, hour;
  if (prevHour == currHour) {
    minute = Math.abs(prevMinute - currMinute);
    hour = 0;
  } else {
    minute = 60 - prevMinute + currMinute;
    hour = Math.abs(prevHour - currHour);
  }
  return {
    hour,
    minute,
  };
}

function renderAlarmListToDom(time, hour, minute) {
  var getTimeString = time.split(" ")[0];
  var getAmPm = time.split(" ")[1];
  var ul = document.getElementById("alarm-list");
  var li = document.createElement("li");
  let currentHour, currMinute;
  
  if (minute == 60) {
    currMinute = "";
    currentHour = `${hour} hr`;
  } else if (minute > 60) {
    currentHour = `${hour} hr`;
    currMinute = `${Math.abs(60 - minute)} minute`;
  } else {
    currentHour = "";
    currMinute = `${minute} minute`;
  }
  


  li.innerHTML = `
       <span id="time">${getTimeString}<span>
       <span id="am-pm">${getAmPm}<span>
       <span style="font-size:.8rem;float : right">Rings in ${currentHour} ${currMinute} </span>
    `;

  // append list item to <ul>
  ul.append(li);
}

// fire evenet and stop alarm clock
// stop alarm
document
  .getElementById("alarm-stop-button")
  .addEventListener("click", function () {
    Ring.pause();
    form.reset();
  });

//  adding event to the form
form.addEventListener("submit", setAlarm);

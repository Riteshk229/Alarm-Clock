
//List to show the stored alarm
var myList = document.querySelector('#myList');
//new Alarm
var addAlarm = document.querySelector('.setAlarm');

//List to store the alarms
var alarmList = [];


//Alarm Notification
function AlarmRinging(h2){
    alert(`Hey the Time is ${h2}`);
}


//To display current time
var h2 = document.getElementById('clock');

//To add zero in-front if required
function zeroPad(num) {
    var length = num.toString().length;
    if(length <= 2){
        return num.toString().padStart(2, "0");
    }
    else{
        return num
    }
  }

//Time Function
function crtime(){

    var now = new Date();
    var hours ;
    var minutes = now.getMinutes();
    var sec = now.getSeconds();

    var ampm = (now.getHours()) < 12 ? "AM" : "PM";
    
    if(now.getHours()  <= 12 ){
        hours = now.getHours();
    }
    else {
        hours = now.getHours() - 12;
    }

    h2.innerText = zeroPad(hours) + ":" +  zeroPad(minutes) + ":" + zeroPad(sec) + " " + ampm;

    now = h2.innerText;

    //Checking if the alarm time matches with the current time
    if(alarmList.includes(now) ){
        AlarmRinging(now);
    } 
}

//Current Time ticker
var currentTime = setInterval(crtime,1000);


//New Alarm 
addAlarm.addEventListener('submit', e =>{
    //Stops the page from Reloading
    e.preventDefault();
    
    var new_h = zeroPad(addAlarm.alh.value);
    var new_m = zeroPad(addAlarm.alm.value);
    var new_s = zeroPad(addAlarm.als.value);
    var ampm = addAlarm.ampm.value;
    
    var newAlarm = `${new_h}:${new_m}:${new_s} ${ampm}`;

    //Add newAlarm to alarmList
    if(isNaN(newAlarm)){
        if(!alarmList.includes(newAlarm)){
            alarmList.push(newAlarm);
            console.log(alarmList);
            console.log(alarmList.length);
            showNewAlarm(newAlarm);
            addAlarm.reset();
        } else{
            alert(`Alarm for ${newAlarm} already set.`);
        }
    }    
});

//Function to display the list of alarm
function showNewAlarm(newAlarm){
    const html =`
    <li class = "time-list"> 
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm time-control" id="delete-button" value=${newAlarm} onclick = "removeAlrm(this.value)">Delete Alarm</button>          
    </li>`
    myList.innerHTML += html
};


//To remove the deleted Alarm 
myList.addEventListener('click', e=> {
    // console.log("removing element")
    if(e.target.classList.contains("deleteAlarm")){
        e.target.parentElement.remove();
    }    
})


//Removes an alarm from the array when "Delete Alarm" is clicked
function removeAlrm(value) {
    let newList = [];

    for(var i = 0; i <alarmList.length ;i++){
        if(!alarmList[i].includes(value)){
           newList.push(alarmList[i]);
        }
    }

    alarmList=newList;
    
    // console.log("newList", newList);
    // console.log("alarmList", alarmList);
}
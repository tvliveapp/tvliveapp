var idleTime = 0;
var idleTimeCounter = 2000; //After 2sec ideal state starts, if no user event detected
var _msg = "" ;
var _class = "userOnline";
var _userIdleThreshold = 5 ; // After _userIdleThreshold * idleTimeCounter  "sec" user will count as Idle
function clearNavInterval(){
	clearTimeout(idleInterval);
}
var idleInterval;
function navInterval(){
    idleInterval = setInterval(timerIncrement,idleTimeCounter); 
    //Zero the idle timer on mouse movement.
}
function myMove (e) {
        idleTime = 0;		
	 console.log('active');
	 debug('active');
}

function timerIncrement() {
    idleTime = idleTime + 1; 
    console.log(idleTime);
	debug(idleTime);
	if (idleTime > _userIdleThreshold) {     debug('Inactive');    
		console.log('Inactive');
		closeNav();		
    }
}
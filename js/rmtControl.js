var myTimer;
var cnt=0;
var volumeLevel=0.5;
var lasChannel=1;
var embedPlayer;
valTime=2;


function loadPlayer(isEmbed,nChan){
	embedPlayer=isEmbed;
	try{init(nChan);}
	catch(e){
		debug('load player error');
	}
	
}



$(document).ready(function() {
	doAction(lasChannel);
	numberLbl=document.getElementById('numberLbl');
	
	$(document).on('keypress', function(event) {
		event.preventDefault();
		//newKey(event.key);
		var key = event.keyCode;
		debug('keyup:'+key);
		//console.log(key);
	});
	$(document).on('keydown', function(event) {
		event.preventDefault();
		var key = event.keyCode;
		debug('keydown:'+key);
		newKey(list(key));
		//alert(list(key));
		
	});
});

function onTimer() {
  cnt=cnt+1;
  console.log(cnt);
  if(cnt>valTime)
		timerStop();
}

function timerStop() {
  clearInterval(myTimer);
  doAction(buffer.join(''));
  cnt=0;
  console.log('valueOf='+buffer.join(''));
  numberLbl.innerHTML='';
  buffer=[];
}
function timerInit() {
  cnt=0;
  clearInterval(myTimer);
  myTimer=setInterval(onTimer, 1000);
}
var lbTimer;
function setLblTimer(msg){
	numberLbl.innerHTML=msg;
	clearInterval(lbTimer);
	lbTimer=setInterval(clearLblTimer, 2000);
}
function clearLblTimer(){
	numberLbl.innerHTML='';
	clearInterval(lbTimer);
}
var buffer = [];
function doAction(val){
	if(!isNaN(+val))
		switch(val) {
		  case '0':
			//code block
			openNav();
			break;
		  case '00':
			// code block
			window.location.reload();
			break;
		  default:
			try {
				
				var targLink    =document.getElementsByName('ch'+val)[0];
				 var clickEvent  = document.createEvent ('MouseEvents');
				clickEvent.initEvent ('dblclick', true, true);
				targLink.dispatchEvent (clickEvent);
				
				lasChannel=val;
				localStorage.setItem('lasChannel',val);
			}catch(err) {
				 console.log('No channel');
				 
			}
	}else{
		console.log('presiono '+val);
		try{ player=document.getElementsByTagName('iframe')[0];
	}catch(e){
		
	}
		
		switch(val) {
		  case 'arrowup':
			// code block
			
				if(volumeLevel<1.0)
					volumeLevel+=0.1;
				else volumeLevel=1.0;
				if (embedPlayer)
				 sendMessage('volUp|'+volumeLevel);
				else 
					playerVol(volumeLevel);
				setLblTimer('vol '+ Math.ceil(volumeLevel*100));
			
			break;
		  case 'arrowleft':
		    channelDown();
			break;
		  case 'arrowright':
		    channelUp();
			break;
		  case 'arrowdown':
		    
				if(volumeLevel>0.0)
					volumeLevel-=0.1;
				else volumeLevel=0.0;
				if (embedPlayer)
				 sendMessage('volUp|'+volumeLevel);
			    else
					playerVol(volumeLevel);
				 setLblTimer('vol '+ Math.ceil(volumeLevel*100));
			
			break;
		  default:
			//try{
			
			//}catch{}
		}
		try{saveData();}catch(e){}
	}
}

/*
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

   
    let lastKeyTime = Date.now();

    document.addEventListener('keydown', event => {
        const charList = 'abcdefghijklmnopqrstuvwxyz0123456789';
        const key = event.key.toLowerCase();
		keyInterval();
        // we are only interested in alphanumeric keys
        if (charList.indexOf(key) === -1) return;


        buffer.push(key);

        console.log(buffer);
    });
});
*/
var numberLbl;
var player;
code={'0':'menu','00':'reload'};
function newKey (evnt) {
     const nbList = '0123456789';
	 
	 const charList = '-abcdefghijklmnopqrstuvwxyz0123456789';
	
	  const key = evnt.toLowerCase().replace('num ','')
	//if(key=='0') ch=''
	//else
		ch='ch '
	
	if(!clsd){
		if (nbList.search(key)>=0){
			timerInit();
			buffer.push(key);
			nC=buffer.join('');
			if(nC.search('0')==0)
				numberLbl.innerHTML=code[nC];
			else
				numberLbl.innerHTML=ch+nC;
		}else if (key=='enter')
			timerStop();
		else
			doAction(key);
    }else{
		try{
			tg=document.getElementById('mySearch');
			if (charList.search(key)>0 || key==' '){
				
				value=tg.value;
				
					tg.value=value+key;
					
			}else if(key=='backspace')
				tg.value = tg.value.substr(0, tg.value.length-1);
		}catch(e){
			debug('error');
		}
	}
	console.log(key);
	console.log(buffer);
	
}



// Send a message to the child iframe
        var sendMessage = function(msg) {
            // Make sure you are sending a string, and to stringify JSON
            player.contentWindow.postMessage(msg, '*');
        };
        // Send random messge data on every button click
        
        // Listen to message from child window
        bindEvent(window, 'message', function (e) {
            newKey ( list(parseInt(e.data)));
        });

// addEventListener support for IE8
        function bindEvent(element, eventName, eventHandler) {
            if (element.addEventListener){
                element.addEventListener(eventName, eventHandler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + eventName, eventHandler);
            }
        }

		
function list(a) {
 	switch (a) {
    	case 27: return 'Esc'; break;
    	case 112: return 'F1'; break;
    	case 113: return 'F2'; break;
    	case 114: return 'F3'; break;
    	case 115: return 'F4'; break;
    	case 116: return 'F5'; break;
    	case 117: return 'F6'; break;
    	case 118: return 'F7'; break;
    	case 119: return 'F8'; break;
    	case 120: return 'F9'; break;
    	case 121: return 'F10'; break;
    	case 122: return 'F11'; break;
    	case 123: return 'F12'; break;
    	case 145: return 'Scr Lk'; break;
    	case 19: return 'Pause break'; break;
    	case 45: return 'ins'; break;
    	case 46: return 'del'; break;
    	case 36: return 'Home'; break;
    	case 35: return 'End'; break;
    	case 33: return 'Page up'; break;
    	case 34: return 'Page down'; break;
    	case 192: return '~'; break;
    	case 49: return '1'; break;
    	case 50: return '2'; break;
    	case 51: return '3'; break;
    	case 52: return '4'; break;
    	case 53: return '5'; break;
    	case 54: return '6'; break;
    	case 55: return '7'; break;
    	case 56: return '8'; break;
    	case 57: return '9'; break;
    	case 48: return '0'; break;
    	case 189: return '-_'; break;
    	case 173: return '-_'; break;
    	case 187: return '=+'; break;
    	case 61: return '=+'; break;
    	case 8: return 'Backspace'; break;
    	case 144: return 'Num Lock'; break;
    	case 111: return 'num /'; break;
    	case 106: return 'num *'; break;
    	case 109: return 'num -'; break;
    	case 9: return 'Tab'; break;
    	case 81: return 'Q'; break;
    	case 87: return 'W'; break;
    	case 69: return 'E'; break;
    	case 82: return 'R'; break;
    	case 84: return 'T'; break;
    	case 89: return 'Y'; break;
    	case 85: return 'U'; break;
    	case 73: return 'I'; break;
    	case 79: return 'O'; break;
    	case 80: return 'P'; break;
    	case 219: return '[{'; break;
    	case 221: return ']}'; break;
    	case 220: return '|\\'; break;
    	case 103: return 'num 7'; break;
    	case 104: return 'num 8'; break;
    	case 105: return 'num 9'; break;
    	case 107: return 'num +'; break;
    	case 20: return 'Caps Lock'; break;
    	case 65: return 'A'; break;
    	case 83: return 'S'; break;
   		case 68: return 'D'; break;
   		case 70: return 'F'; break;
   		case 71: return 'G'; break;
   		case 72: return 'H'; break;
   		case 74: return 'J'; break;
   		case 75: return 'K'; break;
   		case 76: return 'L'; break;
   		case 59: return ';:'; break;
   		case 186: return ';:'; break;
   		case 222: return '\'"'; break;
   		case 100: return 'num 4'; break;
   		case 101: return 'num 5'; break;
   		case 102: return 'num 6'; break;
   		case 90: return 'Z'; break;
   		case 88: return 'X'; break;
   		case 67: return 'C'; break;
   		case 86: return 'V'; break;
   		case 66: return 'B'; break;
   		case 78: return 'N'; break;
   		case 77: return 'M'; break;
   		case 188: return ',<'; break;
   		case 190: return '.>'; break;
   		case 191: return '/?'; break;
   		case 96: return 'num 0'; break;
   		case 32: return ' '; break;
   		case 93: return 'menu'; break;
   		case 38: return 'arrowup'; break;
   		case 40: return 'arrowdown'; break;
   		case 37: return 'arrowleft'; break;
   		case 39: return 'arrowright'; break;
   		case 110: return 'num .'; break;
   		case 97: return 'num 1'; break;
   		case 98: return 'num 2'; break;
   		case 99: return 'num 3'; break;
   		case 0: return 'Left Click'; break;
   		case 1: return 'Scroll Click'; break;
   		case 2: return 'Right Click'; break;
   		case 16: return 'Shift'; break;
   		case 18: return 'ALT'; break;
   		case 17: return 'CTRL'; break;
   		case 91: return 'WIN'; break;
   		case 13: return 'Enter'; break;
   		case 44: return 'Prt Sc'; break;
	}
}
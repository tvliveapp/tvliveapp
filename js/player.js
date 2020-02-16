
newSource='';
try {
newSource=window.location.search.substr(1).split("|")[1];
}
catch(err) {
  console.log('no source');

  newSource='https://ul.cdn946.net:8443/hls/waqq3o4.m3u8?s=FCJfm33jyuVM--A9le5AjA&e=1566440061';
}
if (newSource=='') 
	newSource='https://ul.cdn946.net:8443/hls/waqq3o4.m3u8?s=FCJfm33jyuVM--A9le5AjA&e=1566440061';	
}
lastSource=decodeURI(newSource).replace(/\s+/g, '');

function loadjscssfile(filename, filetype){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        //fileref.setAttribute("type","text/javascript")
        fileref.innerHTML=  myTxt.split('lastSource').join(lastSource);
    }
    
	document.getElementsByTagName("body")[0].appendChild(fileref)
}
 



/***********/


function onLoad(){
	 
//loadjscssfile("myscript.js", "js") //dynamically load and add 
	 loadVideo(lastSource);
	// get the first player
	//var player = flowplayer();
	//player.load(lastSource);
}

var myTxt="delete player;var player=flowplayer('#video-background', {live: true,autoplay: true,clip: {sources:[{type:'application/x-mpegURL',src:'lastSource'},{type:'application/x-mpegurl',src:'lastSource'},{src:'lastSource'},]}});player.on('error', function(e) {console.log('ini');});";



 function loadVideo(vidSrc){
delete player;var player=flowplayer('#video-background', {live: true,autoplay: true,clip: {sources:[{type:"application/x-mpegURL",src:lastSource},{type:"application/x-mpegurl",src:lastSource},{src:lastSource},]}});player.on('error', function(e) {console.log('ini');})}
 
 
	

var url = 'https://raw.githubusercontent.com/tvliveapp/channels/master/spZone.json';
var storedText;
var streamLink;
var allChannels;


/* 
var md = new MobileDetect(window.navigator.userAgent);
*/
/*
if(md.os()=='AndroidOS'){
	
  if(md.ua.search('tvliveAppV.1')>0);
  else{
	  
	window.location.href = "/html/app.html";
	  
  }

}*/
	
	



function updateChanne(source){
	document.getElementById('video-backgroun').src=source;
}
/*
function getVideoLink(source,sLink){
	console.log(source,sLink);
	vidUrl='/?'+source+'|'+sLink;
	document.getElementById('video-backgroun').src=vidUrl;
}

function getVideoLink(source,sLink,elem){
	console.log(source,sLink);
	vidUrl='?'+source+'|'+sLink;
	//document.getElementById('leo').innerHTML=vidUrl;
	lasChannel=parseInt(elem.id.replace('ch',''));
	//setLblTimer('ch '+lasChannel);
	fetch(vidUrl)
  .then(function(response) {
    response.text().then(function(text) {
     // resp = decodeURI(text).replace(/\s+/g, '');
	  updateChannel(text);
	//  loadVideo(resp);
      console.log(text); 
    });
  });
	
}
*/
//var video = document.getElementById("video-background");
function OnLoad(){
	//<input  class='show' type="text" placeholder="Search.." id="mySearch" onkeyup="filterFunction()">
	src=document.createElement('input');
	src.type='text';
	src.placeholder="Search..";
	src.id="mySearch";
	f="filterFunction()";
	src.setAttribute('onkeyup',f);
	document.getElementById('show').appendChild(src);
	closeNav();

	//"nowlive|http://nowlive.pro/1/101.html
	//getVideoLink('nowlive','http://nowlive.pro/1/101.html');


	 //loadVideo(lastSource);
	// get the first player
	//var player = flowplayer();
	//player.load(lastSource);
}
/*
var player='';

var elem; 

var player;

 function loadVideo(vidSrc){
	delete player;
	player=flowplayer('#video-background', {
           live: true,  // set if it's a live stream          
            autoplay: true,
			//ratio: 9/16, // set the aspect ratio of the stream
            clip: {
                sources: [
                    // path to the HLS m3u8
					
                    { 
					src: lastSource,
					engine:"html5"
					},
                    // path to an optional MP4 fallback
					{ type: "application/x-mpegurl",
					src: 'http://158.69.116.209:8992/live/DescargaNuestraAppTvPato2PuntoCom/8DD10D9124094ADA93150746AFEB8862/1.m3u8',
		engine:"html5"
					}
                ]
            }
        });
	player.on('error', function() {
  // playback ended
  console.log('ini');
})
	lastSource=vidSrc;
	player.load(vidSrc);
	player.play();
	
 }
 */
 var clsd=false;
function getUrl(sturl){
fetch(sturl)
  .then(function(response) {
    response.text().then(function(text) {
      streamLink = text;
      updateChannel();
    });
  });
}


	 

	function filterFunction() {
  var input, filter, ul, li, a, i;
  myMove();
  input = document.getElementById("mySearch");
  filter = input.value.toUpperCase();
  div = document.getElementById("chnList");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    //a=li[i].getElementsByTagName('a');
	txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}
/******INICIO******/
function onLoad(){
	getData();
	label=document.getElementById('numberLbl');
	chnCnt=document.getElementById('chnList');
	player=document.getElementById('playerCtn');
	loadChannels(chnCnt,player,label);
	//openNav();
    //openNav();
	
	
	
}	

/*****openNav****/
/*
function openNav() {
  //dropdown.classList.toggle("active");
  
  if (dropdownContent.style.display === "block") {
	dropdownContent.style.display = "none";
	chnSrch.style.opacity = "0.1";
	chnSrch.style.left="0%";
  } else {
	dropdownContent.style.display = "block";
	chnSrch.style.opacity = "1";
	chnSrch.style.left="20%";
  }

} */

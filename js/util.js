var url = 'https://raw.githubusercontent.com/tvliveapp/channels/master/spZone.json';
var storedText;
var streamLink;
var allChannels;
var player;
var lasChannel;
var md = new MobileDetect(window.navigator.userAgent);

//alert(window.navigator.userAgent);
hash="";
if(hash!=window.location.hash)
	hash=window.location.hash;
if(md.os()=='AndroidOS'){
  res= window.confirm('Se ha detectado un sistema ANDROID desea abrir el sitio para ANDROID');
	if (res)
		window.location.href = "/html/index.html"+hash;
  /*
  if(md.ua.search('tvliveAppV.1')>0);
  else{
	  
	window.location.href = "/html/app.html";
	  
  }*/

}else if(window.navigator.userAgent.toUpperCase().search('TV')>-1){
	res= window.confirm('Se ha detectado un TV Smart desea abrir el sitio para TV');
	if (res)
			window.location.href = "/html/index.html"+hash;
}
	
	

var isOpen=false;
console.log(window.location.search.substr(1));
fetch(url)
  .then(function(response) {
    response.text().then(function(text) {
      storedText = text;
      done();
    });
  });

function done() {
  
  
  allChannels =JSON.parse(storedText);
  
  Object.keys(allChannels).forEach(function(id) {
		
		  //console.log(element);
		  addItem(id,allChannels[id]);
	
		
	});
  
  
}

function updateChannel(source){
	document.getElementById('video-backgroun').src=source;
}
/*
function getVideoLink(source,sLink){
	console.log(source,sLink);
	vidUrl='/?'+source+'|'+sLink;
	document.getElementById('video-backgroun').src=vidUrl;
}*/

function getVideoLink(sLink,elem){
	if(sLink!='')
		localStorage.setItem('lastSource',sLink);
	updateChannel("?player=1");
	//  loadVideo(resp);
      console.log(sLink); 
    
}

//var video = document.getElementById("video-background");
function onLoad(){
	//<input  class='show' type="text" placeholder="Search.." id="mySearch" onkeyup="filterFunction()">
	document.getElementById('numberLbl').innerHTML=md.os();
	loadPlayer(true);
	player=player=document.getElementsByTagName('iframe')[0];
	src=document.createElement('input');
	src.type='text';
	src.placeholder="Search..";
	src.id="mySearch";
	f="filterFunction()";
	src.setAttribute('onkeyup',f);
	document.getElementById('show').appendChild(src);
	closeNav();

	//"nowlive|http://nowlive.pro/1/101.html
	getVideoLink('','');


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


	function openNav() {
		if(!clsd){	
			clsd=true;
			var w = window,
			d = document,
			e = d.documentElement,
			g = d.getElementsByTagName('body')[0],
			x = w.innerWidth || e.clientWidth || g.clientWidth,
			y = w.innerHeight|| e.clientHeight|| g.clientHeight;
			myNav=document.getElementById("myNav");
			var percent = "20%";
			myNav.style.width = percent;
			mySearch=document.getElementById("mySearch");
			mySearch.style.width = "18%";
			
			navInterval();
			mySearch.style.visibility= "visible";
			//mySearch.focus();
			//mySearch.select();
			/*
			clsNav=document.getElementById("clsNav");
			clsNav.style.visibility = "visible";
			clsNav.style.left= (parseFloat(percent)*x / 100.0).toString()+'px';
			*/
		}else{
			clsd=false;
			closeNav();
		}	
		//api.load("http://edge.flowplayer.org/playful.mp4");
	}

	function closeNav() {
		mySearch=document.getElementById("mySearch");
		document.getElementById("myNav").style.width = "0%";
		mySearch.style.visibility = "hidden";
		mySearch.style.width = "0%";
		mySearch.value='';
		clearNavInterval();
		filterFunction();
      
	}
	 

	function filterFunction() {
  var input, filter, ul, li, a, i;
  myMove();
  input = document.getElementById("mySearch");
  filter = input.value.toLowerCase();
  div = document.getElementById("myNav");
  li = div.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    a=li[i].getElementsByTagName('a');
	txtValue = a[0].textContent || a[0].innerText;
    if (txtValue.toLowerCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

function channelUp(){
	
	lasChannel=parseInt(lasChannel)+1;
	if(lasChannel> chNumber || isNaN(lasChannel))
		lasChannel=1;
			doAction(lasChannel);
			setLblTimer('ch '+lasChannel);
}

function channelDown(){
	 lasChannel=parseInt(lasChannel)-1;
	 if(lasChannel<1)
		lasChannel= chNumber;
			doAction(lasChannel);
			setLblTimer('ch '+lasChannel);
	
}
	 
window.ifrFcn = function (item) {
   alert("I was called from a child iframe: "+item);
}

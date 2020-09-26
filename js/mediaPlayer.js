const vidPoster='https://media0.giphy.com/media/17mNCcKU1mJlrbXodo/giphy.gif';
var lastVol=0.5;
var nChannels;
function init(nChan){
	nChannels=nChan;	
}
function loadChannel(chnUrl){
	/*
	video=document.createElement('video');
	//video.src=vidSrc;
	video.autoplay=true;
	video.loop=true;
	video.poster=vidPoster;
	//video.classList.add('video-js');
	source=document.createElement('source');
	sourceF=document.createElement('source');
    source.setAttribute('src', chnUrl);
	source.setAttribute('type', 'application/x-mpegURL');
	//source.addEventListener('error', function() {
   //     alert('uh oh');
    //});
	sourceF.setAttribute('src', noStream);
	sourceF.setAttribute('type', 'video/mp4');
	vidPlayer.innerHTML='';
	video.appendChild(source);
	video.appendChild(sourceF);
	vidPlayer.appendChild(video);
	video.play();
	*/
	url=chnUrl.split("|")[0];
	widevineURL="";
	var src={file:url};
	
	if(chnUrl.split("|")[1]!=undefined){
		widevineURL=chnUrl.split("|")[1];
	    src={
                    "default": false,
					"file":url,
					"drm": {
                       "widevine": {
                            "url": widevineURL
                       }
                   }
                   , "label": "0", "type": "mpd"
               };
	var playerInstance=jwplayer("videoPlayer"); 
        playerInstance.setup( {
            playlist: [ {
            title : "TVLIVEAPP",
             description: "FREE TV",
             image: "https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif",
                "sources": [src]
           }
           ], enableFullscreen: false,width: "100%",  height: "100%", aspectratio: "16:9", controlbar:false,autostart: true, abouttext: "TVLIVEAPP",	 	 
             aboutlink: "TVLIVEAPP", cast: {}
           ,
          skin: {
       name: "bekle",
       active: "orange",
       inactive: "pink",
       background: ""
    }
       }
       );
	}
function playerVolDown(){
	console.log('volDonw');
	vidPlayer.getElementsByTagName('video')[0].volume=0;
}
function playerVolUp(){
	vidPlayer.getElementsByTagName('video')[0].volume=1;
	console.log('volUp');
}
function playerVol(val){
	vidPlayer.getElementsByTagName('video')[0].volume=val;
	console.log('vol');
	lastVol=val;
}



function channelUp(){
	
	lasChannel=parseInt(lasChannel)+1;
	if(lasChannel>nChannels || isNaN(lasChannel))
		lasChannel=1;
			doAction(lasChannel);
			setLblTimer('ch '+lasChannel);
}

function channelDown(){
	 lasChannel=parseInt(lasChannel)-1;
	 if(lasChannel<1)
		lasChannel=nChannels;
			doAction(lasChannel);
			setLblTimer('ch '+lasChannel);
	
}

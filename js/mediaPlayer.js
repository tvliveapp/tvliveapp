const vidPoster='https://media0.giphy.com/media/17mNCcKU1mJlrbXodo/giphy.gif';
var lastVol=0.5;
var nChannels;
function init(nChan){
	nChannels=nChan;
	
}
function loadChannel(chnUrl){
	
	//video=document.createElement('video');
	video=document.getElementById('player');
	player.children[0].src=chnUrl;
	player.load();
	//video.src=vidSrc;
	/*
	video.autoplay=true;
	video.loop=true;
	video.poster=vidPoster;
	video.id="video";
	vidPlayer.innerHTML='';
	vidPlayer.appendChild(video);
	if(chnUrl.search("mpd")<0){
	 if (Hls.isSupported()) {
	    var hls = new Hls();
	    hls.loadSource(chnUrl);
	    hls.attachMedia(video);
	    hls.on(Hls.Events.MANIFEST_PARSED, function() {
	      video.play();
	    });
	  }
	  // hls.js is not supported on platforms that do not have Media Source
	  // Extensions (MSE) enabled.
	  //
	  // When the browser has built-in HLS support (check using `canPlayType`),
	  // we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video
	  // element through the `src` property. This is using the built-in support
	  // of the plain video element, without using hls.js.
	  //
	  // Note: it would be more normal to wait on the 'canplay' event below however
	  // on Safari (where you are most likely to find built-in HLS support) the
	  // video.src URL must be on the user-driven white-list before a 'canplay'
	  // event will be emitted; the last video event that can be reliably
	  // listened-for when the URL is not on the white-list is 'loadedmetadata'.
	  else if (video.canPlayType('application/vnd.apple.mpegurl')) {
	    video.src = chnUrl;
	    video.addEventListener('loadedmetadata', function() {
	      video.play();
	    });
	  }
	
	}else{
		data=chnUrl.split("|");
		const protData = {
            		"com.widevine.alpha": {
                		"serverURL": data[1]
            		}
		};
		var video, player;
            	url = data[0];
		video = document.getElementById('player');
		player = dashjs.MediaPlayer().create();
		player.initialize(video, url, true);
		player.setProtectionData(protData);
		player.play();
	}
	*/
	
	
	/*
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
	/*
	data=chnUrl.split("|");
    if (data[1]==undefined){
		if(Hls.isSupported()) {
			var video = document.getElementById('player');
			var hls = new Hls();
			hls.loadSource(data[0]);
			hls.attachMedia(video);
			hls.on(Hls.Events.MANIFEST_PARSED,function() {
			  video.play();
		  });
		}
	}else{
		const protData = {
            "com.widevine.alpha": {
                "serverURL": data[1]
            }
        };
        var video,
            player,
            url = data[0]
        video = document.getElementById('player');
        player = dashjs.MediaPlayer().create();
        player.initialize(video, url, true);
        player.setProtectionData(protData);
		player.play();
	}
	*/
	/*if(window.location.protocol!=chnUrl.split("://")[0]+":"){
		// Store
		localStorage.setItem("reload", "true");
		window.location.href=chnUrl.split("://")[0]+":"+"tvliveapp.herokuapp.com/html/index.html";
       }*/

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

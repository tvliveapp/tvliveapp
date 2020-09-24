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
            url = data[10]
        video = document.getElementById('player');
        player = dashjs.MediaPlayer().create();
        player.initialize(video, url, true);
        player.setProtectionData(protData);
		player.play();
	}

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

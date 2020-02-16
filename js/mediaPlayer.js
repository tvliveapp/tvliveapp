const vidPoster='https://media0.giphy.com/media/17mNCcKU1mJlrbXodo/giphy.gif';
var lastVol=0.5;
var nChannels;
function init(nChan){
	nChannels=nChan;
	
}
function loadChannel(chnUrl){
	
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

chnsUrl = 'https://raw.githubusercontent.com/tvliveapp/channels/master/spZone.json';
var allChannels;
var chnContainer;
var chnLbl;
var vidPlayer
var lastChannel;
var clsd=false;
var optionLst;
var channelList;

//const noStream='https://thumbs.gfycat.com/DelightfulLeadingDobermanpinscher-mobile.mp4';
const noStream='https://video-lga3-1.xx.fbcdn.net/hvideo-ftw3-ash/_nc_cat-1/v/r5_dcooN5oz6fWqwMZkus/live-dash/dash-abr5/2975536482463377.mpd?_nc_rl=AfBv3K-51M0RaYOc&ms=m_CN&oh=00b14d410da16a3e39399b8f8f9d5329&oe=5D9A82E4';

function loadChannels(cnt,play,label){
	
	chnLbl=label;
	chnContainer=cnt;
	chnContainer.setAttribute('onscroll','myMove()');
	chnContainer.setAttribute('onclick','myMove()');
	chnContainer.addEventListener('keypress', myMove);
	chnContainer.setAttribute('onmousemove','myMove()');
	vidPlayer=play;
	optionLst=document.getElementById('optionLst');
	fetch(chnsUrl)
	  .then(function(response) {
		response.text().then(function(text) {
		  done(text);
		});
	  }).catch(function() {
        console.log("error");
    });	
	
}

/*************/
function done(resp) {
    
  allChannels =JSON.parse(resp);
  
  Object.keys(allChannels).forEach(function(id) {
		//allChannels[source].msg.channels.forEach(function(element) {
		  //console.log(id);
		  addItem(id,allChannels[id]);
		
	});
	channelList=chnContainer.getElementsByTagName('a');
   loadPlayer(false,nOffChannels);
   
   var targLink    =document.getElementsByName('ch'+lasChannel)[0];
				 var clickEvent  = document.createEvent ('MouseEvents');
				clickEvent.initEvent ('dblclick', true, true);
				targLink.dispatchEvent (clickEvent);
  
}







var nOffChannels=0;
function addItem(source,data){
	/*
    var ul = document.getElementById("dynamic-list");
    var candidate = document.getElementById("candidate");
	var br= document.createElement("br");	
    var li = document.createElement("li");
	var a = document.createElement("a");
	var h = document.createElement("h");
	var p = document.createElement("p");
	var img = document.createElement("img");
	number++;
	if(source=='colombiaTv'){
		img.src=data['image'];
		h.innerHTML=data.title;
		h.innerHTML='['+number+'] '+data.channel_name+' - '+data.country;
		img.setAttribute('onerror',"this.src='/colombia.png'");
		sLink=data.url;
	}else{
		img.src=allChannels[source].iconRef+data.img;
		h.innerHTML='['+number+'] '+data.channel_name+' - '+data.country;
		//h.innerHTML=data.country;
		if(data.link_to_play=='0')
			sLink=data.pk_id;
		else
			sLink=data.link_to_play
	}
	img.classList.add("chIcon");
	
	h.classList.add("chName");
	p.innerHTML=source;
	a.appendChild(img);
	a.appendChild(br);
    a.setAttribute('href','#');
	a.id='ch'+number;
	f="getVideoLink('"+source+"','"+sLink+"',this);";
	a.setAttribute('onclick',f);
	//li.appendChild(img);
	a.appendChild(h);
	//1a.appendChild(p)
	"javascript:my_function();window.print();"
	//li.setAttribute('href','#');
	//li.setAttribute('onclick',"getUrl('?channel="+href+"');");
	li.appendChild(a);
	li.className =data.country+ ' '+data.cat_name+' '+source;
    ul.appendChild(li);*/
	nOffChannels+=1;
	a = document.createElement("a");
	a.href='#';
	sLink=data.stream_link
	f="chnEpg(this);";
	a.setAttribute('onclick',f);
	f="updateChannel('"+sLink+"',this);";
	a.setAttribute('ondblclick',f);
	
	a.name='ch'+nOffChannels;
	a.id=source;
	a.innerHTML=nOffChannels+' '+data.channel_name;
	a.className =data.country+ ' '+data.cat_name+' '+data.src;
	chnContainer.appendChild(a);
    
}


var filterList=[];
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
/****videoLink*///

function getVideoLink(source,sLink,elem){
	console.log(source,sLink);
	vidUrl=window.location.origin+'?'+source+'|'+sLink;
	lasChannel=elem.id.replace('ch','');
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


/*****openNav****/
function openNav() {
  //dropdown.classList.toggle("active");
  optionLst=document.getElementById('optionLst');
   if (chnContainer.style.display === "block") {
	chnContainer.style.display = "none";
	optionLst.style.display = "none";
	chnSrch.style.opacity = "0.1";
	chnSrch.style.left="0%";
	clearNavInterval();
	clsd=false;
	epgList=document.getElementById('epgList');
	//epgList.innerHTML='';
	epgList.style.display = "none";
	
  } else {
	chnContainer.style.display = "block";
	optionLst.style.display = "block";
	   chnEpg("");
	//chnSrch.style.opacity = "1";
	//chnSrch.style.left="42%";
	navInterval();
	clsd=true;
  }

} 


function updateChannel(chnUrl){
	console.log("update channel");
	vidSrc=chnUrl.replace('/?player|','');
	saveData();
	loadChannel(vidSrc);
}


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
	if (idleTime > _userIdleThreshold) {         
		console.log('Inactive');
		 debug('Inactive'); 
		openNav();		
    }
}


function getData(){
		volumeLevel=parseFloat(localStorage.getItem('volumeLevel'));
		if(volumeLevel=='null')
			volumeLevel=0.5;
		lasChannel=localStorage.getItem('lasChannel');
		if (lasChannel=='null')
			lasChannel=1;
}
function saveData(){
		localStorage.setItem('volumeLevel',volumeLevel);
		localStorage.setItem('lasChannel',lasChannel);
		
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

function chnEpg(chn){
	
	epgList=document.getElementById('epgList');
	epgList.style.display = "block";
	/*
	a = document.createElement("a");
	epgList.innerHTML='';
	a.innerHTML=allChannels[chn.id]['channel_name'];
	epgList.appendChild(a);
	try{
		allChannels[chn.id]['epg'].forEach(function(item) {
			li = document.createElement("li");
			li.setAttribute('class','epgItem');
			[ev,time,gmt]=item.split('|');
			[hh,mm]=time.split(':');
			time=getTime(parseInt(hh),parseInt(gmt))+':'+mm;
			li.innerHTML=time+'  '+ev;
			epgList.appendChild(li);
		});
	}catch(e){
		
	}
	*/

}

function filterMenu(){
	

}

window.ifrFcn = function (item) {
   console.log("I was called from a child iframe: "+item);
   document.getElementById(item).ondblclick();
}

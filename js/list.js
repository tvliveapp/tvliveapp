var number=0;
var chNumber;
function addItem(source,data){
	
    var ul = document.getElementById("dynamic-list");
    var candidate = document.getElementById("candidate");
	var br= document.createElement("br");	
    var li = document.createElement("li");
	var a = document.createElement("a");
	var h = document.createElement("h");
	var p = document.createElement("p");
	var img = document.createElement("img");
	number++;
	img.src=data[img];
	img.setAttribute('onerror',"this.src='/media/default.png'");
	h.innerHTML='['+number+'] '+data.channel_name+' - '+data.country;
		//h.innerHTML=data.country;
	sLink=data.stream_link
	img.classList.add("chIcon");
	
	h.classList.add("chName");
	p.innerHTML=source;
	a.appendChild(img);
	a.appendChild(br);
    a.setAttribute('href','#');
	a.name='ch'+number;
	a.id=source;
	f="getVideoLink('"+sLink+"',this);";
	a.setAttribute('ondblclick',f);
	//li.appendChild(img);
	a.appendChild(h);
	//1a.appendChild(p)
	"javascript:my_function();window.print();"
	//li.setAttribute('href','#');
	//li.setAttribute('onclick',"getUrl('?channel="+href+"');");
	li.appendChild(a);
	li.className =data.country+ ' '+data.cat_name+' '+data.src;
    ul.appendChild(li);
     chNumber=number;
}


var filterList=[];
function filterFnc(element) {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    str=element.value;
	if(element.checked)
		filterList.push(str);
	else
		filterList.splice( filterList.indexOf(str), 1 );
	console.log(filterList);
	for (i = 0; i < li.length; i++) {
		cnt=0;
		for (j=0;j<filterList.length;j++){
				if (li[i].classList.contains(filterList[j]))
				cnt++;
		}
		if (cnt==filterList.length) 
			li[i].style.display = "";
		else
			li[i].style.display = "none";
		console.log(cnt);
	}
}
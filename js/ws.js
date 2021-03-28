   let HOST = location.origin.replace(/^http/, 'ws')
      HOST = 'ws://server-b.herokuapp.com/'
     //HOST = 'ws://127.0.0.1:3000'
      
	  let ws = new WebSocket(HOST);
      let el;
      function sendMsg(msg){
      		ws.send(msg);
      }
      ws.onmessage = (event) => {
		name=event.data.split("#")[0];
		data=event.data.split("#")[1];
		console.log(name);
		if(name=="alerta"){
				
				
				i=document.getElementById(data);
				h1=i.parentElement;
				h1=h1.getElementsByTagName("h1")[0];
				 
				beep();
				beep();
				beep();
				h1.innerHTML= data+" Alarma..."; 
				
				
		}
		if(name=="loadM3u"){
			url=data.split('|')[1];
			id=data.split('|')[0];
			loadM3U(id,decodeURI(url)); 	 
		}
        else if(name!="ack"){
			el = document.getElementById(name);
			if(el==null){
				h=document.createElement("h1");
				div=document.createElement("div");
				div.setAttribute("ondblclick","showMe(this)");
				h.innerHTML=name;
				div.appendChild(h);
				
				img=document.createElement("img");
				img.id=name;
				img.title=name;
				div.appendChild(img);
				document.getElementById("container").appendChild(div);
			}
			
			else{	
				document.getElementById(name).src="data:image/png;base64,"+data;
			}
		}
      };
	  function showMe(ele){
			if(ele.style.width=="75%"){
				ele.style.width="40%";
				ele.style.height="40%";
			}else{
				ele.style.width="75%";
				ele.style.height="75%";
			}
	  }
	  function loadM3U(id,url){
			if(id=='0'){
				urlName=document.getElementById('urlName').value;
				urlVal=document.getElementById('urlVal').value;
				if(urlName!=''){
					if(urlVal!=''){
						localStorage.setItem('chnsm3u',urlVal);
						location.reload();
						document.location.href=document.location.href;

					}
					else
						alert('Ingrese el URL');
				}else
					alert('Ingrese el Nombre');
			}else{
				if(id==document.getElementById('miListaId').innerHTML){
					localStorage.setItem('chnsm3u',url);
					location.reload();
					document.location.href=document.location.href;

			
			}
		}
	}
   
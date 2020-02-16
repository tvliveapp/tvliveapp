var debgLbl;
var debgEn=true;
window.window.addEventListener('load',function(){
	
	debgLbl=document.getElementById('debgLbl');
	});

function debug(msg){
  if(debgEn){
	try{
		debgLbl.innerHTML=msg;
	}catch(e){
		console.log('debug error');
	}
  }
}
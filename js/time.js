
// function to calculate local time
// in a different city
// given the city's UTC offset
function calcTime(city, offset) {

    // create Date object for current location
    d = new Date();
   
    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
   
    // create new Date object for different city
    // using supplied offset
    nd = new Date(utc + (3600000*offset));
   
    // return time as a string
    return "The local time in " + city + " is " + nd.toLocaleString();

}

// get Bombay time
//alert(calcTime('Bombay', '+5.5'));

// get Singapore time
//alert(calcTime('Singapore', '+8'));

// get London time
//alert(calcTime('London', '+1'));
function getTime(h,off){
	var dt = new Date();
	var tz = dt.getTimezoneOffset(); 
	uh=tz/-60; 
	uh=uh-off;
	ha=h+uh;
	if(ha<0)
		ha=24+ha;
	return ha;
}
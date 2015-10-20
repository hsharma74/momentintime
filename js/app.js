var authToken;

$(function(){

	var returnedURL = window.location.href; 
	console.log("returned url: " + returnedURL);
	authToken = getAuthCodeFromURL(returnedURL); 
	
	console.log("Instagram Access Token is: " + authToken); 

	$('#submit_button').click(function(event){
		event.preventDefault(); //Prevent page refresh onsubmit
    var latitude  = $('#latitude').val();
    var longitude = $('#longitude').val();

    var fromDate = new Date($('#datetimepicker1').val());
    var toDate   = new Date($('#datetimepicker2').val());

    var fromUnix = Math.floor(fromDate/1000);
    var toUnix   = Math.floor(toDate/1000);
    
    //for debug, print the form values to the console
    console.log("fromDate: " + fromDate);
    console.log("toDate:   " + toDate);
    console.log("latitude: " + latitude);
    console.log("longitude:" + longitude);
    console.log("fromUnix: " + fromUnix);
    console.log("toUnix:   " + toUnix);


    getMomentJSON(authToken, fromUnix, toUnix, latitude, longitude);
  });
});


//Function that takes the URL parameter, strips out and returns the authorization token
function getAuthCodeFromURL( myurl )
{
	  return myurl.split("=")[1];
}



function getMomentJSON(token, fromTime, toTime, latitude, longitude) {
	//Define request object with AJAX call parameters
	var request = {access_token: token,
		min_timestamp: fromTime,
		max_timestamp: toTime,
		lat:           latitude,
		lng:           longitude,
		count:         20};
	
	//AJAX call to Instagram API endpoint
	var result = $.ajax({
		url: "https://api.instagram.com/v1/media/search",
		data: request,
		dataType: "jsonp",
		type: "GET",
		}); //Once this call is finished, execute the following

   
  console.log(result);
}



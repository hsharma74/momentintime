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
		})   //; //Once this call is finished, execute the following
		.done(function(result) {
			$('.image_results').empty(); // clear out for the displaying the new results
			$('.image_desc').empty();
			$('.search-results').empty();
			var counter = 1;
			$.each(result.data, function(i, item){
				//console.log(item); //Debug: output JSON object to console
				console.log("link:" + item.images.low_resolution.url);
				//console.log("text:" + item.caption.text);

				//myStr += "Latitude:  " + item.location.latitude + "\n";
				//myStr += "Longitude: " + item.location.longitude + "\n";
				//myStr += "Name:      " + item.location.name + "\n";
				//console.log("myStr: " + myStr);

				if (counter % 3 == 1) {
					$('#search-results').append("<div class=\"row\">");
				}
				$('#search-results').append("<div class=\"col-md-4\">");
				var imgLink = "<img id=\"thumbnail-img\" src=\"" + item.images.low_resolution.url + "\">";
				$('#search-results').append("<p class=\"image_results\">" + imgLink + "</p>");
				$('#search-results').append("<p class=\"image_desc\">" + "Latitude:  " + item.location.latitude + "</p>");
				$('#search-results').append("<p class=\"image_desc\">" + "Longitude: " + item.location.longitude + "</p>");
				$('#search-results').append("<p class=\"image_desc\">" + "Name:      " + item.location.name + "</p>");
				$('#search-results').append("</div>");

				if (counter % 3 == 0) {
					$('#search-results').append("</div>");
				}				
				counter += 1;
			});
		});
   
 
}



var Twilio = {
	sendText: function(){
		var api_url ="https://api.twilio.com/2010-04-01/Accounts/"
		api_url += "AC6f5ae87943e827a9313e51d467f80fd3/"
		api_url += "/Messages.json"
		$.ajax({
	        type: "POST",
	        url: api_url,
	        dataType: "jsonp",
	        data: {
	        	 Body:"Jenny%20please%3F%21%20I%20love%20you%20<3",
	             To:"%2B15558675309",
	             From:"%2B14158141829",
	            -u 'AC6f5ae87943e827a9313e51d467f80fd3:{AuthToken}'}
	        // data: request_data,
	        success: function (response, status, xhr) {
              console.log(response[0].trends);
              return response[0].trends;
	        },
	        error: function (xhr, err) {
	          console.log(xhr);
	          console.log(xhr.statusText);
	        }
		});
	}
}
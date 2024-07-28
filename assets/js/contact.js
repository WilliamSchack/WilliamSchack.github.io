const ValidateEmail = (email) => {
	const regex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
	return regex.test(email);
}

function SetContactStatus(error, color = "#d20000") {
	$(".contactStatus").text(error);
	$(".contactStatus").css("color", color);
}

$('#contact_form').on('submit', function(e) {
	e.preventDefault();
	SetContactStatus("");
	
	// Get inputs
	var name = $("input[type='text'][name='name']").val(); //entry.146951700
	var email = $("input[type='text'][name='email']").val(); //entry.684835120
	var message = $("textarea[name='message']").val(); //entry.715294870
	
	// Honeypot
	var lastName = $("input[type='text'][name='last_name']").val();
	var phone = $("input[type='text'][name='phone']").val();
	
	if(lastName != "augheoivbws") {
		return;
	}
	
	if(phone != "") {
		return;
	}
	
	// Check if all fields are filled
	if(name == "" || email == "" || message == "") {
		SetContactStatus("Please fill all fields");
		return;
	}
	
	// Validate email
	if(!ValidateEmail(email)) {
		SetContactStatus("Please enter a valid email");
		return;
	}
	
	// Send google form response
	$.ajax({
		url: "https://docs.google.com/forms/d/e/1FAIpQLSd0mK-DpUMHyXrDiUMnSrvqD_X_MGrlqj3a0K5Zo3Bn6Lo4gA/formResponse",
		method: "POST",
		dataType: "xml",
		data: {
			"submit": "Submit",
			"entry.146951700": name,
			"entry.684835120": email,
			"entry.715294870": message
		},
		statusCode: {
			0: function(data) {
				SetContactStatus("Email Sent!", "#00d200");
			},
			200: function(data) {
				SetContactStatus("Email Sent!", "#00d200");
			},
			403: function(data) {
				SetContactStatus("Something went wrong, please try again later");
			}
		}
	});
})
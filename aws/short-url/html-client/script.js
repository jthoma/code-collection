var EndPoint = 'API Gateway Endpoit'; // Replace with you actual API Gateway Endpoint
var apiKey = 'api gateway key'; // Replace with your actual API key

$(document).ready(function() {
  $("#url-form").submit(function(event) {
    event.preventDefault(); // Prevent default form submission

    $('#output').val('');
    
    var longUrl = $("#long-url").val(); 
    var shortId = $("#short-id").val();

	var postData = { url: longUrl };
	
	//shortId will be added only if it has content and is exactly 6 characters;
	if(shortId.length == 6){
	   postData.id_short = shortId;
	}

  var postStr = JSON.stringify(postData);
  console.log(postStr);

  $.ajax({
    url: EndPoint,
    headers: {
        'x-api-key':apiKey,
        'Content-Type':'application/json'
    },
    method: 'POST',
    dataType: 'text',
    data: postStr,
    success: function(data){
      console.log('succes: '+data);
      $('#output').val(data);
    }
  });

  });


  $("#cpbutton").click(function(){
    $("#output").select();
    document.execCommand('copy');
});



});




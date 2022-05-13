const pos = 'aenextjsdemo';
const clientId = 'psfu6uh05hsr9c34rptlr06dn864cqrx';

function cdpViewEvent()
{
    //console.log( "BID:" );
    //console.log(Boxever.getID());

      _boxeverq.push(function() { 
      var searchEvent = {
          "browser_id": Boxever.getID(),
          "channel": "WEB",
          "type": "VIEW",
          "language": "EN",
           "currency": "USD",//mandatory field
          "page": '/',
          "pos": pos  
     
          
      };
		  // Invoke event create 
		  // (<event msg>, <callback function>, <format>)
		  Boxever.eventCreate(searchEvent, function(data){}, 'json');
        });    
      
  //this is not related to the view event, we are trying to personalize the page after we are recording the view event but thats not always the case
  //personalize();
} 
    
	
function personalize(){
	var callFlowsContext = {
		  context: {
			"channel": "WEB",   // update before using. e.g. “WEB”
			"language": "EN",   // update before using. e.g. “en”
			"currency": "USD",  // update before using. e.g. “EUR”
			"browserId": Boxever.getID(),
			"clientKey": clientId,   
			"friendlyId": "ae_full_stack_nationality",
			"page": '/',//window.location.pathname
			"pos":"aedemo" //window.location.hostname.substring(4, window.location.hostname.length)
		  }
		};
		
  
	Boxever.callFlows(callFlowsContext, function(response) {
		  // use the response object
		  if(response && response.itemid){
			  var itemid = response.itemid[0].attributes.sitecoreitemid;
			   console.info(itemid);
					
					  pullSitecoreData(itemid.replace('{', '').replace('}', ''));
		  }
		  console.info(response);
		}, 'json');

}

 function sendIdentity(email){

      // Place an anonymous function in the Boxever queue 
    _boxeverq.push(function() { 
			  var searchEvent = {
				  "browser_id": Boxever.getID(),//"browserId": Boxever.getID(),
				  "email": email,
				  "channel": "WEB",
				  "type": "IDENTITY",
				  "language": "EN",
				  "currency": "USD",
				  "page": '/',
				  "pos": pos ,
			  };
			  
			  // Invoke event create 
			  // (<event msg>, <callback function>, <format>)
			  Boxever.eventCreate(searchEvent, function(cdpData){
				  console.info(cdpData);
				  if(cdpData){
					  personalize();
					  
				  }
			  }, 'json');
        });   
         
          console.log(email +' logged in ');
}

function pullSitecoreData(itemid){

					  var baseUrl = 'http://aesitecore9demo-design.idevdesign.net/sitecore/api/ssc/item/';
					   console.log(' item id '+itemid);
					   console.log(baseUrl+itemid);
					  jQuery.ajax({
							crossDomain: 'true',
							type: 'Get',
							url: baseUrl+itemid,
							dataType: 'JSON',
							//contentType: 'application/x-www-form-urlencoded',
							success: function(data) {

								//alert(JSON.stringify(data));
								$('.pic-l-hide').html(data.Title +'<BR>'+data.Body)
							},
							error: function(res, error){
							alert(JSON.stringify(res))
								alert(res+ ' something is wrong');
							 }
					  
						});
}

document.addEventListener("DOMContentLoaded", function(event) { 
//sample of a JS rendering/injecting
//$("h1:contains('CDP Demo')").append("<input id='emailid' value='thor.odinsson@avengers.gov' /><a href='javascript:sendidentity(emailid.value);'>login</a>");
cdpViewEvent();
});


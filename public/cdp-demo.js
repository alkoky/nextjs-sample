const pos = 'aenextjsdemo';
const clientId = 'psfu6uh05hsr9c34rptlr06dn864cqrx';
const friendlyId ='eg_full_stack_location';
import $ from 'jquery';
import { execOnce } from 'next/dist/shared/lib/utils';

var _boxeverq = _boxeverq || [];

const cdp = {
	
	cdpViewEvent: () => {
		if (!window._boxever)
			return;
		//console.log( "BID:" );
		//console.log(Boxever.getID());
		console.info('view event');
		window._boxeverq.push(function () {
			var searchEvent = {
				"browser_id": Boxever.getID(),
				"channel": "WEB",
				"type": "VIEW",
				"language": "EN",
				"currency": "USD",
				"page": '/',
				"pos": pos
			};
			// Invoke event create 
			// (<event msg>, <callback function>, <format>)
			Boxever.eventCreate(searchEvent, function (data) { }, 'json');
		});

		//this is not related to the view event, we are trying to personalize the page after we are recording the view event but thats not always the case
		//personalize();
	} ,
    cdpAddProductEvent: (productName) => {
		if (!window._boxever)
			return;
			var product = {
				// "item_id":productName+"_id",//mandatory
				// "product_id":productName+"_id",
				// "product_name": productName+"_id",
				// "product_type": "DRINK"
				"type":"DRINK",
				"item_id":productName+"_90",
				"name":productName,
				//"orderedAt":datetime,
				"quantity":1,
				"price":100.00,
				"productId":productName+"_id",
				"currency":"USD",
				"originalPrice":100.00,
				"originalCurrencyCode":"USD",
				"referenceId":productName+"-001-1"
			  };
		//console.log( "BID:" );
		//console.log(Boxever.getID());
		console.info('add product event');
		window._boxeverq.push(function () {
			var searchEvent = {
				"browser_id": Boxever.getID(),
				"channel": "WEB",
				"type": "ADD",
				"language": "EN",
				"currency": "USD",
				"page": '/',
				"pos": pos,
				"product": product
			};
			// Invoke event create 
			// (<event msg>, <callback function>, <format>)
			Boxever.eventCreate(searchEvent, function (data) { }, 'json');
		});

		//this is not related to the view event, we are trying to personalize the page after we are recording the view event but thats not always the case
		//personalize();
	} ,
	cdpEvent: (eventType) => {
		if (!window._boxever)
			return;
		//console.log( "BID:" );
		//console.log(Boxever.getID());
		console.info(eventType+' event');
		window._boxeverq.push(function () {
			var searchEvent = {
				"browser_id": Boxever.getID(),
				"channel": "WEB",
				"type": eventType,
				"language": "EN",
				"currency": "USD",
				"page": '/',
				"pos": pos,
				
			};
			// Invoke event create 
			// (<event msg>, <callback function>, <format>)
			Boxever.eventCreate(searchEvent, function (data) { }, 'json');
		});

		//this is not related to the view event, we are trying to personalize the page after we are recording the view event but thats not always the case
		//personalize();
	} ,
	cdpEndSession: (eventType) => {
		cdp.cdpEvent("FORCE_CLOSE");
		//this is not related to the view event, we are trying to personalize the page after we are recording the view event but thats not always the case
		//personalize();
	} ,
 personalize:()=>{
	var callFlowsContext = {
		  context: {
			"channel": "WEB",   // update before using. e.g. “WEB”
			"language": "EN",   // update before using. e.g. “en”
			"currency": "USD",  // update before using. e.g. “EUR”
			"browserId": Boxever.getID(),
			"clientKey": clientId,
			"friendlyId": friendlyId,
			"page": '/',//window.location.pathname
			"pos":"aedemo" //window.location.hostname.substring(4, window.location.hostname.length)
		  }
		};
		
  
	Boxever.callFlows(callFlowsContext, function(response) {
		  // use the response object
		  if(response && response.itemid){
			  var itemid = response.itemid[0].attributes.sitecoreitemid;
			   console.info(itemid);
					
			  cdp.pullSitecoreData(itemid.replace('{', '').replace('}', ''));
		  }
		  console.info(response);
		}, 'json');

}

 , sendIdentity:(email)=>{
	if (!window._boxever)
	return;
      // Place an anonymous function in the Boxever queue 
	  console.info('sendIdentity _boxeverq ',_boxeverq);
	  window._boxeverq.push(function() { 
		console.info('sendIdentity _boxeverq 2',_boxeverq);
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
			  console.info('sendIdentity searchEvent ',searchEvent);
			  // Invoke event create 
			  // (<event msg>, <callback function>, <format>)
			  Boxever.eventCreate(searchEvent, function(cdpData){
				  console.info('sendIdentity success! ',cdpData);
				  if(cdpData){
					cdp.personalize();
					// executeExperience('/',friendlyId,
					// function(response) {
					// 	// use the response object
					// 	if(response && response.itemid){
					// 		var itemid = response.itemid[0].attributes.sitecoreitemid;
					// 		 console.info('new',itemid);
								  
					// 		cdp.pullSitecoreData(itemid.replace('{', '').replace('}', ''));
					// 	}
					// 	console.info(response);
					//   }
					// );
					
					  
				  }
			  }, 'json');
        });   
         
          console.log(email +' logged in ');
}

 , pullSitecoreData:(itemid)=>{

					  var baseUrl = 'https://aesitecore9demo-design.idevdesign.net/sitecore/api/ssc/item/';
					  var options = '?fields=ItemId,ItemName,Title,Body,Image'
					   console.log(' item id '+itemid);
					   console.log(baseUrl+itemid);

					   function getImageUrl(imageRaw){
						var imageBaseUrl = 'https://aesitecore9demo-design.idevdesign.net/';

						   var imageOptions= '?fields=ItemMedialUrl,ItemUrl';
						var imageId = imageRaw.substring(
							imageRaw.indexOf("\"{") + 2, 
							imageRaw.lastIndexOf("}\"")
						);

						if(imageId){
							$.ajax({
								crossDomain: 'true',
								type: 'Get',
								url: baseUrl+imageId+imageOptions,
								dataType: 'JSON',
								//contentType: 'application/x-www-form-urlencoded',
								success: function(data) {
	
									if(data?.ItemMedialUrl){
									console.info('image url',imageBaseUrl+data.ItemMedialUrl);

										$('#product-image-div').html('<img width="200px" height="500px" src="'+imageBaseUrl+data.ItemMedialUrl+'" />');
										//$('#product-image').src =imageBaseUrl+data.ItemMedialUrl;
									}
								},
								error: (res, error) => {
									alert(JSON.stringify(res));
									alert(res + ' something is wrong while loading the image');
								}
						  
							});
						}

					   }
					  $.ajax({
							crossDomain: 'true',
							type: 'Get',
							url: baseUrl+itemid+options,
							dataType: 'JSON',
							//contentType: 'application/x-www-form-urlencoded',
							success: function(data) {

								console.info(data);
								console.info(JSON.stringify(data));
								$('#product-title').html(data.Title );
								$('#product-body').html(data.Body);
								getImageUrl(data.Image);
								//$('#product-image').src =data.;
							},
							error: (res, error) => {
								alert(JSON.stringify(res));
								alert(res + ' something is wrong');
							}
					  
						});
}
}

export default cdp;
/*
document.addEventListener("DOMContentLoaded", function(event) { 
//sample of a JS rendering/injecting
//$("h1:contains('CDP Demo')").append("<input id='emailid' value='thor.odinsson@avengers.gov' /><a href='javascript:sendidentity(emailid.value);'>login</a>");
cdpViewEvent();
});

*/

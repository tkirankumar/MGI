/* this file contains the implemenation of jquery/javascript ajax service calls */

function callService(methodName, requestType, sessionId, getMethodQueryParams, postMethodJsonObject, successHandler, errorHandler)
{	
	//var serviceUrl = 'http://172.25.89.233:8080/FSM_ver6.1/services/LicenseFc';
	var serviceUrl = 'https://extws.moneygram.com/extws/services/AgentConnect1211';
	var loginData = "<soapenv:Envelope xmlns:soapenv='http://schemas.xmlsoap.org/soap/envelope/'>"+
   "<soapenv:Body>"+
      "<feeLookupRequest xmlns='http://www.moneygram.com/AgentConnect1211'>"+
         "<agentID>30014943</agentID>"+
         "<agentSequence>9</agentSequence>"+
         "<token>TEST</token>"+
         "<timeStamp>2013-01-30T10:44:12.869-06:00</timeStamp>"+
         "<apiVersion>1211</apiVersion>"+
         "<clientSoftwareVersion>1211</clientSoftwareVersion>"+
         "<productType>SEND</productType>"+
         "<amountExcludingFee>100</amountExcludingFee>"+
         "<receiveCountry>USA</receiveCountry>"+
         "<deliveryOption>WILL_CALL</deliveryOption>"+
         "<receiveCurrency>USD</receiveCurrency>"+
         "<sendCurrency>USD</sendCurrency>"+
         "<allOptions>false</allOptions>"+
      "</feeLookupRequest>"+
   "</soapenv:Body>";
	

	
	$.ajax(
	{
		type : "POST",
        url : serviceUrl,
        data : loginData,
       // contentType : "text/xml",
        dataType : "text/xml",
		beforeSend : function (xhr)
		{
		    //xhr.setRequestHeader("AGENT_ID", "30014943");
			xhr.setRequestHeader("TOKEN", "TEST");
			xhr.setRequestHeader("AGENT_SEQUENCE_NUMBER", "9");
			
		},
		success : function (xml)
		{
			console.log('Service call successful.');
			//successHandler(data);
		},
		error : function(jqXHR, errorType, exceptionObject)
		{
			console.log('Service call failed.');
			//errorHandler(jqXHR, errorType, exceptionObject);
		}
	});
}


/* this file contains the implemenation of jquery/javascript ajax service calls */
var timeStamp;
function getGMTOffset(localDate) {
    var positive = (localDate.getTimezoneOffset() > 0);
    var aoff = Math.abs(localDate.getTimezoneOffset());

    var hours = Math.floor(aoff / 60);
    var mins = aoff % 60;
    var offsetTz = padzero(hours) + ':' + padzero(mins);

    // getTimezoneOffset() method returns difference between (GMT) and local time, in minutes.
    // example, If your time zone is GMT+2, -120 will be returned.
    // This is why we are inverting sign
    if (!positive) {
      return '+' + offsetTz;
    }
    return '-' + offsetTz;
}

function pad2zeros(n) {
  if (n < 100) {
      n = '0' + n;
  }
  if (n < 10) {
      n = '0' + n;
  }
  return n;
}


function formatDate(date)  {
  if (date) {

 timeStamp= (date.getFullYear()) +
           '-' + padzero((date.getMonth() + 1)) +
           '-' + padzero(date.getDate()) +
           'T' + padzero(date.getHours()) +
           ':' + padzero(date.getMinutes()) +
           ':' + padzero(date.getSeconds()) +
           '.' + pad2zeros(date.getMilliseconds()) +
           getGMTOffset(date);
  }


  //alert(timeStamp);
}
function padzero(n) {
    return n < 10 ? '0' + n : n.toString();
}
function callService(methodName, requestType, sessionId, getMethodQueryParams, postMethodJsonObject, successHandler, errorHandler)
{	
	var date = new Date();
	formatDate(date);
	var serviceUrl = 'https://extws.moneygram.com/extws/services/AgentConnect1211';
	var loginData = '<?xml version="1.0" encoding="UTF-8"?>'+
	'<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">'+
   '<soapenv:Body>'+
      '<feeLookupRequest xmlns="http://www.moneygram.com/AgentConnect1211">'+
         '<agentID>30014943</agentID>'+
         '<agentSequence>9</agentSequence>'+
         '<token>TEST</token>'+
         '<timeStamp>' + timeStamp + '</timeStamp>'+
         '<apiVersion>1211</apiVersion>'+
         '<clientSoftwareVersion>v1</clientSoftwareVersion>'+
         '<productType>SEND</productType>'+
         '<amountExcludingFee>100</amountExcludingFee>'+
         '<receiveCountry>USA</receiveCountry>'+
         '<deliveryOption>WILL_CALL</deliveryOption>'+
         '<receiveCurrency>USD</receiveCurrency>'+
         '<sendCurrency>USD</sendCurrency>'+
         '<allOptions>false</allOptions>'+
      '</feeLookupRequest>'+
   '</soapenv:Body>'+
   '</soapenv:Envelope>';
	
alert(loginData);
	
	$.ajax(
	{
		type : "POST",
        url : serviceUrl,
        data : loginData,
       // contentType : "text/xml",
        dataType : "text/xml",
		/*beforeSend : function (xhr)
		{
		    //xhr.setRequestHeader("AGENT_ID", "30014943");
			xhr.setRequestHeader("TOKEN", "TEST");
			xhr.setRequestHeader("AGENT_SEQUENCE_NUMBER", "9");
			
		},*/
		success : function (xml)
		{
			alert(xml);
			console.log('Service call successful.');
			//successHandler(data);
		},
		error : function(jqXHR, errorType, exceptionObject)
		{
			alert("error");
			console.log('Service call failed.');
			//errorHandler(jqXHR, errorType, exceptionObject);
		}
	});
}


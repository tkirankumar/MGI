$(document).ready(function() {
	callService();
    $('#receive_amt').focusout(function() {
		var receiveAmount = $('#receive_amt').val();
		if(receiveAmount==0){
			alert("Please enter Receive Amount");
			return false;
		}
		else if (receiveAmount < 0 || isNaN(receiveAmount)) {
			alert("Please enter valid Receive Amount");
			return false;
		} else
			$('#receive_amt').formatCurrency();
	
	});
});
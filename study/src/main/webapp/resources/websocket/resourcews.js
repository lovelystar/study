var stompClient = null;

function setConnected(connected) {
	
	$("#connect").prop("disabled", connected);
	$("#disconnect").prop("disabled", !connected);
	
	if (connected) {
		
		$("#token").attr("disabled" , true);
		$("#ws-result-table").show();
		
	} else {
		
		$("#token").attr("disabled" , false);
		$("#ws-result-table").hide();
		
	}
	
	$("#ws-result").html("");
	
}

function connect() {
	
	var token = $("#token").val();
	var socket = new SockJS("http://localhost:8084/studywebsocketserver/ws-stomp/?access_token=" + token);
	
	stompClient = Stomp.over(socket);
	stompClient.connect({}, function (socketConnect) {
		
		setConnected(true);
		stompClient.subscribe("/topic/message", function (result) {
			showResult(JSON.parse(result.body));
		});
		
	});
	
}

function disconnect() {
	
	if (stompClient !== null) {
		stompClient.disconnect();
	}
	
	setConnected(false);
	
}

function sendData() {
	
	var token = $("#token").val();
	var sendData = {
		"username": null,
		"to": null,
		"from": null,
		"message": $("#event").val(),
		"eventList": [
			{
				"category": $("#category").val(),
				"event": $("#event").val(),
				"description": $("#description").val()
			}
		]
	};
	
	stompClient.send("/app/message", {"Content-Type":"application/json"}, JSON.stringify(sendData));
	
}

function showResult(message) {
	if(message != null) {
		
		var resultLength = message.eventList.length;
		for(var i=0; i<resultLength; i++){
			$("#ws-result").append(
					"<tr><td>" + message.username +
					"</td><td>" + message.message +
					"</td><td>" + message.created +
					"</td><td>" + message.eventList[i].category +
					"</td><td>" + message.eventList[i].event +
					"</td><td>" + message.eventList[i].description +
					"</td></tr>"
					
			);
		}
		
	}
}

$(function () {
	
	$("form").on("submit", function (e){
		e.preventDefault();
	});
	
	$("#connect").click(function(){
		connect();
	});
	
	$("#disconnect").click(function(){
		disconnect();
	});
	
	$("#send").click(function(){
		sendData();
	});
	
});

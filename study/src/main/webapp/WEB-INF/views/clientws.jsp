<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>

<!DOCTYPE html>
<html lang="ko">

	<head>
		
		<meta http-equiv="Content-Script-Type" content="text/javascript">
		<meta http-equiv="Content-Style-Type" content="text/css">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta http-equiv="Cache-Control" content="no-cache">
		<meta http-equiv="Pragma" content="no-cache">
		<meta http-equiv="Expires" content="-1">
		
		<meta name="viewport" content="width=device-width, initial-scale=1">
		
		<link rel="shortcut icon" href="/study/resources/img/favicon.ico" >
		
		<title>Client Web Socket</title>
		
		<link href="<c:url value='/webjars/bootstrap/4.3.1/css/bootstrap.min.css' />" rel="stylesheet" />
		
	</head>
	<body>
		
		<div id="main-content" class="container">
		
			<div class="row">
			
				<div class="col-md-6">
					<form class="form-inline">
						<div class="form-group">
							<label for="connect">Client Server WebSocket Connection : </label>
							<button id="connect" class="btn btn-default" type="submit">Connect</button>
							<button id="disconnect" class="btn btn-default" type="submit" disabled>Disconnect</button>
						</div>
					</form>
				</div>
				
				<div class="col-md-6">
					<form class="form-inline">
						<div class="form-group">
							<label for="name">What is your name ?</label>
							<input type="text" id="name" class="form-control" placeholder="Your name here.." />
						</div>
					</form>
				</div>
				
			</div>
			
			<br />
			<br />
			
			<div class="row">
			
				<div class="col-md-2">
					<a href="#">ROOM #1</a>
				</div>
				<div class="col-md-2">
					<a href="#">ROOM #2</a>
				</div>
				<div class="col-md-2">
					<a href="#">ROOM #3</a>
				</div>
				<div class="col-md-2">
					<a href="#">ROOM #4</a>
				</div>
				<div class="col-md-2">
					<a href="#">ROOM #5</a>
				</div>
				
			</div>
			
			<br />
			<br />
			
			<div class="row">
				<div class="col-md-12">
					<table id="conversation" class="table table-striped">
					
						<thead>
							<tr>
								<th colspan="2">Chat ( Room is : <span id="currentRoom"></span>)</th>
							</tr>
							<tr>
								
								<th>
									<input type="text" id="content" class="form-control" />
								</th>
								<th>
									<button id="send" type="button" class="form-control">Send</button>
								</th>
								
							</tr>
						</thead>
						<tbody id="chats"></tbody>
					
					</table>
				</div>
			</div>
			
		</div>
		
		<script src="<c:url value='/webjars/jquery/3.4.1/jquery.min.js' />"></script>
		<script src="<c:url value='/webjars/sockjs-client/1.1.2/sockjs.min.js' />"></script>
		<script src="<c:url value='/webjars/stomp-websocket/2.3.3-1/stomp.min.js' />"></script>
		
		<script src="<c:url value='/resources/websocket/clientws.js' />"></script>
		
	</body>
	
</html>
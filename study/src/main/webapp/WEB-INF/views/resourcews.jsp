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
		
		<title>Resource Web Socket</title>
		
		<link href="<c:url value='/webjars/bootstrap/4.3.1/css/bootstrap.min.css' />" rel="stylesheet" />
		
	</head>
	<body>
		
		<div id="main-content" class="container">
		
			<div class="row">
				
				<div class="col-md-6">
					<form class="form-inline">
						<div class="form-group">
							<label for="connect"><h3>Resource Server WebSocket Connection</h3></label>
						</div>
					</form>
				</div>
				
			</div>
			
			<div class="row">
				
				<div class="col-md-6">
					<form class="form-inline">
						<div class="form-group">
							<label for="token"><h5>What is your AccessToken ? </h5></label>
							<input type="text" id="token" class="form-control" placeholder="accessToken..." style="margin-left: 20px;"/>
							<button id="connect" class="btn btn-default" type="submit">Connect</button>
							<button id="disconnect" class="btn btn-default" type="submit" disabled>Disconnect</button>
						</div>
					</form>
				</div>
				
			</div>
			
			<div class="row">
			
				<div class="col-md-2" style="flex: 0 0 33%; max-width:100%;">
					<label for="category">Category</label>
					<input type="text" id="category" class="form-control" placeholder="Category..." />
				</div>
				<br />
				<div class="col-md-2" style="flex: 0 0 33%; max-width:100%;">
					<label for="event">Event</label>
					<input type="text" id="event" class="form-control" placeholder="Event..." />
				</div>
				<br />
				<div class="col-md-2" style="flex: 0 0 33%; max-width:100%;">
					<label for="description">Description</label>
					<input type="text" id="description" class="form-control" placeholder="Description..." />
				</div>
				
			</div>
			
			<div class="row" style="margin-top:30px;">
				<div class="col-md-2" style="flex: 0 0 33%; max-width:100%;">
					<button id="send" type="button" class="form-control">Send</button>
				</div>
			</div>
			
			<div class="row" style="margin-top:50px;">
				<div class="col-md-12">
					
					<h2>Resource Server Web Socket Result</h2>
					
					<table id="ws-result-table" class="table table-striped">
					
						<thead>
							<tr>
								<th>Username</th>
								<th>Message</th>
								<th>Created</th>
								<th>Category</th>
								<th>Name</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody id="ws-result"></tbody>
					
					</table>
				</div>
			</div>
			
		</div>
		
		<script src="<c:url value='/webjars/jquery/3.4.1/jquery.min.js' />"></script>
		<script src="<c:url value='/webjars/sockjs-client/1.1.2/sockjs.min.js' />"></script>
		<script src="<c:url value='/webjars/stomp-websocket/2.3.3-1/stomp.min.js' />"></script>
		
		<script src="<c:url value='/resources/websocket/resourcews.js' />"></script>
		
	</body>
	
</html>
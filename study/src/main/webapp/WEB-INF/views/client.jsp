<!-- 가상 DOM이 들어가기 위한 빈껍데기 -->
<!-- id="root"에 가상 DOM이 들어감 -->
<!-- root는 index.js에서 설정 -->

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

		<title>Client</title>
		
<%-- 		<link href="<c:url value='/resources/css/gallery.css' />" rel="stylesheet" /> --%>
		
<%-- 		<script src="<c:url value='/resources/js/jquery-3.2.1.min.js' />"></script> --%>
		
	</head>
	<body class="body-home">
		CLIENT SUCCESS
		
		<input type="hidden" id="username" value="${username}" />
		<div id="root"></div>
		<script src="/study/resources/build/bundle.js"></script>
		
	</body>
	
</html>
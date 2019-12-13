package com.hard.study.dao.oauth;

import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.OAuth2RestOperations;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.stereotype.Repository;
import org.springframework.web.util.WebUtils;

import com.hard.study.utils.encryption.AES256Cipher;

@Repository("cookieDao")
public class CookieDaoImpl implements CookieDao {
	
	private final static AES256Cipher aes = new AES256Cipher();
	
	@Autowired
	private OAuth2RestOperations restTemplate;
	
	@Override
	public boolean getCookie(HttpServletRequest request) throws Exception {
		
		boolean getCookie = false;
		
		// 쿠키가 있으면
		if(request.getCookies() != null) {
			
			String cookieTokenStr = null;
			String cookieTokenEncrypt = null;
			int cookieTokenLength = 0;
			
			for(Cookie cookieToken : request.getCookies()) {
				
				cookieTokenStr = cookieToken.getValue();
				cookieTokenLength = cookieTokenStr.length();
				
				// 쿠키를 가져와서 제일 앞 10글자를 비교했을 때 suminToken과 맞으면
				if("suminToken".equals(cookieTokenStr.substring(0, 10))) {
					
					cookieTokenEncrypt = cookieTokenStr.substring(10, cookieTokenLength);
					String cookieTokenDecrypt = aes.AES_Decrypt(cookieTokenEncrypt);
					
					if(cookieTokenDecrypt != null) {
						
						restTemplate.getOAuth2ClientContext().setAccessToken(new DefaultOAuth2AccessToken(cookieTokenDecrypt));
						getCookie = true;
						
					}
					
				}
				
			}
			
		}
		
		return getCookie;
		
	}
	
	// accessToken과 cookie에 있는 token 매칭
	@Override
	public String checkCookie(HttpServletRequest request, Map<String, Object> map, HttpServletResponse response) throws Exception {
		
		Cookie cookie = null;
		String username = null;
		String cookieStr = null;
		String cookieToken = null;
		String accessToken = null;
		
		accessToken = map.get("access_token").toString();
		username = map.get("username").toString();
		
		cookie = WebUtils.getCookie(request, username);
		
		// cookie가 null이 아니면 cookie.getValue가져오고 아니면 null
		cookieStr = cookie != null ? cookie.getValue().toString() : null;
		
		// cookie가 없거나, 쿠키에 있는 token과 accessToken이 다르면
		if(cookie == null || !checkCookieToken(accessToken, cookieStr)) {
			
			// 쿠키 생성
			cookieToken = createCookie(map, response);
			
			// 아니면 정보 가져온다.
		} else {
			
			cookieToken = cookie.getValue();
			
		}
		
		return cookieToken;
		
	}
	
	public boolean checkCookieToken(String accessToken, String cookieStr) {
		
		boolean checkResult = false;
		
		try {
			
			String accessTokenEncryption = "suminToken" + aes.AES_Encrypt(accessToken);
			
			// 암호화한 토큰이 쿠키랑 같으면
			if(accessTokenEncryption.equals(cookieStr)) {
				
				checkResult = true;
				
			} else {
				
				checkResult = false;
				
			}
			
		} catch(Exception e) {
			
			e.printStackTrace();
			
		}
		
		return checkResult;
		
	}
	
	// 쿠키 생성
	public String createCookie(Map<String, Object> map, HttpServletResponse response) throws Exception {
		
		String cookieToken = null;
		
		try {
			
			int maxAge = map.get("maxAge") == null ? 0 : (int) map.get("maxAge");
			maxAge = maxAge != 0 ? maxAge : 3 * 24 * 60 * 60;
			
			String accessToken = map.get("access_token").toString();
			String accessTokenEncrypt = "suminToken" + aes.AES_Encrypt(accessToken);
			
			Cookie cookie = new Cookie(map.get("username").toString(), accessTokenEncrypt);			
			cookie.setMaxAge(maxAge);
			cookie.setSecure(false);
			cookie.setHttpOnly(true);
			cookie.setPath("/study");
			response.addCookie(cookie);
			
			cookieToken = accessTokenEncrypt;
			
		} catch (Exception e) {
			
			// TODO: handle exception
			e.printStackTrace();
		}
		
		return cookieToken;
		
	}
	
}

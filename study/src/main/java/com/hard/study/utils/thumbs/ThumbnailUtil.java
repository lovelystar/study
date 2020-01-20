package com.hard.study.utils.thumbs;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.MediaType;

public class ThumbnailUtil {
	
	private static Map<String, MediaType> resultMap;
	
	static {
		
		resultMap = new HashMap<String, MediaType>();
		
		resultMap.put("JPG", MediaType.IMAGE_JPEG);
		resultMap.put("GIF", MediaType.IMAGE_GIF);
		resultMap.put("PNG", MediaType.IMAGE_PNG);
		
	}
	
	public static MediaType getMediaType(String type) {
		return resultMap.get(type.toUpperCase());
	}
	
}

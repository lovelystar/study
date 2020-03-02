package com.hard.study.controller;

import java.io.FileInputStream;
import java.io.InputStream;

import javax.annotation.Resource;

import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hard.study.utils.thumbs.ThumbnailUtil;

@Controller
public class UtilsController {
	
	@Resource(name="fileUploadPath")
	private String uploadPath;
	
	@Resource(name="commentUploadPath")
	private String commentUploadPath;
	
	// board 게시판에 들어간 첨부파일
	@ResponseBody
	@RequestMapping(value="/thumbs")
	public ResponseEntity<byte[]> thumbnailPreview(String pfn) throws Exception {
		
		InputStream is = null;
		ResponseEntity<byte[]> entity = null;
		
		try {
			
			String formatName = pfn.substring(pfn.lastIndexOf(".") + 1);
			MediaType mType = ThumbnailUtil.getMediaType(formatName);
			HttpHeaders headers = new HttpHeaders();
			is = new FileInputStream(uploadPath + pfn);
			
			if(mType != null) {
				headers.setContentType(mType);
			} else {
				
				pfn = pfn.substring(pfn.indexOf("_") + 1);
				headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
				headers.add("Content-Disposition", "attachmeht; filename=\"" + new String(pfn.getBytes("UTF-8"), "ISO-8859-1") + "\"");
				
			}
			
			entity = new ResponseEntity<byte[]>(IOUtils.toByteArray(is), headers, HttpStatus.CREATED);
			
		} catch(Exception e) {
			
			e.printStackTrace();
			
		}
		
		return entity;
		
	}
	
	// 댓글에 들어간 첨부파일
	@ResponseBody
	@RequestMapping(value="/cthumbs")
	public ResponseEntity<byte[]> commentsThumbnailPreview(String pfn) throws Exception {
		
		InputStream is = null;
		ResponseEntity<byte[]> entity = null;
		
		try {
			
			String formatName = pfn.substring(pfn.lastIndexOf(".") + 1);
			MediaType mType = ThumbnailUtil.getMediaType(formatName);
			HttpHeaders headers = new HttpHeaders();
			is = new FileInputStream(commentUploadPath + pfn);
			
			if(mType != null) {
				headers.setContentType(mType);
			} else {
				
				pfn = pfn.substring(pfn.indexOf("_") + 1);
				headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
				headers.add("Content-Disposition", "attachmeht; filename=\"" + new String(pfn.getBytes("UTF-8"), "ISO-8859-1") + "\"");
				
			}
			
			entity = new ResponseEntity<byte[]>(IOUtils.toByteArray(is), headers, HttpStatus.CREATED);
			
		} catch(Exception e) {
			
			e.printStackTrace();
			
		}
		
		return entity;
		
	}
	
}

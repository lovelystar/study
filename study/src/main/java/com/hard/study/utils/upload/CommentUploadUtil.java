package com.hard.study.utils.upload;

import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.util.Random;

import org.springframework.web.multipart.MultipartFile;

public class CommentUploadUtil {
	
	public static String fileUpload(String basePath, MultipartFile file) throws Exception {
		
		InputStream is = null;
		OutputStream os = null;
		
		String fileName = file.getOriginalFilename();
		
		// 확장자
		String formatName = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
		
		// 폴더 생성 ( 폴더명 )
		// String dirFolder = mkDir(basePath);
		
		// 파일명
		String randomName = RandomString(24);
		String savedName = randomName + "." + formatName;
		
		try {
			
			int readByte = 0;
			
			is = file.getInputStream();
			os = new FileOutputStream(basePath + savedName);
			
			byte[] buffer = file.getBytes();
			
			while((readByte = is.read(buffer, 0, buffer.length)) != -1) {
				
				os.write(buffer, 0, readByte);
				
			}
			
		} catch(Exception e) {
			
			e.printStackTrace();
			
		} finally {
			
			os.flush();
			os.close();
			is.close();
			
		}
		
		// 아마존 S3 업로드
		/*
		File awsTarget = new File(basePath + dirFolder + savedName);
		AwsUploadUtil awsS3 = new AwsUploadUtil();
		awsS3.upload(savedName, awsTarget);
		*/
		return savedName;
		
	}
	
	private static String RandomString(Integer length) {
		
		byte[] array = new byte[256];
		new Random().nextBytes(array);
		
		String randomString = new String(array, Charset.forName("UTF-8"));
		StringBuffer sb = new StringBuffer();
		String rms = randomString.replaceAll("[^a-z0-9]", "");
		
		for(int i=0; i<rms.length(); i++) {
			if((Character.isLetter(rms.charAt(i)) && (length > 0)) || (Character.isDigit(rms.charAt(i)) && (length > 0))) {
				sb.append(rms.charAt(i));
				length--;
			}
		}
		
		return sb.toString();
		
	}
	
}

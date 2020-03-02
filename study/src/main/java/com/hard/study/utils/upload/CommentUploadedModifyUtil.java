package com.hard.study.utils.upload;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.springframework.web.multipart.MultipartFile;

public class CommentUploadedModifyUtil {
	
	public static String uploadedModify(String basePath, MultipartFile file, String uploadedName) throws Exception {
		
		File f = new File(basePath + uploadedName);
		String fruResult = new String();
		
		// 파일이 존재하면 먼저 삭제한다.
		// 그 후에 재업로드 ( 그 이유 : abc.png // abc.jpg와 구분하기 위해 )
		if(f.exists()) {
			
			fileDelete(f);
			fruResult = fileReUpload(basePath, file, uploadedName);
			
		} else {
			fruResult = fileReUpload(basePath, file, uploadedName);
		}
		
		return fruResult;
		
	}
	
	private static void fileDelete(File file) {
		
		file.delete();
		
	}
	
	private static String fileReUpload(String basePath, MultipartFile file, String uploadedName) throws IOException {
		
		InputStream is = null;
		OutputStream os = null;
		
		// 만들어야 하는 것
		// uploadedName의 앞부분 + "." + file의 확장자
		
		String fileName = file.getOriginalFilename();
		
		// 확장자
		String formatName = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
		
		// uploadedName의 front
		Integer dot = uploadedName.indexOf(".");
		String front = uploadedName.substring(0, dot);
		
		String savedName = front + "." + formatName;
		
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
		
		return savedName;
		
	}
	
}

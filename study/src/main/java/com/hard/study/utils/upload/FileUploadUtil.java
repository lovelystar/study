package com.hard.study.utils.upload;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.DecimalFormat;
import java.util.Calendar;

import org.springframework.web.multipart.MultipartFile;

public class FileUploadUtil {

	public static Integer fileUpload(String basePath, MultipartFile file, String randomName) throws Exception {
		
		InputStream is = null;
		OutputStream os = null;
		
		Integer SuccessTriger = 0;
		
		String fileName = file.getOriginalFilename();
		// long fileSize = file.getSize();
		
		// 확장자
		String formatName = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
		
		// 폴더 생성 ( 폴더명 )
		// String dirFolder = mkDir(basePath);
		
		// 파일명
		String savedName = randomName + "." + formatName;
		
		// ffmpeg, ffprobe를 사용할 경우 ( 썸네일 생성, 동영상의 width, height _ 해상도 정보 )
		// 설치방법 : https://trac.ffmpeg.org/wiki/CompilationGuide/Centos#RevertingChangesmadebythisGuide
		// 설치 진행 중 libx264에서 If you get Found no assembler. Minimum version is nasm-2.13 or similar after running 에러가 난다면
		// 해결방법은 : https://superuser.com/questions/1214396/how-to-compile-ffmpeg-with-h-265-h-264-and-vp9-support-on-centos
		
		// String ffmpegCommand = (FFMPEG 경로) + " -t 00:00:00 -ss 00:00:00 -y -i " + (저장된 파일의 경로) + " -vframe 1 -vf scale=(해상도 width:height) " + (썸네일 명_확장자 까지)
		// String ffprobeCommand = (FFPROBE 경로) + " -v error -show_entries stream=width,height -of default=noprint_wrappers=1:nokey=1 " + (저장된 파일의 경로)
		
		// String ffmpegArr = {"/bin/sh", "-c", ffmpegCommand};
		// String ffprobeArr = {"/bin/sh", "-c", ffprobeCommand};
		
		try {
			/*
			Runtime run = Runtime.getRuntime();
			Process proc = null;
			*/
			int readByte = 0;
			
			is = file.getInputStream();
			// os = new FileOutputStream(basePath + dirFolder + savedName);
			os = new FileOutputStream(basePath + savedName);
			
			// 대용량 업로드는 이 부분을 수정하면 됩니다.
			// byte[] buffer = new byte[8192];
			byte[] buffer = file.getBytes();
			
			while((readByte = is.read(buffer, 0, buffer.length)) != -1) {
				
				os.write(buffer, 0, readByte);
				
			}
			
			
			// ffmpeg이용하여 썸네일 생성 execute
			/*
			try {
				
				proc = run.exec(ffmpegArr);
				proc.waitFor();
				proc.destroy();
				
			} catch(Exception e) {
				e.printStackTrace();
			}
			*/
			
			// ffprobe이용하여 동영상의 width, height _ 해상도 정보 가져오기 execute
			/*
			try {
				
				proc = run.exec(ffprobeArr);
				proc.waitFor();
				BufferedReader reader = new BufferedReader(new InputStreamReader(proc.getInputStream()));
				
				int width = Integer.parseInt(reader.readLine());
				int height = Integer.parseInt(reader.readLine());
				
				proc.destroy();
				
			} catch(IOException e) {
				e.printStackTrace();
			} catch(InterruptedException e) {
				e.printStackTrace();
			}
			*/
			
			SuccessTriger = 1;
			
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
		return SuccessTriger;
		
	}
	
	private static String mkDir(String basePath) {
		
		Calendar cal = Calendar.getInstance();
		
		// File.separator이건 "/"를 의미
		
		int year = cal.get(Calendar.YEAR);
		String month = new DecimalFormat("00").format(cal.get(Calendar.MONTH) + 1);
		String date = new DecimalFormat("00").format(cal.get(Calendar.DATE));
		
		String calFullPath = year + "-" + month + "-" + date;
		
		File baseFolder = new File(basePath);
		if(!baseFolder.exists()) {
			
			baseFolder.mkdir();
			
		}
		/*
		File eachFolder = new File(basePath + calFullPath);
		if(!eachFolder.exists()) {
			
			eachFolder.mkdir();
			
		}
		*/
		
		return calFullPath + "\\";
		
	}

}

package com.hard.study.utils.upload;

import java.io.File;
import java.util.concurrent.Executors;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferManagerBuilder;
import com.amazonaws.services.s3.transfer.Upload;

public class AwsUploadUtil {
	
	private static final String BURKETNAME = "S3_Storage";
	private static final String ACCESS_KEY = "AKIAIHSN6HAI7NOTUVXQ";
	private static final String SECRET_KEY = "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";
	private AmazonS3 s3;
	
	public void upload(String savedName, File awsTarget) throws Exception {
		
		if(s3 != null) {
			
			try {
				
				TransferManagerBuilder tmb = TransferManagerBuilder.standard();
				tmb.setS3Client(s3);
				tmb.setExecutorFactory(() -> Executors.newFixedThreadPool(4));
				
				TransferManager tm = tmb.build();
				
				PutObjectRequest por = new PutObjectRequest(BURKETNAME, savedName, awsTarget);
				
				Upload upload = tm.upload(por);
				
				try {
					
					upload.waitForCompletion();
					
				} catch(InterruptedException e) {
					
					e.getLocalizedMessage();
					
				}
				
			} catch(AmazonServiceException ase) {
				
				ase.printStackTrace();
				
			} finally {
				
				s3 = null;
				
			}
			
		}
		
	}
	
}

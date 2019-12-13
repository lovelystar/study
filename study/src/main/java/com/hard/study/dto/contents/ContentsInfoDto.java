package com.hard.study.dto.contents;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContentsInfoDto {
	
	MultipartFile file;
	String fileName;
	Integer fileSize;
	String fileUnit;
	String randomName;
	
}

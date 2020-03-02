package com.hard.study.vo.board;

import java.util.Date;

import com.hard.study.dto.common.PageMaker;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardVo extends PageMaker {
	
	private int idx;
	private int idxBoard;
	private String boardType;
	private String boardName;
	private String boardDetails;
	private int boardViews;
	private String fileName;
	private String originalName;
	private String randomName;
	private String filePath;
	private byte[] fileBytes;
	private String fileSize;
	private String mimeType;
	private int idxUser;
	private int idxUserGroup;
	private String username;
	private Date regdate;
	private Date uptdate;
	
}

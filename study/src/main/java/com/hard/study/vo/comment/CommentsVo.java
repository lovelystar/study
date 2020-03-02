package com.hard.study.vo.comment;

import java.util.Date;

import com.hard.study.dto.common.PageMaker;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentsVo extends PageMaker {

	private int idx;
	private int idxBoard;
	private int idxReply;
	private String boardType;
	private Integer gmIdx;
	private Integer grIdx;
	private String username;
	private String nickname;
	private String contents;
	private String imgValue;
	private int commentable;
	private Date regdate;
	private Date uptdate;
	
}
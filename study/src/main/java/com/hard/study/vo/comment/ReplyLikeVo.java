package com.hard.study.vo.comment;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReplyLikeVo {
	
	private int idx;
	private int idxBoard;
	private int idxReply;
	private int cnt;
	private String replyType;
	private String boardType;
	private Integer gmIdx;
	private Integer grIdx;
	private String username;
	private String nickname;
	private Date regdate;
	private Date uptdate;
	
}

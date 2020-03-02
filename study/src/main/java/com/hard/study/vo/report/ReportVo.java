package com.hard.study.vo.report;

import com.hard.study.dto.common.PageMaker;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReportVo extends PageMaker {
	
	private int idx;
	private int idxEtc;
	private int gmIdx;
	private int grIdx;
	private String username;
	private String target;
	private String type;
	private String opt;
	private String comments;
	
}

package com.hard.study.dto.common;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Search extends Criteria {
	
	private String searchType;
	private String keyword;
	
}

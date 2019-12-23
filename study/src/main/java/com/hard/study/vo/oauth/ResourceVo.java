package com.hard.study.vo.oauth;

import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@NotNull
public class ResourceVo {
	
	private String url;
	private String token;
	private Integer param;
	private Integer num;
	
}

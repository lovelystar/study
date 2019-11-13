package com.hard.study.vo.oauth;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import com.hard.study.vo.common.CommonResult;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfoVo extends CommonResult {
	
	@SerializedName("username")// json으로 표현할 때 key값을 access_token으로 변경
	@Expose // key, value로 json 제작 중 value가 null이면 자동 생략
	private String username;
	
}

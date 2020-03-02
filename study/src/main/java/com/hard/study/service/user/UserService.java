package com.hard.study.service.user;

public interface UserService {
	
	public int getGmIdx(String username) throws Exception; // user의 idx
	public int getGrIdx(String username) throws Exception; // user의 group_idx
	
}

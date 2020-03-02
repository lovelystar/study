package com.hard.study.dao.user;

import java.sql.SQLException;

public interface UserDao {
	
	public int getGmIdx(String username) throws SQLException; // user의 idx
	public int getGrIdx(String username) throws SQLException; // user의 group_idx
	
}

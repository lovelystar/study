package com.hard.study.dao.user;

import java.sql.SQLException;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository("userDao")
public class UserDaoImpl implements UserDao {
	
	@Autowired
	private SqlSession sqlSession;
	
	// user의 idx
	@Override
	public int getGmIdx(String username) throws SQLException {
		return sqlSession.selectOne("getGmIdx", username);
	}
	
	// user의 group_idx
	@Override
	public int getGrIdx(String username) throws SQLException {
		return sqlSession.selectOne("getGrIdx", username);
	}
	
	
}

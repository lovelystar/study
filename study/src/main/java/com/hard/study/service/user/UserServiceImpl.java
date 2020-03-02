package com.hard.study.service.user;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.hard.study.dao.user.UserDao;

@Service("userService")
public class UserServiceImpl implements UserService {
	
	@Resource(name="userDao")
	private UserDao userDao;
	
	// user의 idx
	@Override
	public int getGmIdx(String username) throws Exception {
		return userDao.getGmIdx(username);
	}
	
	// user의 group_idx
	@Override
	public int getGrIdx(String username) throws Exception {
		return userDao.getGrIdx(username);
	}
	
}

package com.hard.study.dao.report;

import java.sql.SQLException;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hard.study.vo.report.ReportVo;

@Repository("reportDao")
public class ReportDaoImpl implements ReportDao {
	
	@Autowired
	private SqlSession sqlSession;
	
	public void setSqlSession(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	
	// 신고 했는지 확인 ( 이전에 신고했는지 확인 )
	@Override
	public int chkReport(ReportVo vo) throws SQLException {
		return sqlSession.selectOne("chkReport", vo);
	}
	
	// 신고 등록
	@Override
	public int regReport(ReportVo vo) throws SQLException {
		return sqlSession.insert("regReport", vo);
	}
	
}

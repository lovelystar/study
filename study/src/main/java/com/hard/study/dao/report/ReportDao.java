package com.hard.study.dao.report;

import java.sql.SQLException;

import com.hard.study.vo.report.ReportVo;

public interface ReportDao {
	
	public int chkReport(ReportVo vo) throws SQLException; // 신고 했는지 확인 ( 이전에 신고했는지 확인 )
	public int regReport(ReportVo vo) throws SQLException; // 신고 등록
	
}

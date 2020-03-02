package com.hard.study.service.report;

import com.hard.study.vo.report.ReportVo;

public interface ReportService {
	
	public int chkReport(ReportVo vo) throws Exception; // 신고 했는지 확인 ( 이전에 신고했는지 확인 )
	public int regReport(ReportVo vo) throws Exception; // 신고 등록
	
}

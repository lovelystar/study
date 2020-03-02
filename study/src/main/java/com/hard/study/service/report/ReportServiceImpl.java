package com.hard.study.service.report;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.hard.study.dao.report.ReportDao;
import com.hard.study.vo.report.ReportVo;

@Service("reportService")
public class ReportServiceImpl implements ReportService {
	
	@Resource(name="reportDao")
	private ReportDao reportDao;
	
	// 신고 했는지 확인 ( 이전에 신고했는지 확인 )
	@Override
	public int chkReport(ReportVo vo) throws Exception {
		return reportDao.chkReport(vo);
	}
	
	// 신고 등록
	@Override
	public int regReport(ReportVo vo) throws Exception {
		return reportDao.regReport(vo);
	}
	
}

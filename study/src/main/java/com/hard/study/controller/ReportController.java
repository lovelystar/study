package com.hard.study.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hard.study.service.report.ReportService;
import com.hard.study.vo.common.CommonCode;
import com.hard.study.vo.common.CommonResult;
import com.hard.study.vo.report.ReportVo;

@Controller
public class ReportController {
	
	@Autowired
	ReportService reportService;

	@ResponseBody
	@RequestMapping(value="/report", method=RequestMethod.POST)
	public CommonResult report(@RequestBody ReportVo vo) throws Exception {
		
		CommonResult result = new CommonResult();
		
		String type = vo.getType();
		Integer chk = reportService.chkReport(vo);

		result.setResultString(type);
		
		// 없으면 등록
		if(chk == 0) {
			
			Integer rwCnt = reportService.regReport(vo);
			if(rwCnt >= 1) {
				result.setResultCode(CommonCode.SUCCESS_CODE); // 성공 코드 ( 1 )
				if(type.equals("reply")) {
					result.setResultMessage("해당 댓글이 신고처리 되었습니다.");
				} else if(type.equals("comments")) {
					result.setResultMessage("해당 덧글이 신고처리 되었습니다.");
				} else {
					result.setResultMessage("해당 글이 신고처리 되었습니다.");
				}
			} else {
				result.setResultCode(CommonCode.FAIL_CODE); // 실패 코드 ( -1 )
			}
			
			// 있으면 예외
		} else {
			result.setResultCode(CommonCode.UNKNOWN_CODE); // 예외 코드 ( 0 )
			if(type.equals("reply")) {
				result.setResultMessage("한 개의 댓글에 1회 이상 신고할 수 없습니다.");
			} else if(type.equals("comments")) {
				result.setResultMessage("한 개의 덧글에 1회 이상 신고할 수 없습니다.");
			} else {
				result.setResultMessage("한 개의 글에 1회 이상 신고할 수 없습니다.");
			}
		}
		
		
		
		
		
		
		return result;
		
	}
	
}

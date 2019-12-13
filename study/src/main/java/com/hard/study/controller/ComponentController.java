package com.hard.study.controller;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.hard.study.dto.contents.ContentsInfoDto;
import com.hard.study.vo.common.CommonResult;

@Controller
public class ComponentController {
	
	@RequestMapping(value="/swiper", method=RequestMethod.GET)
	public ModelAndView swiper() throws Exception {
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName("index");
		
		return mav;
		
	}
	
	@RequestMapping(value="/style", method=RequestMethod.GET)
	public ModelAndView style() throws Exception {
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName("index");
		
		return mav;
		
	}
	
	@RequestMapping(value="/upload", method=RequestMethod.GET)
	public ModelAndView upload() throws Exception {
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName("index");
		
		return mav;
		
	}
	
	@RequestMapping(value="/data", method=RequestMethod.GET)
	public ModelAndView dataAlgorithm() throws Exception {
		
		ModelAndView mav = new ModelAndView();
		mav.setViewName("index");
		
		return mav;
		
	}

	// RequestBody = Http 요청이 온 것을 매핑하기 위해서
	// Object Array 받을 때 사용 @RequestBody @Valid List<ContentsInfoDto> dto
	@ResponseBody
	@RequestMapping(value="/regcontents", method=RequestMethod.POST)
	public CommonResult regContents(MultipartHttpServletRequest mReq) throws Exception {
		
		List<MultipartFile> files = mReq.getFiles("files");
		System.out.println("files = " + files);

		CommonResult result = new CommonResult();
		
		result.setResultCode(1);
		result.setResultMessage("success");
		
		return result;
		
	}
	
	// Saga에서 Array로 넘겼을 때 받는 법 _ Array 안에는 Object가 아닐 때 데이터 받는 법
	@ResponseBody
	@RequestMapping(value="/arrlist", method=RequestMethod.POST)
	public CommonResult arrayList(@RequestBody List<String> list) throws Exception {

		for(int i=0; i<list.size(); i++){
			System.out.println("list value = " + list.get(i));
		}

		CommonResult result = new CommonResult();

		result.setResultCode(1);
		result.setResultMessage("success");

		return result;

	}

	// Saga에서 map을 직접 만든 것 또는 new Object 로 만든 것을 넘겼을 때 데이터 받는 법
	@ResponseBody
	@RequestMapping(value="/objdata", method=RequestMethod.POST)
	public CommonResult objData(@RequestBody ContentsInfoDto dto) throws Exception {
		
		System.out.println("get filename value = " + dto.getFileName());
		System.out.println("get filesize value = " + dto.getFileSize());
		System.out.println("get fileUnit value = " + dto.getFileUnit());
		System.out.println("get randomName value = " + dto.getRandomName());

		CommonResult result = new CommonResult();

		result.setResultCode(1);
		result.setResultMessage("success");

		return result;

	}

	// Saga에서 formData로 넘겼을 때 받는법
	@ResponseBody
	@RequestMapping(value="/formdata", method=RequestMethod.POST)
	public CommonResult formData(HttpServletRequest req) throws Exception {
		


		System.out.println("req header = " + req.getHeaderNames());
		System.out.println("req getRequestURL = " + req.getRequestURL());
		System.out.println("req get param fileName" + req.getParameter("fileName"));
		System.out.println("req get param fileUnit" + req.getParameter("fileUnit"));
		System.out.println("req get param randomName" + req.getParameter("randomName"));

		CommonResult result = new CommonResult();

		result.setResultCode(1);
		result.setResultMessage("success");

		return result;

	}

}

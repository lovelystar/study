package com.hard.study.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.hard.study.dto.contents.ContentsInfoDto;
import com.hard.study.utils.upload.FileUploadUtil;
import com.hard.study.vo.common.CommonResult;

@Controller
public class ComponentController {
	
	@Resource(name="fileUploadPath")
	private String uploadPath;

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
	// 파일업로드 >> FormData로 넘길 때 아래처럼 받음.
	@ResponseBody
	@RequestMapping(value="/regcontents", method=RequestMethod.POST)
	public CommonResult regContents(MultipartHttpServletRequest mReq) throws Exception {
		
		/*
		System.out.println("req get param fileName" + req.getParameter("files"));
		System.out.println("req get param randomName" + req.getParameter("randomName"));
		*/

		List<MultipartFile> files = mReq.getFiles("files");
		String[] randomNames = mReq.getParameterValues("randomNames");
		
		
		for(int i=0; i<files.size(); i++){

			FileUploadUtil.fileUpload(uploadPath, files.get(i), randomNames[i]);

		}
		
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
		
		System.out.println("get first value = " + dto.getFirst());
		System.out.println("get second value = " + dto.getSecond());
		System.out.println("get third value = " + dto.getThird());
		System.out.println("get fourth value = " + dto.getFourth());
		System.out.println("get fifth value = " + dto.getFifth());

		CommonResult result = new CommonResult();

		result.setResultCode(1);
		result.setResultMessage("success");

		return result;

	}


	@ResponseBody
	@RequestMapping(value="/objarr", method=RequestMethod.POST)
	public CommonResult objectArray(@RequestBody List<Map<String, Object>> list) throws Exception {

		System.out.println("list size = " + list.size());

		for(int i=0; i<list.size(); i++){
			
			System.out.println("list get i get name = " + list.get(i).get("name"));
			System.out.println("list get i get age = " + list.get(i).get("age"));
			System.out.println("list get i get career = " + list.get(i).get("career"));
			System.out.println("list get i get number = " + list.get(i).get("number"));
			System.out.println("list get i get email = " + list.get(i).get("email"));

		}

		CommonResult result = new CommonResult();

		result.setResultCode(1);
		result.setResultMessage("success");

		return result;

	}

	// Saga에서 formData로 넘겼을 때 받는법
	@ResponseBody
	@RequestMapping(value="/formData", method=RequestMethod.POST)
	public CommonResult FormData(HttpServletRequest req) throws Exception {
		
		String[] singleName = req.getParameterValues("singleName");
		
		for(int i=0; i<singleName.length; i++) {
			System.out.println("get parameterValues singleName[i] = " + singleName[i]);
		}

		System.out.println("get parameter singleAge = " + req.getParameter("singleAge"));
		System.out.println("get parameter singleCareer = " + req.getParameter("singleCareer"));
		System.out.println("get parameter singleNumber = " + req.getParameter("singleNumber"));
		System.out.println("get parameter singleEmail = " + req.getParameter("singleEmail"));
		
		CommonResult result = new CommonResult();

		result.setResultCode(1);
		result.setResultMessage("success");

		return result;

	}

	@RequestMapping(value="/portfolio", method=RequestMethod.GET)
	public ModelAndView portfolio() throws Exception {

		ModelAndView mav = new ModelAndView();
		mav.setViewName("index");

		return mav;

	}

}

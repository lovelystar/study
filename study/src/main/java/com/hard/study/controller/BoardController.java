package com.hard.study.controller;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.OAuth2RestOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.hard.study.service.board.BoardService;
import com.hard.study.service.oauth.CookieService;
import com.hard.study.utils.upload.FileUploadUtil;
import com.hard.study.vo.board.BoardLikeVo;
import com.hard.study.vo.board.BoardVo;
import com.hard.study.vo.common.CommonCode;
import com.hard.study.vo.common.CommonResult;

@Controller
public class BoardController {
	
	@Resource(name="fileUploadPath")
	private String uploadPath;
	
	@Autowired
	private OAuth2RestOperations restTemplate;
	
	@Autowired
	private CookieService cookieService;
	
	@Autowired
	private BoardService boardService;
	
	@RequestMapping(value="/board", method=RequestMethod.GET)
	public ModelAndView board(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		//String accessToken = restTemplate.getAccessToken().toString();
		String username = null;
		Integer gmIdx = 0;
		Integer gIdx = 0;
		
		// client의 기존 인증정보( AccessToken )이 있는지 확인
		// null이면 default value 그대로 적용
		if(restTemplate.getOAuth2ClientContext().getAccessToken() == null) {
			
		} else {
			
			String accessToken = restTemplate.getAccessToken().toString();
			username = cookieService.getUsernameCookieCheck(request, accessToken, response);
			gmIdx = 1; // service 태워서 idx 확인
			gIdx = 1; // service 태워서 idx 확인
			
		}
		
		ModelAndView mav = new ModelAndView();
		
		mav.setViewName("index");
		mav.addObject("username", username);
		mav.addObject("gmIdx", gmIdx);
		mav.addObject("gIdx", gIdx);
		
		return mav;
		
	}
	
	// RequestBody = Http 요청이 온 것을 매핑하기 위해서
	// Object Array 받을 때 사용 @RequestBody @Valid List<ContentsInfoDto> dto
	// 파일업로드 >> FormData로 넘길 때 아래처럼 받음.
	@ResponseBody
	@RequestMapping(value="/regcontents", method=RequestMethod.POST)
	public CommonResult regContents(MultipartHttpServletRequest mReq, BoardVo vo) throws Exception {

		CommonResult result = new CommonResult();
		Integer repeatIdx;
		Integer regContentsIdx = 0;
		Integer upldSuc = 0;

		List<MultipartFile> files = mReq.getFiles("file");
		String[] randomNames = mReq.getParameterValues("randomName");
		String subject = mReq.getParameter("subject");
		String comment = mReq.getParameter("comment");

		vo.setBoardName(subject);
		vo.setBoardDetails(comment);

		int boardIdx = boardService.regBoard(vo);
		if(boardIdx == 1){
			
			for(repeatIdx=0; repeatIdx<files.size(); repeatIdx++){

				InputStream is = null;
				is = files.get(repeatIdx).getInputStream();
				
				Tika tika = new Tika();
				String mime = tika.detect(is);
				
				Integer upldResult = FileUploadUtil.fileUpload(uploadPath, files.get(repeatIdx), randomNames[repeatIdx]);
				upldSuc += upldResult;

				vo.setFileName("fileName+" + repeatIdx);
				vo.setOriginalName(files.get(repeatIdx).getOriginalFilename());
				vo.setRandomName(randomNames[repeatIdx]);
				vo.setFilePath(uploadPath);
				vo.setFileBytes(files.get(repeatIdx).getBytes());
				vo.setMimeType(mime);
				vo.setIdxUser(1);
				vo.setIdxUserGroup(1);
				
				Integer regContentsResult = boardService.regFiles(vo);
				regContentsIdx += regContentsResult;
				
			}

			// DB에 등록된 수와 업로드 성공한 수가 같을 때 (SUCCESS CODE)
			if(regContentsIdx == upldSuc){

				result.setResultCode(CommonCode.SUCCESS_CODE);
				result.setResultMessage("success");

				// 다르면 올린 파일 삭제와 등록된 DB 삭제
			} else {

				result.setResultCode(CommonCode.FAIL_CODE);
				result.setResultMessage("fail");

			}
			
		} else {
			
			result.setResultCode(CommonCode.FAIL_CODE);
			result.setResultMessage("fail");
			
		}
		
		return result;

	}
	
	@ResponseBody
	@RequestMapping(value="/boardlist", method=RequestMethod.POST)
	public Map<String, Object> boardList(@RequestBody BoardVo vo) throws Exception {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		//System.out.println("server page = " + vo.getPage());
		// 글 갯수
		int boardTotal = boardService.boardTotal(vo);
		
		//vo.setPerPageNum(2); // 한 페이지에 보여질 갯수
		//vo.setDisplayPageNum(2); // 페이징 갯수
		vo.setTotalCount(boardTotal);
		
		// 글 목록
		List<BoardVo> boardList = boardService.getBoard(vo);
		
		for(int i=0; i<boardList.size(); i++) {
			
			Map<String, Object> map = new HashMap<>();

			// 글 정보
			map.put("idx", boardList.get(i).getIdx());
			map.put("boardName", boardList.get(i).getBoardName());
			map.put("boardDetails", boardList.get(i).getBoardDetails());
			map.put("boardViews", boardList.get(i).getBoardViews());
			map.put("boardLikes", boardService.getBoardLike(boardList.get(i).getIdx()));
			map.put("uptdate", boardList.get(i).getUptdate());
			
			// 글 목록 ( 파일리스트 )
			List<BoardVo> boardUpldList = boardService.getBoardUpld(boardList.get(i).getIdx());
			List<Map<String, Object>> upldList = new ArrayList<Map<String, Object>>();

			// 첨부파일 정보
			for(int j=0; j<boardUpldList.size(); j++) {
				
				Map<String, Object> upldMap = new HashMap<String, Object>();
				
				upldMap.put("idxContents", boardUpldList.get(j).getIdx());
				upldMap.put("idxBoard", boardUpldList.get(j).getIdxBoard());
				upldMap.put("fileName", boardUpldList.get(j).getFileName());
				upldMap.put("originalName", boardUpldList.get(j).getOriginalName());
				upldMap.put("randomName", boardUpldList.get(j).getRandomName());
				upldMap.put("mimeType", boardUpldList.get(j).getMimeType());
				upldMap.put("idxUser", boardUpldList.get(j).getIdxUser());
				upldMap.put("idxUserGroup", boardUpldList.get(j).getIdxUserGroup());
				upldMap.put("uptdate", boardUpldList.get(j).getUptdate());
				
				upldList.add(upldMap);
					
			}
			
			map.put("contentsList", upldList);
			resultList.add(map);
			
		}
		
		resultMap.put("board", resultList);

		// 페이징 정보
		Map<String, Object> paginationMap = new HashMap<String, Object>();
		
		paginationMap.put("prevPage", vo.getPrevPage());
		paginationMap.put("prev", vo.isPrev());
		paginationMap.put("startPage", vo.isStartPage());
		paginationMap.put("nextPage", vo.getNextPage());
		paginationMap.put("next", vo.isNext());
		paginationMap.put("endPage", vo.isEndPage());
		
		resultMap.put("paging", paginationMap);
			
		return resultMap;
		
	}
	
	@RequestMapping(value="/boardview", method=RequestMethod.GET)
	public ModelAndView boardView(@RequestParam("boardno") Integer boardIdx, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String username = null;
		Integer gmIdx = 0;
		Integer gIdx = 0;
		
		// client의 기존 인증정보( AccessToken )이 있는지 확인
		// null이면 default value 그대로 적용
		if(restTemplate.getOAuth2ClientContext().getAccessToken() == null) {
			
		} else {
			
			String accessToken = restTemplate.getAccessToken().toString();
			username = cookieService.getUsernameCookieCheck(request, accessToken, response);
			gmIdx = 1; // service 태워서 idx 확인
			gIdx = 1; // service 태워서 idx 확인
			
		}

		ModelAndView mav = new ModelAndView();
		
		boardService.boardViews(boardIdx);
		
		mav.setViewName("index");
		
		mav.addObject("idxParam", boardIdx);
		mav.addObject("username", username);
		mav.addObject("gmIdx", gmIdx);
		mav.addObject("gIdx", gIdx);
		
		return mav;
		
	}
	
	@ResponseBody
	@RequestMapping(value="/boardinfo", method=RequestMethod.POST)
	public Map<String, Object> boardInfo(@RequestBody BoardVo vo) throws Exception {
		
		int idxBoard = vo.getIdx();
		String boardType = vo.getBoardType();
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String, Object> likeMap = new HashMap<String, Object>();
		
		likeMap.put("idxBoard", idxBoard);
		likeMap.put("boardType", boardType);
		
		List<BoardVo> upldList = boardService.getBoardUpld(idxBoard);
		List<String> likedUser = boardService.getBoardLikeUser(likeMap);
		
		resultMap = boardService.getBoardInfo(idxBoard);
		resultMap.put("upldList", upldList);
		resultMap.put("likedUser", likedUser);
		
		return resultMap;
		
	}
	
	@ResponseBody
	@RequestMapping(value="/boardlike", method=RequestMethod.POST)
	public Map<String, Object> boardLike(@RequestBody BoardLikeVo vo) throws Exception {
		
		Map<String, Object> result = new HashMap<String, Object>();
		Map<String, Object> likeMap = new HashMap<String, Object>();
		
		int idxBoard = vo.getIdxBoard();
		String boardType = vo.getBoardType();

		likeMap.put("idxBoard", idxBoard);
		likeMap.put("boardType", boardType);
		
		int rwCnt = boardService.like(vo);
		
		if(rwCnt >= 1) {
			
			result.put("resultCode", CommonCode.SUCCESS_CODE);
			result.put("resultInteger", boardService.getBoardLike(idxBoard));
			result.put("likedUser", boardService.getBoardLikeUser(likeMap));
			
		} else {
			
			result.put("resultCode", CommonCode.FAIL_CODE);
			result.put("resultInteger", -1);
			
		}
		
		return result;
		
	}
	
}
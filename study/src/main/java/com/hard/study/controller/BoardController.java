package com.hard.study.controller;

import java.io.File;
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

import com.hard.study.dto.comment.RcDto;
import com.hard.study.service.board.BoardService;
import com.hard.study.service.oauth.CookieService;
import com.hard.study.service.user.UserService;
import com.hard.study.utils.upload.CommentUploadUtil;
import com.hard.study.utils.upload.CommentUploadedModifyUtil;
import com.hard.study.utils.upload.FileUploadUtil;
import com.hard.study.vo.board.BoardLikeVo;
import com.hard.study.vo.board.BoardVo;
import com.hard.study.vo.comment.CommentsVo;
import com.hard.study.vo.comment.ReplyLikeVo;
import com.hard.study.vo.comment.ReplyVo;
import com.hard.study.vo.common.CommonCode;
import com.hard.study.vo.common.CommonResult;
import com.hard.study.vo.report.ReportVo;

@Controller
public class BoardController {
	
	@Resource(name="fileUploadPath")
	private String uploadPath;
	
	@Resource(name="commentUploadPath")
	private String commentUploadPath;
	
	@Autowired
	private OAuth2RestOperations restTemplate;
	
	@Autowired
	private CookieService cookieService;
	
	@Autowired
	private BoardService boardService;
	
	@Autowired
	private UserService userService;
	
	// board
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
			gmIdx = userService.getGmIdx(username);
			gIdx = userService.getGrIdx(username);
			
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
	
	// 게시판
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
			
			// 댓글 갯수
			Integer replyCnt = boardService.replyCnt(boardList.get(i).getIdx());
			map.put("replyCnt", replyCnt);

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
	
	// 게시판 상세
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
			gmIdx = userService.getGmIdx(username);
			gIdx = userService.getGrIdx(username);
			
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
	
	// 게시판 상세 정보
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
	
	// 좋아요 정보
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
	
	// 댓글 등록
	@ResponseBody
	@RequestMapping(value="/regreply", method=RequestMethod.POST)
	public Map<String, Object> regReply(MultipartFile imgContents, HttpServletRequest req, ReplyVo vo) throws Exception {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		Integer rwCnt = 0;
		
		vo.setIdxBoard(Integer.parseInt(req.getParameter("idxBoard")));
		vo.setBoardType(req.getParameter("boardType"));
		vo.setGmIdx(Integer.parseInt(req.getParameter("gmIdx")));
		vo.setGrIdx(Integer.parseInt(req.getParameter("grIdx")));
		vo.setUsername(req.getParameter("username"));
		vo.setNickname(req.getParameter("nickname"));
		
		// imgContents가 null이라면 contents. 즉, 텍스트 등록
		if(imgContents == null) {

			vo.setContents(req.getParameter("contents"));
			rwCnt = boardService.regReply(vo);

			// imgContents가 null이 아니면 파일업로드 진행
		} else {
			
			String imgValue = CommentUploadUtil.fileUpload(commentUploadPath, imgContents);
			vo.setImgValue(imgValue);
			
			rwCnt = boardService.regReply(vo);
			
		}
		
		
		
		
		
		// 등록 후 데이터
		int replyTotal = boardService.replyTotal(vo);
		int commentsTotal = boardService.commentsTotal(vo);
		vo.setTotalCount(replyTotal);
		
		List<ReplyVo> replyList = boardService.getReply(vo);
		for(int i=0; i<replyList.size(); i++) {
			
			// 댓글 정보
			Map<String, Object> tempReplyMap = new HashMap<>();
			
			tempReplyMap.put("idx", replyList.get(i).getIdx());
			tempReplyMap.put("idxBoard", replyList.get(i).getIdxBoard());
			tempReplyMap.put("gmIdx", replyList.get(i).getGmIdx());
			tempReplyMap.put("grIdx", replyList.get(i).getGrIdx());
			tempReplyMap.put("username", replyList.get(i).getUsername());
			tempReplyMap.put("nickname", replyList.get(i).getNickname());
			tempReplyMap.put("contents", replyList.get(i).getContents());
			tempReplyMap.put("imgValue", replyList.get(i).getImgValue());
			tempReplyMap.put("replyable", replyList.get(i).getReplyable());
			tempReplyMap.put("uptdate", replyList.get(i).getUptdate());
			
			// 덧글 목록
			List<CommentsVo> commentsList = boardService.getComments(tempReplyMap);
			List<Map<String, Object>> comments = new ArrayList<Map<String, Object>>();
			
			// 댓글 좋아요 수
			Integer replyLikes = boardService.replyLikes(tempReplyMap);
			
			// 댓글 좋아요 유저
			List<String> replyLikedUser = boardService.replyLikedUser(tempReplyMap);
			
			// 덧글 갯수
			Integer commentsCnt = boardService.commentsCnt(tempReplyMap);
			tempReplyMap.put("commentsCnt", commentsCnt);
			tempReplyMap.put("replyLikes", replyLikes);
			tempReplyMap.put("replyLikedUser", replyLikedUser);
			
			for(int j=0; j<commentsList.size(); j++) {
				
				Map<String, Object> tempCommentsMap = new HashMap<String, Object>();
				
				tempCommentsMap.put("idx", commentsList.get(j).getIdx());
				tempCommentsMap.put("idxBoard", commentsList.get(j).getIdxBoard());
				tempCommentsMap.put("idxReply", commentsList.get(j).getIdxReply());
				tempCommentsMap.put("gmIdx", commentsList.get(j).getGmIdx());
				tempCommentsMap.put("grIdx", commentsList.get(j).getGrIdx());
				tempCommentsMap.put("username", commentsList.get(j).getUsername());
				tempCommentsMap.put("nickname", commentsList.get(j).getNickname());
				tempCommentsMap.put("contents", commentsList.get(j).getContents());
				tempCommentsMap.put("imgValue", commentsList.get(j).getImgValue());
				tempCommentsMap.put("commentable", commentsList.get(j).getCommentable());
				tempCommentsMap.put("uptdate", commentsList.get(j).getUptdate());
				
				comments.add(tempCommentsMap);
				
			}
			
			tempReplyMap.put("comments", comments);
			resultList.add(tempReplyMap);
			
		}
		
		Integer rcTotal = replyTotal + commentsTotal;
		
		resultMap.put("rc", resultList);
		resultMap.put("rcTotal", rcTotal);
		
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
	
	// 댓글 목록 가져오기
	@ResponseBody
	@RequestMapping(value="/getreply", method=RequestMethod.POST)
	public Map<String, Object> getReply(@RequestBody ReplyVo vo) throws Exception {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		
		int replyTotal = boardService.replyTotal(vo);
		int commentsTotal = boardService.commentsTotal(vo);
		//vo.setPerPageNum(2); // 한 페이지에 보여질 갯수
		//vo.setDisplayPageNum(2); // 페이징 갯수
		vo.setTotalCount(replyTotal);
		
		// 댓글 정보 가져오기
		List<ReplyVo> replyList = boardService.getReply(vo);
		for(int i=0; i<replyList.size(); i++) {
			
			// 댓글 정보
			Map<String, Object> tempReplyMap = new HashMap<>();
			
			tempReplyMap.put("idx", replyList.get(i).getIdx());
			tempReplyMap.put("idxBoard", replyList.get(i).getIdxBoard());
			tempReplyMap.put("gmIdx", replyList.get(i).getGmIdx());
			tempReplyMap.put("grIdx", replyList.get(i).getGrIdx());
			tempReplyMap.put("username", replyList.get(i).getUsername());
			tempReplyMap.put("nickname", replyList.get(i).getNickname());
			tempReplyMap.put("contents", replyList.get(i).getContents());
			tempReplyMap.put("imgValue", replyList.get(i).getImgValue());
			tempReplyMap.put("replyable", replyList.get(i).getReplyable());
			tempReplyMap.put("uptdate", replyList.get(i).getUptdate());
			
			// 덧글 목록
			List<CommentsVo> commentsList = boardService.getComments(tempReplyMap);
			List<Map<String, Object>> comments = new ArrayList<Map<String, Object>>();
			
			// 댓글 좋아요 수
			Integer replyLikes = boardService.replyLikes(tempReplyMap);
			
			// 댓글 좋아요 유저
			List<String> replyLikedUser = boardService.replyLikedUser(tempReplyMap);
			
			// 덧글 갯수
			Integer commentsCnt = boardService.commentsCnt(tempReplyMap);
			tempReplyMap.put("commentsCnt", commentsCnt);
			tempReplyMap.put("replyLikes", replyLikes);
			tempReplyMap.put("replyLikedUser", replyLikedUser);
			
			for(int j=0; j<commentsList.size(); j++) {
				
				Map<String, Object> tempCommentsMap = new HashMap<String, Object>();
				
				tempCommentsMap.put("idx", commentsList.get(j).getIdx());
				tempCommentsMap.put("idxBoard", commentsList.get(j).getIdxBoard());
				tempCommentsMap.put("idxReply", commentsList.get(j).getIdxReply());
				tempCommentsMap.put("gmIdx", commentsList.get(j).getGmIdx());
				tempCommentsMap.put("grIdx", commentsList.get(j).getGrIdx());
				tempCommentsMap.put("username", commentsList.get(j).getUsername());
				tempCommentsMap.put("nickname", commentsList.get(j).getNickname());
				tempCommentsMap.put("contents", commentsList.get(j).getContents());
				tempCommentsMap.put("imgValue", commentsList.get(j).getImgValue());
				tempCommentsMap.put("commentable", commentsList.get(j).getCommentable());
				tempCommentsMap.put("uptdate", commentsList.get(j).getUptdate());
				
				comments.add(tempCommentsMap);
				
			}
			
			tempReplyMap.put("comments", comments);
			resultList.add(tempReplyMap);
			
		}
		
		Integer rcTotal = replyTotal + commentsTotal;
		
		resultMap.put("rc", resultList);
		resultMap.put("rcTotal", rcTotal);
		
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
	
	// 덧글 등록
	@ResponseBody
	@RequestMapping(value="regcomments", method=RequestMethod.POST)
	public Map<String, Object> regComments(MultipartFile imgContents, HttpServletRequest req, ReplyVo vo) throws Exception {

		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		Integer rwCnt = 0;

		vo.setIdxBoard(Integer.parseInt(req.getParameter("idxBoard")));
		vo.setIdxReply(Integer.parseInt(req.getParameter("idxReply")));
		vo.setBoardType(req.getParameter("boardType"));
		vo.setGmIdx(Integer.parseInt(req.getParameter("gmIdx")));
		vo.setGrIdx(Integer.parseInt(req.getParameter("grIdx")));
		vo.setUsername(req.getParameter("username"));
		vo.setNickname(req.getParameter("nickname"));
		
		// imgContents가 null이라면 contents. 즉, 텍스트 등록
		if(imgContents == null) {
			
			vo.setContents(req.getParameter("contents"));
			rwCnt = boardService.regComments(vo);
			
		} else {
			
			String imgValue = CommentUploadUtil.fileUpload(commentUploadPath, imgContents);
			vo.setImgValue(imgValue);
			
			rwCnt = boardService.regComments(vo);
			
		}
		
		
		
		
		// 등록 후 데이터
		int replyTotal = boardService.replyTotal(vo);
		int commentsTotal = boardService.commentsTotal(vo);
		vo.setTotalCount(replyTotal);
		
		List<ReplyVo> replyList = boardService.getReply(vo);
		for(int i=0; i<replyList.size(); i++) {
			
			// 댓글 정보
			Map<String, Object> tempReplyMap = new HashMap<>();
			
			tempReplyMap.put("idx", replyList.get(i).getIdx());
			tempReplyMap.put("idxBoard", replyList.get(i).getIdxBoard());
			tempReplyMap.put("gmIdx", replyList.get(i).getGmIdx());
			tempReplyMap.put("grIdx", replyList.get(i).getGrIdx());
			tempReplyMap.put("username", replyList.get(i).getUsername());
			tempReplyMap.put("nickname", replyList.get(i).getNickname());
			tempReplyMap.put("contents", replyList.get(i).getContents());
			tempReplyMap.put("imgValue", replyList.get(i).getImgValue());
			tempReplyMap.put("replyable", replyList.get(i).getReplyable());
			tempReplyMap.put("uptdate", replyList.get(i).getUptdate());
			
			// 덧글 목록
			List<CommentsVo> commentsList = boardService.getComments(tempReplyMap);
			List<Map<String, Object>> comments = new ArrayList<Map<String, Object>>();
			
			// 댓글 좋아요 수
			Integer replyLikes = boardService.replyLikes(tempReplyMap);
			
			// 댓글 좋아요 유저
			List<String> replyLikedUser = boardService.replyLikedUser(tempReplyMap);
			
			// 덧글 갯수
			Integer commentsCnt = boardService.commentsCnt(tempReplyMap);
			tempReplyMap.put("commentsCnt", commentsCnt);
			tempReplyMap.put("replyLikes", replyLikes);
			tempReplyMap.put("replyLikedUser", replyLikedUser);
			
			for(int j=0; j<commentsList.size(); j++) {
				
				Map<String, Object> tempCommentsMap = new HashMap<String, Object>();
				
				tempCommentsMap.put("idx", commentsList.get(j).getIdx());
				tempCommentsMap.put("idxBoard", commentsList.get(j).getIdxBoard());
				tempCommentsMap.put("idxReply", commentsList.get(j).getIdxReply());
				tempCommentsMap.put("gmIdx", commentsList.get(j).getGmIdx());
				tempCommentsMap.put("grIdx", commentsList.get(j).getGrIdx());
				tempCommentsMap.put("username", commentsList.get(j).getUsername());
				tempCommentsMap.put("nickname", commentsList.get(j).getNickname());
				tempCommentsMap.put("contents", commentsList.get(j).getContents());
				tempCommentsMap.put("imgValue", commentsList.get(j).getImgValue());
				tempCommentsMap.put("commentable", commentsList.get(j).getCommentable());
				tempCommentsMap.put("uptdate", commentsList.get(j).getUptdate());
				
				comments.add(tempCommentsMap);
				
			}
			
			tempReplyMap.put("comments", comments);
			resultList.add(tempReplyMap);
			
		}
		
		Integer rcTotal = replyTotal + commentsTotal;
		
		resultMap.put("rc", resultList);
		resultMap.put("rcTotal", rcTotal);
		
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
	
	// 댓글, 덧글 수정
	@ResponseBody
	@RequestMapping(value="/modifyrc", method=RequestMethod.POST)
	public Map<String, Object> modifyReplyComment(MultipartFile imgContents, HttpServletRequest req, RcDto dto, ReplyVo vo) throws Exception {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		
		Integer rwCnt = 0;
		
		dto.setIdx(Integer.parseInt(req.getParameter("idx")));
		dto.setReplyType(req.getParameter("replyType"));
		
		// imgContents가 null이라면 contents. 즉, 텍스트 등록
		if(imgContents == null) {

			dto.setContents(req.getParameter("contents"));
			rwCnt = boardService.modRC(dto);

			// imgContents가 null이 아니면 파일업로드 진행
		} else {
			
			String imgName = req.getParameter("imgName");
			String uploadedName = CommentUploadedModifyUtil.uploadedModify(commentUploadPath, imgContents, imgName);
			
			dto.setImgName(uploadedName);
			
			rwCnt = boardService.modRC(dto);
			
		}
		

		// 등록 후 데이터
		vo.setIdxBoard(Integer.parseInt(req.getParameter("idxBoard")));
		
		int replyTotal = boardService.replyTotal(vo);
		int commentsTotal = boardService.commentsTotal(vo);
		vo.setTotalCount(replyTotal);
		
		List<ReplyVo> replyList = boardService.getReply(vo);
		for(int i=0; i<replyList.size(); i++) {
			
			// 댓글 정보
			Map<String, Object> tempReplyMap = new HashMap<>();
			
			tempReplyMap.put("idx", replyList.get(i).getIdx());
			tempReplyMap.put("idxBoard", replyList.get(i).getIdxBoard());
			tempReplyMap.put("gmIdx", replyList.get(i).getGmIdx());
			tempReplyMap.put("grIdx", replyList.get(i).getGrIdx());
			tempReplyMap.put("username", replyList.get(i).getUsername());
			tempReplyMap.put("nickname", replyList.get(i).getNickname());
			tempReplyMap.put("contents", replyList.get(i).getContents());
			tempReplyMap.put("imgValue", replyList.get(i).getImgValue());
			tempReplyMap.put("replyable", replyList.get(i).getReplyable());
			tempReplyMap.put("uptdate", replyList.get(i).getUptdate());
			
			// 덧글 목록
			List<CommentsVo> commentsList = boardService.getComments(tempReplyMap);
			List<Map<String, Object>> comments = new ArrayList<Map<String, Object>>();
			
			// 댓글 좋아요 수
			Integer replyLikes = boardService.replyLikes(tempReplyMap);
			
			// 댓글 좋아요 유저
			List<String> replyLikedUser = boardService.replyLikedUser(tempReplyMap);
			
			// 덧글 갯수
			Integer commentsCnt = boardService.commentsCnt(tempReplyMap);
			tempReplyMap.put("commentsCnt", commentsCnt);
			tempReplyMap.put("replyLikes", replyLikes);
			tempReplyMap.put("replyLikedUser", replyLikedUser);
			
			for(int j=0; j<commentsList.size(); j++) {
				
				Map<String, Object> tempCommentsMap = new HashMap<String, Object>();
				
				tempCommentsMap.put("idx", commentsList.get(j).getIdx());
				tempCommentsMap.put("idxBoard", commentsList.get(j).getIdxBoard());
				tempCommentsMap.put("idxReply", commentsList.get(j).getIdxReply());
				tempCommentsMap.put("gmIdx", commentsList.get(j).getGmIdx());
				tempCommentsMap.put("grIdx", commentsList.get(j).getGrIdx());
				tempCommentsMap.put("username", commentsList.get(j).getUsername());
				tempCommentsMap.put("nickname", commentsList.get(j).getNickname());
				tempCommentsMap.put("contents", commentsList.get(j).getContents());
				tempCommentsMap.put("imgValue", commentsList.get(j).getImgValue());
				tempCommentsMap.put("commentable", commentsList.get(j).getCommentable());
				tempCommentsMap.put("uptdate", commentsList.get(j).getUptdate());
				
				comments.add(tempCommentsMap);
				
			}
			
			tempReplyMap.put("comments", comments);
			resultList.add(tempReplyMap);
			
		}
		
		Integer rcTotal = replyTotal + commentsTotal;
		System.out.println("resultList = " + resultList);
		System.out.println("rcTotal = " + rcTotal);
		
		resultMap.put("rc", resultList);
		resultMap.put("rcTotal", rcTotal);
		
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
	
	// 댓글, 덧글 삭제
	@ResponseBody
	@RequestMapping(value="/deleterc", method=RequestMethod.POST)
	public Map<String, Object> deleteReplyComments(@RequestBody RcDto dto, ReplyVo vo) throws Exception {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		
		Integer rwCnt = boardService.delRC(dto);
		
		// 등록 후 데이터
		vo.setIdxBoard(dto.getIdxBoard());
		
		int replyTotal = boardService.replyTotal(vo);
		int commentsTotal = boardService.commentsTotal(vo);
		vo.setTotalCount(replyTotal);
		
		List<ReplyVo> replyList = boardService.getReply(vo);
		for(int i=0; i<replyList.size(); i++) {
			
			// 댓글 정보
			Map<String, Object> tempReplyMap = new HashMap<>();
			
			tempReplyMap.put("idx", replyList.get(i).getIdx());
			tempReplyMap.put("idxBoard", replyList.get(i).getIdxBoard());
			tempReplyMap.put("gmIdx", replyList.get(i).getGmIdx());
			tempReplyMap.put("grIdx", replyList.get(i).getGrIdx());
			tempReplyMap.put("username", replyList.get(i).getUsername());
			tempReplyMap.put("nickname", replyList.get(i).getNickname());
			tempReplyMap.put("contents", replyList.get(i).getContents());
			tempReplyMap.put("imgValue", replyList.get(i).getImgValue());
			tempReplyMap.put("replyable", replyList.get(i).getReplyable());
			tempReplyMap.put("uptdate", replyList.get(i).getUptdate());
			
			// 덧글 목록
			List<CommentsVo> commentsList = boardService.getComments(tempReplyMap);
			List<Map<String, Object>> comments = new ArrayList<Map<String, Object>>();
			
			// 댓글 좋아요 수
			Integer replyLikes = boardService.replyLikes(tempReplyMap);
			
			// 댓글 좋아요 유저
			List<String> replyLikedUser = boardService.replyLikedUser(tempReplyMap);
			
			// 덧글 갯수
			Integer commentsCnt = boardService.commentsCnt(tempReplyMap);
			tempReplyMap.put("commentsCnt", commentsCnt);
			tempReplyMap.put("replyLikes", replyLikes);
			tempReplyMap.put("replyLikedUser", replyLikedUser);
			
			for(int j=0; j<commentsList.size(); j++) {
				
				Map<String, Object> tempCommentsMap = new HashMap<String, Object>();
				
				tempCommentsMap.put("idx", commentsList.get(j).getIdx());
				tempCommentsMap.put("idxBoard", commentsList.get(j).getIdxBoard());
				tempCommentsMap.put("idxReply", commentsList.get(j).getIdxReply());
				tempCommentsMap.put("gmIdx", commentsList.get(j).getGmIdx());
				tempCommentsMap.put("grIdx", commentsList.get(j).getGrIdx());
				tempCommentsMap.put("username", commentsList.get(j).getUsername());
				tempCommentsMap.put("nickname", commentsList.get(j).getNickname());
				tempCommentsMap.put("contents", commentsList.get(j).getContents());
				tempCommentsMap.put("imgValue", commentsList.get(j).getImgValue());
				tempCommentsMap.put("commentable", commentsList.get(j).getCommentable());
				tempCommentsMap.put("uptdate", commentsList.get(j).getUptdate());
				
				comments.add(tempCommentsMap);
				
			}
			
			tempReplyMap.put("comments", comments);
			resultList.add(tempReplyMap);
			
		}
		
		Integer rcTotal = replyTotal + commentsTotal;
		
		resultMap.put("rc", resultList);
		resultMap.put("rcTotal", rcTotal);
		
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
	
	// 게시물 삭제
	@ResponseBody
	@RequestMapping(value="/deleteboard", method=RequestMethod.POST)
	public CommonResult deleteBoard(@RequestBody BoardVo vo) throws Exception {
		
		CommonResult result = new CommonResult();
		Integer rwCnt = boardService.delBoard(vo);
		
		if(rwCnt >= 1) {
			
			result.setResultCode(CommonCode.SUCCESS_CODE);
			result.setResultMessage("success");
			
		} else {
			
			result.setResultCode(CommonCode.FAIL_CODE);
			result.setResultMessage("fail");
			
		}
		
		return result;
		
	}
	
	
	// RequestBody = Http 요청이 온 것을 매핑하기 위해서
	// Object Array 받을 때 사용 @RequestBody @Valid List<ContentsInfoDto> dto
	// 파일업로드 >> FormData로 넘길 때 아래처럼 받음.
	@ResponseBody
	@RequestMapping(value="/modcontents", method=RequestMethod.POST)
	public Map<String, Object> modContents(MultipartHttpServletRequest mReq, BoardVo vo) throws Exception {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		Map<String, Object> likeMap = new HashMap<String, Object>();
		
		Integer repeatIdx;
		Integer regContentsIdx = 0;
		Integer delContentsIdx = 0;
		Integer upldSuc = 0;
		
		List<MultipartFile> files = mReq.getFiles("file");
		String[] randomNames = mReq.getParameterValues("randomName"); // 추가되는 것
		String[] randomCode = mReq.getParameterValues("rCode"); // 삭제되는 것
		String[] ext = mReq.getParameterValues("ext"); // 확장자
		String[] sizeUnit = mReq.getParameterValues("sizeUnit");
		
		Integer idx = Integer.parseInt(mReq.getParameter("idx"));
		Integer idxUser = Integer.parseInt(mReq.getParameter("idxUser"));
		Integer idxUserGroup = Integer.parseInt(mReq.getParameter("idxUserGroup"));
		String subject = mReq.getParameter("subject");
		String comment = mReq.getParameter("comment");

		vo.setIdx(idx);
		vo.setIdxBoard(idx);
		vo.setIdxUser(idxUser);
		vo.setIdxUserGroup(idxUserGroup);
		vo.setBoardName(subject);
		vo.setBoardDetails(comment);
		
		likeMap.put("idxBoard", idx);
		likeMap.put("boardType", "board");

		int boardIdx = boardService.modBoard(vo);
		if(boardIdx == 1){

			// 파일 삭제
			if(randomCode != null){
				for(repeatIdx=0; repeatIdx<randomCode.length; repeatIdx++) {
					File file = new File(uploadPath + randomCode[repeatIdx] + ext[repeatIdx]);
					if(file.exists()) {
						file.delete();
						vo.setRandomName(randomCode[repeatIdx]);
						Integer delContentsResult = boardService.delFiles(vo);
						delContentsIdx += delContentsResult;
					}
				}
			}
			
			// 업로드 시킬 파일
			if(randomNames != null){
				for(repeatIdx=0; repeatIdx<randomNames.length; repeatIdx++) {
					
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
					vo.setFileSize(sizeUnit[repeatIdx]);
					vo.setMimeType(mime);
					
					Integer regContentsResult = boardService.regFiles(vo);
					regContentsIdx += regContentsResult;
					
				}
			}
			
		}
		
		List<BoardVo> upldList = boardService.getBoardUpld(idx);
		List<String> likedUser = boardService.getBoardLikeUser(likeMap);
		
		resultMap = boardService.getBoardInfo(idx);
		resultMap.put("upldList", upldList);
		resultMap.put("likedUser", likedUser);
		
		return resultMap;

	}
	
	@ResponseBody
	@RequestMapping(value="/rclike", method=RequestMethod.POST)
	public Map<String, Object> rclike(@RequestBody ReplyLikeVo rlv, ReplyVo vo) throws Exception {
		
		Map<String, Object> resultMap = new HashMap<String, Object>();
		List<Map<String, Object>> resultList = new ArrayList<Map<String, Object>>();
		
		Integer rwCnt = boardService.rcLike(rlv);
		
		vo.setIdxBoard(rlv.getIdxBoard());
		
		int replyTotal = boardService.replyTotal(vo);
		int commentsTotal = boardService.commentsTotal(vo);
		vo.setTotalCount(replyTotal);
		
		List<ReplyVo> replyList = boardService.getReply(vo);
		for(int i=0; i<replyList.size(); i++) {
			
			// 댓글 정보
			Map<String, Object> tempReplyMap = new HashMap<>();
			
			tempReplyMap.put("idx", replyList.get(i).getIdx());
			tempReplyMap.put("idxBoard", replyList.get(i).getIdxBoard());
			tempReplyMap.put("gmIdx", replyList.get(i).getGmIdx());
			tempReplyMap.put("grIdx", replyList.get(i).getGrIdx());
			tempReplyMap.put("username", replyList.get(i).getUsername());
			tempReplyMap.put("nickname", replyList.get(i).getNickname());
			tempReplyMap.put("contents", replyList.get(i).getContents());
			tempReplyMap.put("imgValue", replyList.get(i).getImgValue());
			tempReplyMap.put("replyable", replyList.get(i).getReplyable());
			tempReplyMap.put("uptdate", replyList.get(i).getUptdate());
			
			// 덧글 목록
			List<CommentsVo> commentsList = boardService.getComments(tempReplyMap);
			List<Map<String, Object>> comments = new ArrayList<Map<String, Object>>();
			
			// 댓글 좋아요 수
			Integer replyLikes = boardService.replyLikes(tempReplyMap);
			
			// 댓글 좋아요 유저
			List<String> replyLikedUser = boardService.replyLikedUser(tempReplyMap);
			
			// 덧글 갯수
			Integer commentsCnt = boardService.commentsCnt(tempReplyMap);
			tempReplyMap.put("commentsCnt", commentsCnt);
			tempReplyMap.put("replyLikes", replyLikes);
			tempReplyMap.put("replyLikedUser", replyLikedUser);
			
			for(int j=0; j<commentsList.size(); j++) {
				
				Map<String, Object> tempCommentsMap = new HashMap<String, Object>();
				
				tempCommentsMap.put("idx", commentsList.get(j).getIdx());
				tempCommentsMap.put("idxBoard", commentsList.get(j).getIdxBoard());
				tempCommentsMap.put("idxReply", commentsList.get(j).getIdxReply());
				tempCommentsMap.put("gmIdx", commentsList.get(j).getGmIdx());
				tempCommentsMap.put("grIdx", commentsList.get(j).getGrIdx());
				tempCommentsMap.put("username", commentsList.get(j).getUsername());
				tempCommentsMap.put("nickname", commentsList.get(j).getNickname());
				tempCommentsMap.put("contents", commentsList.get(j).getContents());
				tempCommentsMap.put("imgValue", commentsList.get(j).getImgValue());
				tempCommentsMap.put("commentable", commentsList.get(j).getCommentable());
				tempCommentsMap.put("uptdate", commentsList.get(j).getUptdate());
				
				comments.add(tempCommentsMap);
				
			}
			
			tempReplyMap.put("comments", comments);
			resultList.add(tempReplyMap);
			
		}
		
		Integer rcTotal = replyTotal + commentsTotal;
		
		resultMap.put("rc", resultList);
		resultMap.put("rcTotal", rcTotal);
		
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

}

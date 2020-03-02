package com.hard.study.service.board;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.hard.study.dao.board.BoardDao;
import com.hard.study.dto.comment.RcDto;
import com.hard.study.vo.board.BoardLikeVo;
import com.hard.study.vo.board.BoardVo;
import com.hard.study.vo.comment.CommentsVo;
import com.hard.study.vo.comment.ReplyLikeVo;
import com.hard.study.vo.comment.ReplyVo;

@Service("boardService")
public class BoardServiceImpl implements BoardService {
	
	@Resource(name="boardDao")
	private BoardDao boardDao;
	
	// 글 등록
	@Override
	public int regBoard(BoardVo vo) throws Exception {
		return boardDao.regBoard(vo);
	}
	
	// 글에 첨부된 파일
	@Override
	public int regFiles(BoardVo vo) throws Exception {
		return boardDao.regFiles(vo);
	}
	
	@Override
	public int boardTotal(BoardVo vo) throws Exception {
		return boardDao.boardTotal(vo);
	}
	
	// 글 목록
	@Override
	public List<BoardVo> getBoard(BoardVo vo) throws Exception {
		return boardDao.getBoard(vo);
	}
	
	// 글 각각 좋아요 수
	@Override
	public int getBoardLike(int idxBoard) throws Exception {
		return boardDao.getBoardLike(idxBoard);
	}
	
	// 글 목록 ( 파일리스트 )
	@Override
	public List<BoardVo> getBoardUpld(int idxBoard) throws Exception {
		return boardDao.getBoardUpld(idxBoard);
	}
	
	// 댓글 갯수
	@Override
	public int replyCnt(int idxBoard) throws Exception {
		return boardDao.replyCnt(idxBoard);
	}
	
	// 좋아요 목록 ( 유저 리스트 )
	@Override
	public List<String> getBoardLikeUser(Map<String, Object> map) throws Exception {
		return boardDao.getBoardLikeUser(map);
	}
	
	// 글 조회수 증가
	@Override
	public void boardViews(int idxBoard) throws Exception {
		
		// 굳이 map으로 넘기는 이유는
		// 쿼리 작성할 때 selectKey 구문을 사용하기 위함.
		Map<String, Object> param = new HashMap<>();
		param.put("idxBoard", idxBoard);
		
		boardDao.boardViews(param);
		
	}
	
	// 글 상세
	@Override
	public Map<String, Object> getBoardInfo(int idxBoard) throws Exception {
		return boardDao.getBoardInfo(idxBoard);
	}
	
	// 좋아요
	@Override
	public int like(BoardLikeVo vo) throws Exception {
		
		Integer cnt = vo.getCnt();
		Integer rwCnt = 0;
		
		if(cnt == 1) {
			rwCnt = boardDao.addLike(vo); // 좋아요 추가
		} else {
			rwCnt = boardDao.subLike(vo); // 좋아요 빼기
		}
		
		return rwCnt;
		
	}
	
	// 댓글 등록
	@Override
	public int regReply(ReplyVo vo) throws Exception {
		
		String imgValue = vo.getImgValue();
		
		// 파일 경로가 없다는 것은 contents 즉, 텍스트 등록
		if(imgValue == null) {
			
			return boardDao.regReplyContents(vo);
			
			// 파일 경로가 있다는 것은 첨부파일
		} else {
			
			return boardDao.regReplyImage(vo);
			
		}
		
	}
	
	// 댓글 갯수
	@Override
	public int replyTotal(ReplyVo vo) throws Exception {
		return boardDao.replyTotal(vo);
	}
	
	// 덧글 갯수
	@Override
	public int commentsTotal(ReplyVo vo) throws Exception {
		return boardDao.commentsTotal(vo);
	}
	
	// 댓글 목록
	@Override
	public List<ReplyVo> getReply(ReplyVo vo) throws Exception {
		return boardDao.getReply(vo);
	}
	
	// 덧글 목록
	@Override
	public List<CommentsVo> getComments(Map<String, Object> map) throws Exception {
		return boardDao.getComments(map);
	}
	
	// 댓글 좋아요
	@Override
	public int replyLikes(Map<String, Object> map) throws Exception {
		return boardDao.replyLikes(map);
	}
	
	// 댓글 좋아요 유저
	@Override
	public List<String> replyLikedUser(Map<String, Object> map) throws Exception {
		return boardDao.replyLikedUser(map);
	}
	
	// 덧글 갯수
	@Override
	public int commentsCnt(Map<String, Object> map) throws Exception {
		return boardDao.commentsCnt(map);
	}
	
	// 덧글 등록
	@Override
	public int regComments(ReplyVo vo) throws Exception {
		
		String imgValue = vo.getImgValue();
		
		// 파일 경로가 없다는 것은 contents 즉, 텍스트 등록
		if(imgValue == null) {
			
			return boardDao.regCommentsContents(vo);
			
			// 파일 경로가 있다는 것은 첨부파일
		} else {
			
			return boardDao.regCommentsImage(vo);
			
		}
		
	}
	
	// 댓글, 덧글 수정
	@Override
	public int modRC(RcDto dto) throws Exception {
		
		String imgName = dto.getImgName();
		String replyType = dto.getReplyType();
		Integer modRCResult = 0;
		
		// 댓글 일 경우
		if(replyType.equals("reply")) {
			// 댓글 + contents
			if(imgName == null) {
				modRCResult = boardDao.uptReplyConts(dto);
				// 댓글 + img
			} else {
				modRCResult = boardDao.uptReplyImg(dto);
			}
			// 덧글 일 경우
		} else {
			// 덧글 + contents
			if(imgName == null) {
				modRCResult = boardDao.uptCommentsConts(dto);
				// 덧글 + img
			} else {
				modRCResult = boardDao.uptCommentsImg(dto);
			}
		}
		
		return modRCResult;
		
	}
	
	// 댓글, 덧글 삭제
	@Override
	public int delRC(RcDto dto) throws Exception {
		
		String replyType = dto.getReplyType();
		Integer delRCResult = 0;
		
		// 댓글 일 경우
		if(replyType.equals("reply")) {
			delRCResult = boardDao.delReply(dto);
			// 덧글 일 경우
		} else {
			delRCResult = boardDao.delComments(dto);
		}
		
		return delRCResult;
		
	}
	
	// 게시물 삭제
	@Override
	public int delBoard(BoardVo vo) throws Exception {
		return boardDao.delBoard(vo);
	}
	
	// 게시물 수정
	@Override
	public int modBoard(BoardVo vo) throws Exception {
		return boardDao.modBoard(vo);
	}
	
	// 글에 첨부된 파일 삭제
	@Override
	public int delFiles(BoardVo vo) throws Exception {
		return boardDao.delFiles(vo);
	}
	
	// 댓글 좋아요
	@Override
	public int rcLike(ReplyLikeVo vo) throws Exception {
		
		Integer cnt = vo.getCnt();
		Integer rwCnt = 0;
		
		if(cnt == 1) {
			rwCnt = boardDao.addRcLike(vo); // 댓글 좋아요 추가
		} else {
			rwCnt = boardDao.subRcLike(vo); // 댓글 좋아요 빼기
		}
		
		return rwCnt;
		
	}
	
}

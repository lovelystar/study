package com.hard.study.service.board;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.hard.study.dao.board.BoardDao;
import com.hard.study.vo.board.BoardLikeVo;
import com.hard.study.vo.board.BoardVo;

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
	
}

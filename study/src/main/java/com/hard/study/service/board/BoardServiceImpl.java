package com.hard.study.service.board;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.hard.study.dao.board.BoardDao;
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
	
	// 글 목록 ( 파일리스트 )
	@Override
	public List<BoardVo> getBoardUpld(int idxBoard) throws Exception {
		return boardDao.getBoardUpld(idxBoard);
	}
	
}

package com.hard.study.service.board;

import java.util.List;

import com.hard.study.vo.board.BoardVo;

public interface BoardService {
	
	public int regBoard(BoardVo vo) throws Exception; // 글 등록
	public int regFiles(BoardVo vo) throws Exception; // 글에 첨부된 파일
	public int boardTotal(BoardVo vo) throws Exception; // 글 갯수
	public List<BoardVo> getBoard(BoardVo vo) throws Exception; // 글 목록
	public List<BoardVo> getBoardUpld(int idxBoard) throws Exception; // 글 목록 ( 파일리스트 )
	
}

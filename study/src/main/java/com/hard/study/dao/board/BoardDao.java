package com.hard.study.dao.board;

import java.sql.SQLException;
import java.util.List;

import com.hard.study.vo.board.BoardVo;

public interface BoardDao {
	
	public int regBoard(BoardVo vo) throws SQLException; // 글 등록
	public int regFiles(BoardVo vo) throws SQLException; // 글에 첨부된 파일
	public int boardTotal(BoardVo vo) throws SQLException; // 글 갯수
	public List<BoardVo> getBoard(BoardVo vo) throws SQLException; // 글 목록
	public List<BoardVo> getBoardUpld(int idxBoard) throws SQLException; // 글 목록 ( 파일리스트 )
	
}

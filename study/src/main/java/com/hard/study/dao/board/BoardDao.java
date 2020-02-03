package com.hard.study.dao.board;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.hard.study.vo.board.BoardLikeVo;
import com.hard.study.vo.board.BoardVo;

public interface BoardDao {
	
	public int regBoard(BoardVo vo) throws SQLException; // 글 등록
	public int regFiles(BoardVo vo) throws SQLException; // 글에 첨부된 파일
	public int boardTotal(BoardVo vo) throws SQLException; // 글 갯수
	public List<BoardVo> getBoard(BoardVo vo) throws SQLException; // 글 목록
	public int getBoardLike(int idxBoard) throws SQLException; // 글 각각 좋아요 수
	public List<BoardVo> getBoardUpld(int idxBoard) throws SQLException; // 글 목록 ( 파일리스트 )
	public List<String> getBoardLikeUser(Map<String, Object> map) throws SQLException; // 좋아요 목록 ( 유저 리스트 )
	public void boardViews(Map<String, Object> param) throws SQLException; // 글 조회수 증가
	public Map<String, Object> getBoardInfo(int idxBoard) throws SQLException; // 글 상세
	public int addLike(BoardLikeVo vo) throws SQLException; // 좋아요 추가
	public int subLike(BoardLikeVo vo) throws SQLException; // 좋아요 빼기
	
}

package com.hard.study.service.board;

import java.util.List;
import java.util.Map;

import com.hard.study.vo.board.BoardLikeVo;
import com.hard.study.vo.board.BoardVo;

public interface BoardService {
	
	public int regBoard(BoardVo vo) throws Exception; // 글 등록
	public int regFiles(BoardVo vo) throws Exception; // 글에 첨부된 파일
	public int boardTotal(BoardVo vo) throws Exception; // 글 갯수
	public List<BoardVo> getBoard(BoardVo vo) throws Exception; // 글 목록
	public int getBoardLike(int idxBoard) throws Exception; // 글 각각 좋아요 수
	public List<BoardVo> getBoardUpld(int idxBoard) throws Exception; // 글 목록 ( 파일리스트 )
	public List<String> getBoardLikeUser(Map<String, Object> map) throws Exception; // 좋아요 목록 ( 유저 리스트 )
	public void boardViews(int idxBoard) throws Exception; // 글 조회수 증가
	public Map<String, Object> getBoardInfo(int idxBoard) throws Exception; // 글 상세
	public int like(BoardLikeVo vo) throws Exception; // 좋아요
	
}

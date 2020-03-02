package com.hard.study.service.board;

import java.util.List;
import java.util.Map;

import com.hard.study.dto.comment.RcDto;
import com.hard.study.vo.board.BoardLikeVo;
import com.hard.study.vo.board.BoardVo;
import com.hard.study.vo.comment.CommentsVo;
import com.hard.study.vo.comment.ReplyLikeVo;
import com.hard.study.vo.comment.ReplyVo;

public interface BoardService {
	
	public int regBoard(BoardVo vo) throws Exception; // 글 등록
	public int regFiles(BoardVo vo) throws Exception; // 글에 첨부된 파일
	public int boardTotal(BoardVo vo) throws Exception; // 글 갯수
	public List<BoardVo> getBoard(BoardVo vo) throws Exception; // 글 목록
	public int getBoardLike(int idxBoard) throws Exception; // 글 각각 좋아요 수
	public List<BoardVo> getBoardUpld(int idxBoard) throws Exception; // 글 목록 ( 파일리스트 )
	public int replyCnt(int idxBoard) throws Exception; // 댓글 갯수
	public List<String> getBoardLikeUser(Map<String, Object> map) throws Exception; // 좋아요 목록 ( 유저 리스트 )
	public void boardViews(int idxBoard) throws Exception; // 글 조회수 증가
	public Map<String, Object> getBoardInfo(int idxBoard) throws Exception; // 글 상세
	public int like(BoardLikeVo vo) throws Exception; // 좋아요
	public int regReply(ReplyVo vo) throws Exception; // 댓글 등록
	public int replyTotal(ReplyVo vo) throws Exception; // 댓글 갯수
	public int commentsTotal(ReplyVo vo) throws Exception; // 덧글 갯수
	public List<ReplyVo> getReply(ReplyVo vo) throws Exception; // 댓글 목록
	public List<CommentsVo> getComments(Map<String, Object> map) throws Exception; // 덧글 목록
	public int replyLikes(Map<String, Object> map) throws Exception; // 댓글 좋아요
	public List<String> replyLikedUser(Map<String, Object> map) throws Exception; // 댓글 좋아요 유저
	public int commentsCnt(Map<String, Object> map) throws Exception; // 덧글 갯수
	public int regComments(ReplyVo vo) throws Exception; // 덧글 등록
	public int modRC(RcDto dto) throws Exception; // 댓글, 덧글 수정
	public int delRC(RcDto dto) throws Exception; // 댓글, 덧글 삭제
	public int delBoard(BoardVo vo) throws Exception; // 게시물 삭제
	public int modBoard(BoardVo vo) throws Exception; // 게시물 수정
	public int delFiles(BoardVo vo) throws Exception; // 글에 첨부된 파일 삭제
	public int rcLike(ReplyLikeVo vo) throws Exception; // 댓글 좋아요
	
}

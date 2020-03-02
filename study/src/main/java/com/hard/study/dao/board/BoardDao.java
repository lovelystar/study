package com.hard.study.dao.board;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.hard.study.dto.comment.RcDto;
import com.hard.study.vo.board.BoardLikeVo;
import com.hard.study.vo.board.BoardVo;
import com.hard.study.vo.comment.CommentsVo;
import com.hard.study.vo.comment.ReplyLikeVo;
import com.hard.study.vo.comment.ReplyVo;

public interface BoardDao {
	
	public int regBoard(BoardVo vo) throws SQLException; // 글 등록
	public int regFiles(BoardVo vo) throws SQLException; // 글에 첨부된 파일
	public int boardTotal(BoardVo vo) throws SQLException; // 글 갯수
	public List<BoardVo> getBoard(BoardVo vo) throws SQLException; // 글 목록
	public int getBoardLike(int idxBoard) throws SQLException; // 글 각각 좋아요 수
	public List<BoardVo> getBoardUpld(int idxBoard) throws SQLException; // 글 목록 ( 파일리스트 )
	public int replyCnt(int idxBoard) throws SQLException; // 댓글 갯수
	public List<String> getBoardLikeUser(Map<String, Object> map) throws SQLException; // 좋아요 목록 ( 유저 리스트 )
	public void boardViews(Map<String, Object> param) throws SQLException; // 글 조회수 증가
	public Map<String, Object> getBoardInfo(int idxBoard) throws SQLException; // 글 상세
	public int addLike(BoardLikeVo vo) throws SQLException; // 좋아요 추가
	public int subLike(BoardLikeVo vo) throws SQLException; // 좋아요 빼기
	public int regReplyContents(ReplyVo vo) throws SQLException; // 댓글 등록 ( 텍스트 )
	public int regReplyImage(ReplyVo vo) throws SQLException; // 댓글 등록 ( 첨부 )
	public int replyTotal(ReplyVo vo) throws SQLException; // 댓글 갯수
	public int commentsTotal(ReplyVo vo) throws SQLException; // 덧글 갯수
	public List<ReplyVo> getReply(ReplyVo vo) throws SQLException; // 댓글 목록
	public List<CommentsVo> getComments(Map<String, Object> map) throws SQLException; // 덧글 목록
	public int replyLikes(Map<String, Object> map) throws SQLException; // 댓글 좋아요
	public List<String> replyLikedUser(Map<String, Object> map) throws SQLException; // 댓글 좋아요 유저
	public int commentsCnt(Map<String, Object> map) throws SQLException; // 덧글 갯수
	public int regCommentsContents(ReplyVo vo) throws SQLException;// 덧글 등록 ( 텍스트 )
	public int regCommentsImage(ReplyVo vo) throws SQLException; // 덧글 등록 ( 첨부 )
	public int uptReplyConts(RcDto dto) throws SQLException; // 댓글, 덧글 수정 ( 댓글 + contents )
	public int uptReplyImg(RcDto dto) throws SQLException; // 댓글, 덧글 수정 ( 댓글 + img )
	public int uptCommentsConts(RcDto dto) throws SQLException; // 댓글, 덧글 수정 ( 덧글 + contents )
	public int uptCommentsImg(RcDto dto) throws SQLException; // 댓글, 덧글 수정 ( 덧글 + img )
	public int delReply(RcDto dto) throws SQLException; // 댓글, 덧글 삭제 ( 댓글 )
	public int delComments(RcDto dto) throws SQLException; // 댓글, 덧글 삭제 ( 덧글 )
	public int delBoard(BoardVo vo) throws SQLException; // 게시물 삭제
	public int modBoard(BoardVo vo) throws SQLException; // 게시물 수정
	public int delFiles(BoardVo vo) throws SQLException; // 글에 첨부된 파일 삭제
	public int addRcLike(ReplyLikeVo vo) throws SQLException; // 댓글 좋아요 추가
	public int subRcLike(ReplyLikeVo vo) throws SQLException; // 댓글 좋아요 빼기
	
}

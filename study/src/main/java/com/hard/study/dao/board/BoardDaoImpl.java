package com.hard.study.dao.board;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hard.study.dto.comment.RcDto;
import com.hard.study.vo.board.BoardLikeVo;
import com.hard.study.vo.board.BoardVo;
import com.hard.study.vo.comment.CommentsVo;
import com.hard.study.vo.comment.ReplyLikeVo;
import com.hard.study.vo.comment.ReplyVo;

@Repository("boardDao")
public class BoardDaoImpl implements BoardDao {

	@Autowired
	private SqlSession sqlSession;
	
	public void setSqlSession(SqlSession sqlSession) {
		this.sqlSession = sqlSession;
	}
	
	// 글 등록
	@Override
	public int regBoard(BoardVo vo) throws SQLException {
		return sqlSession.insert("regBoard", vo);
	}
	
	// 글에 첨부된 파일
	@Override
	public int regFiles(BoardVo vo) throws SQLException {
		return sqlSession.insert("regFiles", vo);
	}
	
	// 글 갯수
	@Override
	public int boardTotal(BoardVo vo) throws SQLException {
		return sqlSession.selectOne("boardTotal", vo);
	}
	
	// 글 목록
	@Override
	public List<BoardVo> getBoard(BoardVo vo) throws SQLException {
		return sqlSession.selectList("getBoard", vo);
	}
	
	// 글 각각 좋아요 수
	@Override
	public int getBoardLike(int idxBoard) throws SQLException {
		return sqlSession.selectOne("getBoardLike", idxBoard);
	}
	
	// 글 목록 ( 파일리스트 )
	@Override
	public List<BoardVo> getBoardUpld(int idxBoard) throws SQLException {
		return sqlSession.selectList("getBoardUpld", idxBoard);
	}
	
	// 댓글 갯수
	@Override
	public int replyCnt(int idxBoard) throws SQLException {
		return sqlSession.selectOne("replyCnt", idxBoard);
	}

	// 좋아요 목록 ( 유저 리스트 )
	@Override
	public List<String> getBoardLikeUser(Map<String, Object> map) throws SQLException {
		return sqlSession.selectList("getBoardLikeUser", map);
	}
	
	// 글 조회수 증가
	@Override
	public void boardViews(Map<String, Object> param) throws SQLException {
		sqlSession.update("boardViews", param);
	}
	
	// 글 상세
	@Override
	public Map<String, Object> getBoardInfo(int idxBoard) throws SQLException {
		return sqlSession.selectOne("getBoardInfo", idxBoard);
	}
	
	// 좋아요 추가
	@Override
	public int addLike(BoardLikeVo vo) throws SQLException {
		return sqlSession.insert("addLike", vo);
	}
	
	// 좋아요 빼기
	@Override
	public int subLike(BoardLikeVo vo) throws SQLException {
		return sqlSession.delete("subLike", vo);
	}
	
	// 댓글 등록 ( 텍스트 )
	@Override
	public int regReplyContents(ReplyVo vo) throws SQLException {
		return sqlSession.insert("regReplyContents", vo);
	}
	
	// 댓글 등록 ( 첨부 )
	@Override
	public int regReplyImage(ReplyVo vo) throws SQLException {
		return sqlSession.insert("regReplyImage", vo);
	}
	
	// 댓글 갯수
	@Override
	public int replyTotal(ReplyVo vo) throws SQLException {
		return sqlSession.selectOne("replyTotal", vo);
	}
	
	// 덧글 갯수
	@Override
	public int commentsTotal(ReplyVo vo) throws SQLException {
		return sqlSession.selectOne("commentsTotal", vo);
	}
	
	// 댓글 목록
	@Override
	public List<ReplyVo> getReply(ReplyVo vo) throws SQLException {
		return sqlSession.selectList("getReply", vo);
	}
	
	// 덧글 목록
	@Override
	public List<CommentsVo> getComments(Map<String, Object> map) throws SQLException {
		return sqlSession.selectList("getComments", map);
	}

	// 댓글 좋아요
	@Override
	public int replyLikes(Map<String, Object> map) throws SQLException {
		return sqlSession.selectOne("replyLikes", map);
	}
	
	// 댓글 좋아요 유저
	@Override
	public List<String> replyLikedUser(Map<String, Object> map) throws SQLException {
		return sqlSession.selectList("replyLikedUser", map);
	}
	
	// 덧글 갯수
	@Override
	public int commentsCnt(Map<String, Object> map) throws SQLException {
		return sqlSession.selectOne("commentsCnt", map);
	}
	
	// 덧글 등록 ( 텍스트 )
	@Override
	public int regCommentsContents(ReplyVo vo) throws SQLException {
		return sqlSession.insert("regCommentsContents", vo);
	}
	
	// 덧글 등록 ( 첨부 )
	@Override
	public int regCommentsImage(ReplyVo vo) throws SQLException {
		return sqlSession.insert("regCommentsImage", vo);
	}
	
	// 댓글, 덧글 수정 ( 댓글 + contents )
	@Override
	public int uptReplyConts(RcDto dto) throws SQLException {
		return sqlSession.update("uptReplyConts", dto);
	}
	
	// 댓글, 덧글 수정 ( 댓글 + img )
	@Override
	public int uptReplyImg(RcDto dto) throws SQLException {
		return sqlSession.update("uptReplyImg", dto);
	}
	
	// 댓글, 덧글 수정 ( 덧글 + contents )
	@Override
	public int uptCommentsConts(RcDto dto) throws SQLException {
		return sqlSession.update("uptCommentsConts", dto);
	}
	
	// 댓글, 덧글 수정 ( 덧글 + img )
	@Override
	public int uptCommentsImg(RcDto dto) throws SQLException {
		return sqlSession.update("uptCommentsImg", dto);
	}
	
	// 댓글, 덧글 삭제 ( 댓글 // commentable 즉, tinyint를 0으로 변경 )
	@Override
	public int delReply(RcDto dto) throws SQLException {
		return sqlSession.update("delReply", dto);
	}
	
	// 댓글, 덧글 삭제 ( 덧글 // commentable 즉, tinyint를 0으로 변경 )
	@Override
	public int delComments(RcDto dto) throws SQLException {
		return sqlSession.update("delComments", dto);
	}
	
	// 게시물 삭제
	@Override
	public int delBoard(BoardVo vo) throws SQLException {
		return sqlSession.update("delBoard", vo);
	}
	
	// 게시물 수정
	@Override
	public int modBoard(BoardVo vo) throws SQLException {
		return sqlSession.update("modBoard", vo);
	}
	
	// 글에 첨부된 파일 삭제
	@Override
	public int delFiles(BoardVo vo) throws SQLException {
		return sqlSession.delete("delFiles", vo);
	}
	
	// 댓글 좋아요 추가
	@Override
	public int addRcLike(ReplyLikeVo vo) throws SQLException {
		return sqlSession.insert("addRcLike", vo);
	}
	
	// 댓글 좋아요 빼기
	@Override
	public int subRcLike(ReplyLikeVo vo) throws SQLException {
		return sqlSession.delete("subRcLike", vo);
	}
	
}

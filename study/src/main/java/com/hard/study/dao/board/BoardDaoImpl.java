package com.hard.study.dao.board;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hard.study.vo.board.BoardLikeVo;
import com.hard.study.vo.board.BoardVo;

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
	
}

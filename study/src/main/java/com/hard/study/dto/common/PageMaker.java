package com.hard.study.dto.common;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

public class PageMaker {

	private int totalCount;
	private int page;
	private int perPageNum; // 한 페이지에 보여질 갯수
	
	private int prevPage; // 페이징 반복
	private boolean prev; // 이전 페이징 리스트
	private boolean startPage; // 제일 처음 페이징
	
	
	private int nextPage; // 페이징 반복
	private boolean next; // 다음 페이징 리스트
	private boolean endPage; // 제일 마지막 페이징
	
	// 페이징 갯수
	private int displayPageNum;
	
	private String keyword;
	private String searchType;
	
	public PageMaker() {
		this.page = 1; // 페이징 초기
		this.perPageNum = 20; // 한 페이지에 보여질 콘텐츠 갯수
		this.displayPageNum = 10; // 페이징 갯수
	}
	
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
		calc();
	}
	
	private void calc() {
		
		nextPage = (int)(Math.ceil(page / (double) displayPageNum) * displayPageNum);
		prevPage = (nextPage - displayPageNum) + 1;
		
		int temp = (int)(Math.ceil(totalCount / (double) perPageNum));
		if(nextPage > temp) {
			nextPage = temp;
		}
		
		next = nextPage * perPageNum >= totalCount ? false : true;
		prev = prevPage == 1? false : true;
		
	}

	public void setPage(int page) {
		
		if(page <= 0) {
			
			this.page = 1;
			return;
			
		}
		
		this.page = page;
		
	}
	public int getPage() {
		return page;
	} 
	
	public void setPerPageNum(int perPageNum) {
		
		if(perPageNum <= 0 || perPageNum > 100) {
			
			this.perPageNum = 20;
			return;
			
		}
		
		this.perPageNum = perPageNum;
		
	}	
	// query중 limit #{pageStart}, #{perPageNum}을 사용하기 위해 세팅
	// (ex) limit 0, 20 >> 0번부터 20개 ( 0 ~ 19 까지 ) // limit 20, 40 >> ( 20 ~ 39 까지 ) ... 
	public int getPerPageNum() {
		return this.perPageNum;
	}
	public int getPageStart() {
		return (this.page - 1) * perPageNum;
	}
	
	public int getTotalCount() {
		return totalCount;
	}
	public int getPrevPage() {
		return prevPage;
	}
	public boolean isPrev() {
		return prev;
	}
	public boolean isStartPage() {
		return startPage;
	}
	public int getNextPage() {
		return nextPage;
	}
	public boolean isNext() {
		return next;
	}
	public boolean isEndPage() {
		return endPage;
	}
	public void setDisplayPageNum(int displayPageNum) {
		this.displayPageNum = displayPageNum;
	}
	public int getDisplayPageNum() {
		return displayPageNum;
	}
	
	
	
	
	public String makeQuery(int page) {
		
		UriComponents comp = 
			UriComponentsBuilder.newInstance()
			.queryParam("page", page)
			.queryParam("perPageNum", perPageNum)
			.build();
		
		return comp.toString();
		
	}
	public String makeSearch(int page) {
		
		UriComponents comp = 
			UriComponentsBuilder.newInstance()
			.queryParam("page", page)
			.queryParam("perPageNum", perPageNum)
			.queryParam("searchType", searchType)
			.queryParam("keyword", encoding(keyword))
			.build();
		
		return comp.toString();
		
	}
	public String encoding(String keyword) {
		
		if(keyword == null || keyword.trim().length() == 0) {
			return "";
		} try {
			return URLEncoder.encode(keyword, "UTF-8");
		} catch(UnsupportedEncodingException e) {
			return "";
		}
		
	}
	
}

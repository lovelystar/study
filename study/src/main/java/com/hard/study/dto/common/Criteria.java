package com.hard.study.dto.common;

public class Criteria {
	
	private int page;
	// 한 페이지에 보여질 갯수
	private int perPageNum;
	
	public Criteria() {
		this.page = 1;
		this.perPageNum = 20;
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

}

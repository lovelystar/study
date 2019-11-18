동작 알고리즘

1. Client 에서 특정 URL 호출 ( 인증이 필요한 URL )
2. 인증서버 로그인
3. Client에 code와 state값을 가지고 callback
4. Client callback으로 들어왔다면 들어온 code값과 state값으로 인증서버에 AccessToken 발급 요청
5. 인증서버에서 AccessToken 발급 후 user의 Redirect URL로 이동 ( DB users테이블의 redirect 컬럼 )
6. 1번에서 호출한 URL로 재이동
7. 자원서버 접근 + AccessToken Custom ( 진행 )

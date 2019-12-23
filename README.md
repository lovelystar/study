boot
client server
cookie 컨트롤
callback 처리

동작 알고리즘

1. Client 에서 특정 URL 호출 ( 인증이 필요한 URL )
2. 인증서버 로그인
3. Client에 code와 state값을 가지고 callback
4. Client callback으로 들어왔다면 들어온 code값과 state값으로 인증서버에 AccessToken 발급 요청
5. 인증서버에서 AccessToken 발급 후 user의 Redirect URL로 이동 ( DB users테이블의 redirect 컬럼 )
6. 1번에서 호출한 URL로 재이동
7. 자원서버 접근 + AccessToken Custom ( 진행 )



# 2019. 11. 25 ( react + redux + redux-saga 적용 )

+ 선행 필요
  - ES6 이상
  - Visual Studio Code 설치
  - Node.js 설치
  
순서 : 
1) Node.js 설치 ( https://nodejs.org/ko/download/ )
2) 환경변수 설정 ( 내 PC - 우 클릭 설정 - 고급 시스템 설정 - 환경변수 선택 - Path - Node.js 설치경로 추가 )
3) Visual Studio Code 설치 ( https://code.visualstudio.com/download )
4) 설치할 때 추가작업 - 기타 체크박스 모두 선택
5) Visual Studio Code 에서 아래 패키지들 설치

*****************************************************
- Spring Boot Extension Pack
- Spring Boot Dashboard
- Spring Boot Tools
- Spring Initializr Java Support

- CheckStyle for Java
- Cloudfoundry Manifest YML Support
- Concourse CI Pipeline Editor
- Debugger for Java
- ESLint
- Java Dependency Viewer
- Java Extension Pack
- Java Test Runner
- Language Support for Java(TM) by Red Hat
- Lombok Annotations Support for VS Code
- Maven for Java
- Native-ASCII Converter

- Remote - SSH
- Remote - SSH: Editing Configuration Files
- Remote - SSH: Explorer
- Visual Studio IntelliCode
*****************************************************

6) open folder에서 sts project 폴더랑 연결시키기.
7) Terminal에서 dropdown - Select Default Shell - PowerShell 선택 후 + 버튼으로 추가
8) Terminal에서 npm init 입력
9) 해당 프로젝트에서 package.json이 생성되었는지 확인
10) package.json 작성 후 Terminal에서 npm install 입력
11) node_modules 폴더와 package-lock.json이 생성되었는지 확인 ( 자동 생성 )
12) webpack.config.js파일은 프로젝트 최상단( package.json파일 있는 곳 )에 "직접" 생성
13) npm run watch 입력 ( package.json에 scripts를 "watch": "webpack --watch -d" 를 설정했으므로 )








# package_json 옵션 설명

- name: project명
- version: 버전
- description: project 설명
- keywords: project 키워드
- private: 패키지 비공개 여부

- proxy: backend api를 호출할 때 발생할 수 있는 cors관련 오류를 방지. 
+ JSONPlaceholder에서 Origin을 전달하지 않으면 요청이 제대로 처리가 되지 않기 때문에 changeOrigin옵션 추가.
+ 만약 API서버에서 도메인 이름에 따라 요청을 처리하고 있다면 이를 설정해주어야 함.

- main: 프로그램 시작점이 되는 모듈
- scripts: 다양한 타이밍에서 실행되는 script 명령들을 포함하고 있는 사전
("watch": "webpack --watch -d") = 수정할 때마다 지속적으로 빌드업

- license: 패키지 사용자들이 내가 만든 패키지를 사용하기위해 어떻게 권한을 얻고, 어떤 금기사항이 있는지 알기위해 라이선스 표시
- bugs: 버그가 발생할 때 제보할 곳
- author: 작성자 정보
- browserslist: frontend툴 간에 브라우저 타겟을 공유하기 위해 사용
(https://create-react-app.dev/docs/supported-browsers-features/)

- dependencies: 일반적인 경우이며, maven처럼 추가해서 의존하고 있다는 것을 알려주는 곳
- devDependencies: 개발모드인 경우이며, 실제 배포할 때는 빠지는 곳.
( ex. 바벨, 웹팩, 로그 등 )

- peerDependencies: 직접 의존하지는 않지만 호환되는 패키지 목록

Tip. 라이브러리 버전입력할 때 사용하는 기호
****************************************************
- 1.1.1 = 1.1.1버전 설치
- 부등호 1.1.1 = 부등호에 일치하는 버전 설치
- 1.1.x = 1.1.1버전, 1.1.2버전, 1.1.3버전 등
- latest = 가장 최신 버전
- ^1.1.1 = 1.9.0 허용 + 2.0.0 비허용 ( 마이너버전 까지 )
- ~1.1.1 = 1.1.9 허용 + 1.2.0 비허용 ( 패치버전 까지 )
****************************************************


# webpack_config_js 옵션 설명

웹팩 : js, css같은 것들을 오래된 버전으로 변경하여 브라우저가 알아볼 수 있도록 해주는 것. \
웹팩이 기본적으로 제공한다.
********************************
- mode : development ( 개발 ) // production ( 배포 )
- entry : bundling하려는 js모듈의 진입점 ( index.js의 위치 )
- output : entry에 설정된 js파일로부터 출발하여 의존되는 모든 모듈들을 하나로 만든다.
- module : 웹팩의 모든 파일은 모듈로 관리되는데, js외에 이미지, 폰트, css도 관리하므로 로더가 이해할 수 있도록 하는 역할을 한다.
- plugins : 부가적인 기능
- devtool : 개발을 용이하게 하기 위해 소스맵을 제공하는 옵션
( 소스맵이란 원본 소스와 난독화된 소스를 매핑해주는 방법 중 하나이며, 어떤 부분에서 오류가 났는지 확인하기 쉽다. )
********************************

# History
********************************
2019. 11. 04 ~ 2019. 11. 10 : Security, Client-인증서버 요청
2019. 11. 11 ~ 2019. 11. 17 : 인증서버에서 Token 발급 ( Jwt ) + retrofit
2019. 11. 18 ~ 2019. 11. 24 : Token Cookie 생성
2019. 11. 25 ~ 2019. 12. 01 : react + redux + redux-saga 적용 및 api호출 + cors/csrf 처리
2019. 12. 02 ~ 2019. 12. 08 : 웹팩 최적화 + object list 가져와서 보여주기
2019. 12. 09 ~ 2019. 12. 15 : 로그아웃 구현 + scss + component + library 추가
2019. 12. 23 ~ 2019. 12. 27 : multipart 파일업로드 + 웹 소켓 통신 ( 다른 소켓 서버 )
********************************



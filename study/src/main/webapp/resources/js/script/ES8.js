// 1. Object
// ex. let obj = { a: "hello", b: "sumin" };
// Object.values(obj) >> ["hello", "sumin"]
// Object.entries(obj) >> [["a", "hello"], ["b", "sumin"]]
// Object.getOwnPropertyDescriptor(obj, 'b'); >> { enumerable: false, configurable: false, get: function() {}, set: function(value) {} }
//
// 2.String
// - padStart
// - padEnd
// ex. String sumin = "sumin"
// sumin.padStart(10); >> "     sumin" _ 앞 문자열 갯수 맞춰줌 공백 5개
// sumin.padStart(10, "oct") >> "octocsumin" _ oct반복으로 문자열 갯수 맞춰줌
// sumin.padStart(6, "oct") >> "osumin"
// sumin.padStart(3) >> "sumin" _ 숫자가 작으면 원래 상태로
//
// sumin.padEnd(10); >> "sumin     " _ 뒷 문자열 갯수 맞춰줌 공백 5개
// sumin.padEnd(10, "oct") >> "suminoctoc" _ oct반복으로 문자열 갯수 맞춰줌
//
// 3. Trailing commas in function
// ex. 선언 : function A(a, b, c,) {} // 호출 : A('a', 'b', 'c',);
// { a: "hello", b: "you", } >> 이렇게 마지막에 콤마를 붙여줌
// 추가로 들어올 것을 대비하는 것이다.
//
// 4. async / await
// promise의 단점 때문에 나옴 ( 비동기 함수를 매번 구현해주어야 함 )
// yield 대신 await
// async가 없고 yield가 있으면 promise
// async 함수는 promise가 없으면 의미가 없다.
// await를 사용하려면 async가 선언되어야 한다.
// promise에 접근하기 위해선 .then을 호출하면 된다.


// 아래는 기존 callback -> promise 객체로 변환 -> 생성기로 비동기액션을 동기로 눈속임 -> async / await
// 흐름으로 보여줄 것이다.
/**************************************************/

// 4-1) callback ( callback hell _ 콜백지옥에 빠짐 )
Users.findOne({}, (err, user) => {
	if(err){
		return console.error(err);
	}
	user.name = "sumin";
	user.save((err) => {
		if(err) {
			return console.error(err);
		}
		Users.findOne({gender: "w"}, (err, user) => {
			......callback hell
		});
	})
});

// 4-2) promise객체로 ( then을 호출하는 것으로 promise 불러낼 수 있다.
Users.findOne({}).then((user) => { // Users.findOne 을 실행시키고 성공한 것을 user라는 변수에 담는다.
	user.name = "sumin";
	return user.save();
}).then((user) => { // then((user) => {} 처리한 값을 then((user) 로 받아서 user 변수에 담는다.
	return Users.findOne({gender: "w"}); // user를 사용
}).then((user) => { // 쭉쭉 처리
	...
}).catch(err =>{
	console.err(err);
});

// 4-3) 생성기 ( function* 으로 반들 수 있다. ) 
function* findUser() {
	try {
		let user = yield Users.findOne({}).exec();
		user.name = "sumin";
		user = yield user.save();
		user = yield Users.findOne({ gender: "w" }).exec();
		...
	} catch(err) {
		console.error(err);
	}
};

// 4-4) async/await
// async 는 function 앞에 async + 비동기 처리 되는 부분 앞에 await
// 그리고 await 뒷부분은 반드시 promise객체로 반환해야 하고,
// async function 자체도 promise객체로 반환해야 한다.
async function findUser() {
	try {
		let user = await Users.findOne({}).exec();
		user.name = "sumin";
		user = await user.save();
		user = await Users.findOne({ gender: "w" }).exec();
		...
		// await Promise.resolved(true)
	} catch (err) {
		console.error(err);
	}
}
/**************************************************/







// + 함수 및 즉시 실행 함수 정리

/**************************************************/

// 기본 문법은 아래처럼 작성한다.
function abc() {
	...
}

// ES를 좀 적용하면 이렇게 된다.
abc = (params) => {
	...
}

// 함수 선언 호이스팅
// 호이스팅이란 함수를 먼저 호출하고 나중에 function을 작성하는 방법 _ 기존에 내가 많이 쓰던거

test(); // 콘솔창에 test찍힌다.
...
function test() {
	console.log("test");
}

test2(); // test2 is not a function >> var test2 처럼 하면 호이스팅 할 수 없다.
...
var test2 = function() {
	console.log("test2");
}

var test3;
...
test3(); // test3 is not a function >> test2와 같다.
...
test3 = function() {
	console.log("test3");
}

// 익명 함수 표현
// 기존에는 function test4(param) { ... } 로 작성했는데 이를 기명 함수 표현이라고 한다.
// const test4 = function cal(x){ return x*x };
// 기명 함수 표현을 사용하면 에러가 발생했을 때 stack trace가 함수를 포함하여 출력하기 때문에 에러찾기가 쉽다.
// console.log(test4(2)); >> 4

// 익명 함수는 아래처럼 표현할 수 있다.
function (param) { ... }
const test4 = function (x){
	return x * x;
}
console.log(test4(2)); // 4

// 즉시 실행 함수(IIFE)의 형태는 아래와 같다.
// 함수를 정의하자마자 즉시 실행한다.
// 사용하는 이유는 "초기화" 이다.
// 단 한 번의 실행만 필요로 하는 초기화 코드 부분에서 많이 사용한다.

(function(){
	...
});

//(function test5 (x) {
//	console.log(x*x);
//})(2);

(function test5 (x){
	console.log(y*y);
}(2));

//(function (y) {
//console.log(y*y);
//})(2);

(function (y){
console.log(y*y);
}(2));


// 변수에도 담을 수 있다.
// 아래처럼 짤 경우 콘솔에 4, 9가 순서대로 찍힌다.
const test6 = (function (z){
	console.log(z*z);
}(2));
test6(3);

const test7 = (function(w){
	return w*w;
})(2);
console(test7); // 4




// 초기화 예제
const init;
(function (num){
	
	let textLine = ["odd", "even"]; // 홀짝
	if(num % 2 == 0){
		init = textLine[1];
	} else {
		init = textLine[0];
	}
	
}(5));

console.log(init); // odd
console.log(textLine); // textLink is not defined




// 네임 스페이스 패턴
var myApp = myApp || {}; // 네임 스페이스 선언
myApp.oh = function() {
	return "oh";
};

myApp.hello = function() {
    return "hello";
}



// 모듈 페턴
var messages = {a: "a", b: "b", c: "c"};
var myApp = (function(msg) {
	
	var ab = `${msg.a} ${msg.b}`;
	var ac = `${msg.a} ${msg.c}`;
	
	var printAB = function () {
		return ab;
	};

	var printAC = function() {
		return ac;
	};
	
	return {
		foo1: printAB,
		foo2: printAC
	};

}(messages));

console.log(myApp.foo1()); // ab
console.log(myApp.ab); // undefined

/**************************************************/

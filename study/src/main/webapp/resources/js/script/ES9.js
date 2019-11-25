// 1. Object rest, spread
// 선택되지 않은 나머지 속성들을 모아주는 역할을 한다.
// Tip. 함수에서 사용하면 몇개가 들어올지 모른다는 표시
// ...x >> ...연산자 = spread // x 연산자 = rest
// rest를 할 때 값은 복사하고, 객체는 참조한다.
// 만약 같은 값이 있다면 덮어 쓴다.

/**************************************************/
const {a, ...rest} = {a: 1, b: 2, c: 3};
console.log(rest); // {b: 2, c: 3}

const {d, g, ...rest2} = {d: 4, e: {f: 5}, g: 6, h: 7};
console.log(rest2); // {e: {f: 5}, h: 7} >> 여기서 {f: 5}는 복사가 아니라 참조.

const obj = {a: 1, b: 2, c: 3};
const spread = {
	a: 3,
	b: 5,
	d: 7,
	...obj,
}

console.log(obj); // {a: 3, b: 5, c: 3, d: 7}

const spread2 = {
	a: 2,
	b: 4,
	...obj,
	a: 3,
	c: 5
}
console.log(obj); // {a: 3, b: 4, c: 5}
/**************************************************/





// 2. Promise 객체의 fianlly
// Promise 객체에 fianlly가 추가됐다.
// Promise의 성공, 실패 여부에 관계 없이 무조건 실행되는 것
// finally 뒤에 then, catch가 올 수 있다.
// finally 에서 return 한다고 하더라도 resolve값은 바꿀 수 "없고" reject값만 바꿀 수 있다.

/**************************************************/
Promise.resolve("sumin") // Promise객체의 resolve = 결과값이 sumin이라는 String
.then((msg) => Promise.resolve(msg)) // function (msg) 즉 익명의 함수를 실행시켜라 msg에는 상위 resolve의 결과값인 sumin
.finally(() => console.log("finally!!"))
.then((msg) => console.log(msg)); // 콘솔에 finally!!와 sumin이 찍힌다.
/**************************************************/





// 3. Async iteration
// async 문법을 "생성기"와 "for of 문"에서 사용 가능
// 복습 : for ~ in 구문 = 속성의 key를 반복 + for ~ of 구문 : 속성의 값을 반복
// 예전에는 반복이 되지 않아서 그냥 Promise로 구현하고 Promise.all로 처리
// 생성기 함수에서 yield는 일시정지를 의미

/**************************************************/
async function* asygen() {
	yield 1; // resolve된 값
	yield 2;
	yield 3;
}
const itr = asygen();
itr.next().then((result) => {
	console.log(result.value); // 1
})


(async() => { // async function () 의 함축 >> 즉 "익명"의 "비동기" 함수를 parameter없이 "즉시실행"
	const promiseval = ['1000', '2000', '3000'].map((timer) => {
		
		new promise((res, rej) => {
			setTimeout(() => res(timer), timer);
		})
		
	});
	for await (const result of promiseval){
		console.log(result);
	}
})();
/**************************************************/





// 4. 정규표현식

/**************************************************/
const string = "oh\nsumin";
/oh.sumin/s.test(string); // true
/oh.sumin/.test(string); // false

// lookbehind + lookahead
// (?!) - negative lookahead
// (?=) - positive lookahead
// (?<!) - negative lookbehind
// (?<=) - positive lookbehind

// const result = /(?<oh>오)(?<sumin>수민)/.exec("오수민");
// result.groups.oh; // 오
// result.groups.sumin; // 수민
// result.groups[1]; // 오
// result.groups[2]; // 수민
/**************************************************/
// 1. let, const
// var >> let, const
// let = 기존의 var처럼 값을 바꿔줄 수 있다.
// const = 바꿀 수 없다. 바꾸면 에러 떨어집니다.
// 단, 할당된 객체나 배열의 요소는 바꿀 수 있습니다.

/**************************************************/
let 1a = 100;
1a = 101; // 101

const 1b = 100;
// 1b = 101 // Uncaught TypeError: Assignment to constant variable.

const 1c = [1, 2, 3];
1c[0] = 4;
1c[1] = 5;
1c[2] = 6;
// 1c = [4, 5, 6];

const 1d = {
	"name" : "sumin"
}
1d.name = "One";
// 1d = { "name" : "One" };
/**************************************************/





// 2. Object(객체)
// - function을 빼서 쓸 수 있다.
// - 이름: function(매개변수) { 내용 } >> 이름(매개변수){ 내용 }

// - 참조하는 변수의 이름과 속성의 이름이 같은 경우 한 번 만 쓰면 된다.
// - { 이름: 이름 } >> { 이름 }

// - 속성의 이름에 변수의 값을 자체적으로 계산하지 못했는데, 가능해짐.
// object[2a + 3] >> 4로 자동 계산

/**************************************************/
// 예전 코드
let 2a = 1;
let 2b = "Wow";
let 2sayYeah = function() {
	alert("Yeah!");
}

let 2object = {
		
	2sayHello: function(){
		alert("hello!");
	},
	2sayYeah: 2sayYeah
	
};

2object[2a + 3] = "four";
2object["say" + 2b] = function() {
	alert("Wow");
}

// 최신화된 코드
const 2a = 1;
const 2b = "Wow";
const 2sayYeah = () => {
	alert("Yeah!");
}

const 2object = {
	2sayHello() {
		alert("hello!");
	},
	2sayYeah, // 2sayYeah : 2sayYeah
	[2a + 3]: "four", // 4: four
	["say" + 2b]() {
		alert("Wow");
	} // sayWow() { alert("Wow"); }
}
/**************************************************/





// 3. 함수의 변화
// - this
// => 이것이 this를 그대로 유지해주는 역할을 한다.
// forEach((function() {}).bind(this)) 를 한 것 같이.
// 바뀐 this가 필요할 때만 function() {}를 사용하면 된다.
// 2번에서 설명했듯이 function은 뺄 수는 있지만 여기서는 빼면 안되기 때문에 var처럼 완벽하게 대체되는게 아니다.

// - 기본값 설정
// 전달된 인자가 undefined일 경우에만 기본값을 넣어준다. null은 그냥 null로 처리

// - ...x ( rest 파라미터 _ x ) + spread 연산자 _ ...
// 함수에 인자가 몇 개 들어올 지 확신하지 못하는 상태일 때 사용

// - spread

/*************************this*************************/
let 3object = {
	name: "Zero",
	friends: ["One", "Two", "Three"],
	alertFriends: function() {
		var that = this; // that에 this를 넣음
		this.friends.forEach(function(friend){
			console.log(that.name + " and" + friend);
		});
	}
}

3object.alertFriends(); // 3번

const 3object = {
	name: "Zero",
	friends: ["One", "Two", "Three"],
	alertFriends: function() {
		// that에 this를 넣지 않음
		this.friends.forEach((friend) => {
			console.log(this.name + " and" + friend); // this 유지
		});
	}
}

3object.alertFriends();
/*************************this*************************/

/************************기본값**************************/
let long = function(x){
	return x + 1;
}

const short = (x) => x + 1;

let func1 = function(msg) {
	alert(msg);
};
func1(); // undefined

const func1 = (msg = "default value") => {
	alert(msg);
};
func1(); // "default value"
/************************기본값**************************/

/**************************rest+spread ( ...x )************************/
let func2 = function(x) {
	
	// x 하나를 제외하고 나머지 인자가 몇개 들어올지 모르기 때문에 Array.prototype.slice.call()로 나머지 인자 처리
	var args = Array.prototype.slice.call(arguments, 1);
	console.log(args.length);
	
};
func2(1, 2, 3, 4); // 3 >> x 하나는 들어온다는 것은 알았는데 3개가 더 들어왔으니 3이 찍힌다.

const func2 = (x, ...y) => {
	console.log(y.length);
};
func2(1, 2, 3, 4) // 3 >> x 하나는 들어온다는 것은 알았는데 3개가 더 들어왔으니 3이 찍힌다.

const 3array = [1, 2, 3];
const 3String = "sumin";

const func3 = function(x, y, z) {
	
	console.log(x);
	console.log(y);
	console.log(z);
	
}

func3(...3array); // 1 2 3 순서대로 찍힌다.

console.log(...[4, 5, 6]) // 4, 5, 6
console.log(...3String) // s u m i n
console.log(...new Map([]['a', '1'], ['b', '2']])) // ['a', '1'] ['b', '2']
console.log(...new Set([1, 2, 3])) // 1 2 3
/**************************rest+spread ( ...x )************************/





// 4. template 문자열
// - `${}`
// `를 사용하고 그안의 변수를 ${}로
// ` = 백틱

/**************************************************/
const 4a = 3;
const 4b = "hello";
const 4object = {
	4c: "sumin"
};

let 4String = 4a + " plus : " + 4b + " " + 4object.4c; // 3 plus : hello sumin
const 4String = `${4a} plus : ${4b} ${4object.4c}`; // 3 plus : hello sumin

let 4String2 = "hello\nsumin!"; // hello 엔터 sumin!
const 4String2 = `hello
sumin!`; // `를 사용함으로써 \n을 안하고 그냥 엔터를 치면된다.

// 스타일을 만들 때 아래처럼 만드는데 h1은 사실 태그함수이다.
const 4Style = styled.h1`
	font-size: 1.2em;
	text-align: center;
	color: #59bce0;
`;

// 예를 들자면
const 4c = "태그가";
const 4d = "그래??";
const tag = (...args) => console.log(args);

tag`도대체 ${4c} 뭔데?? ${4d}`; // [['도대체 ', ' 뭔데?? ', ' ', raw: ['도대체 ', ' 뭔데?? ', '']], '태그가', '그래??']

const tag1 = (strs, ...vars) => console.log(strs, vars, strs.raw);
tag1`도대체 ${4c} 뭔데?? ${4d}`; // ['도대체 ', ' 뭔데?? ', ''] ['태그가', '그래??'] ['도대체 ', ' 뭔데?? ', '']

const engAndNumOnly = (strs, ...vars) => {
	
	const 4String3 = strs.reduce((prev, cur, i) => prev + strs[i] + (vars[i] ? vars[i].replace(/[^A-z0-9]/g, ''): ''), '');
	return 4String3;
	
}

const 4f = 'English와 한글';
const 4g = '0-9 and !@#';
engAndNumOnly`Yo! ${4f} ${4g}`; // "Yo! English 09and"

/**************************************************/





// 5. Class
// - super : 부모 객체에 접근하는 방법
// constructor 내의 super는 부모에 객체에 접근하여 type을 전달하는 역할을 한다.
// 부모 객체에 없는 메소드는 따로 처리해야 한다.
// 함수 내의 super역시 부모 객체에 접근하여 메소드를 호출 하지만
// 부모 객체의 메소드를 재사용하고 싶을 때 사용한다.

/**************************************************/

// 예전 코드
let Human = function(type){
	this.type = type || "human";
};

Human.isHuman = function(human){
	return human instanceof Human;
};

Human.prototype.breathe = function(){
	console.log("breathe");
};

let Sumin = function(type, firstName, lastName){
	Human.apply(this, arguments);
	this.firstName = firstName;
	this.lastName = lastName;
};

Sumin.prototype = Object.create(Human.prototype);
Sumin.prototype.constructor = Sumin // 상속
Sumin.prototype.sayName = function(){
	console(this.fistName + ' ' + this.lastName);
}

let oldSumin = new Sumin("human", "Sumin", "Oh");
Human.isHuman(oldSumin);



// 최신화된 코드
class Human {
	
	constructor(type = "human"){
		this.type=type;
	}
	
	static isHuman(human) {
		return human instanceof Human;
	}
	
	breath(){
		console.log("breath!!");
	}
	
}

class Sumin extends Human {
	
	constructor(type, firstName, lastName) {
		
		super(type);
		this.firstName = firstName;
		this.lastName = lastName;
		
	}
	
	sayName() {
		
		super.breath();
		console.log(`$(this.firstName} ${this.lastName}`);
		
	}
	
}

const newSumin = new Sumin("human", "Sumin", "Oh");
Human.isHuman(newSumin); // true
/**************************************************/





// 6. 구조 분해 할당
// const [6a, ,6b] = [1, 2, 3];
// const {6c, 6d: {6e}, 6f} = object; >> 형식이 잘못돼도 undefined가 들어가기 때문에 에러발생 x
// 변수를 받는 매개변수도 해체할 수 있다.

/**************************************************/
const [6a, ,6b] = [1, 2, 3];
console.log(6a); // 1
console.log(6b); // 3

const 6object1 = {
	6c: "Hi",
	6d: {
		6e: "Sumin"
	}
}
const {6c, 6d: {6e}, 6f} = 6object1; // 6f가 잘못돼도 undefined가 들어가고 에러 발생 x
console.log(6c, 6e, 6f) // "Hi", "Sumin", undefined

const 6func = ({value: x}) => {
	console.log(x);
}

const 6args = {value: 3};
6func(6args); // 3

//let test, array = [], props, obj = {};
//test = array[0];
//props = obj.props;
//
//[test] = array;
//({ props } = obj)
/**************************************************/





// 7. for ~ of 구문
// - 속성의 값을 반복한다.
// - Symbol.iterator 라는 속성이 있어야 한다.
// - for ~ in 은 속성의 키를 반복한다.
/**************************************************/
for(let 7a in "string"){
	console.log(7a); // 0, 1, 2, 3, 4, 5
}
for(let 7a of "string"){
	console.log(7a); // s, t, r, i, n, g
}

let 7array = [1, 3, 9];
7array.foo = 'bar';

for(let 7b in 7array){
	console.log(7b); // 0, 1, 2, foo
}

for(let 7b of 7array){
	console.log(7b); // 1, 3, 9 >> bar는 자동으로 걸러주고 정상적인 요소만 표시
}

// 유용하게 사용
// 구 ver
let domArr = document.getElementsById("idValue");
for(let 7c = 0; 7c < domArr.length; 7c++){
	console.log(domArr[7c]);
}
// 신 ver
for(let 7c of document.getElementsById("idValue")){
	console.log(7c);
}

// Iterable ( 반복 가능한 대상 _ 배열, 유사배열, 객체 등 )에 들어있는 entries()를 활용
for(const [7idx, 7val] of Iterable.entries()){
	console.log(7idx, 7val);
}
/**************************************************/





// 8. Map, Set, WeakMap, WeakSet
// - Map은 Object 변형한 것 ( 넣은 순서대로 반복, 키는 문자열이 아니라 어떤 값이어도 상관 없음 _ 객체도 가능 )
// - Set은 Array 변형한 것
// WeakMap과 WeakSet에 추가되었던 객체가 더는 사용하지 않는다면
// 추가되었던 데이터도 함께 사라진다. ( 메모리 누수 방지 )

/**************************************************/
let 8map = new Map();
8map.set("first", "sumin");
8map.size; // 1
8map.set("last", "oh");
8map.size; // 2
8map.set("age", 25);
8map.get("last"); // oh
8map.size; // 3
8map.has("link"); // false
8map.has("age"); // true
8map.entries(); // {["first", "sumin"], ["last", "oh"], ["age", 25]}
8map.keys(); // {"first", "last", "age"}
8map.values(); // {"sumin", "oh", 25}
8map.delete("age");
8map.clear();

let 8set = new Set(); // Array와 달리 중복된 값이 있을 수 없다.
8set.add("sumin");
8set.size; // 1
8set.add("oh");
8set.size; // 2
8set.has("sumin"); // true
8set.has("no"); // false
8set.entries(); // {["sumin", "sumin"], ["oh", "oh"]}
8set.keys(); // {"sumin", "oh"}
8set.values(); // {"sumin", "oh"}
8set.delete("sumin");
8set.clear();


let 8weakMap = new WeakMap();
let 8weakSet = new WeakSet();
let 8obj = {
	name: "name"
};
let 8val = {
	value: "value"
};

8weakMap.add(8obj, 8val);
8weakSet.add(8obj);

console.log(8weakMap.has(8obj)); // true
console.log(8weakSet.has(8obj)); // true
8obj = null;
console.log(8weakMap.has(8obj)); // false
console.log(8weakSet.has(8obj)); // false
/**************************************************/






// 9. Promise
// - Callback Hell : 들여쓰기가 가독성을 해치는 현상
// 콜백지옥을 해결할 수 있는 것이 Promise 패턴
// 상황에 따라 결과를 받거나 상황에 따라 비동기 작업을 실행할 수 있다.

/**************************************************/
const 9promise = new Promise((resolve, reject) => {
	try{
		// 비동기 작업
		// 성공했을 때
		resolve(result);
	} catch (error) {
		// 실패했을 때 에러 전달
		reject(error);
	}
});

const 9promise2 = new Promise((resolve, reject) => {
	try{
		// 비동기 작업
		// 성공했을 때
		resolve(result);
	} catch (error) {
		// 실패했을 때 에러 전달
		reject(error);
	}
});

if(조건문) {
	9promise.then((result) => {
		// result 처리
	}).then((result) => {
		// result 처리
	}).then((result) => {
		// result 처리
	}).catch((error) => {
		// error 처리
	});
} else {
	9promise2.then((result) => {
		// result 처리
	}).9promise2.then((result) =>{
		
	}).catch((error) => {
		// error 처리
	});
}

// promise.all로 여러 객체를 모아 한번에 처리할 수 있다. 모든 메소드가 성공해야 then / 하나라도 실패하면 catch
Promise.all([9promise, 9promise2])
/**************************************************/





// 10. 반복기([Symbol.iterator])와 생성기(function*)
// - [Symbol.iterator] 는 단순히 반복되는 규칙을 내부적으로 처리하는 부분이라고 생각하면 됨
// return 할 때 next가 있는데 이부분을 만들어야 제대로 된 반복기
// 한 번더 하는 return에선 "done" : 반복 완료 여부 // "value" : 현재 값
// ES6의 반복기는 한번 호출하면 무한히 반복하기 때문에 나온 것이 생성기
// next를 통해 값을 전달할 수도 있다. ...next(x);
// while문 안에 next를 하면 yield가 코드의 흐름을 끊고 있는데 이걸 활용해서 비동기 코드로 속일 수 있다.
// 단점은 async 함수를 매번 구현해줘야 하는데 async/await로 해결됨

/**************************************************/
let 10factorial = {
	[Symbol.iterator]() {
		let 10count = 1;
		let 10cur = 1;
		return {
			next() {
				
				[10count, 10cur] = [10count + 1, cur * 10count];
				return { done: false, value: 10cur };
				
			}
		}
	}
};

for(let 10x of factorial){
	if(10x > 1000000) {
		break;
	}
	console.log(10x); // 1, 2, 6, 24, 120, ... >> 1000000 보다 작을 때까지
}


// 생성기, 생성자 ( function* )
function* generator(){
	
	let 10count = 1;
	let 10cur = 1;
	while(true){
		[10count, 10cur] = [10count + 1, 10cur * 10count];
		yield 10cur;
	}
	
}

let gen = generator();
gen.next().value; // 1
gen.next().value; // 2



// 문자열도 쪼갤수있다. yield* 를 이용해서
function* 10string(string){
	yield* string;
}
const 10str = 10string("hello");
10str.next().value; // h
10str.next().value; // e
10str.next().value; // l


// next(x)로 값도 전달 가능
function* 10next(){
	console.log("next call");
	let val = yield;
	console.log("1st" + val);
	val = yield;
	console.log("2nd" + val);
	val = yield;
	console.log("3rd" + val);
}

let nex = 10next(){
	nex.next(1); // next call
	nex.next(2); // 1st 2
	nex.next(3); // 2nd 3
	nex.next(4); // 3rd 4
}
/**************************************************/

// 11. 모듈 시스템

/**************************************************/

const 11a = 1;
const 11b = 2;
export { 11a };
export const 11c = 3;
export default 11b;

//import 11d, { 11a, 11c as 11e } from 경로 >> export default 는 기본이기 때문에 변수를 마음대로 지을 수 있다.
//import * from 경로 >> { 11a: 1, 11c: 3, default: 2 }

/**************************************************/

// 12. Proxy
// 타겟과 핸들러로 구성되어 있다. 원래라면 기존 객체에 반영되어야 할 사항이 프록시 객체에 대신 반영
// 타겟 : 목표하는 객체
// 핸들러 : 추가 또는 수정할 기능을 적는 부분
// 옵션으로는 get, set, has, deleteProxy, apply, construct, getOwnPropertyDescriptor,
// defineProperty, getPrototypeOf, setPrototypeOf, ownKeys, preventExtensions, isExtensible

/**************************************************/
let 12target = {};
let 12handler = {
	get: function(obj, name) {
		return `hello {$name}`
	}
};

let 12proxy = new Proxy(12target, 12handler);
12proxy.sumin; // hello sumin
12target.sumin; // hello sumin

let 12target = {};
let 12handler = {
	set: function(obj, name, value) {
		return console.log(`$[name}이 ${value}로 설정되었습니다.`);
	}
};

let 12proxy = new Proxy(12target, 12handler);
12proxy.name = "Sumin"; // name이 Sumin로 설정되었습니다.
12target.sumin; // hello sumin
/**************************************************/





// 13. Reflect API
/**************************************************/
const 13obj = { 13a: 1, 13b: "sumin", 13c: true };
const 13arr = [1, "sumin", true]

Reflect.get(13obj, '13a'); // 1
Reflect.get(13arr, 1) // "sumin"

Reflect.set(13obj, "13d", ["13arg1", "13arg2"]);
13obj.13d; // ["13arg1", "13arg2"]

const 13add = (13a, 13b) => 13a + 13b;
Reflect.apply(13add, null, [5, 10]); // 15

function T(first, last){
	this.firstName = first;
	this.lastName = last;
}
const 13cons = Reflect.construct(T, ["sumin", "oh"]); // new T("sumin", "oh")와 같음

Reflect.has(13obj, "13b") // true
Reflect.deleteProperty(13obj, "13c"); // true
Reflect.defineProperty(13obj, "13b", {
	enumerable: false, // 객체의 속성에 설정
});

// 객체의 속성 설정을 가져온다.
Reflect.getOwnPropertyDescriptor(13obj, "13b");

const proto = {
	eat(){
		console.log("eat");
	},
	move(){
		console.log("move");
	},
};
// 객체의 prototype을 설정
Reflect.setPrototypeOf(13cons, proto);
Reflect.getPrototypeOf(13cons); // { eat(), move() {} } 

// 객체의 확장을 막음
Reflect.preventExtensions(13obj); // true

// 객체의 확장여부
Reflect.isExtensible(13obj); // false

// 객체의 속성명들을 배열로 반환
Reflect.ownKeys(13obj);
/**************************************************/
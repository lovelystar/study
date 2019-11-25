// 1. Object.formEntries
// formEntries는 2차원 배열을 객체롬 만들어 준다.
// - Object.entries
// entries는 객체를 2차원 배열로 만들어 준다.

/**************************************************/
Object.entries({a: "sumin", b: ["hello"]}); // [["a", "sumin"]["b", ["hello"]]]
Object.formEntires([["a", "sumin"]["b", ["hello"]]]); // {a: "sumin", b: ["hello"]} 
/**************************************************/





// 2. Array.prototype.flat, flatMap
// 배열을 펼치는데 사용한다. 인수로 숫자를 넣어 몇 번을 펼치는지 결정할 수 있음.

/**************************************************/
['abc', 'def', ['gh', ['ijk']]].flat() // ['abc', 'def', 'gh', ['ijk']]
['abc', 'def', ['gh', ['ijk']]].flat(2) // ['abc', 'def', 'gh', 'ijk']
/**************************************************/





// 3. trimStart, trimEnd, trimLeft, trimRight
// trim은 문자열에서 공백을 지울 때 많이 사용 했지만
// 오른쪽, 왼쪽 공백만 지우고 싶을 때가 있을 때 난감했다.
// 그 때 사용하는 것이 위의 것이다.
// trimStart = trimLeft >> 왼쪽 공백을 지운다.
// trimEnd = trimRight >> 오른쪽 공백을 지운다.

/**************************************************/
"    abc    ".trim(); // "abc"
"    abc    ".trimStart(); // "abc    "
"    abc    ".trimLeft(); // "abc    "
"    abc    ".trimEnd(); // "    abc"
"    abc    ".trimRight(); // "    abc"
/**************************************************/





// 4. Optional Catch
// catch의 변수를 쓰지 않는 경우 error를 생략할 수 있다.

/**************************************************/
try {
	
	new Error('hello');
	
} catch { // catch(error) 에서 error가 생략
	
	console.error('에러가 나든지 말든지');
	
}
/**************************************************/
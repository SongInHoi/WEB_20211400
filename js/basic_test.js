var jb = "hi"; // 변수 선언 뒤에 주석처리 가능
var a = 1;
var b;
b = 5;

if(true){
    let c = "let 접근";
    var c_1 = "var 접근";
}
//console.log(c); // Error임 지역변수라
console.log(c_1); // var는 전역변수라 ok

let d = 5;  // 초기화
//let d = "값 재할당"; // Error임 let 초기화 다시 x
console.log(d);

const e = "상수1 접근";
//e = 5; const는 재할당x let은 가능  
//const f // Error
console.log(e);

document.getElementById("search_btn").addEventListener('click', search_message);

function search_message(){
   alert("검색을 수행합니다!");
   let search_str = document.querySelector("#search_txt"); // 변수에 저장
   document.getElementById("search_message").innerHTML = search_str.value; // 태그에 값 추가
   console.log(search_str.value); // 콘솔에 출력
}
function deleteCookie(cookieName){ 
    var expireDate = new Date(); // 현재 날짜를 나타내는 Date 객체를 생성합니다.
    expireDate.setDate(expireDate.getDate() - 1);// 현재 날짜에서 1일을 빼서 유효 기간을 설정합니다.
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
    // document.cookie를 사용하여 쿠키를 삭제합니다. 쿠키 이름과 빈 값으로 설정합니다.
    // "expires" 속성을 사용하여 쿠키의 유효 기간을 이전 날짜로 설정합니다. toGMTString() 함수를 사용하여 날짜를 GMT 형식의 문자열로 변환합니다.
}

function init(){ // 로그인 폼에 쿠키에서 가져온 아이디 입력
    let id = document.querySelector("#floatingInput");
    let check = document.querySelector("#idSaveCheck");
    let get_id = getCookie("id"); //getCookie("id")를 사용하여 "id"라는 이름의 쿠키 값을 가져옵니다.
    
    if(get_id) { 
    id.value = get_id; // 이메일 입력란에 이메일 넣기
    check.checked = true; // 체크박스에 체크하기
    }
    session_check(); // 세션 유무 검사
}

function setCookie(name, value, expiredays) {
    var date = new Date();
    date.setDate(date.getDate() + expiredays);
    document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString();        
  }
  
function getCookie(name) {
    var cookie = document.cookie;
    console.log("쿠키를 요청합니다.");
    if (cookie != "") {
        var cookie_array = cookie.split("; ");
        for ( var index in cookie_array) {
            var cookie_name = cookie_array[index].split("=");
            
            if (cookie_name[0] == "id") {
                return cookie_name[1];
            }
        }
    }
    return ;
}

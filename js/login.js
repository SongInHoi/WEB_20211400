function addJavascript(jsname) { // 자바스크립트 외부 연동
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
}
addJavascript('/js/security.js'); // 암복호화 함수 security.js 끌어오는방법
addJavascript('/js/session.js'); // 세션 함수 session.js 끌어오는방법
addJavascript('/js/cookie.js'); // 쿠키 함수 cookie.js 끌어오는방법

let loginAttempts = 0; // 로그인 시도 횟수 초기값(10주차)

function login() {
    let form = document.querySelector("#form_main");
    let id = document.querySelector("#floatingInput");
    let password = document.querySelector("#floatingPassword");
    let check = document.querySelector("#idSaveCheck");
    let emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; // 이메일 형식 정규 표현식
    let passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/; // 패스워드 정규 표현식
  
    form.action = "../index_login.html";
    form.method = "get";
  
    if (check.checked == true) { // 아이디 체크 
      alert("쿠키를 저장합니다.");
      setCookie("id", id.value, 1); // 1일 저장
      alert("쿠키 값 :" + id.value);
    } else { // 아이디 체크 x
      setCookie("id", id.value, 0); // 날짜를 0 - 쿠키 삭제
    }
  
    if (id.value.length === 0 || password.value.length === 0) {
      alert("아이디와 비밀번호를 모두 입력해주세요.");
    } else if (!emailRegex.test(id.value)) {
      alert("올바른 이메일 형식이 아닙니다.");
    } else if (!passwordRegex.test(password.value)) {
      alert("패스워드는 최소 8자 이상이어야 하며, 영문, 숫자, 특수문자를 포함해야 합니다.");
      loginAttempts++; //(10주차)
      if (loginAttempts >= 4) { // (10주차)
        alert("로그인 가능 횟수를 초과했습니다. 10초 간 로그인 할 수 없습니다.");
        disableLoginForm(); // 로그인 폼 비활성화(10주차)
        setTimeout(enableLoginForm, 10000); // 30초 후 로그인 폼 활성화(10주차)
        loginAttempts = 0; // (10주차)
      }
    } else {
      session_set(); // 11주차 세션 생성
      form.submit();
    }
  }

  function disableLoginForm() {
    let button = document.querySelector(".btn-primary");
    button.disabled = true;
  }

  function enableLoginForm() {
    let button = document.querySelector(".btn-primary");
    button.disabled = false;
  }


function logout(){
    session_del(); // 세션 삭제
    location.href='../index.html';
}



function get_id(){
    if(true){
        decrypt_text();
    }
    else{
        var getParameters = function(paramName){ // 변수 = 함수(이름)
        var returnValue; // 리턴값을 위한 변수 선언
        var url = location.href; // 현재 접속 중인 주소 정보 저장
        var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&'); // ?기준 slice 한 후 split 으로 나눔
            for(var i = 0; i < parameters.length; i++) { 
	    	    var varName = parameters[i].split('=')[0];

                if (varName.toUpperCase() == paramName.toUpperCase()) {
                    returnValue = parameters[i].split('=')[1];
                    return decodeURIComponent(returnValue);
                // 나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return
	    	    }
	        } // 2중 for문 끝
        }; // 함수 끝
        alert(getParameters('id') + '님 반갑습니다!'); // 메시지 창 출력
    }
}

function displaySessionExpiration() {
    if (sessionStorage && sessionStorage.getItem("Session_Storage_expiration")) {
        let expiration = new Date(parseInt(sessionStorage.getItem("Session_Storage_expiration")));
        let now = new Date();
        let remainingTime = Math.max(expiration - now, 0); // 남은 시간 계산 (음수 값은 0으로 설정)

        let minutes = Math.floor(remainingTime / (1000 * 60)); // 분 계산
        let seconds = Math.floor((remainingTime / 1000) % 60); // 초 계산

        let sessionExpirationElement = document.getElementById("sessionExpiration");
        sessionExpirationElement.textContent = `세션 유지 시간: ${minutes}분 ${seconds}초`;

        if (remainingTime <= 0) {
            alert("자동로그아웃합니다.") //1
            logout();
            clearInterval(intervalID); // 반복 실행 중지
        }
        
    }
}

window.addEventListener("load", function() {
    displaySessionExpiration();
    setInterval(displaySessionExpiration, 1000); // 1초마다 호출
});
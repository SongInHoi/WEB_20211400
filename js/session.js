function addJavascript(jsname) { // 자바스크립트 외부 연동
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
}
addJavascript('/js/security.js'); // 암복호화 함수 security.js 끌어오는방법
addJavascript('/js/cookie.js'); // 쿠키 함수 cookie.js 끌어오는방법

/* // 12주차 ppt11장에서 웹 세션을 객체로 저장하는 기능을 위해 주석처리하고 아래 새롭게 만듬.
function session_set() { //세션 저장
    let id = document.querySelector("#floatingInput"); // id 값이 "floatingInput"인 요소를 가져와 id 변수에 저장합니다.
    let password = document.querySelector("#floatingPassword"); // id 값이 "floatingPassword"인 요소를 가져와 password 변수에 저장합니다.
    if (sessionStorage) { // sessionStorage가 지원되는 경우에 아래의 코드를 실행합니다.
        let en_text = encrypt_text(password.value); // password 값에 대해 암호화를 수행한 결과를 en_text 변수에 저장합니다.
        sessionStorage.setItem("Session_Storage_test", en_text); // "Session_Storage_test"라는 키로 en_text 값을 sessionStorage에 저장합니다.

    } else {// sessionStorage가 지원되지 않는 경우에 아래의 코드를 실행합니다.
        alert("로컬 스토리지 지원 x"); // "로컬 스토리지 지원 x" 메시지를 알림창으로 출력합니다.
    }
}
*/

function session_set(){ //session_set 함수는 세션에 객체를 저장하는 역할을 합니다.
    let id = document.querySelector("#floatingInput"); //아이디 입력란의 값을 가져와 id 변수에 저장합니다.
    let password = document.querySelector("#floatingPassword"); //비밀번호 입력란의 값을 가져와 password 변수에 저장합니다.
    let random = new Date(); // 현재 시간을 나타내는 Date 객체를 생성하여 random 변수에 저장합니다. 이는 랜덤한 타임스탬프를 생성하기 위해 사용됩니다.
    
    const obj = { // 아이디와 타임스탬프를 속성으로 가지는 객체(obj)를 선언합니다.
    id : id.value, 
    otp : random
    }
    
    if (sessionStorage) { //브라우저가 세션 스토리지를 지원하는지 확인합니다.
        const objString = JSON.stringify(obj); // 객체(obj)를 JSON 문자열로 변환하여 objString 변수에 저장합니다.객체를 문자열로 변환하여 
        //세션 스토리지에 저장할 수 있습니다.
        let en_text = encrypt_text(objString); // 암호화 함수인 encrypt_text를 사용하여 objString을 암호화한 결과를 en_text 변수에 저장합니다.
        sessionStorage.setItem("Session_Storage_object", objString); //objString을 "Session_Storage_object"라는 키로 세션 스토리지에 저장합니다. 
        //이는 객체를 원본 형태로 세션 스토리지에 저장하는 것입니다.
        sessionStorage.setItem("Session_Storage_encrypted", en_text); //en_text를 "Session_Storage_encrypted"라는 키로 세션 스토리지에 저장합니다. 
        //이는 암호화된 문자열을 세션 스토리지에 저장하는 것입니다. 

                // 5분 동안 세션 유지 (11주차)
                let expiration = new Date();
                expiration.setTime(expiration.getTime() + (1 * 10 * 30000)); // 현재 시간에 x분을 더한 값을 만료 시간으로 설정
                sessionStorage.setItem("Session_Storage_expiration", expiration.getTime());
 
    } else {
        alert("세션 스토리지 지원 x");
    }   
}


function session_get() { //세션 읽기
    if (sessionStorage) {
       return sessionStorage.getItem("Session_Storage_encrypted"); //Session_Storage_test 였는데 기존 복호화된 값 확인을 위해서 키의 이름을 변경
    } else {
        alert("세션 스토리지 지원 x");
    }
}

function session_check() { // 세션검사
    if(sessionStorage.getItem("Session_Storage_encrypted")){
        alert("이미 로그인 되었습니다.");
        location.href='index_login.html'; // 로그인된 페이지로 이동
    }       
}

function session_del() {//세션 삭제
    // Check if the sessionStorage object exists
    if (sessionStorage) {
        // Retrieve data
        sessionStorage.removeItem("Session_Storage_encrypted");
    
        alert('로그아웃 버튼 클릭 확인 : 세션 스토리지를 삭제합니다.'); //2
    } else {
        alert("세션 스토리지 지원 x");
    }
}

function session_join_set(){ //세션 저장(객체) 12주차 ppt 18장
    let f_name = document.querySelector("#firstName").value;
    let l_name = document.querySelector("#lastName").value;
    let b_day = document.querySelector("#birthdayDate").value;
    let gender = document.querySelector("#inlineRadioOptions");
    let email = document.querySelector("#emailAddress").value;
    let p_number = document.querySelector("#phoneNumber").value;
    let class_check = document.querySelector(".select form-control-lg");
    let random = new Date(); // 랜덤 타임스탬프
    
    const newSignUp = new SignUp(f_name, l_name, b_day, gender, email, p_number, class_check, random);
    console.log(newSignUp.fullName); // John Doe
    console.log(newSignUp.contactInfo); // johndoe@email.com 123-456-7890
    
    if (sessionStorage) {
        const objString = JSON.stringify(newSignUp); // 객체 -> JSON 문자열 변환
        let en_text = encrypt_text(objString); // 암호화
        sessionStorage.setItem("Session_Storage_object", objString);
        sessionStorage.setItem("Session_Storage_encryted", en_text);
    } else {
        alert("세션 스토리지 지원 x");
    }   
}
/* 12주차 응용문제 해결x

function session_join_get() {
    if (sessionStorage) {
      const objString = sessionStorage.getItem("Session_Storage_object");
      const en_text = sessionStorage.getItem("Session_Storage_encryted");
  
      if (objString && en_text) {
        const de_text = decrypt_text(en_text); // 복호화
        const retrievedSignUp = JSON.parse(de_text); // JSON 문자열 -> 객체 변환
  
        console.log(retrievedSignUp.fullName);
        console.log(retrievedSignUp.contactInfo);
      } else {
        console.log("세션 스토리지에 저장된 객체 없음");
      }
    } else {
      alert("세션 스토리지 지원 x");
    }
  }
  */
function pop_up() {
	var cookieCheck = getCookie("popupYN");
        if (cookieCheck != "N"){
        window.open("pop_up.html", "팝업테스트", "width=500, height=300, top=200, left=700");
        }
}

function show_clock(){
    let currentDate = new Date(); // 날짜 객체 생성
    let divClock = document.getElementById('divClock');
    let msg = "현재 시간 : ";
    if(currentDate.getHours()>12){  // 12시 보다 크면 오후 아니면 오전
      msg += "오후";
      msg += currentDate.getHours()-12+"시";
   }
   else {
     msg += "오전";
     msg += currentDate.getHours()+"시";
   }

    msg += currentDate.getMinutes()+"분";
    msg += currentDate.getSeconds()+"초";
    divClock.innerText = msg;

    if (currentDate.getMinutes()>58) {    //정각 1분전 빨강색 출력
      divClock.style.color="red";
    }

    setTimeout(show_clock, 1000);  //1초마다 갱신
}

function setCookie(name, value, expiredays) { // 쿠키를 SET하는 함수
  var date = new Date(); // 현재 날짜를 나타내는 Date 객체를 생성합니다.
  date.setDate(date.getDate() + expiredays); // 현재 날짜에 expiredays만큼을 더하여 유효 기간을 설정합니다.
  document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString() + "SameSite=None; Secure";
  // document.cookie를 사용하여 쿠키를 설정합니다. escape() 함수를 사용하여 name과 value를 인코딩합니다.
  // "expires" 속성을 사용하여 쿠키의 유효 기간을 설정합니다. toUTCString() 함수를 사용하여 날짜를 UTC 형식의 문자열로 변환합니다.
  // "SameSite=None; Secure"는 SameSite 속성을 설정하여 쿠키의 SameSite 정책을 None으로 설정하고, Secure 속성을 설정하여 쿠키가 HTTPS에서만 전송되도록 합니다.
}

function getCookie(name) { // 쿠키를 GET하는 함수
  var cookie = document.cookie; // 현재 페이지의 쿠키 값을 가져와 cookie 변수에 저장합니다.
  console.log("쿠키를 요청합니다.");
  if (cookie != "") { // 쿠키 값이 비어있지 않은 경우에만 아래의 코드를 실행합니다.
      var cookie_array = cookie.split("; "); // 쿠키 값을 세미콜론과 공백을 기준으로 분리하여 cookie_array 배열에 저장합니다.
      for ( var index in cookie_array) { // cookie_array 배열의 요소를 반복하면서 실행합니다.
          var cookie_name = cookie_array[index].split("="); // 배열 반복하여 내부에 =을 제외한 popupYN을 찾아 값을 리턴
          if (cookie_name[0] == "popupYN") { // cookie_name 배열의 첫 번째 요소가 "popupYN"과 같은 경우에만 아래의 코드를 실행합니다.
              return cookie_name[1]; // 참고 : 쿠키는 키, 값으로 이루어짐 즉 값은 인덱스[1]이 된다.
          }
      }
  }
  return ; // 쿠키 값이 비어있거나 "popupYN"에 대응하는 쿠키가 없는 경우에는 아무 값도 반환하지 않고 함수를 종료합니다.
}

function closePopup() {
  if (document.getElementById('check_popup').value) {
      setCookie("popupYN", "N", 1); // 팝업이 열리지 않는다 1일동안
      console.log("쿠키를 설정합니다.");
      self.close();
  }
}



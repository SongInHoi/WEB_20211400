function pop_up() {
	var cookieCheck = getCookie("popupYN");
        if (cookieCheck != "N"){
        window.open("pop_up.html", "팝업테스트", "width=400, height=300, top=10, left=10");
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
  var date = new Date(); //현재 시간 기준 - date
  date.setDate(date.getDate() + expiredays); // expiredays 시간 설정 추가 , getDate함수는 UTC표준 날짜 리턴
  document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString() + "SameSite=None; Secure"; // 보안 관련코드 
}

function getCookie(name) { // 쿠키를 GET하는 함수
  var cookie = document.cookie;
  console.log("쿠키를 요청합니다.");
  if (cookie != "") { //쿠키를 얻는다 존재하면 
      var cookie_array = cookie.split("; ");
      for ( var index in cookie_array) { 
          var cookie_name = cookie_array[index].split("="); // 배열 반복하여 내부에 =을 제외한 popupYN을 찾아 값을 리턴
          if (cookie_name[0] == "popupYN") {
              return cookie_name[1]; // 참고 : 쿠키는 키, 값으로 이루어짐 즉 값은 인덱스[1]이 된다.
          }
      }
  }
  return ;
}

function closePopup() {
  if (document.getElementById('check_popup').value) {
      setCookie("popupYN", "N", 1); // 팝업이 열리지 않는다 1일동안
      console.log("쿠키를 설정합니다.");
      self.close();
  }
}



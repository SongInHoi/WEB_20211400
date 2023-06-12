function addJavascript(jsname) { // jsname이라는 매개변수를 받습니다. 이 함수는 외부 자바스크립트 파일을 로드하기 위한 함수입니다.
	var th = document.getElementsByTagName('head')[0]; //<head> 요소를 찾아서 th 변수에 저장합니다. 이는 스크립트를 <head> 요소에 추가하기 위해 사용됩니다
	var s = document.createElement('script'); //<script> 요소를 생성하여 s 변수에 저장합니다.
	s.setAttribute('type','text/javascript'); //type 속성을 'text/javascript'로 설정합니다. 이는 스크립트의 타입을 지정하는 것입니다.
	s.setAttribute('src',jsname); //src 속성을 jsname으로 설정합니다. 이는 로드할 자바스크립트 파일의 경로를 지정하는 것입니다.
	th.appendChild(s); //<head> 요소에 생성한 <script> 요소(s)를 추가합니다. 이로써 외부 자바스크립트 파일이 동적으로 로드됩니다.
}

addJavascript('/js/session.js'); // 세션 함수
addJavascript('/js/security.js'); // 암복호화 함수
// 위에 전체가 한 세트임.

class SignUp { // 이 클래스는 사용자의 가입 정보를 담고 관리하는 역할을 합니다.
    constructor(firstName, lastName, birthdayDate, gender, emailAddress, phoneNumber, classNumber, random) {
      // constructor 메서드는 클래스의 생성자로, 인스턴스가 생성될 때 실행되는 코드입니다. 인스턴스의 속성들을 초기화합니다.
      this.firstName = firstName;
      this.lastName = lastName;
      this.birthdayDate = birthdayDate;
      this.gender = gender;
      this.emailAddress = emailAddress;
      this.phoneNumber = phoneNumber;
      this.classNumber = classNumber;
      this.random = random;
    }
  
    get fullName() { //get fullName() 메서드는 fullName이라는 속성을 읽을 때 호출되는 게터(getter) 메서드입니다
      // firstName과 lastName 속성을 조합하여 전체 이름을 반환합니다.
      return `${this.firstName} ${this.lastName}`;
    }
  
    set fullName(fullName) {
      //set fullName(fullName) 메서드는 fullName이라는 속성을 수정할 때 호출되는 세터(setter) 메서드입니다. 
      //전체 이름을 받아서 공백을 기준으로 firstName과 lastName 속성을 설정합니다.
      const [firstName, lastName] = fullName.split(" ");
      this.firstName = firstName;
      this.lastName = lastName;
    }
  
    get contactInfo() {
      //get contactInfo() 메서드는 contactInfo라는 속성을 읽을 때 호출되는 게터 메서드입니다.
      // emailAddress, phoneNumber, random 속성을 조합하여 연락처 정보를 반환합니다.
      return `${this.emailAddress} ${this.phoneNumber} ${this.random}`;
    }
  
    set contactInfo(contactInfo) {
      //set contactInfo(contactInfo) 메서드는 contactInfo라는 속성을 수정할 때 호출되는 세터 메서드입니다. 
      //연락처 정보를 받아서 공백을 기준으로 emailAddress, phoneNumber, random 속성을 설정합니다.
      const [emailAddress, phoneNumber, random] = contactInfo.split(" ");
      this.emailAddress = emailAddress;
      this.phoneNumber = phoneNumber;
      this.random = random;
    }
}
  

function join(){ // 회원가입
    let form = document.querySelector("#form_main");
    let f_name = document.querySelector("#firstName");
    let l_name = document.querySelector("#lastName");
    let b_day = document.querySelector("#birthdayDate");
    let gender = document.querySelector("#inlineRadioOptions");
    let email = document.querySelector("#emailAddress");
    let p_number = document.querySelector("#phoneNumber");
    let class_check = document.querySelector(".select form-control-lg");
    
    form.action = "../index_join.html";
    form.method = "get";
    
    if(f_name.value.length === 0 || l_name.value.length === 0 || b_day.value.length === 0 || email.value.length === 0 || p_number.value.length === 0){
        alert("회원가입 폼에 모든 정보를 입력해주세요.(성별, 분반 제외)");
    }else{
        session_join_set(); // 회원가입 용 세션 생성
        form.submit();
    }
}



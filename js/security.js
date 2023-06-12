function encodeByAES256(key, data){ // encodeByAES256 함수는 key와 data라는 두 개의 매개변수를 받습니다.
    const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), { 
        // CryptoJS.AES.encrypt 함수를 사용하여 data를 AES-256 알고리즘으로 암호화합니다.
        // data는 암호화할 데이터입니다.
        // CryptoJS.enc.Utf8.parse(key)를 사용하여 key를 UTF-8 형식으로 파싱합니다. 이는 암호화에 사용할 키를 지정하는 것입니다.
        
        // 암호화 옵션 객체를 생성합니다. 여기서는 초기화 벡터(iv), 패딩 방식(padding), 암호화 모드(mode)를 설정합니다.
        iv: CryptoJS.enc.Utf8.parse(""), //초기화 벡터를 빈 값으로 설정합니다.
        padding: CryptoJS.pad.Pkcs7, // PKCS7 패딩 방식을 사용하여 데이터의 길이를 조정합니다.
        mode: CryptoJS.mode.CBC // 암호화 모드를 CBC(Cipher Block Chaining)로 설정합니다.
    });
    return cipher.toString(); //암호화된 결과를 문자열로 반환합니다.
}

function decodeByAES256(key, data){ // decodeByAES256 함수는 key와 data라는 두 개의 매개변수를 받습니다.
    const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), { //CryptoJS.AES.decrypt 함수를 사용하여 data를 AES-256 알고리즘으로 복호화합니다.
        //data는 복호화할 데이터입니다.
        //CryptoJS.enc.Utf8.parse(key)를 사용하여 key를 UTF-8 형식으로 파싱합니다. 이는 복호화에 사용할 키를 지정하는 것입니다.
        iv: CryptoJS.enc.Utf8.parse(""), //초기화 벡터를 빈 값으로 설정합니다.
        padding: CryptoJS.pad.Pkcs7, //PKCS7 패딩 방식을 사용하여 데이터의 길이를 조정합니다.
        mode: CryptoJS.mode.CBC //복호화 모드를 CBC(Cipher Block Chaining)로 설정합니다.
    });
    return cipher.toString(CryptoJS.enc.Utf8); //복호화된 결과를 UTF-8 형식의 문자열로 반환합니다.
};

function encrypt_text(password){ //encrypt_text 함수는 password라는 매개변수를 받습니다.
    const k = "key"; // 클라이언트 키를 "key"로 설정합니다. (실제로는 보안적으로 안전한 키를 사용해야 합니다.)
    const rk = k.padEnd(32, " "); // k를 32글자로 채우기 위해 공백 문자(" ")로 패딩합니다. AES-256에서는 32글자의 키가 필요합니다.
    const b = password; //password 값을 b 변수에 저장합니다.
    const eb = this.encodeByAES256(rk, b); // 앞서 정의된 encodeByAES256 함수를 사용하여 rk 키로 b를 암호화합니다.
    return eb; //암호화된 결과를 반환합니다.
    console.log(eb);
}

function decrypt_text(){ // 특정 키(k)를 사용하여 암호화된 텍스트를 복호화하는 역할을 합니다.
    const k = "key"; // 서버의 키를 "key"로 설정합니다. (실제로는 보안적으로 안전한 키를 사용해야 합니다.)
    const rk = k.padEnd(32, " "); // k를 32글자로 채우기 위해 공백 문자(" ")로 패딩합니다. AES-256에서는 32글자의 키가 필요합니다.
    const eb = session_get(); // session_get() 함수를 사용하여 세션에서 암호화된 텍스트(eb)를 가져옵니다.
    const b = this.decodeByAES256(rk, eb); //앞서 정의된 decodeByAES256 함수를 사용하여 rk 키로 eb를 복호화합니다.
    console.log(b); //복호화된 결과(b)를 콘솔에 출력합니다.
}
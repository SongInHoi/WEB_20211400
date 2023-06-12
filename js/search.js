document.getElementById("search_btn").addEventListener('click', search_message);

var search_array = []; // 빈 배열 – 전역 변수


function search_message() {
  const profanityList = ["바보", "멍청이", "썅"]; // 비속어 목록

  let search_str = document.querySelector("#search_txt"); // 변수에 저장
  if (search_str.value.length === 0) { // 문자 길이, 엄격한 비교
    alert("검색어가 비었습니다. 입력해주세요");
  } else {
    // 검색어가 포함된 비속어가 있는지 확인
    const hasProfanity = profanityList.some(profanity => search_str.value.includes(profanity));
    
    if (hasProfanity) {
      alert("욕설을 포함하였습니다. 다시 검색해주세요.");
    } else {
      alert("검색을 수행합니다!");
      search_array.push(search_str.value); // 배열에 검색어 추가

      let text = document.getElementById("search_message").innerHTML = search_array.toString(); // 값 변환
      document.querySelector("#form_main").submit();
    }
  }
}
// preventU 초기 실행하여, 확장프로그램 on이면 ㅜ 입력 막고 경고창 띄우기
// - compositionstart 이벤트: 조합형 문자 입력 시작될 때 발생 for 조합 시작 시 초기화
//   compositionupdate 이벤트: 한글 입력 시각 조합이 변화할 때마다 호출 for 조합 중인 문자 실시간 추적
//   compositionend 이벤트: 조합이 완료되고 최종 글자가 확정될 때 호출 for 최종 문자 다루기
// - event.data: 현재 조합된 문자, 읽기 전용
//   event.target.value: 현재 입력 필드의 전체 값. 읽기/수정 가능
// - CF) input 이벤트: preventDefault 못 씀
// - Q. event.key: 영어, 숫자는 잘 나오는데 한글만 유독 Process라고만 나옴 -> event.target.value 쓰기
// - Q. addEventListener/removeEventListener 제대로 동작시키려면? -> 둘이 정확히 동일한 함수 참조해야 함. 따라서 리스너 함수를 분리시켜 참조
// - Q. window 대신 document 써도 되나?
function listenerFunc(event) {
  let compositionData = '';
  compositionData = event.data;

  if (compositionData === 'ㅜ') {
    console.log("ㅜ has been entered!");
    event.target.value = event.target.value.slice(0, - 1);
    alert("ㅜ is now prohibited!");
  }
}

function preventU() {
  chrome.storage.local.get(["status"]).then((result) => {
    let status;
    status = result.status;

    if (status === "on") {
      window.addEventListener('compositionend', listenerFunc);
    }
  });
}

preventU();

// chrome.storage.local.status가 변경될 때, 로직 자동 변경
// - onChanged.addEventListener (X)
// - changes.status.newValue 부분 변경 X
// - Q. newValue === 'on'일 때 곧바로 window.addEventListener 실행시키는 게 더 나을지도?
chrome.storage.onChanged.addListener((changes) => {
  if (changes) {
    if (changes.status.newValue === 'on') {
      preventU();
    } else {
      window.removeEventListener('compositionend', listenerFunc);
    }
  }
});
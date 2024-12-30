// 이벤트 리스너 함수
// - event.constructor.name: compositionEvent
function listenerFunc(event) {
  let compositionData = '';
  compositionData = event.data;
  console.log(event.constructor.name);

  if (compositionData === 'ㅜ') {
    console.log("ㅜ has been entered!");
    event.target.value = event.target.value.slice(0, -1);
    alert("ㅜ is now prohibited!");
  }
}

// chrome.storage 상태 변경 이벤트를 감지하여, 새 status 값에 맞춰 로직 변경
// - onChanged.addEventListener (X)
// - changes.status.newValue 부분 변경 X
// - compositionend 이벤트: 조합이 완료되고 최종 글자가 확정될 때 호출 for 최종 문자 다루기
//   CF) compositionstart 이벤트: 조합형 문자 입력 시작될 때 발생 for 조합 시작 시 초기화
//   CF) compositionupdate 이벤트: 한글 입력 시각 조합이 변화할 때마다 호출 for 조합 중인 문자 실시간 추적
//   CF) input 이벤트: preventDefault 못 씀
// - Q. addEventListener/removeEventListener 제대로 동작시키려면? -> 둘이 정확히 동일한 함수 참조해야 함. 따라서 리스너 함수를 분리시켜 참조
// - Q. window 대신 document 써도 되나?
chrome.storage.onChanged.addListener((changes) => {
  if (changes) {
    if (changes.status.newValue === 'on') {
      window.addEventListener('compositionend', listenerFunc);
    } else {
      window.removeEventListener('compositionend', listenerFunc);
    }
  }
});
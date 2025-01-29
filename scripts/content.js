// 이벤트 리스너 함수
// - String의 includes() 메서드는 대소문자를 구별함
// - event.data(새로 입력된 단일 문자) ≠ event.target.value(입력 필드의 전체 문자열)
function listenerFunc(event) {
  let inputData = '';
  inputData = event.target.value;

  if (inputData.includes('T.T')) {
    console.log("T.T has been entered!");
    event.target.value = inputData.replace(/T\.T/g, "");
    alert("T.T is now prohibited!");
  }
}

// chrome.storage 상태 변경 이벤트를 감지하여, 새 status 값에 맞춰 로직 변경
// - onChanged.addEventListener (X)
// - changes.status.newValue 부분 변경 X
// - input 이벤트: preventDefault 못 씀. window에서 이벤트 인식 못 함
// - Q. addEventListener/removeEventListener 제대로 동작시키려면? -> 둘이 정확히 동일한 함수 참조해야 함. 따라서 리스너 함수를 분리시켜 참조
chrome.storage.onChanged.addListener((changes) => {
  if (changes) {
    if (changes.status.newValue === 'on') {
      document.addEventListener('input', listenerFunc);
    } else {
      document.removeEventListener('input', listenerFunc);
    }
  }
});
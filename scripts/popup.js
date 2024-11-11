// checkbox 가져오기
const checkbox = document.getElementById('toggleButton');

// checkbox 상태 초기화/갱신
// - 사전에 manifest.json에서 storage 접근 허가해둘 필요 있음
// - storage 상태를 checkbox 상태에 반영하기
// - 확장프로그램을 설치하고 처음 실행했을 땐 status 값이 undefined -> 버튼 상태 false
chrome.storage.local.get('status').then((result) => {
  if (result.status === 'on') {
    checkbox.checked = true;
  } else {
    checkbox.checked = false;
  }
});

// storage 상태 초기화/갱신
// - checkbox 상태를 storage 상태에 반영하기
// - chrome.storage.local: 데이터는 로컬에 저장되며 확장 프로그램이 삭제되면 지워짐
// - { status: true } (X)
checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    chrome.storage.local.set({ status: "on"}).then(() => {
      console.log("Status has been updated to 'on'!");
    });

    chrome.storage.local.get(null).then((result) => {
      console.log("chrome.storage.local 모든 값: ", result);
    }); // ok
  } else {
    chrome.storage.local.set({ status: "off"}).then(() => {
      console.log("Status has been updated to 'off'!");
    });

    chrome.storage.local.get(null).then((result) => {
      console.log("chrome.storage.local 모든 값: ", result);
    });
  }
});
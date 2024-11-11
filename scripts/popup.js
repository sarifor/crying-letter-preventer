// 버튼 값을 크롬 저장소에 보관
// - manifest.json에서 storage 접근 허가
// - { status: true } (X)
const checkbox = document.getElementById('toggleButton');

checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    chrome.storage.local.set({ status: "on"}).then(() => {
      console.log("status is updated!");
    })

    chrome.storage.local.get(["status"]).then((result) => {
      console.log("status is " + result.status);
    });
  } else {
    console.log("OFF!");
  }
});
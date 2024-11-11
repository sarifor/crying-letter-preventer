// 확장프로그램 on이면 ㅜ 입력 막고 경고창 띄우기
// - input 이벤트엔 preventDefault 못 씀
// - compositionstart: 조합형 문자 입력 시작될 때 발생 for 조합 시작 시 초기화
//   compositionupdate: 한글 입력 시각 조합이 변화할 때마다 호출 for 조합 중인 문자 실시간 추적
//   compositionend: 조합이 완료되고 최종 글자가 확정될 때 호출 for 최종 문자 다루기
// - event.data: 현재 조합된 문자, 읽기 전용
//   event.target.value: 현재 입력 필드의 전체 값. 읽기/수정 가능
// - Q. event.key: 영어, 숫자는 잘 나오는데 한글만 유독 Process라고만 나옴 -> event.target.value 쓰기
// - Q. 입력과 동시에 출력되는 게 아니라 하나씩 늦게 나오는데, 어찌 해결? -> keydown 이벤트 말고 input 이벤트 사용
// - Q. window 대신 document 써도 되나?
function preventU() {
  let status;

  chrome.storage.local.get(["status"]).then((result) => {
    status = result.status;

    if (status === "on") {
      console.log("status is on");

      let compositionData = '';

      window.addEventListener('compositionend', (event) => {
        compositionData = event.data;

        if (compositionData === 'ㅜ') {
          console.log("ㅜ 입력됨!");
          event.target.value = event.target.value.slice(0, - 1);
          alert('ㅜ는 이제 못 써요!');
        }

      });
    } else {
      console.log("status is off");
    }
  });
}

preventU();
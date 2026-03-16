// 1. 필요한 요소들 가져오기
const toppingInputs = document.querySelectorAll('.topping');
const resultArea = document.getElementById('results-area');
const resultImg = document.getElementById('chocolate-result');
const generateBtn = document.getElementById('generate-button');
const resultTitle = document.createElement('h3'); // 결과 제목을 위해 새 요소 생성
resultTitle.id = 'result-title';
resultArea.prepend(resultTitle); // 결과 영역 최상단에 추가

// 2. 완성된 이미지를 생성하고 보여주는 함수
function generateResult() {
    // a. 기존 결과 숨기기 및 이미지 초기화 (이전 결과 제거)
    resultArea.style.display = 'none';
    resultImg.src = '';
    resultTitle.textContent = ''; // 제목도 초기화

    // b. 선택된 베이스 가져오기
    const selectedBaseInput = document.querySelector('input[name="base"]:checked');
    if (!selectedBaseInput) {
        alert("베이스를 먼저 선택해주세요!"); // 베이스 미선택시 경고
        return;
    }
    const selectedBase = selectedBaseInput.value;

    // c. 선택된 토핑들 가져와서 알파벳 순으로 정렬 (파일명 규칙을 위해)
    const selectedToppings = Array.from(toppingInputs)
        .filter(input => input.checked)
        .map(input => input.value)
        .sort();

    // d. 파일명 생성 규칙: base_topping1_topping2.jpg
    let fileName = selectedBase;
    let toppingsText = selectedBase; // 제목용 텍스트 생성
    if (selectedToppings.length > 0) {
        fileName += "_" + selectedToppings.join("_");
        toppingsText += " with " + selectedToppings.join(", ");
    }
    
    // e. 이미지 경로 업데이트 (images 폴더 안에 이미지가 있다고 가정)
    // 예: images/milk_lotus_nuts_pretzel.jpg
    resultImg.src = `images/${fileName}.jpg`;
    
    // f. 결과 제목 설정
    resultTitle.textContent = toppingsText.toUpperCase();

    // g. 에러 핸들링: 만약 해당 조합 이미지가 없으면 기본 이미지 표시 및 알림
    resultImg.onerror = () => {
        resultImg.src = 'images/default.jpg'; // 에러 시 기본 이미지
        alert(`앗, '${toppingsText}' 조합 이미지를 찾을 수 없습니다. 기본 이미지를 보여줍니다.`);
    };

    // h. 결과 영역 보이기
    resultArea.style.display = 'block';
}

// 3. 버튼에 클릭 이벤트 리스너 추가
generateBtn.addEventListener('click', generateResult);

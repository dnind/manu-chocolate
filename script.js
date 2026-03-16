const baseInputs = document.querySelectorAll('input[name="base"]');
const toppingInputs = document.querySelectorAll('.topping');
const resultImg = document.getElementById('chocolate-result');

function updateImage() {
    // 1. 선택된 베이스 가져오기
    let selectedBase = document.querySelector('input[name="base"]:checked').value;

    // 2. 선택된 토핑들 가져와서 알파벳 순으로 정렬 (파일명 규칙을 위해)
    let selectedToppings = Array.from(toppingInputs)
        .filter(input => input.checked)
        .map(input => input.value)
        .sort();

    // 3. 파일명 생성 규칙: base_topping1_topping2.jpg
    let fileName = selectedBase;
    if (selectedToppings.length > 0) {
        fileName += "_" + selectedToppings.join("_");
    }
    
    // 4. 이미지 경로 업데이트 (images 폴더 안에 이미지가 있다고 가정)
    // 예: milk_lotus_nuts_pretzel.jpg
    resultImg.src = `images/${fileName}.jpg`;
    
    // 에러 핸들링: 만약 해당 조합 이미지가 없으면 기본 이미지 표시
    resultImg.onerror = () => {
        resultImg.src = 'images/default.jpg'; 
    };
}

// 모든 입력 요소에 이벤트 리스너 추가
baseInputs.forEach(input => input.addEventListener('change', updateImage));
toppingInputs.forEach(input => input.addEventListener('change', updateImage));

// 초기 실행
updateImage();


function startTimer(duration, display) {
    let timer = duration, hours, minutes, seconds;
    // 1초마다 반복 실행되는 setInterval 함수
    setInterval(() => {
        // 남은 시간을 시, 분, 초로 변환
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);

        // 시, 분, 초가 10보다 작을 경우 앞에 0을 붙여 두 자리수로 
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        // display 요소의 텍스트 내용을 업데이트
        display.textContent = `${hours}:${minutes}:${seconds}`;

        // 타이머가 0에 도달하면 다시 지정된 시간으로 리셋
        if (--timer < 0) {
            timer = duration;
        }
    }, 1000); // 1000ms = 1초
}

// 원 주위에 눈금 추가하는 함수
function addMinuteMarkings(container) {
    const radius = 125; // 눈금을 배치할 원의 반지름
    const numbers = 12; // 주요 눈금(5분 간격)의 수
    const subNumbers = 60; // 보조 눈금(1분 간격)의 수

    // 보조 눈금의 수만큼 반복하여 눈금을 생성
    for (let i = 0; i < subNumbers; i++) {
        const angle = (i * 6) - 90; // 각 눈금의 각도를 계산
        const markingContainer = document.createElement('div');
        markingContainer.classList.add('minute-marking');

        
        const isPrimaryTickMark = i % 5 === 0;
        const markingHeight = isPrimaryTickMark ? 20 : 10; 
        const markingWidth = isPrimaryTickMark ? 2 : 1; 

        markingContainer.style.width = `${markingWidth}px`;
        markingContainer.style.height = `${markingHeight}px`;
        markingContainer.style.backgroundColor = 'black';

        // 메인 눈금 숫자 추가
        if (isPrimaryTickMark) {
            const markingText = document.createElement('span');
            markingText.textContent = i * 1; // 눈금에 해당하는 분 표시
            markingText.style.position = 'absolute';
            // 텍스트를 원의 중심으로부터 바깥쪽으로 이동시키고, 원을 따라 회전하지 않게함
            markingText.style.transform = `translate(-50%, -${markingHeight + 10}px) rotate(${-angle - 90}deg)`;
            markingText.style.transformOrigin = 'center';
            markingText.style.display = 'block';
            markingText.style.width = '20px';
            markingText.style.textAlign = 'center';
            markingText.style.color = 'black';
            markingContainer.appendChild(markingText);
        }

        // 눈금의 위치를 계산하여 스타일을 적용
        const xPos = 50 + (radius * Math.cos(angle * Math.PI / 180));
        const yPos = 50 + (radius * Math.sin(angle * Math.PI / 180));
        markingContainer.style.left = `${xPos}%`;
        markingContainer.style.top = `${yPos}%`;
        markingContainer.style.transform = `translate(-50%, -50%) rotate(${angle + 90}deg)`;

        container.appendChild(markingContainer);
    }
}

// DOM이 로드되면 타이머를 시작하고 눈금을 추가
document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timer');
    const circleContainer = document.querySelector('.circle-container');
    startTimer(300, timerDisplay); // 5분(300초) 동안의 카운트다운을 시작
    addMinuteMarkings(circleContainer); // 원 주위에 눈금을 추가
});

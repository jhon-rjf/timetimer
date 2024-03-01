var timer; // 타이머를 제어하기 위한 전역 변수 선언

function startTimer() {
    var ctx = document.getElementById('myCanvas').getContext('2d');
   var inputMinutes = parseInt(document.getElementById('totalTime').value, 10); // 사용자가 입력한 시간을 정수로 변환
   
    // 입력값 검증
    if (isNaN(inputMinutes) || inputMinutes < 1 || inputMinutes > 60) {
        alert("시간은 1분 이상 60분 이하로 입력해 주세요.");
        document.getElementById('totalTime').value = ''; // 입력 필드 초기화
        document.getElementById('startButton').disabled = false; // '시작' 버튼을 다시 활성화
        return; // 함수 실행 중지
    }

    var inputTime = inputMinutes * 60; // 사용자가 입력한 시간을 초로 변환
    var totalTime = 60 * 60; // 전체 시간을 60분(3600초)으로 설정
    var elapsedTime = 0; // 경과 시간

    document.getElementById('startButton').disabled = true; // 타이머 시작 후 시작 버튼 비활성화
    document.getElementById('resetButton').disabled = false; // 초기화 버튼 활성화

    if(timer) {
        clearInterval(timer); // 기존에 실행중인 타이머가 있다면 종료
    }

    // 타이머 시작
    timer = setInterval(function() {
        elapsedTime++; // 경과 시간 증가
        var remainingTime = inputTime - elapsedTime; // 남은 시간 (초)
        remainingTime = Math.max(remainingTime, 0); // 남은 시간이 음수가 되지 않도록 조정

        // 캔버스 클리어
        ctx.clearRect(0, 0, 400, 400);

        var startAngle = Math.PI * 1.5; // 12시 방향
        var remainingTimePercentage = (remainingTime / totalTime) * 100;
        var endAngle = startAngle + (Math.PI * 2) * (remainingTimePercentage / 100);

        // 남은 시간에 해당하는 원 그래프 부분 그리기
        ctx.beginPath();
        ctx.arc(200, 200, 100, startAngle, endAngle);
        ctx.lineTo(200, 200);
        ctx.fillStyle = 'red';
        ctx.fill();

        // 원 그래프의 나머지 부분 그리기 (바탕색 적용)
        if(remainingTimePercentage < 100) {
            ctx.beginPath();
            ctx.arc(200, 200, 100, endAngle, startAngle);
            ctx.lineTo(200, 200);
            ctx.fillStyle = 'white';
            ctx.fill();
        }

        // 눈금 촘촘하게 표시
        for(let i = 0; i < 12; i++) { // 기존 눈금
            const angle = startAngle + (Math.PI * 2) * (i / 12);
            drawTick(ctx, angle, 100, 70); // 눈금 그리기
            drawTickText(ctx, angle, i * 5); // 눈금 텍스트 그리기
        }

        for(let i = 0; i < 60; i++) { // 추가 눈금
            if(i % 5 !== 0) { // 기존 눈금 위치를 제외
                const angle = startAngle + (Math.PI * 2) * (i / 60);
                drawTick(ctx, angle, 90, 100); // 더 작은 눈금 그리기
            }
        }

        // 남은 시간을 분:초 형식으로 표시
        var remainingMinutes = Math.floor(remainingTime / 60);
        var remainingSeconds = remainingTime % 60;
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(`${remainingMinutes}:${remainingSeconds.toString().padStart(2, '0')}`, 200, 205);

        // 타이머 종료 조건
        if(remainingTime <= 0) {
            clearInterval(timer); // 타이머 종료
            alert("입력한 시간이 종료되었습니다!");
            document.getElementById('startButton').disabled = false; // 시작 버튼 다시 활성화
            document.getElementById('resetButton').disabled = true; // 초기화 버튼 비활성화
        }
    }, 1000); // 1초마다 업데이트
}

function resetTimer() {
    clearInterval(timer); // 진행 중인 타이머 종료
    var ctx = document.getElementById('myCanvas').getContext('2d');
    ctx.clearRect(0, 0, 400, 400); // 캔버스 클리어
    document.getElementById('totalTime').value = ''; // 입력 필드 초기화
    document.getElementById('startButton').disabled = false; // 시작 버튼 활성화
    document.getElementById('resetButton').disabled = true; // 초기화 버튼 비활성화
}

// 눈금 그리는 함수
function drawTick(ctx, angle, startRadius, endRadius) {
    const x1 = 200 + startRadius * Math.cos(angle);
    const y1 = 200 + startRadius * Math.sin(angle);
    const x2 = 200 + endRadius * Math.cos(angle);
    const y2 = 200 + endRadius * Math.sin(angle);
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

// 눈금 텍스트 그리는 함수
function drawTickText(ctx, angle, text) {
    const textX = 200 + 125 * Math.cos(angle);
    const textY = 200 + 125 * Math.sin(angle) +10;
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(text, textX, textY);
}

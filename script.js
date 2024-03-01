function startTimer() {
    var ctx = document.getElementById('myCanvas').getContext('2d');
    var inputTime = document.getElementById('totalTime').value * 60; // 사용자가 입력한 시간을 초로 변환
    var totalTime = 59 * 60; // 전체 시간을 59분(3540초)으로 설정
    var elapsedTime = 0; // 경과 시간

    // 타이머 시작
    var timer = setInterval(function() {
        elapsedTime++; // 경과 시간 증가
        var remainingTime = inputTime - elapsedTime; // 남은 시간 (초)
        remainingTime = Math.max(remainingTime, 0); // 남은 시간이 음수가 되지 않도록 조정
        var remainingMinutes = Math.floor(remainingTime / 60); // 남은 분
        var remainingSeconds = remainingTime % 60; // 남은 초

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

        // 눈금과 분 표시 (0부터 55분까지 5분 간격)
      for(let i = 0; i <= 11; i++) {
            const angle = startAngle + (Math.PI * 2) * (i / 12);
            const x1 = 200 + 100 * Math.cos(angle);
            const y1 = 200 + 100 * Math.sin(angle);
            const x2 = 200 + 110 * Math.cos(angle);
            const y2 = 200 + 110 * Math.sin(angle);
            
            // 눈금 그리기
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = 'black';
            ctx.stroke();
            
            // 분 숫자 표시 (0부터 55분까지 5분 간격)
            const textX = 200 + 125 * Math.cos(angle);
            const textY = 200 + 125 * Math.sin(angle) + 5; // 숫자가 조금 위로 올라가도록 조정
            ctx.font = "12px Arial";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText(i * 5, textX, textY); // 0부터 55까지 5분 간격으로 표시
        }
        // 이 부분은 변경 없음...

        // 남은 시간을 분:초 형식으로 표시 (사용자가 입력한 시간 기준으로 변경)
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(`${remainingMinutes}:${remainingSeconds.toString().padStart(2, '0')}`, 200, 205);

        // 타이머 종료 조건
        if(remainingTime <= 0) {
            clearInterval(timer); // 타이머 종료
            alert("입력한 시간이 종료되었습니다!");
        }
    }, 1000); // 1초마다 업데이트
}

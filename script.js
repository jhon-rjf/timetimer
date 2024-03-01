function startTimer(duration, display) {
    let timer = duration, hours, minutes, seconds;
    setInterval(() => {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = `${hours}:${minutes}:${seconds}`;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

function addMinuteMarkings(container) {
    const radius = 125; // Adjusted radius to position markings outside
    const numbers = 12; // Represents 5-minute intervals for primary tick marks
    const subNumbers = 60; // Represents total intervals for adding shorter tick marks

    for (let i = 0; i < subNumbers; i++) {
        const angle = (i * 6) - 90; // Adjusts start position to top, with a finer granularity for sub tick marks
        const markingContainer = document.createElement('div');
        markingContainer.classList.add('minute-marking');

        // Determine if the current tick mark is a primary (minute) or secondary (shorter) tick mark
        const isPrimaryTickMark = i % 5 === 0;
        const markingHeight = isPrimaryTickMark ? 20 : 10; // Shorter tick marks are half the height
        const markingWidth = isPrimaryTickMark ? 2 : 1; // Optionally, make the shorter tick marks thinner

        markingContainer.style.width = `${markingWidth}px`;
        markingContainer.style.height = `${markingHeight}px`;
        markingContainer.style.backgroundColor = 'black';

        if (isPrimaryTickMark) {
            const markingText = document.createElement('span'); // Container for the text
            markingText.textContent = i * 1; // Set the text content to the minute
            markingText.style.position = 'absolute';
            markingText.style.transform = `translate(-50%, -${markingHeight + 10}px) rotate(${-angle - 90}deg)`; // Counter-rotate text to keep it upright
            markingText.style.transformOrigin = 'center';
            markingText.style.display = 'block';
            markingText.style.width = '20px'; // Ensure text container is wide enough for all numbers
            markingText.style.textAlign = 'center'; // Center-align the text within its container
            markingText.style.color = 'black'; // Set text color
            markingContainer.appendChild(markingText); // Add the text to the tick mark container
        }

        const xPos = 50 + (radius * Math.cos(angle * Math.PI / 180));
        const yPos = 50 + (radius * Math.sin(angle * Math.PI / 180));
        markingContainer.style.left = `${xPos}%`;
        markingContainer.style.top = `${yPos}%`;
        markingContainer.style.transform = `translate(-50%, -50%) rotate(${angle + 90}deg)`;

        container.appendChild(markingContainer);
    }
}



document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('timer');
    const circleContainer = document.querySelector('.circle-container');
    startTimer(300, timerDisplay); // 5 minutes countdown
    addMinuteMarkings(circleContainer);
});

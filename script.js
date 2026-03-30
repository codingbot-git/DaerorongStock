const ctx = document.getElementById('stockChart').getContext('2d');
const priceText = document.getElementById('current-price');
const changeText = document.getElementById('price-change');
const percentText = document.getElementById('price-percent');

// 초기 설정
let currentPrice = 500;
let priceData = [500];
let labels = ['시작'];
let seconds = 0;

// 차트 초기화
const stockChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: '대로롱 주식 (D)',
            data: priceData,
            borderColor: '#58a6ff',
            backgroundColor: 'rgba(88, 166, 255, 0.1)',
            borderWidth: 2,
            pointRadius: 0, // 점 숨기기 (깔끔하게)
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        animation: { duration: 500 }, // 부드러운 움직임
        scales: {
            y: { beginAtZero: false }
        }
    }
});

// 🔥 1초마다 실행되는 핵심 함수
const updateStock = () => {
    // 1. 랜덤 변동폭 결정 (-15 ~ +15 정도가 적당합니다)
    const change = Math.floor(Math.random() * 31) - 15;
    const oldPrice = currentPrice;
    currentPrice += change;

    // 상장폐지 방지 (최소 10D 유지)
    if (currentPrice < 10) currentPrice = 10;

    // 2. 화면 숫자 업데이트
    priceText.innerText = currentPrice;
    changeText.innerText = (change >= 0 ? "+" : "") + change;
    
    const percent = (((currentPrice - oldPrice) / oldPrice) * 100).toFixed(2);
    percentText.innerText = percent;

    // 가격 상승/하락에 따른 색상 변경
    if (change > 0) {
        priceText.style.color = "#ff7b72"; // 상승(빨강)
    } else if (change < 0) {
        priceText.style.color = "#58a6ff"; // 하락(파랑)
    }

    // 3. 차트 데이터 추가
    seconds++;
    labels.push(`${seconds}초`);
    priceData.push(currentPrice);

    // 차트에 데이터가 너무 많으면 성능을 위해 앞부분 삭제 (최근 60초만 유지)
    if (priceData.length > 60) {
        labels.shift();
        priceData.shift();
    }

    stockChart.update('none'); // 'none'을 넣으면 성능 부하가 적습니다.
};

// 매 1000ms(1초)마다 updateStock 함수 실행
setInterval(updateStock, 1000);

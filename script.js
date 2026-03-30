const ctx = document.getElementById('stockChart').getContext('2d');
const priceText = document.getElementById('current-price');
const changeText = document.getElementById('price-change');
const percentText = document.getElementById('price-percent');

// 1. 로컬 스토리지에서 이전 가격 불러오기 (없으면 500D로 시작)
const savedPrice = localStorage.getItem('derorong_last_price');
let currentPrice = savedPrice ? parseInt(savedPrice) : 500;

// 초기 UI 및 차트 데이터 설정
priceText.innerText = currentPrice;
let priceData = [currentPrice];
let labels = ['이전 기록'];
let seconds = 0;

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
            pointRadius: 0,
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        animation: { duration: 500 },
        scales: { y: { beginAtZero: false } }
    }
});

// 2. 주가 변동 및 저장 함수
const updateStock = () => {
    const change = Math.floor(Math.random() * 31) - 15; // -15 ~ +15 변동
    const oldPrice = currentPrice;
    currentPrice += change;

    if (currentPrice < 10) currentPrice = 10; // 상폐 방지

    // 🔥 핵심: 변동된 가격을 로컬 스토리지에 즉시 저장
    localStorage.setItem('derorong_last_price', currentPrice);

    // UI 업데이트
    priceText.innerText = currentPrice;
    changeText.innerText = (change >= 0 ? "+" : "") + change;
    const percent = (((currentPrice - oldPrice) / oldPrice) * 100).toFixed(2);
    percentText.innerText = percent;

    // 색상 변경
    priceText.style.color = change >= 0 ? "#ff7b72" : "#58a6ff";

    // 차트 데이터 추가
    seconds++;
    labels.push(`${seconds}초`);
    priceData.push(currentPrice);

    if (priceData.length > 60) {
        labels.shift();
        priceData.shift();
    }

    stockChart.update('none');
};

// 1초마다 실행
setInterval(updateStock, 1000);

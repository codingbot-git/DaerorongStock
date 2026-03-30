const ctx = document.getElementById('stockChart').getContext('2d');
const priceText = document.getElementById('current-price');
const changeText = document.getElementById('price-change');
const percentText = document.getElementById('price-percent');
const updateBtn = document.getElementById('update-btn');

// 초기 데이터
let currentPrice = 500;
let priceData = [500];
let labels = ['시작'];
let count = 1;

// 차트 생성
const stockChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: '대로롱 주식 (D)',
            data: priceData,
            borderColor: '#58a6ff',
            backgroundColor: 'rgba(88, 166, 255, 0.1)',
            fill: true,
            tension: 0.3
        }]
    }
});

// 버튼 클릭 이벤트
updateBtn.addEventListener('click', () => {
    // 1. 랜덤 변동폭 계산 (-50 ~ 50 사이)
    const change = Math.floor(Math.random() * 101) - 50;
    const oldPrice = currentPrice;
    currentPrice += change;
    
    // 가격이 0 이하로 떨어지지 않게 방어
    if (currentPrice < 0) currentPrice = 0;

    // 2. UI 업데이트
    priceText.innerText = currentPrice;
    changeText.innerText = (change >= 0 ? "+" : "") + change;
    
    const percent = ((currentPrice - oldPrice) / oldPrice * 100).toFixed(2);
    percentText.innerText = percent;

    // 변동 색상 변경 (상승 빨강, 하락 파랑)
    priceText.style.color = currentPrice >= oldPrice ? "#ff7b72" : "#58a6ff";

    // 3. 차트 데이터 추가 및 갱신
    labels.push(`${count++}회차`);
    priceData.push(currentPrice);

    // 데이터가 너무 많아지면 앞부분 제거 (선택 사항)
    if (priceData.length > 20) {
        labels.shift();
        priceData.shift();
    }

    stockChart.update();
});

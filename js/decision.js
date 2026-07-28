window.getRecommendation = function(asset) {
    const priceMove = asset.changePct;
    const strength = Math.min(Math.abs(priceMove) * 4, 100);
    let signal = 'HOLD';
    let bias = 'Neutral';
    let confidence = 'Moderate';
    let narrative = 'Market is calm; watch for a clearer entry setup.';

    if (priceMove >= 0.35) {
        signal = 'BUY';
        bias = 'Bullish';
        confidence = strength > 70 ? 'High' : 'Medium';
        narrative = `Positive momentum is building for ${asset.name}. A measured long entry may be preferred on pullback.`;
    } else if (priceMove <= -0.35) {
        signal = 'SELL';
        bias = 'Bearish';
        confidence = strength > 70 ? 'High' : 'Medium';
        narrative = `Downside pressure is visible on ${asset.name}. Consider reduction or short exposure on next resistance.`;
    } else {
        signal = 'HOLD';
        bias = 'Neutral';
        confidence = 'Moderate';
        narrative = `Price is consolidating for ${asset.name}. Wait for a stronger breakout or reversal signal before trading.`;
    }

    return { signal, bias, confidence, narrative };
};

window.updateRecommendationPanel = function(asset) {
    const { signal, bias, confidence, narrative } = window.getRecommendation(asset);
    const riskElement = document.getElementById('risk');

    document.getElementById('signal').textContent = signal;
    document.getElementById('marketBias').textContent = bias;
    document.getElementById('confidence').textContent = confidence;
    document.getElementById('recommendationText').textContent = narrative;

    if (riskElement) {
        const risk = Math.abs(asset.changePct) > 0.7 ? 'High' : Math.abs(asset.changePct) > 0.3 ? 'Medium' : 'Low';
        riskElement.textContent = risk;
    }
};

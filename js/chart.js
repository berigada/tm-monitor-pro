window.drawAssetChart = function(canvas, prices, color, style = 'line') {
    if (!canvas || !prices || prices.length === 0) {
        return;
    }

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.fillRect(0, 0, rect.width, rect.height);

    const padding = 28;
    const width = rect.width - padding * 2;
    const height = rect.height - padding * 2;

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const range = Math.max(maxPrice - minPrice, maxPrice * 0.02);

    const points = prices.map((price, index) => {
        const x = padding + (width / (prices.length - 1)) * index;
        const y = padding + height - ((price - minPrice) / range) * height;
        return { x, y, value: price };
    });

    if (style === 'bars') {
        const barWidth = width / prices.length * 0.65;
        points.forEach((point) => {
            ctx.fillStyle = color;
            ctx.fillRect(point.x - barWidth / 2, point.y, barWidth, rect.height - padding - point.y);
        });
    } else {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        points.forEach((point) => ctx.lineTo(point.x, point.y));
        ctx.strokeStyle = color;
        ctx.lineWidth = style === 'area' ? 3.5 : 2.8;
        ctx.lineJoin = 'round';
        ctx.stroke();

        const gradient = ctx.createLinearGradient(0, padding, 0, rect.height - padding);
        gradient.addColorStop(0, 'rgba(91, 188, 255, 0.32)');
        gradient.addColorStop(1, 'rgba(91, 188, 255, 0.05)');

        ctx.lineTo(points[points.length - 1].x, rect.height - padding);
        ctx.lineTo(points[0].x, rect.height - padding);
        ctx.closePath();
        ctx.fillStyle = style === 'area' ? gradient : 'rgba(91, 188, 255, 0.12)';
        ctx.fill();
    }

    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i < points.length; i += Math.max(1, Math.floor(points.length / 4))) {
        const p = points[i];
        ctx.moveTo(p.x, padding);
        ctx.lineTo(p.x, rect.height - padding);
    }
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(maxPrice.toFixed(2), padding, padding - 8);
    ctx.fillText(minPrice.toFixed(2), padding, rect.height - padding + 18);

    const last = points[points.length - 1];
    ctx.beginPath();
    ctx.arc(last.x, last.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
};

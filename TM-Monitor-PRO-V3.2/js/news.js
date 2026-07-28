window.renderNews = function() {
    const newsContainer = document.getElementById('news');
    if (!newsContainer) return;

    const items = [
        {
            title: 'Gold steadies as safe-haven demand remains firm',
            detail: 'Portfolio managers are watching rate-cut expectations and geopolitical headlines for the next directional move.'
        },
        {
            title: 'WTI finds support from inventory draw and supply resilience',
            detail: 'Crude is holding above key support as traders balance demand optimism with slowing global growth concerns.'
        },
        {
            title: 'Silver remains constructive as industrial demand improves',
            detail: 'Silver is benefiting from steady industrial usage and renewed interest as a hedging asset.'
        },
        {
            title: 'Natural gas stays rangebound ahead of weather updates',
            detail: 'Weather-driven demand forecasts remain the main catalyst for intraday volatility in gas markets.'
        }
    ];

    newsContainer.innerHTML = '';

    items.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'news-item';
        card.innerHTML = `<strong>${item.title}</strong><p>${item.detail}</p>`;
        newsContainer.appendChild(card);
    });
};

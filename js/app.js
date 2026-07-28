window.assets = [
    { name: 'Gold', symbol: 'gold', price: 2235.40, change: 0.00, changePct: 0.00, decimals: 2, color: '#5bbcff', volatility: 1.2, priceHistory: [], tradingViewSymbol: 'OANDA:XAUUSD' },
    { name: 'Silver', symbol: 'silver', price: 27.64, change: 0.00, changePct: 0.00, decimals: 2, color: '#c6c6d7', volatility: 0.06, priceHistory: [], tradingViewSymbol: 'OANDA:XAGUSD' },
    { name: 'WTI Crude', symbol: 'wti', price: 86.12, change: 0.00, changePct: 0.00, decimals: 2, color: '#f9c74f', volatility: 0.35, priceHistory: [], tradingViewSymbol: 'TVC:USOIL' },
    { name: 'Natural Gas', symbol: 'gas', price: 2.93, change: 0.00, changePct: 0.00, decimals: 3, color: '#7de2ff', volatility: 0.015, priceHistory: [], tradingViewSymbol: 'CAPITALCOM:NATURALGAS' }
];

window.selectedSymbol = 'gold';
window.chartStyle = 'line';
window.widget = null;
window.loadedAssetSymbol = null;

window.createStartingHistory = function() {
    assets.forEach((asset) => {
        asset.priceHistory = Array.from({ length: 40 }, (_, index) => {
            const noise = Math.sin(index / 6) * asset.volatility * 4;
            return Number((asset.price + noise).toFixed(asset.decimals));
        });
    });
};

window.updatePrices = function() {
    assets.forEach((asset) => {
        const drift = (Math.random() - 0.5) * asset.volatility;
        const updated = Math.max(asset.price + drift, 0.001);
        const change = updated - asset.price;
        asset.price = Number(updated.toFixed(asset.decimals));
        asset.change = Number(change.toFixed(asset.decimals));
        asset.changePct = Number(((asset.change / Math.max(asset.price - asset.change, 1)) * 100).toFixed(2));
        asset.priceHistory.push(asset.price);
        if (asset.priceHistory.length > 40) {
            asset.priceHistory.shift();
        }
    });

    window.renderWatchlist(assets, selectedSymbol);
    window.updateSelectedAssetSummary();
};

window.selectAsset = function(symbol) {
    selectedSymbol = symbol;
    window.renderWatchlist(assets, selectedSymbol);
    window.refreshSelectedAsset();
};

window.updateClock = function() {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const dubaiOffset = 4;
    const dubaiDate = new Date(utc + 3600000 * dubaiOffset);
    const h = String(dubaiDate.getHours()).padStart(2, '0');
    const m = String(dubaiDate.getMinutes()).padStart(2, '0');
    const s = String(dubaiDate.getSeconds()).padStart(2, '0');
    const clock = document.getElementById('dubaiClock');
    if (clock) {
        clock.textContent = `${h}:${m}:${s}`;
    }
};

window.selectChartStyle = function(style) {
    window.chartStyle = style;
    const select = document.getElementById('chartStyleSelect');
    if (select) {
        select.value = style;
    }
    window.refreshSelectedAsset();
};

window.updateSelectedAssetSummary = function() {
    const asset = assets.find((item) => item.symbol === selectedSymbol) || assets[0];
    if (!asset) return;

    const selectedName = document.getElementById('selectedAssetName');
    const selectedPrice = document.getElementById('selectedPrice');
    const changeElement = document.getElementById('selectedChange');

    if (selectedName) {
        selectedName.textContent = asset.name;
    }
    if (selectedPrice) {
        selectedPrice.textContent = asset.price.toFixed(asset.decimals);
    }
    if (changeElement) {
        const changeText = `${asset.change >= 0 ? '+' : ''}${asset.change.toFixed(asset.decimals)} (${asset.changePct >= 0 ? '+' : ''}${asset.changePct.toFixed(2)}%)`;
        changeElement.textContent = changeText;
        changeElement.className = 'price-change ' + (asset.change >= 0 ? 'positive' : 'negative');
    }

    const trend = document.getElementById('chartTrend');
    if (trend) {
        trend.textContent = asset.change >= 0 ? 'Short-term bullish bias' : 'Short-term bearish bias';
    }

    window.updateRecommendationPanel(asset);
};

window.refreshSelectedAsset = function() {
    const asset = assets.find((item) => item.symbol === selectedSymbol) || assets[0];
    if (!asset) return;

    window.updateSelectedAssetSummary();

    const chartContainer = document.getElementById('tradingviewWidget');
    if (chartContainer && window.TradingView) {
        if (!window.widget) {
            window.widget = new TradingView.widget({
                container_id: 'tradingviewWidget',
                autosize: true,
                symbol: asset.tradingViewSymbol,
                interval: '1D',
                timezone: 'Asia/Dubai',
                theme: 'dark',
                style: '1',
                locale: 'en',
                toolbar_bg: '#071116',
                enable_publishing: false,
                withdateranges: true,
                allow_symbol_change: false,
                studies: ['VWAP'],
                hide_top_toolbar: false,
                save_image: false,
                details: true,
                hotlist: false,
                calendar: false,
                show_popup_button: false
            });
            window.loadedAssetSymbol = asset.symbol;
        } else if (window.loadedAssetSymbol !== asset.symbol) {
            try {
                window.widget.setSymbol(asset.tradingViewSymbol, '1D');
                window.loadedAssetSymbol = asset.symbol;
            } catch (error) {
                window.widget = null;
                window.loadedAssetSymbol = null;
            }
        }
    }
};

window.startLiveUpdates = function() {
    window.createStartingHistory();
    window.renderWatchlist(assets, selectedSymbol);
    window.renderNews();
    window.renderCalendar();
    window.updateSessionStatuses();
    window.updateClock();
    window.initAiPanel();
    window.refreshSelectedAsset();
    setInterval(window.updatePrices, 2200);
    setInterval(window.updateSessionStatuses, 60000);
    setInterval(window.updateClock, 1000);

    const chartStyleSelect = document.getElementById('chartStyleSelect');
    if (chartStyleSelect) {
        chartStyleSelect.addEventListener('change', (event) => {
            window.selectChartStyle(event.target.value);
        });
    }
};

window.addEventListener('DOMContentLoaded', window.startLiveUpdates);

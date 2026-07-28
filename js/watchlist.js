window.renderWatchlist = function(assets, selectedSymbol) {
    const watchlist = document.getElementById('watchlist');
    if (!watchlist) {
        return;
    }

    watchlist.innerHTML = '';

    assets.forEach((asset) => {
        const row = document.createElement('button');
        row.type = 'button';
        row.className = 'asset-row' + (asset.symbol === selectedSymbol ? ' active' : '');

        row.innerHTML = `
            <div class="asset-name">
                <span class="asset-title">${asset.name}</span>
                <span class="asset-subtitle">${asset.symbol.toUpperCase()}</span>
            </div>
            <div class="asset-value">
                <span>${asset.price.toFixed(asset.decimals)}</span>
                <div class="asset-change ${asset.change >= 0 ? 'positive' : 'negative'}">
                    ${asset.change >= 0 ? '+' : ''}${asset.change.toFixed(2)} (${asset.changePct >= 0 ? '+' : ''}${asset.changePct.toFixed(2)}%)
                </div>
            </div>
        `;

        row.addEventListener('click', () => {
            window.selectAsset(asset.symbol);
        });

        watchlist.appendChild(row);
    });
};

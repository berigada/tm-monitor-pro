window.addChatMessage = function(role, message) {
    const history = document.getElementById('chatHistory');
    if (!history) return;

    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${role}`;
    bubble.textContent = message;
    history.appendChild(bubble);
    history.scrollTop = history.scrollHeight;
};

window.handleAiPrompt = function() {
    const input = document.getElementById('question');
    const value = input ? input.value.trim() : '';

    if (!value) {
        return;
    }

    window.addChatMessage('user', value);
    if (input) input.value = '';

    const asset = window.assets.find((item) => item.symbol === window.selectedSymbol) || window.assets[0];
    const bias = window.getRecommendation(asset).bias;
    const signal = window.getRecommendation(asset).signal;
    const recommendation = `For ${asset.name}, the current framework signals ${signal} with a ${bias.toLowerCase()} bias. The price is ${asset.change >= 0 ? 'trending higher' : 'pressured lower'} and the setup is best treated as a discretionary watch until confirmation.`;

    window.setTimeout(() => {
        window.addChatMessage('assistant', recommendation);
    }, 450);
};

window.initAiPanel = function() {
    const history = document.getElementById('chatHistory');
    if (!history) return;

    history.innerHTML = '<div class="chat-empty">Ask for a market read, bias, or trading posture for any monitored asset.</div>';

    const input = document.getElementById('question');
    const button = document.getElementById('sendButton');

    if (input) {
        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                window.handleAiPrompt();
            }
        });
    }

    if (button) {
        button.addEventListener('click', window.handleAiPrompt);
    }
};

window.renderCalendar = function() {
    const calendarContainer = document.getElementById('calendar');
    if (!calendarContainer) return;

    const events = [
        { title: 'FOMC Minutes', time: '14:00 UAE / 10:00 ET', impact: 'High' },
        { title: 'US CPI Release', time: '17:00 UAE / 13:00 ET', impact: 'High' },
        { title: 'ECB Commentaries', time: '16:00 UAE / 12:00 CET', impact: 'Medium' },
        { title: 'OPEC Update', time: '18:00 UAE / 14:00 CET', impact: 'Medium' }
    ];

    calendarContainer.innerHTML = '';

    events.forEach((event) => {
        const item = document.createElement('div');
        item.className = 'calendar-item';
        item.innerHTML = `<strong>${event.title}</strong><span>${event.time} • ${event.impact} impact</span>`;
        calendarContainer.appendChild(item);
    });
};

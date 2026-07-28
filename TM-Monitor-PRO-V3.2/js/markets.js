window.updateSessionStatuses = function() {
    const sessionTimes = [
        { id: 'sydneyStatus', name: 'Sydney', open: 22, close: 8 },
        { id: 'tokyoStatus', name: 'Tokyo', open: 0, close: 9 },
        { id: 'hongkongStatus', name: 'Hong Kong', open: 1, close: 10 },
        { id: 'shanghaiStatus', name: 'Shanghai', open: 2, close: 11 },
        { id: 'mumbaiStatus', name: 'Mumbai', open: 3, close: 12 },
        { id: 'frankfurtStatus', name: 'Frankfurt', open: 6, close: 15 },
        { id: 'londonStatus', name: 'London', open: 7, close: 16 },
        { id: 'newYorkStatus', name: 'New York', open: 12, close: 21 }
    ];

    const now = new Date();
    const dubaiTime = new Date(now.getTime() + 4 * 60 * 60 * 1000);
    const dubaiHour = dubaiTime.getUTCHours();

    sessionTimes.forEach((session) => {
        const element = document.getElementById(session.id);
        if (!element) return;

        const isOpen = session.open < session.close
            ? dubaiHour >= session.open && dubaiHour < session.close
            : dubaiHour >= session.open || dubaiHour < session.close;

        element.textContent = isOpen ? 'OPEN' : 'CLOSED';
        element.className = isOpen ? 'open' : 'closed';
    });
};

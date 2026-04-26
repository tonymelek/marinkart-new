const locations = [
    { name: "Alexandria", coords: [31.1980053, 29.8873263] },
    { name: "Port Said", coords: [31.2600109, 32.3107309] },
    { name: "Suez", coords: [29.9536878, 32.5782619] }
];
const whatsAppLink = "https://wa.me/201202605258";

function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function getCurrentWeekYY() {
    const now = new Date();
    const week = getWeekNumber(now);
    const yearTwoDigits = now.getFullYear().toString().slice(-2);
    return { week, year: yearTwoDigits };
}

function getAdcLink() {
    const { week, year } = getCurrentWeekYY();
    return `https://assets.admiralty.co.uk/public/documents/${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}/ADC_Catalogs_WK${String(week).padStart(2, '0')}_${year}.zip`;
}

window.globalVars = { locations, whatsAppLink, getAdcLink, getCurrentWeekYY };

// Initialize Map
document.addEventListener('DOMContentLoaded', () => {
    // Disable all zoom and interaction for a "fixed" focused feel
    const map = L.map('maps', {
        zoomControl: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false,
        dragging: false // Keep dragging on so mobile users can pan if needed, but no zoom
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Red Icon Definition
    const redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

 

    const bounds = L.latLngBounds(globalVars.locations.map(l => l.coords));

    globalVars.locations.forEach(loc => {
        const marker = L.marker(loc.coords, { icon: redIcon }).addTo(map);

        // Add tooltip that shows on hover
        marker.bindTooltip(`<b>Marinkart ${loc.name}</b>`, { direction: 'top' });

        // Open Google Maps on click
        marker.on('click', () => {
            const url = `https://www.google.com/maps/search/?api=1&query=${loc.coords[0]},${loc.coords[1]}`;
            window.open(url, '_blank');
        });
    });

    // Offset the view to the right (moves pins slightly left)
    map.fitBounds(bounds, {
        paddingTopLeft: [100, 50],
        paddingBottomRight: [100, 50]
    });
});

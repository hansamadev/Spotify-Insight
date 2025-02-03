async function fetchTopItems(timeRange) {
    try {
        const response = await fetch(`/top-items?time_range=${timeRange}`);
        const data = await response.json();

        if (!data.topArtists || !data.topTracks) {
            throw new Error("Veri alınamadı.");
        }

        //  Sanatçıları yükle
        const artistsList = document.getElementById('artists-list');
        artistsList.innerHTML = data.topArtists.map(artist => `
            <div class="artist-card">
                <img src="${artist.images[0]?.url || 'default.jpg'}" alt="${artist.name}">
                <div>
                    <span>${artist.name}</span>
                </div>
            </div>
        `).join('');

        //  Şarkıları yükle
        const tracksList = document.getElementById('tracks-list');
        tracksList.innerHTML = data.topTracks.map(track => `
            <div class="track-card">
                <img src="${track.album.images[0]?.url || 'default.jpg'}" alt="${track.name}">
                <div>
                    <span>${track.name} - ${track.artists.map(artist => artist.name).join(', ')}</span>
                </div>
            </div>
        `).join('');
    } catch (err) {
        console.error('Error fetching top items:', err);
    }
}

//  Tüm butonları dinamik hale getirme
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.time-range-buttons button').forEach(button => {
        button.addEventListener('click', (event) => {
            const timeRange = event.target.getAttribute('data-range');
            fetchTopItems(timeRange);
        });
    });

    //  Varsayılan olarak son 6 ayı yükle
    fetchTopItems('medium_term');
});
